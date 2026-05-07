from fastapi import FastAPI, APIRouter, HTTPException, Depends, Body
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import copy
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Any, Dict, List

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from auth import verify_credentials, create_token, require_admin, require_customer, hash_password, verify_password  # noqa: E402
from seed_content import INITIAL_CONTENT  # noqa: E402

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

CONTENT_DOC_ID = "site_content"


# ---------- Helpers ----------
async def get_content_doc() -> Dict[str, Any]:
    doc = await db.site_content.find_one({"_id": CONTENT_DOC_ID})
    if not doc:
        # Seed first time.
        seed = {
            "_id": CONTENT_DOC_ID,
            "draft": copy.deepcopy(INITIAL_CONTENT),
            "published": copy.deepcopy(INITIAL_CONTENT),
        }
        await db.site_content.insert_one(seed)
        doc = seed
    return doc


def strip_id(doc: Dict[str, Any]) -> Dict[str, Any]:
    doc = dict(doc)
    doc.pop("_id", None)
    return doc


# ---------- Schemas ----------
class LoginIn(BaseModel):
    email: str
    password: str


class LoginOut(BaseModel):
    token: str
    email: str


class ContentIn(BaseModel):
    content: Dict[str, Any]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "The Crypto Room API"}


@api_router.post("/auth/login", response_model=LoginOut)
async def login(payload: LoginIn):
    if not verify_credentials(payload.email, payload.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(payload.email, role="admin")
    return LoginOut(token=token, email=payload.email)


@api_router.get("/auth/me")
async def me(email: str = Depends(require_admin)):
    return {"email": email, "role": "admin"}


# ---------- Customer auth ----------
class RegisterIn(BaseModel):
    name: str
    email: str
    password: str


class CustomerOut(BaseModel):
    token: str
    email: str
    name: str


@api_router.post("/customer/register", response_model=CustomerOut)
async def customer_register(payload: RegisterIn):
    email = payload.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email")
    if len(payload.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    existing = await db.customers.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    doc = {
        "email": email,
        "name": payload.name.strip() or email.split("@")[0],
        "password_hash": hash_password(payload.password),
        "created_at": __import__("datetime").datetime.utcnow(),
    }
    await db.customers.insert_one(doc)
    token = create_token(email, role="customer")
    return CustomerOut(token=token, email=email, name=doc["name"])


@api_router.post("/customer/login", response_model=CustomerOut)
async def customer_login(payload: LoginIn):
    email = payload.email.strip().lower()
    user = await db.customers.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(email, role="customer")
    return CustomerOut(token=token, email=email, name=user.get("name", ""))


@api_router.get("/customer/me")
async def customer_me(email: str = Depends(require_customer)):
    user = await db.customers.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Not found")
    return {"email": user["email"], "name": user.get("name", ""), "role": "customer"}


@api_router.get("/content/published")
async def get_published():
    doc = await get_content_doc()
    return doc.get("published", {})


@api_router.get("/content/draft")
async def get_draft(_: str = Depends(require_admin)):
    doc = await get_content_doc()
    return doc.get("draft", {})


@api_router.put("/content/draft")
async def update_draft(payload: ContentIn = Body(...), _: str = Depends(require_admin)):
    await get_content_doc()  # ensure exists
    await db.site_content.update_one(
        {"_id": CONTENT_DOC_ID},
        {"$set": {"draft": payload.content}},
    )
    return {"ok": True}


@api_router.post("/content/publish")
async def publish(_: str = Depends(require_admin)):
    doc = await get_content_doc()
    draft = doc.get("draft", {})
    await db.site_content.update_one(
        {"_id": CONTENT_DOC_ID},
        {"$set": {"published": draft}},
    )
    return {"ok": True}


@api_router.post("/content/reset-draft")
async def reset_draft(_: str = Depends(require_admin)):
    """Discard draft changes — reset draft to current published."""
    doc = await get_content_doc()
    pub = doc.get("published", {})
    await db.site_content.update_one(
        {"_id": CONTENT_DOC_ID},
        {"$set": {"draft": pub}},
    )
    return {"ok": True}


@api_router.post("/content/reset-all")
async def reset_all(_: str = Depends(require_admin)):
    """Reset everything to the original seed content."""
    seed = copy.deepcopy(INITIAL_CONTENT)
    await db.site_content.update_one(
        {"_id": CONTENT_DOC_ID},
        {"$set": {"draft": seed, "published": seed}},
        upsert=True,
    )
    return {"ok": True}


# ---------- Search (across published content) ----------
@api_router.get("/search")
async def search(q: str = ""):
    q = (q or "").strip().lower()
    if not q or len(q) < 2:
        return {"results": []}
    doc = await get_content_doc()
    pub = doc.get("published", {})
    results: List[Dict[str, Any]] = []

    def add(kind: str, title: str, subtitle: str, url: str):
        results.append({"kind": kind, "title": title, "subtitle": subtitle, "url": url})

    def matches(*texts: str) -> bool:
        return any(q in (t or "").lower() for t in texts)

    # Indicators
    for ind in pub.get("indicators", []) or []:
        if matches(ind.get("name"), ind.get("tagline"), ind.get("description"), ind.get("longDescription")):
            add("Indicator", ind.get("name", ""), ind.get("tagline", ""), f"/indicators/{ind.get('slug', '')}")

    # MT5 Plans
    for plan in pub.get("mt5Plans", []) or []:
        if matches(plan.get("name"), plan.get("description"), " ".join(plan.get("features", []) or [])):
            add("MT5 Plan", f"{plan.get('name', '')} \u2014 ${plan.get('price', '')}/{plan.get('period', '')}", plan.get("description", ""), "/mt5")

    # FAQs
    for faq in pub.get("faqs", []) or []:
        if matches(faq.get("question"), faq.get("answer")):
            add("FAQ", faq.get("question", ""), (faq.get("answer") or "")[:120], "/#faq")

    # Features
    for ft in (pub.get("features", {}) or {}).get("items", []) or []:
        if matches(ft.get("title"), ft.get("description")):
            add("Feature", ft.get("title", ""), (ft.get("description") or "")[:120], "/")

    # Reviews
    for rv in (pub.get("reviewsSection", {}) or {}).get("items", []) or []:
        if matches(rv.get("name"), rv.get("text")):
            add("Review", rv.get("name", ""), (rv.get("text") or "")[:120], "/")

    # Nav links
    for n in (pub.get("header", {}) or {}).get("navLinks", []) or []:
        if matches(n.get("label")):
            add("Page", n.get("label", ""), "", n.get("href", "#"))

    # Footer links
    for col in (pub.get("footer", {}) or {}).get("columns", []) or []:
        for ln in col.get("links", []) or []:
            if matches(ln.get("label"), col.get("title")):
                add("Link", ln.get("label", ""), col.get("title", ""), ln.get("href", "#"))

    return {"results": results[:30]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
