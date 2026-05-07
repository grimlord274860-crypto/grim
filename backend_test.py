#!/usr/bin/env python3
"""
Backend API tests for The Crypto Room CMS
Tests auth, content CRUD with draft/publish workflow, and search endpoints.
"""

import requests
import sys
import json
from typing import Dict, Any, Optional

# Read backend URL from frontend .env
with open("/app/frontend/.env") as f:
    for line in f:
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip()
            break
    else:
        print("❌ REACT_APP_BACKEND_URL not found in /app/frontend/.env")
        sys.exit(1)

API_URL = f"{BASE_URL}/api"

# Test credentials from backend .env
ADMIN_EMAIL = "shivasai274860@gmail.com"
ADMIN_PASSWORD = "Shiva@#Grim1234"

# Global token storage
auth_token: Optional[str] = None

# Test results tracking
tests_passed = 0
tests_failed = 0
failures = []


def log_test(name: str, passed: bool, details: str = ""):
    """Log test result"""
    global tests_passed, tests_failed
    if passed:
        tests_passed += 1
        print(f"✅ {name}")
        if details:
            print(f"   {details}")
    else:
        tests_failed += 1
        failures.append(f"{name}: {details}")
        print(f"❌ {name}")
        print(f"   {details}")


def test_auth_login_success():
    """Test 1: POST /api/auth/login with correct credentials"""
    global auth_token
    try:
        response = requests.post(
            f"{API_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test(
                "Auth - Login with correct credentials",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        if "token" not in data or "email" not in data:
            log_test(
                "Auth - Login with correct credentials",
                False,
                f"Missing 'token' or 'email' in response. Got: {data}"
            )
            return
        
        if data["email"] != ADMIN_EMAIL:
            log_test(
                "Auth - Login with correct credentials",
                False,
                f"Email mismatch. Expected {ADMIN_EMAIL}, got {data['email']}"
            )
            return
        
        auth_token = data["token"]
        log_test(
            "Auth - Login with correct credentials",
            True,
            f"Token received: {auth_token[:20]}..."
        )
    except Exception as e:
        log_test("Auth - Login with correct credentials", False, str(e))


def test_auth_login_wrong_password():
    """Test 2: POST /api/auth/login with wrong password"""
    try:
        response = requests.post(
            f"{API_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword123"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Auth - Login with wrong password returns 401", True)
        else:
            log_test(
                "Auth - Login with wrong password returns 401",
                False,
                f"Expected 401, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        log_test("Auth - Login with wrong password returns 401", False, str(e))


def test_auth_login_wrong_email():
    """Test 3: POST /api/auth/login with wrong email"""
    try:
        response = requests.post(
            f"{API_URL}/auth/login",
            json={"email": "wrong@example.com", "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Auth - Login with wrong email returns 401", True)
        else:
            log_test(
                "Auth - Login with wrong email returns 401",
                False,
                f"Expected 401, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        log_test("Auth - Login with wrong email returns 401", False, str(e))


def test_auth_me_without_token():
    """Test 4: GET /api/auth/me without Authorization header"""
    try:
        response = requests.get(f"{API_URL}/auth/me", timeout=10)
        
        if response.status_code in [401, 403]:
            log_test("Auth - /me without token returns 401/403", True)
        else:
            log_test(
                "Auth - /me without token returns 401/403",
                False,
                f"Expected 401 or 403, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        log_test("Auth - /me without token returns 401/403", False, str(e))


def test_auth_me_with_token():
    """Test 5: GET /api/auth/me with valid Bearer token"""
    if not auth_token:
        log_test("Auth - /me with valid token", False, "No auth token available")
        return
    
    try:
        response = requests.get(
            f"{API_URL}/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test(
                "Auth - /me with valid token",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        if data.get("email") != ADMIN_EMAIL or data.get("role") != "admin":
            log_test(
                "Auth - /me with valid token",
                False,
                f"Expected email={ADMIN_EMAIL} and role=admin. Got: {data}"
            )
            return
        
        log_test("Auth - /me with valid token", True, f"Response: {data}")
    except Exception as e:
        log_test("Auth - /me with valid token", False, str(e))


def test_content_published_public():
    """Test 6: GET /api/content/published (public, no auth)"""
    try:
        response = requests.get(f"{API_URL}/content/published", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        # Check for required keys
        required_keys = [
            "theme", "brand", "header", "hero", "features", "trustedLogos",
            "proof", "profits", "reviewsSection", "faqs", "cta",
            "indicatorsPage", "indicators", "mt5Page", "mt5Plans",
            "referralPage", "footer"
        ]
        
        missing_keys = [k for k in required_keys if k not in data]
        if missing_keys:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Missing keys: {missing_keys}"
            )
            return
        
        # Check indicators count (should be 6)
        indicators = data.get("indicators", [])
        if len(indicators) != 6:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Expected 6 indicators, got {len(indicators)}"
            )
            return
        
        # Check indicator slugs (no-1 to no-6)
        expected_slugs = [f"no-{i+1}" for i in range(6)]
        actual_slugs = [ind.get("slug") for ind in indicators]
        if actual_slugs != expected_slugs:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Expected slugs {expected_slugs}, got {actual_slugs}"
            )
            return
        
        # Check MT5 plans count (should be 3)
        mt5_plans = data.get("mt5Plans", [])
        if len(mt5_plans) != 3:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Expected 3 MT5 plans, got {len(mt5_plans)}"
            )
            return
        
        # Check signalsPerDay values (3, 5, 8)
        signals_per_day = [plan.get("signalsPerDay") for plan in mt5_plans]
        if signals_per_day != [3, 5, 8]:
            log_test(
                "Content - GET /content/published (public)",
                False,
                f"Expected signalsPerDay [3, 5, 8], got {signals_per_day}"
            )
            return
        
        log_test(
            "Content - GET /content/published (public)",
            True,
            f"All keys present, 6 indicators, 3 MT5 plans with correct signalsPerDay"
        )
    except Exception as e:
        log_test("Content - GET /content/published (public)", False, str(e))


def test_content_draft_without_auth():
    """Test 7: GET /api/content/draft without token"""
    try:
        response = requests.get(f"{API_URL}/content/draft", timeout=10)
        
        if response.status_code in [401, 403]:
            log_test("Content - GET /content/draft without auth returns 401/403", True)
        else:
            log_test(
                "Content - GET /content/draft without auth returns 401/403",
                False,
                f"Expected 401 or 403, got {response.status_code}. Response: {response.text}"
            )
    except Exception as e:
        log_test("Content - GET /content/draft without auth returns 401/403", False, str(e))


def test_content_draft_with_auth():
    """Test 8: GET /api/content/draft with auth"""
    if not auth_token:
        log_test("Content - GET /content/draft with auth", False, "No auth token available")
        return
    
    try:
        response = requests.get(
            f"{API_URL}/content/draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test(
                "Content - GET /content/draft with auth",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        
        # Check for similar structure as published
        if "brand" not in data or "indicators" not in data:
            log_test(
                "Content - GET /content/draft with auth",
                False,
                f"Missing expected keys in draft content"
            )
            return
        
        log_test("Content - GET /content/draft with auth", True, "Draft content retrieved")
    except Exception as e:
        log_test("Content - GET /content/draft with auth", False, str(e))


def test_content_update_draft():
    """Test 9: PUT /api/content/draft - modify brand name"""
    if not auth_token:
        log_test("Content - PUT /content/draft", False, "No auth token available")
        return
    
    try:
        # First, get current draft
        response = requests.get(
            f"{API_URL}/content/draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test(
                "Content - PUT /content/draft",
                False,
                f"Failed to get draft: {response.status_code}"
            )
            return
        
        draft = response.json()
        original_brand_name = draft.get("brand", {}).get("name", "")
        
        # Modify brand name
        draft["brand"]["name"] = "TEST_BRAND_NAME"
        
        # Update draft
        update_response = requests.put(
            f"{API_URL}/content/draft",
            json={"content": draft},
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if update_response.status_code != 200:
            log_test(
                "Content - PUT /content/draft",
                False,
                f"Expected 200, got {update_response.status_code}. Response: {update_response.text}"
            )
            return
        
        # Verify the change
        verify_response = requests.get(
            f"{API_URL}/content/draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if verify_response.status_code != 200:
            log_test(
                "Content - PUT /content/draft",
                False,
                f"Failed to verify draft update: {verify_response.status_code}"
            )
            return
        
        updated_draft = verify_response.json()
        new_brand_name = updated_draft.get("brand", {}).get("name", "")
        
        if new_brand_name != "TEST_BRAND_NAME":
            log_test(
                "Content - PUT /content/draft",
                False,
                f"Brand name not updated. Expected 'TEST_BRAND_NAME', got '{new_brand_name}'"
            )
            return
        
        # Verify published is unchanged
        pub_response = requests.get(f"{API_URL}/content/published", timeout=10)
        if pub_response.status_code == 200:
            pub_data = pub_response.json()
            pub_brand_name = pub_data.get("brand", {}).get("name", "")
            if pub_brand_name == "TEST_BRAND_NAME":
                log_test(
                    "Content - PUT /content/draft",
                    False,
                    "Published content was modified (should remain unchanged)"
                )
                return
        
        log_test(
            "Content - PUT /content/draft",
            True,
            f"Draft updated to 'TEST_BRAND_NAME', published unchanged ('{pub_brand_name}')"
        )
    except Exception as e:
        log_test("Content - PUT /content/draft", False, str(e))


def test_content_publish():
    """Test 10: POST /api/content/publish - copy draft to published"""
    if not auth_token:
        log_test("Content - POST /content/publish", False, "No auth token available")
        return
    
    try:
        # Publish the draft
        response = requests.post(
            f"{API_URL}/content/publish",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test(
                "Content - POST /content/publish",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        # Verify published now has the new brand name
        pub_response = requests.get(f"{API_URL}/content/published", timeout=10)
        if pub_response.status_code != 200:
            log_test(
                "Content - POST /content/publish",
                False,
                f"Failed to get published content: {pub_response.status_code}"
            )
            return
        
        pub_data = pub_response.json()
        pub_brand_name = pub_data.get("brand", {}).get("name", "")
        
        if pub_brand_name != "TEST_BRAND_NAME":
            log_test(
                "Content - POST /content/publish",
                False,
                f"Published brand name not updated. Expected 'TEST_BRAND_NAME', got '{pub_brand_name}'"
            )
            return
        
        log_test(
            "Content - POST /content/publish",
            True,
            "Draft successfully published, brand name now 'TEST_BRAND_NAME' in published"
        )
    except Exception as e:
        log_test("Content - POST /content/publish", False, str(e))


def test_content_reset_draft():
    """Test 11: POST /api/content/reset-draft - copy published to draft"""
    if not auth_token:
        log_test("Content - POST /content/reset-draft", False, "No auth token available")
        return
    
    try:
        # First, modify draft again
        draft_response = requests.get(
            f"{API_URL}/content/draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if draft_response.status_code != 200:
            log_test(
                "Content - POST /content/reset-draft",
                False,
                f"Failed to get draft: {draft_response.status_code}"
            )
            return
        
        draft = draft_response.json()
        draft["brand"]["name"] = "ANOTHER_TEST_NAME"
        
        # Update draft
        update_response = requests.put(
            f"{API_URL}/content/draft",
            json={"content": draft},
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if update_response.status_code != 200:
            log_test(
                "Content - POST /content/reset-draft",
                False,
                f"Failed to update draft: {update_response.status_code}"
            )
            return
        
        # Now reset draft
        reset_response = requests.post(
            f"{API_URL}/content/reset-draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if reset_response.status_code != 200:
            log_test(
                "Content - POST /content/reset-draft",
                False,
                f"Expected 200, got {reset_response.status_code}. Response: {reset_response.text}"
            )
            return
        
        # Verify draft now matches published
        draft_verify = requests.get(
            f"{API_URL}/content/draft",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if draft_verify.status_code != 200:
            log_test(
                "Content - POST /content/reset-draft",
                False,
                f"Failed to verify draft: {draft_verify.status_code}"
            )
            return
        
        draft_data = draft_verify.json()
        draft_brand_name = draft_data.get("brand", {}).get("name", "")
        
        # Should match published (TEST_BRAND_NAME from previous test)
        if draft_brand_name != "TEST_BRAND_NAME":
            log_test(
                "Content - POST /content/reset-draft",
                False,
                f"Draft not reset to published. Expected 'TEST_BRAND_NAME', got '{draft_brand_name}'"
            )
            return
        
        log_test(
            "Content - POST /content/reset-draft",
            True,
            "Draft successfully reset to match published content"
        )
    except Exception as e:
        log_test("Content - POST /content/reset-draft", False, str(e))


def test_search_indicator():
    """Test 12: GET /api/search?q=indicator"""
    try:
        response = requests.get(f"{API_URL}/search?q=indicator", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Search - q=indicator",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        results = data.get("results", [])
        
        if not results:
            log_test(
                "Search - q=indicator",
                False,
                "No results returned for 'indicator'"
            )
            return
        
        # Check for at least one Indicator result
        indicator_results = [r for r in results if r.get("kind") == "Indicator"]
        if not indicator_results:
            log_test(
                "Search - q=indicator",
                False,
                f"No 'Indicator' kind found in results. Got kinds: {[r.get('kind') for r in results]}"
            )
            return
        
        # Check URL format
        first_indicator = indicator_results[0]
        url = first_indicator.get("url", "")
        if not url.startswith("/indicators/no-"):
            log_test(
                "Search - q=indicator",
                False,
                f"Unexpected URL format. Expected '/indicators/no-X', got '{url}'"
            )
            return
        
        log_test(
            "Search - q=indicator",
            True,
            f"Found {len(indicator_results)} indicator results, first URL: {url}"
        )
    except Exception as e:
        log_test("Search - q=indicator", False, str(e))


def test_search_single_char():
    """Test 13: GET /api/search?q=a (single char should return empty)"""
    try:
        response = requests.get(f"{API_URL}/search?q=a", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Search - q=a (single char)",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        results = data.get("results", [])
        
        if len(results) != 0:
            log_test(
                "Search - q=a (single char)",
                False,
                f"Expected empty results for single char, got {len(results)} results"
            )
            return
        
        log_test("Search - q=a (single char)", True, "Empty results as expected")
    except Exception as e:
        log_test("Search - q=a (single char)", False, str(e))


def test_search_mt5():
    """Test 14: GET /api/search?q=mt5"""
    try:
        response = requests.get(f"{API_URL}/search?q=mt5", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Search - q=mt5",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        results = data.get("results", [])
        
        if not results:
            log_test(
                "Search - q=mt5",
                False,
                "No results returned for 'mt5'"
            )
            return
        
        # Check for MT5 Plan results
        mt5_results = [r for r in results if r.get("kind") == "MT5 Plan"]
        if not mt5_results:
            log_test(
                "Search - q=mt5",
                False,
                f"No 'MT5 Plan' kind found. Got kinds: {[r.get('kind') for r in results]}"
            )
            return
        
        log_test(
            "Search - q=mt5",
            True,
            f"Found {len(mt5_results)} MT5 Plan results"
        )
    except Exception as e:
        log_test("Search - q=mt5", False, str(e))


def test_search_tradingview():
    """Test 15: GET /api/search?q=tradingview (should find FAQ)"""
    try:
        response = requests.get(f"{API_URL}/search?q=tradingview", timeout=10)
        
        if response.status_code != 200:
            log_test(
                "Search - q=tradingview",
                False,
                f"Expected 200, got {response.status_code}. Response: {response.text}"
            )
            return
        
        data = response.json()
        results = data.get("results", [])
        
        if not results:
            log_test(
                "Search - q=tradingview",
                False,
                "No results returned for 'tradingview'"
            )
            return
        
        # Check for FAQ results
        faq_results = [r for r in results if r.get("kind") == "FAQ"]
        if not faq_results:
            log_test(
                "Search - q=tradingview",
                False,
                f"No 'FAQ' kind found. Got kinds: {[r.get('kind') for r in results]}"
            )
            return
        
        log_test(
            "Search - q=tradingview",
            True,
            f"Found {len(faq_results)} FAQ results"
        )
    except Exception as e:
        log_test("Search - q=tradingview", False, str(e))


def restore_original_content():
    """Restore original seeded content using reset-all endpoint"""
    if not auth_token:
        print("\n⚠️  Cannot restore original content - no auth token")
        return
    
    try:
        response = requests.post(
            f"{API_URL}/content/reset-all",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            print("\n✅ Original content restored via /api/content/reset-all")
        else:
            print(f"\n⚠️  Failed to restore content: {response.status_code}")
    except Exception as e:
        print(f"\n⚠️  Error restoring content: {e}")


def main():
    print("=" * 80)
    print("The Crypto Room - Backend API Tests")
    print(f"Testing against: {API_URL}")
    print("=" * 80)
    print()
    
    # Auth tests
    print("🔐 AUTH TESTS")
    print("-" * 80)
    test_auth_login_success()
    test_auth_login_wrong_password()
    test_auth_login_wrong_email()
    test_auth_me_without_token()
    test_auth_me_with_token()
    print()
    
    # Content tests
    print("📄 CONTENT TESTS")
    print("-" * 80)
    test_content_published_public()
    test_content_draft_without_auth()
    test_content_draft_with_auth()
    test_content_update_draft()
    test_content_publish()
    test_content_reset_draft()
    print()
    
    # Search tests
    print("🔍 SEARCH TESTS")
    print("-" * 80)
    test_search_indicator()
    test_search_single_char()
    test_search_mt5()
    test_search_tradingview()
    print()
    
    # Restore original content
    restore_original_content()
    
    # Summary
    print()
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"✅ Passed: {tests_passed}")
    print(f"❌ Failed: {tests_failed}")
    print(f"📊 Total:  {tests_passed + tests_failed}")
    print()
    
    if failures:
        print("FAILURES:")
        for failure in failures:
            print(f"  • {failure}")
        print()
    
    sys.exit(0 if tests_failed == 0 else 1)


if __name__ == "__main__":
    main()
