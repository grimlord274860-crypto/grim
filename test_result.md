#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build a CMS-level admin backend for "The Crypto Room" website. Admin login with hardcoded credentials
  (shivasai274860@gmail.com / Shiva@#Grim1234). Admin should be able to edit every piece of content on the
  site (header, home, indicators, MT5, referral, footer, theme/brand) with per-item style overrides.
  Workflow: Save Draft (template) and Publish (live). Site search across all content. Public site reads
  published content; admin can preview the draft.

backend:
  - task: "Admin auth (POST /api/auth/login, GET /api/auth/me) with hardcoded creds + JWT"
    implemented: true
    working: true
    file: "/app/backend/server.py, /app/backend/auth.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "JWT issued from env credentials. /me requires Bearer token."
        - working: true
          agent: "testing"
          comment: "✅ All auth tests passed (5/5): Login with correct credentials returns 200 with token+email. Wrong password returns 401. Wrong email returns 401. /me without token returns 403. /me with valid Bearer token returns 200 with email='shivasai274860@gmail.com' and role='admin'."

  - task: "Content CRUD with draft/publish workflow"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Endpoints GET /content/published (public), GET /content/draft (auth), PUT /content/draft (auth), POST /content/publish (auth), POST /content/reset-draft (auth), POST /content/reset-all (auth). MongoDB single doc with draft+published. Seeded on first request."
        - working: true
          agent: "testing"
          comment: "✅ All content workflow tests passed (6/6): GET /content/published returns 200 with all required keys (theme, brand, header, hero, features, trustedLogos, proof, profits, reviewsSection, faqs, cta, indicatorsPage, indicators[6], mt5Page, mt5Plans[3], referralPage, footer). Indicators count=6 with slugs no-1 to no-6. MT5 plans count=3 with signalsPerDay [3,5,8]. GET /content/draft without auth returns 403. GET /content/draft with auth returns 200. PUT /content/draft successfully updates draft without affecting published. POST /content/publish copies draft to published. POST /content/reset-draft copies published back to draft. POST /content/reset-all restores original seed content."

  - task: "Site-wide search GET /api/search?q="
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Searches across published indicators, mt5 plans, faqs, features, reviews, nav, footer links. Returns up to 30 results. Min query length 2."
        - working: true
          agent: "testing"
          comment: "✅ All search tests passed (4/4): q=indicator returns 200 with 6 Indicator results (URLs like /indicators/no-1). q=a (single char) returns empty results as expected (min 2 chars). q=mt5 returns 200 with 3 MT5 Plan results. q=tradingview returns 200 with 2 FAQ results. Search correctly filters by min query length and searches across all content types."

  - task: "Customer auth (POST /api/customer/register, /api/customer/login, GET /api/customer/me)"
    implemented: true
    working: true
    file: "/app/backend/server.py, /app/backend/auth.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Adds bcrypt-hashed customer accounts in MongoDB collection `customers`. Token contains role='customer'. require_customer dependency rejects admin tokens & vice versa. Validation: email must contain '@', password >= 6 chars, returns 409 on duplicate email. Login returns 401 on bad creds. /me returns email+name+role for current customer."
        - working: true
          agent: "testing"
          comment: "✅ All customer auth tests passed (11/11): Register with valid data returns 200 with token+email+name. Duplicate email returns 409. Invalid email (no @) returns 400. Password < 6 chars returns 400. Login with correct credentials returns 200 with token+email+name. Login with wrong password returns 401. Login with non-existent email returns 401. /customer/me without token returns 403. /customer/me with customer token returns 200 with email+name+role=customer. /customer/me with admin token returns 403 (cross-role rejection working). /auth/me with customer token returns 403 (cross-role rejection working). Regression tests confirmed: admin login, published content, and search endpoints still working correctly."


frontend:
  - task: "Public pages dynamic from backend (SiteContext) + admin panel UI"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/admin/*, /app/frontend/src/context/*, /app/frontend/src/api.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Not requested for automated testing yet \u2014 user will test admin UI manually."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus:
    - "Customer auth (POST /api/customer/register, /api/customer/login, GET /api/customer/me)"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        Backend ready for testing. Hardcoded admin credentials live in /app/backend/.env
        (ADMIN_EMAIL=shivasai274860@gmail.com, ADMIN_PASSWORD=Shiva@#Grim1234, JWT_SECRET set).
        Please verify:
        1) Login: POST /api/auth/login with correct creds returns token; wrong creds return 401.
        2) /api/auth/me with Bearer token returns email+role; without token \u2192 401/403.
        3) GET /api/content/published is public and returns seeded structure
           (theme, brand, header, hero, features, indicators[6], mt5Plans[3], referralPage, footer).
        4) GET /api/content/draft requires auth.
        5) PUT /api/content/draft updates draft (auth) without affecting published.
        6) POST /api/content/publish copies draft -> published.
        7) POST /api/content/reset-draft copies published -> draft.
        8) GET /api/search?q=indicator returns results across kinds (Indicator, MT5 Plan, FAQ, Feature, Review, etc.); q with <2 chars returns empty list.
    - agent: "testing"
      message: |
        ✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (15/15)
        
        Comprehensive backend API testing completed successfully:
        
        🔐 AUTH (5/5 passed):
        - Login with correct credentials: ✅ Returns 200 with token + email
        - Login with wrong password: ✅ Returns 401
        - Login with wrong email: ✅ Returns 401
        - /me without token: ✅ Returns 403
        - /me with valid token: ✅ Returns 200 with email + role=admin
        
        📄 CONTENT CRUD (6/6 passed):
        - GET /content/published (public): ✅ Returns all required keys, 6 indicators (no-1 to no-6), 3 MT5 plans (signalsPerDay: 3,5,8)
        - GET /content/draft without auth: ✅ Returns 403
        - GET /content/draft with auth: ✅ Returns 200 with draft content
        - PUT /content/draft: ✅ Updates draft without affecting published
        - POST /content/publish: ✅ Copies draft to published
        - POST /content/reset-draft: ✅ Copies published back to draft
        
        🔍 SEARCH (4/4 passed):
        - q=indicator: ✅ Returns 6 Indicator results with correct URLs
        - q=a (single char): ✅ Returns empty results (min 2 chars enforced)
        - q=mt5: ✅ Returns 3 MT5 Plan results
        - q=tradingview: ✅ Returns 2 FAQ results
        
        All endpoints working correctly. Draft/publish workflow verified. Search functionality across all content types confirmed. Original content restored via /api/content/reset-all.
    - agent: "testing"
      message: |
        ✅ CUSTOMER AUTH TESTING COMPLETE - ALL TESTS PASSED (29/29 total)
        
        Comprehensive customer authentication testing completed successfully:
        
        👤 CUSTOMER AUTH (11/11 passed):
        - POST /api/customer/register with valid data: ✅ Returns 200 with token+email+name
        - Register duplicate email: ✅ Returns 409 (conflict)
        - Register invalid email (no @): ✅ Returns 400 (validation error)
        - Register short password (<6 chars): ✅ Returns 400 (validation error)
        - POST /api/customer/login with correct credentials: ✅ Returns 200 with token+email+name
        - Login with wrong password: ✅ Returns 401 (unauthorized)
        - Login with non-existent email: ✅ Returns 401 (unauthorized)
        - GET /api/customer/me without token: ✅ Returns 403 (forbidden)
        - GET /api/customer/me with customer token: ✅ Returns 200 with email+name+role=customer
        - GET /api/customer/me with admin token: ✅ Returns 403 (cross-role rejection working)
        - GET /api/auth/me with customer token: ✅ Returns 403 (cross-role rejection working)
        
        🔄 REGRESSION TESTS (3/3 passed):
        - Admin login still works: ✅
        - GET /content/published still works: ✅
        - GET /search still works: ✅
        
        🔐 CROSS-ROLE ISOLATION VERIFIED:
        - Customer tokens are correctly rejected by admin endpoints (403)
        - Admin tokens are correctly rejected by customer endpoints (403)
        - Role-based access control working as expected
        
        📧 TEST DATA:
        - Used timestamp-based email (pytest_<timestamp>@example.com) to avoid conflicts on re-runs
        - Password validation enforced (min 6 chars)
        - Email validation enforced (must contain @)
        - Duplicate email detection working (409 on re-registration)
        
        All customer auth endpoints working correctly. No issues found. Backend is production-ready.

