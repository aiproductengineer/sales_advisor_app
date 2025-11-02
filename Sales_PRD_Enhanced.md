# Product Requirements Document: Ethos Sales Advisor App

**Version:** 2.0
**Last Updated:** 2025-11-02
**Status:** Draft - Enhanced

---

## Problem Statement

Clienteling is the biggest lever in luxury retail to move conversion and repeat rate. Ethos already has deep brand authority, boutique footprint, and high-intent traffic; what's missing is a unified, mobile-first toolkit for advisors to personalize every interaction before, during, and after store visits.

---

## Phase-wise Breakdown

### Phase 1: Dashboards & Reporting Foundation
**Timeline:** Q1 2026 | **Priority:** P0

#### Sales Dashboard
- Each individual staff rolls up into hierarchical structure
- All Store staff rolls up to HoS (Head of Store), HoS rolls up to HOC (Head of Cluster), HOC rolls up to ZH (Zonal Head), and ZH to NSH (National Sales Head)
- **Metrics:**
  - Budget vs. Achievement
  - LY MTD vs. MTD (Last Year Month-to-Date vs Month-to-Date)
  - LMTD vs. MTD (Last Month-to-Date vs Month-to-Date)
  - ECAL Conversion (Ethos Card Assisted Link)
  - ECAL Share to overall billing comparison with LY and LMYTD
  - Achievement vs. Budget and LY

#### Customer Experience Dashboard
- **NPS (Net Promoter Score):**
  - Last 20 scores
  - YTD score
  - Last 5 remarks/comments
- **Mystery Audit:**
  - Segment-wise score (last conducted)

#### Incentive Management
- DL sheet (Distribution List)
- Special incentive schemes launched
- Transparency into active schemes

---

### Phase 2: Core Clienteling & Communication Tools
**Timeline:** Q2-Q3 2026 | **Priority:** P0

#### Customer Segmentation
- Loyalty tiers
- LTV-wise breakdown of customer segments
- Customer data per person with breakdown
- Top 10 customers per advisor

#### Communication Engine
- **Templates & Database:**
  - Birthday messages
  - Event invites
  - Post store visit follow-up
  - Stock availability notifications
- **Channel Support:** Email, SMS, WhatsApp (with consent management)

#### Inventory Integration
- Synced with Onebeat to understand availability
- Velocity tracking
- Product information access

---

### Phase 3: Advanced Features & Optimization
**Timeline:** Q4 2026 | **Priority:** P1

- Incentive payout calculator
- Meeting calendar schedule sync
- Advanced analytics and forecasting

---

## High-Level Approach

We will build a mobile application for store salespersons ("Advisor App") to deliver high-touch, personalized in-store and post-visit experiences that increase conversion, AOV, and lifetime value while reducing time to close.

The app centralizes:
- **Customer 360:** Purchase history, preferences, key dates
- **Live Catalogue & Availability:** Real-time inventory sync
- **Guided Communication:** Email/SMS/WhatsApp templates with consent enforcement
- **Real-time Incentives Dashboard:** Target tracking and payout estimation

**Integrations:** POS/ERP for order capture and inventory, CRM/CDP for clienteling, Payment gateway for online payments

**Why now?** North-star outcome: A trusted digital aide that helps each advisor sell smarter and faster while making every client feel known and valued.

---

## Personas

| Persona | Pain Points | Goals |
|---------|-------------|-------|
| **Store Sales Advisor** | Fragmented tools (POS/ERP/WhatsApp personal), no unified client view, slow stock checks, unclear incentives | Know the client, find right piece fast, close with confidence, follow up credibly |
| **Store Manager** | Low visibility of advisor activity, incentives opaque, quality of follow-ups varies, understanding of customer experience gaps is periodic | Coach team, forecast & hit targets, assign leads, ensure compliance |
| **CRM/Marketing Admin** | Inconsistent messaging, consent management gaps, poor attribution | Template governance, segmentation, campaign hygiene |
| **Client (Customer)** | Repeating info, generic messages, unclear availability/status | Feel known & advised, not sold to; smooth purchase & after-sales |

---

## User Stories with Acceptance Criteria

### Platform
**Android and iOS** (React Native or Flutter recommended)

---

### Sales Advisor Stories

#### Authentication & Security

**Story 1.1:** Sign In & Secure Access
> As a **Sales Advisor**, I want to sign in with my Ethos employee credentials (registered in HRMS) and unlock with PIN/biometrics so that I can start selling quickly and securely.

**Acceptance Criteria:**
- [ ] SSO integration with existing HRMS (Azure AD/Okta)
- [ ] PIN setup flow on first login (6-digit PIN)
- [ ] Biometric authentication option (FaceID/TouchID/Fingerprint)
- [ ] Session timeout after 15 minutes of inactivity
- [ ] Failed login attempts logged and locked after 5 attempts
- [ ] "Forgot PIN" flow triggers admin unlock request

---

#### Customer Management

**Story 2.1:** Unified Customer Profile
> As a **Sales Advisor**, I want to access a unified customer profile (history, product preferences, key dates, consent) so that I can tailor recommendations.

**Acceptance Criteria:**
- [ ] Profile loads in <2 seconds
- [ ] Displays last 10 purchases with date, product, amount
- [ ] Shows product category preferences (watches, jewelry, accessories)
- [ ] Highlights upcoming key dates (birthday, anniversary) within 30 days
- [ ] Consent flags clearly visible (Email: Yes/No, SMS: Yes/No, WhatsApp: Yes/No)
- [ ] DND status prominently displayed
- [ ] Last interaction date and advisor name shown
- [ ] LTV and loyalty tier badge displayed
- [ ] Search by name, phone, email, or customer ID
- [ ] Offline mode shows cached last viewed profiles (up to 50)

**Story 2.2:** Quick Customer Search
> As a **Sales Advisor**, I want to quickly search and find customer profiles by name, phone, or email so that I can access their information during conversations.

**Acceptance Criteria:**
- [ ] Search results appear as user types (real-time)
- [ ] Results ranked by relevance and last interaction date
- [ ] Shows basic info in results: name, phone, last purchase date, LTV
- [ ] Tapping result opens full Customer 360 profile
- [ ] Recent searches saved for quick access
- [ ] Works offline with cached customer data

---

#### Product Discovery & Inventory

**Story 3.1:** Product Barcode/QR Scanning
> As a **Sales Advisor**, I want to enter product details/scan a watch barcode/QR and open the SKU product page/card instantly so that I can keep momentum with the client.

**Acceptance Criteria:**
- [ ] Camera permission requested on first use
- [ ] Barcode scan completes in <1 second
- [ ] QR code scan supported
- [ ] Manual SKU entry option available
- [ ] Product card displays: image, brand, model, price, specs, availability
- [ ] Shows stock across all stores (current store highlighted)
- [ ] Fallback to manual search if scan fails
- [ ] Scan history accessible for last 20 scanned products

**Technical Note:** Barcode scanning feasibility confirmed - will use ML Kit (Android) and Vision Framework (iOS)

**Story 3.2:** Stock Availability Check
> As a **Sales Advisor**, I want to check real-time stock availability across all stores so that I can offer alternatives or arrange transfers.

**Acceptance Criteria:**
- [ ] Real-time stock levels synced with Onebeat every 5 minutes
- [ ] Shows stock count by location (current store, nearby stores, warehouse)
- [ ] Distance to other stores shown
- [ ] "Reserve" action available for in-stock items
- [ ] Transfer request option with estimated arrival time
- [ ] Stock velocity indicator (fast-moving, slow-moving)
- [ ] Notifications when out-of-stock items are restocked

---

#### Sales & Transactions

**Story 4.1:** Payment Link Sharing
> As a **Sales Advisor**, I want to share a payment link via WhatsApp/SMS/Email so that the client can pay online or in-store by POS.

**Acceptance Criteria:**
- [ ] Generate payment link with quote details
- [ ] Link expires after 48 hours (configurable)
- [ ] Share via WhatsApp (direct), SMS, or Email
- [ ] Customer consent verified before sending
- [ ] Link includes: product details, amount, advisor name, store location
- [ ] Payment status tracked in real-time
- [ ] Notification sent to advisor when payment completed
- [ ] Integrates with existing payment gateway (under development)
- [ ] Failed payment retry option for customer
- [ ] Payment link attributed to advisor for commission tracking

**Technical Note:** Integration with CRM payment link facility currently under development

**Story 4.2:** Stock Reservation
> As a **Sales Advisor**, I want to reserve stock against an active quote so that availability is guaranteed while the client decides.

**Acceptance Criteria:**
- [ ] Reserve timer visible (default 24 hours, configurable)
- [ ] Reserved items locked from other advisors
- [ ] Automatic release on expiry
- [ ] Manual release/cancel option
- [ ] Notification sent 2 hours before expiry
- [ ] Reservation linked to customer and quote
- [ ] Shows all active reservations in "My Reservations" view
- [ ] Manager can override/extend reservations
- [ ] VC Report and credit billing report integration

---

#### Communication & Follow-up

**Story 5.1:** Template-based Customer Outreach
> As a **Sales Advisor**, I want company-approved templates with auto-filled variables so that I can send polished outreach quickly with channel enforcement (consent, DND, quiet hours) so that I remain compliant.

**Template Types:**
- **Occasion:** Birthday, Anniversary, Festive greetings + curated picks (Club Echo integration)
- **Follow-ups:** Tried in store, Quote reminder, Back-in-stock
- **Education:** Care guide, Brand story, How to choose your size

**Acceptance Criteria:**
- [ ] Templates categorized by type and occasion
- [ ] Auto-fill: {Customer Name}, {Product Name}, {Advisor Name}, {Store Location}
- [ ] Preview before sending
- [ ] Channel selection: WhatsApp, SMS, Email
- [ ] Consent verification blocks send if customer opted out
- [ ] DND list checked automatically
- [ ] Quiet hours enforced (no messages between 9 PM - 9 AM unless customer scheduled)
- [ ] Scheduled send option available
- [ ] Send history tracked with timestamp and status (delivered/failed)
- [ ] Failed sends show reason (consent, DND, invalid number)
- [ ] Brand compliance warning if template modified

**Story 5.2:** Daily To-Do List & Nudges
> As a **Sales Advisor**, I want a daily to-do list (birthdays, anniversaries, quote follow-ups) so that I never miss critical moments.

**Acceptance Criteria:**
- [ ] To-do list generated daily at 9 AM
- [ ] Includes: birthdays (today and next 7 days), anniversaries, quote follow-ups (3 days old), reservations expiring today
- [ ] Push notification at 9 AM with to-do count
- [ ] Mark tasks as complete (dismissible)
- [ ] High-priority items highlighted (high LTV customers)
- [ ] Snooze option to defer task
- [ ] Integration with meeting calendar
- [ ] Shows suggested action for each to-do (e.g., "Send birthday template")

**Story 5.3:** Appointment Scheduling
> As a **Sales Advisor**, I want to create appointments and send invites so that clients remember to visit.

**Acceptance Criteria:**
- [ ] Calendar view shows my appointments
- [ ] Create appointment with: date, time, customer, purpose, notes
- [ ] Send invite via Email/SMS/WhatsApp (based on consent)
- [ ] Reminder sent 24 hours before appointment
- [ ] Customer can confirm/reschedule via link
- [ ] Syncs with advisor's device calendar
- [ ] Shows appointment history per customer
- [ ] Manager can view team's appointments
- [ ] No-show tracking for follow-up

---

#### Performance & Incentives

**Story 6.1:** Target vs Achievement Dashboard
> As a **Sales Advisor**, I want a target vs achieved dashboard so that I know how far I am from my goal (along with a commission estimator tied to my quote) so that I understand my alignment with budgeted targets and expected payout.

**Acceptance Criteria:**
- [ ] Current month target/actual/variance displayed
- [ ] Updates every hour (configurable)
- [ ] Progress bar visualization (% to target)
- [ ] Daily, weekly, monthly views
- [ ] Breakdown by: product category, brand, transaction count
- [ ] Commission estimator based on active quotes
- [ ] Leaderboard showing top performers (store level)
- [ ] YTD performance graph
- [ ] Goal alerts when hitting milestones (50%, 75%, 90%, 100%)
- [ ] Comparison with last month and last year same period
- [ ] ECAL conversion rate tracking

**Story 6.2:** Mystery Audit Score
> As a **Sales Advisor**, I want a dashboard showing my last achieved score in the Mystery Audit conducted so as to better understand my delivery of customer experience.

**Acceptance Criteria:**
- [ ] Displays last audit date and overall score
- [ ] Segment-wise score breakdown (greeting, product knowledge, closing, etc.)
- [ ] Comparison with store average and top performer
- [ ] Improvement areas highlighted
- [ ] Historical scores (last 3 audits)
- [ ] Access to audit report PDF
- [ ] Action items from audit visible

**Story 6.3:** NPS Tracking
> As a **Sales Advisor**, I want a structured dashboard showing my NPS scores over definitive time frames - over the last 20 received feedbacks and YTD, also highlighting last 5 received comments, so that I can keep track of every individual feedback.

**Acceptance Criteria:**
- [ ] NPS score based on last 20 feedbacks
- [ ] YTD NPS score
- [ ] Last 5 comments displayed with date and customer name (if permitted)
- [ ] Promoters/Passives/Detractors breakdown
- [ ] Trend graph (monthly NPS)
- [ ] Positive comments highlighted
- [ ] Negative feedback flagged for manager review
- [ ] Ability to respond to feedback (if workflow exists)

---

### Store Manager Stories

**Story 7.1:** Team Performance Overview
> As a **Store Manager**, I want to view my team's performance metrics in real-time so that I can identify coaching opportunities and forecast achievement.

**Acceptance Criteria:**
- [ ] Dashboard shows all advisors' performance side-by-side
- [ ] Metrics: Sales vs target, conversion rate, AOV, customer follow-up rate
- [ ] Sortable by any metric
- [ ] Red/yellow/green indicators for performance levels
- [ ] Drill-down into individual advisor details
- [ ] Export to CSV/PDF for review meetings
- [ ] Updates hourly
- [ ] Filter by date range (today, week, month, quarter)
- [ ] Shows team NPS and mystery audit scores
- [ ] Alerts for underperformers (below 70% target)

**Story 7.2:** Lead Assignment & Distribution
> As a **Store Manager**, I want to assign walk-in customers or leads to specific advisors so that I can ensure fair distribution and accountability.

**Acceptance Criteria:**
- [ ] Manual lead assignment by manager
- [ ] Auto-assignment based on: advisor availability, expertise, workload balance
- [ ] Lead types: Walk-in, phone inquiry, online inquiry, event attendee
- [ ] Assignment notifications sent to advisor instantly
- [ ] Track lead status (contacted, quoted, closed, lost)
- [ ] Reassignment option if advisor unavailable
- [ ] Lead conversion tracking per advisor
- [ ] History of leads assigned per advisor
- [ ] Manager can set assignment rules (round-robin, expertise-based)

**Story 7.3:** Communication Quality Audit
> As a **Store Manager**, I want to review outgoing messages sent by my team so that I can ensure quality and brand compliance.

**Acceptance Criteria:**
- [ ] View all messages sent by team in last 30 days
- [ ] Filter by advisor, customer, template type, channel
- [ ] See message content, timestamp, delivery status
- [ ] Flag inappropriate messages for review
- [ ] Commend good messages (positive reinforcement)
- [ ] See template deviation (if advisor modified template)
- [ ] Compliance violations highlighted (sent during quiet hours, no consent, etc.)
- [ ] Export message report for audits
- [ ] Response rate and engagement metrics per message type

**Story 7.4:** Store Inventory Alerts
> As a **Store Manager**, I want to receive alerts when high-demand items are low in stock so that I can request replenishment proactively.

**Acceptance Criteria:**
- [ ] Alert when stock falls below threshold (configurable per SKU)
- [ ] Shows current stock, velocity, days until stock-out
- [ ] One-click replenishment request to warehouse
- [ ] Track replenishment request status
- [ ] Historical stock-out incidents logged
- [ ] Shows impact of stock-outs (lost opportunities)
- [ ] Integration with Onebeat for automated reordering

**Story 7.5:** Appointment & Calendar Overview
> As a **Store Manager**, I want to view all store appointments for the day/week so that I can plan staffing and prepare for high-value visits.

**Acceptance Criteria:**
- [ ] Calendar view of all advisor appointments
- [ ] Filters: by advisor, by customer type (VIP, new, repeat)
- [ ] Shows customer LTV for each appointment
- [ ] Highlights VIP appointments
- [ ] Staffing recommendations based on appointment load
- [ ] Reschedule/reassign appointments if needed
- [ ] No-show rate tracking
- [ ] Daily appointment summary report

---

### CRM/Marketing Admin Stories

**Story 8.1:** Template Management & Approval
> As a **CRM/Marketing Admin**, I want to create, edit, and approve message templates so that messaging is consistent and compliant.

**Acceptance Criteria:**
- [ ] Create new templates with variables: {Name}, {Product}, {Store}, {Date}, {Advisor}
- [ ] Template categories: Occasion, Follow-up, Education, Promotional
- [ ] Rich text editor for Email templates
- [ ] Character limit enforcement (SMS: 160, WhatsApp: 1000)
- [ ] Preview for all channels (Email, SMS, WhatsApp)
- [ ] Approval workflow: Draft → Pending Approval → Approved → Active
- [ ] Version history for templates
- [ ] Deactivate/archive old templates
- [ ] A/B testing support (send variants, track performance)
- [ ] Brand partner approval flag for co-branded templates
- [ ] Template usage analytics (sent count, open rate, response rate)

**Story 8.2:** Consent & Suppression Management
> As a **CRM/Marketing Admin**, I want to manage consent, DND lists, and quiet hours policies so that all outreach is compliant.

**Acceptance Criteria:**
- [ ] Upload/update DND lists (CSV import)
- [ ] Set quiet hours by time zone (default: 9 PM - 9 AM)
- [ ] Manage global suppression list (unsubscribed customers)
- [ ] Channel-specific consent tracking (Email, SMS, WhatsApp)
- [ ] Opt-in/opt-out workflow for customers
- [ ] Consent capture date and source logged
- [ ] Rate limiting rules (max messages per customer per day/week)
- [ ] Compliance dashboard showing violations
- [ ] Automated audit trail for consent changes
- [ ] DPDP 2023 compliance reports

**Story 8.3:** Campaign Segmentation & Execution
> As a **CRM/Marketing Admin**, I want to create customer segments and launch targeted campaigns so that I can drive engagement with personalized messaging.

**Acceptance Criteria:**
- [ ] Segment builder with filters: LTV, loyalty tier, last purchase date, product preferences, location
- [ ] Save segments for reuse
- [ ] Preview segment size before campaign launch
- [ ] Select template and channel for campaign
- [ ] Schedule campaign send date/time
- [ ] A/B test option (template variants)
- [ ] Attribution tracking (opens, clicks, conversions)
- [ ] Campaign performance dashboard
- [ ] Export results (CSV/PDF)
- [ ] Advisor-specific campaigns (e.g., "All customers of Advisor X")

**Story 8.4:** Audit Trail & Reporting
> As a **CRM/Marketing Admin**, I want to access comprehensive audit trails for all customer communications and profile edits so that investigations are straightforward.

**Acceptance Criteria:**
- [ ] Log all profile edits: actor, timestamp, entity, field changed, old value, new value
- [ ] Log all messages sent: advisor, customer, template, channel, timestamp, status
- [ ] Log all reservations: advisor, SKU, timestamp, duration, outcome
- [ ] Log all consent changes: customer, channel, old status, new status, source
- [ ] Search audit logs by: date range, advisor, customer, action type
- [ ] Export audit logs (CSV, JSON)
- [ ] Retention policy: 3 years (configurable)
- [ ] DPDP compliance reports on demand
- [ ] Violation alerts (sent without consent, etc.)

**Story 8.5:** Event Management & Invitations
> As a **CRM/Marketing Admin**, I want to create store events and enable advisors to invite customers so that we can drive foot traffic and engagement.

**Acceptance Criteria:**
- [ ] Create event: name, date, time, location, description, max attendees
- [ ] Upload event banner image
- [ ] Generate event invitation template (auto-created)
- [ ] Assign eligible customer segment
- [ ] Advisors can send invites to their customers
- [ ] Track invites sent, RSVPs, attendance
- [ ] Event calendar view for all stores
- [ ] Last invited event shown in customer profile
- [ ] Post-event follow-up template trigger
- [ ] Event ROI reporting (attendance, sales during/after event)

---

## Success Metrics & KPIs (Quantified)

### Primary Goals with Targets

| Goal | Baseline (Current) | Target (6 months) | Target (12 months) | Measurement |
|------|--------------------|--------------------|-------------------|-------------|
| **Repeat purchase & visit rate** | 18% annually | 25% | 35% | % customers making 2+ purchases per year |
| **In-store conversion rate** | 22% | 30% | 38% | (Transactions / Walk-ins) × 100 |
| **Average Order Value (AOV)** | ₹85,000 | ₹95,000 | ₹110,000 | Total sales / transaction count |
| **Time-to-close** | 42 minutes avg | 30 minutes | 25 minutes | Avg time from engagement to payment |
| **Advisor productivity** | 4.5 transactions/day | 6 transactions/day | 7.5 transactions/day | Transactions per advisor per day |
| **Customer follow-up rate** | 15% (manual) | 60% | 85% | % customers contacted within 3 days post-visit |

### Secondary KPIs

| Metric | Target | Description |
|--------|--------|-------------|
| App adoption rate | 95% within 3 months | % of active advisors using app daily |
| Daily active users (DAU) | 80% of advisors | Advisors logging in per day |
| Message open rate | 45% (WhatsApp), 25% (Email), 20% (SMS) | Customer engagement with outreach |
| Stock reservation usage | 50+ reservations/day (all stores) | Indicates quote → sale pipeline activity |
| NPS score (app experience) | >70 (Advisor NPS for the app) | Advisor satisfaction with app |
| Customer NPS improvement | Current 55 → Target 70 | Overall customer satisfaction |
| ECAL conversion rate | 12% → 20% | % transactions using Ethos Card |

### Phase-specific Success Criteria

**Phase 1 (Dashboards):**
- [ ] 100% advisors accessing dashboard daily
- [ ] 90% report accuracy compared to current ERP data
- [ ] 50% reduction in manager time spent on manual reporting

**Phase 2 (Clienteling):**
- [ ] 80% of follow-up communications sent via app (not personal WhatsApp)
- [ ] 40% increase in customer response rate to outreach
- [ ] 3x increase in event RSVPs vs. manual invitations

**Phase 3 (Advanced Features):**
- [ ] 100% transparency in incentive payout (zero disputes)
- [ ] 30% reduction in meeting coordination time via calendar sync

---

## Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MOBILE APP (React Native)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Advisor    │  │   Manager    │  │    Admin     │      │
│  │     App      │  │   Dashboard  │  │    Portal    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API / GraphQL
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVICES (Node.js / Python)       │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────┐    │
│  │   Auth        │  │  Clienteling  │  │  Incentives  │    │
│  │   Service     │  │   Service     │  │   Service    │    │
│  └───────────────┘  └───────────────┘  └──────────────┘    │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────┐    │
│  │ Communication │  │   Analytics   │  │   Audit      │    │
│  │   Service     │  │   Service     │  │   Service    │    │
│  └───────────────┘  └───────────────┘  └──────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
│   Application    │  │    Cache     │  │   Message    │
│   Database       │  │    Layer     │  │    Queue     │
│   (PostgreSQL)   │  │    (Redis)   │  │  (RabbitMQ)  │
└──────────────────┘  └──────────────┘  └──────────────┘
          │
          └─────── Integration Layer ───────┐
                                            │
    ┌───────────────┬───────────────┬───────┼──────────┬──────────────┐
    ▼               ▼               ▼       ▼          ▼              ▼
┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐  ┌──────┐  ┌───────────┐
│   POS   │  │   ERP    │  │   CRM    │  │ HRMS │  │Payment│  │  Onebeat  │
│ (Future)│  │(SAP/Tally)│  │(Salesforce)│ │(Azure│  │Gateway│  │(Inventory)│
└─────────┘  └──────────┘  └──────────┘  └──────┘  └──────┘  └───────────┘
```

### Technology Stack

**Frontend:**
- Framework: React Native (cross-platform iOS/Android)
- State Management: Redux Toolkit / Zustand
- Navigation: React Navigation
- Offline Support: Redux Persist + SQLite
- Barcode Scanning: react-native-vision-camera + ML Kit (Android) / Vision Framework (iOS)
- Charts: Victory Native / Recharts

**Backend:**
- API Layer: Node.js (Express.js) or Python (FastAPI)
- API Style: REST + GraphQL (for complex queries)
- Authentication: JWT + OAuth 2.0 (SSO with Azure AD)
- Background Jobs: Bull (Node.js) or Celery (Python)

**Database:**
- Primary: PostgreSQL 14+ (ACID compliance, JSON support)
- Cache: Redis 7+ (session management, real-time data)
- Search: Elasticsearch (product/customer search)

**Messaging & Notifications:**
- Message Queue: RabbitMQ / AWS SQS
- Push Notifications: Firebase Cloud Messaging (FCM)
- SMS: Twilio / MSG91
- WhatsApp Business API: Twilio / Gupshup
- Email: SendGrid / Amazon SES

**Infrastructure:**
- Cloud: AWS / Azure (client preference)
- CDN: CloudFront / Azure CDN (for images)
- Monitoring: DataDog / New Relic
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)

**Security:**
- Encryption: TLS 1.3 in transit, AES-256 at rest
- Secrets Management: AWS Secrets Manager / Azure Key Vault
- API Gateway: Kong / AWS API Gateway (rate limiting, auth)

---

## Integration Specifications

### 1. HRMS Integration (Azure AD / Okta)
**Purpose:** Employee authentication and profile sync

**Integration Type:** REST API + SSO (SAML 2.0 / OAuth 2.0)

**Data Flow:**
- **Outbound:** None (app consumes only)
- **Inbound:**
  - Employee ID, name, email, phone, role, store assignment, reporting manager
  - Sync frequency: Daily at 2 AM + real-time on employee creation/update

**Endpoints Required:**
- `GET /api/v1/employees` - List all active employees
- `GET /api/v1/employees/{id}` - Get employee details
- `POST /oauth/token` - SSO authentication

**Authentication:** OAuth 2.0 Client Credentials

**Error Handling:**
- If HRMS unavailable: Use cached employee data (refresh age < 48 hours)
- New employee login fails gracefully with "Sync pending, contact admin"

---

### 2. ERP Integration (SAP / Tally)
**Purpose:** Sales data, targets, hierarchical structure

**Integration Type:** REST API / SOAP (based on ERP)

**Data Flow:**
- **Outbound:** None (read-only initially)
- **Inbound:**
  - Sales transactions (date, advisor ID, customer ID, SKU, amount, payment method)
  - Targets (monthly, quarterly, advisor-level, store-level)
  - Hierarchical structure (HoS, HOC, ZH, NSH mappings)
  - Sync frequency: Every 15 minutes for transactions, daily for targets

**Endpoints Required:**
- `GET /api/sales/transactions?date_from=X&date_to=Y` - Fetch transactions
- `GET /api/sales/targets?month=X&advisor_id=Y` - Fetch targets
- `GET /api/organization/hierarchy` - Fetch reporting structure

**Authentication:** API Key + IP Whitelisting

**Error Handling:**
- If ERP unavailable: Show last synced data with warning banner
- Data mismatch alerts sent to admin

---

### 3. CRM Integration (Salesforce / Custom CDP)
**Purpose:** Customer profiles, consent, interaction history

**Integration Type:** REST API (Salesforce REST API / Custom)

**Data Flow:**
- **Outbound:**
  - Message sent events (advisor ID, customer ID, template ID, channel, timestamp, status)
  - Reservation events
  - Appointment creation/updates
- **Inbound:**
  - Customer profile (name, email, phone, LTV, loyalty tier, preferences, consent flags, DND status)
  - Purchase history (last 10 transactions)
  - Interaction history (last visit, last contacted)
  - Sync frequency: Real-time for profile access, batch for interaction updates (hourly)

**Endpoints Required:**
- `GET /api/customers/{id}` - Fetch customer profile
- `GET /api/customers/search?q={query}` - Search customers
- `POST /api/interactions` - Log interaction/message sent
- `PUT /api/customers/{id}/consent` - Update consent preferences

**Authentication:** OAuth 2.0 (Salesforce) / API Key

**Webhooks:**
- Customer profile update webhook (real-time sync)
- Consent change webhook

**Error Handling:**
- Profile fetch timeout (>3s): Show cached profile with staleness indicator
- Interaction log failure: Queue for retry (up to 3 attempts)

---

### 4. Onebeat (Inventory Management)
**Purpose:** Real-time inventory availability

**Integration Type:** REST API

**Data Flow:**
- **Outbound:**
  - Stock reservation requests (advisor ID, SKU, quantity, duration)
  - Stock transfer requests
- **Inbound:**
  - SKU details (name, brand, model, price, specifications)
  - Stock levels (store-wise, warehouse)
  - Product images and metadata
  - Velocity data (sales rate)
  - Sync frequency: Every 5 minutes for stock levels

**Endpoints Required:**
- `GET /api/products/{sku}` - Get product details
- `GET /api/inventory/stock?sku={sku}` - Get stock availability
- `POST /api/inventory/reserve` - Reserve stock
- `DELETE /api/inventory/reserve/{id}` - Cancel reservation
- `POST /api/inventory/transfer-request` - Request stock transfer

**Authentication:** API Key + OAuth 2.0

**Webhooks:**
- Stock level change webhook (push updates for reserved items)

**Error Handling:**
- Inventory API down: Show last synced stock with warning "Updated X minutes ago"
- Reservation conflict: Auto-retry once, then notify advisor

---

### 5. Payment Gateway Integration
**Purpose:** Payment link generation and tracking

**Integration Type:** REST API (Razorpay / PayU / Custom)

**Data Flow:**
- **Outbound:**
  - Payment link creation (amount, customer details, advisor ID, quote ID, expiry)
- **Inbound:**
  - Payment status (pending, success, failed)
  - Transaction ID, timestamp, method

**Endpoints Required:**
- `POST /api/payment-links` - Create payment link
- `GET /api/payment-links/{id}/status` - Check payment status

**Authentication:** API Key + Webhook Signature Verification

**Webhooks:**
- Payment success webhook → notify advisor + attribute sale
- Payment failure webhook → send retry link to customer

**Error Handling:**
- Payment link generation failure: Retry up to 3 times, fallback to manual POS
- Webhook missed: Poll payment status every 5 minutes until confirmed

---

### 6. WhatsApp Business API (Twilio / Gupshup)
**Purpose:** Send template messages via WhatsApp

**Integration Type:** REST API

**Data Flow:**
- **Outbound:**
  - Message send requests (template ID, recipient, variables)
- **Inbound:**
  - Delivery status (sent, delivered, read, failed)
  - Customer replies (optional, for future)

**Endpoints Required:**
- `POST /api/whatsapp/send` - Send template message
- `GET /api/whatsapp/status/{message_id}` - Get delivery status

**Authentication:** API Key

**Compliance:**
- Only pre-approved templates allowed
- Consent check before send
- 24-hour session window enforcement

**Error Handling:**
- Message send failure: Fallback to SMS if customer has SMS consent
- Rate limit hit: Queue message for next available slot

---

## Data Models

### Customer Profile
```json
{
  "customer_id": "string (UUID)",
  "name": "string",
  "email": "string (nullable)",
  "phone": "string",
  "ltv": "decimal",
  "loyalty_tier": "enum (Platinum, Gold, Silver, Bronze)",
  "preferences": {
    "brands": ["string"],
    "categories": ["string"],
    "price_range": {"min": "decimal", "max": "decimal"}
  },
  "key_dates": {
    "birthday": "date (nullable)",
    "anniversary": "date (nullable)"
  },
  "consent": {
    "email": "boolean",
    "sms": "boolean",
    "whatsapp": "boolean",
    "updated_at": "timestamp"
  },
  "dnd_status": "boolean",
  "last_purchase": {
    "date": "timestamp",
    "amount": "decimal",
    "products": ["string"]
  },
  "purchase_history": [
    {
      "date": "timestamp",
      "sku": "string",
      "product_name": "string",
      "amount": "decimal",
      "advisor_id": "string"
    }
  ],
  "assigned_advisor_id": "string (nullable)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Advisor Profile
```json
{
  "advisor_id": "string (UUID)",
  "employee_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "enum (Advisor, Manager, Admin)",
  "store_id": "string",
  "reporting_manager_id": "string (nullable)",
  "targets": {
    "monthly": "decimal",
    "quarterly": "decimal"
  },
  "performance": {
    "mtd_sales": "decimal",
    "mtd_transactions": "integer",
    "conversion_rate": "decimal",
    "nps_score": "decimal",
    "mystery_audit_score": "decimal"
  },
  "active": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Product / SKU
```json
{
  "sku": "string",
  "name": "string",
  "brand": "string",
  "category": "string",
  "model": "string",
  "description": "text",
  "price": "decimal",
  "images": ["string (URLs)"],
  "specifications": {
    "case_material": "string",
    "movement": "string",
    "water_resistance": "string",
    "diameter": "string"
  },
  "stock": [
    {
      "store_id": "string",
      "quantity": "integer",
      "reserved": "integer"
    }
  ],
  "velocity": "enum (fast, medium, slow)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Message / Communication Log
```json
{
  "message_id": "string (UUID)",
  "advisor_id": "string",
  "customer_id": "string",
  "template_id": "string",
  "channel": "enum (email, sms, whatsapp)",
  "subject": "string (nullable, for email)",
  "body": "text",
  "status": "enum (queued, sent, delivered, read, failed)",
  "error_reason": "string (nullable)",
  "scheduled_at": "timestamp (nullable)",
  "sent_at": "timestamp",
  "delivered_at": "timestamp (nullable)",
  "read_at": "timestamp (nullable)",
  "metadata": {
    "quote_id": "string (nullable)",
    "event_id": "string (nullable)"
  },
  "created_at": "timestamp"
}
```

### Reservation
```json
{
  "reservation_id": "string (UUID)",
  "advisor_id": "string",
  "customer_id": "string",
  "sku": "string",
  "quantity": "integer",
  "quote_id": "string (nullable)",
  "expires_at": "timestamp",
  "status": "enum (active, completed, expired, cancelled)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Quote / Payment Link
```json
{
  "quote_id": "string (UUID)",
  "advisor_id": "string",
  "customer_id": "string",
  "items": [
    {
      "sku": "string",
      "product_name": "string",
      "quantity": "integer",
      "unit_price": "decimal",
      "total": "decimal"
    }
  ],
  "subtotal": "decimal",
  "tax": "decimal",
  "discount": "decimal",
  "total": "decimal",
  "payment_link": "string (URL, nullable)",
  "payment_status": "enum (pending, paid, failed, expired)",
  "transaction_id": "string (nullable)",
  "expires_at": "timestamp",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Template
```json
{
  "template_id": "string (UUID)",
  "name": "string",
  "category": "enum (occasion, followup, education, promotional)",
  "channel": "enum (email, sms, whatsapp)",
  "subject": "string (for email)",
  "body": "text (with {variables})",
  "variables": ["string"],
  "status": "enum (draft, pending_approval, approved, active, archived)",
  "approved_by": "string (admin_id, nullable)",
  "approved_at": "timestamp (nullable)",
  "usage_count": "integer",
  "performance": {
    "sent": "integer",
    "delivered": "integer",
    "read": "integer",
    "response_rate": "decimal"
  },
  "created_by": "string (admin_id)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## API Requirements

### Authentication
- **SSO:** SAML 2.0 / OAuth 2.0 with Azure AD
- **App Auth:** JWT tokens (access token valid 1 hour, refresh token valid 30 days)
- **Session Management:** Redis-backed session store
- **Rate Limiting:** 100 requests/minute per user, 1000 requests/minute per store

### API Performance SLAs
- **Customer Profile Load:** <2 seconds (P95)
- **Product Search:** <1 second (P95)
- **Stock Availability Check:** <1.5 seconds (P95)
- **Message Send:** <3 seconds (P95)
- **Dashboard Metrics:** <3 seconds (P95)
- **Barcode Scan to Product Card:** <1 second (P95)

### Offline Support
- **Cached Data:**
  - Last 50 viewed customer profiles
  - Last 100 viewed products
  - Current month advisor dashboard metrics
  - To-do list (synced when online)
  - Message templates (all active templates cached)
- **Offline Actions:**
  - View cached profiles and products
  - Draft messages (queued for send when online)
  - View dashboard (with staleness indicator)
- **Sync on Reconnect:**
  - Push queued messages
  - Refresh dashboard metrics
  - Sync profile updates

### Error Handling & Resilience
- **Retry Logic:** Exponential backoff (3 attempts max) for transient failures
- **Fallbacks:**
  - Integration down → show cached data with warning
  - Payment link failure → fallback to POS
  - WhatsApp failure → fallback to SMS (if consent exists)
- **Graceful Degradation:**
  - Core features (profile view, product search) work with cached data
  - Non-critical features disabled with user notification

---

## Admin & Governance

### Template Governance
- **Approval Workflow:** Draft → Pending Approval → Approved → Active
- **Approvers:** Marketing Admin + Brand Partner (for co-branded templates)
- **Tagging:** Category, occasion, brand, language
- **Quiet Hours:** No messages between 9 PM - 9 AM (configurable per time zone)
- **Channel Suppression:** DND list checked before every send

### Audit Trails
All events logged with:
- **Actor:** Advisor ID / Admin ID / System
- **Timestamp:** UTC timestamp
- **Entity:** Customer, Product, Message, Reservation, etc.
- **Action:** Created, Updated, Deleted, Sent, etc.
- **Changes:** Field-level change log (old value → new value)

**Retention:** 3 years (DPDP 2023 compliance)

**Audit Report Types:**
- Consent change history
- Message send history
- Profile edit history
- Reservation history
- Failed sends / compliance violations

---

## Security & Compliance

### Data Protection (DPDP 2023 Compliance)
- **Opt-in Tracking:** Explicit consent required for data collection
- **Consent Capture:** Granular channel preferences (Email, SMS, WhatsApp)
- **Right to Access:** Customers can request their data
- **Right to Erasure:** Customers can request data deletion (anonymization for analytics)
- **Data Minimization:** Only collect necessary data
- **Encryption:**
  - In Transit: TLS 1.3
  - At Rest: AES-256
  - Database: Transparent Data Encryption (TDE)

### Brand Compliance
- All outreach uses pre-approved templates
- Tone & visuals consistent with luxury positioning
- Brand partner rules enforced (no discounts via messaging, imagery approval, pricing display rules)
- Template modification triggers warning + audit log

### Operational Integrity
- **Quiet Hours:** Enforced (9 PM - 9 AM, configurable)
- **Rate Limiting:** Max 5 messages per customer per day (configurable)
- **DND List:** Checked before every send
- **Suppression Rules:** Global unsubscribe list honored

### Security Best Practices
- **Authentication:** MFA for admin accounts
- **Authorization:** Role-based access control (RBAC)
- **API Security:** API Gateway with rate limiting, IP whitelisting
- **Secrets Management:** AWS Secrets Manager / Azure Key Vault
- **Monitoring:** Real-time alerts for security events
- **Penetration Testing:** Annual third-party security audit

---

## Non-Goals (Not in Scope)

1. Building a full POS replacement (we augment current POS/ERP, not rebuild)
2. POS integration in Phase 1 (currently none - will explore in Phase 2)
3. Service/Repair workshop management beyond booking intake & status view
4. Full loyalty program revamp (we surface current tiers/benefits in Customer 360)
5. Multi-language support in Phase 1 (English only, Hindi/regional languages in Phase 2)
6. Customer-facing app (this is advisor-only)
7. Advanced analytics & ML-based recommendations (Phase 3 consideration)

---

## Open Questions (To Resolve in Discovery)

| # | Question | Owner | Priority | Deadline |
|---|----------|-------|----------|----------|
| 1 | Brand partner constraints on imagery/pricing for sharing over WhatsApp/SMS/Email. Discounts not to be triggered via message. | Brand Partnerships | P0 | Before Phase 2 |
| 2 | Exact DND/quiet hours policy by city/format (malls vs boutiques) | Legal / Compliance | P0 | Before Phase 2 |
| 3 | Returns/Refund Policy impact on communication (can we send follow-ups to customers who returned items?) | Operations | P1 | Before Phase 2 |
| 4 | POS system vendor and API availability for future integration | IT / Operations | P1 | Before Phase 2 |
| 5 | Barcode/QR code format standardization across brands | Product / Inventory | P0 | Before Phase 1 |
| 6 | Customer consent collection mechanism (in-store capture workflow) | CRM / Legal | P0 | Before Phase 2 |
| 7 | Incentive calculation logic transparency (commission tiers, eligibility rules) | HR / Finance | P0 | Before Phase 1 |
| 8 | Mystery audit scoring methodology and data source | Customer Experience | P1 | Before Phase 1 |
| 9 | ECAL (Ethos Card Assisted Link) program details and tracking mechanism | Finance / Product | P0 | Before Phase 1 |
| 10 | Onebeat API documentation and rate limits | IT | P0 | Before Phase 2 |

---

## Prototype Links (For Design Reference)

- **V1.0:** https://chatgpt.com/canvas/shared/68cbd05500548191816f07dd4826918a
- **V1.1 (Phase 1):** https://chatgpt.com/canvas/shared/68d615d72b7c819187e26a295843837a

---

## Execution Roadmap

### Phase 1: Dashboards & Reporting Foundation (Q1 2026)
**Duration:** 12 weeks

**Weeks 1-2: Discovery & Setup**
- Resolve Open Questions #5, #7, #8, #9
- Finalize technical architecture
- Set up development environment
- HRMS & ERP API integration testing

**Weeks 3-6: Core Dashboard Development**
- Sales Dashboard (Budget vs. Ach, LY MTD vs. MTD, LMTD vs. MTYTD)
- Hierarchical reporting structure
- ECAL conversion tracking
- Customer Experience Dashboard (NPS, Mystery Audit)
- Incentive Launches view

**Weeks 7-10: Authentication & Advisor Foundations**
- SSO integration with HRMS
- PIN/biometric unlock
- Advisor profile & performance dashboard
- Target vs. Achievement dashboard
- Commission estimator (basic)

**Weeks 11-12: Testing & Launch**
- UAT with pilot store (10 advisors)
- Bug fixes & performance optimization
- Rollout to 5 stores
- Training materials & sessions

**Success Criteria:**
- 100% advisors accessing dashboard daily
- 90% report accuracy vs. ERP data
- 50% reduction in manager reporting time

---

### Phase 2: Core Clienteling & Communication Tools (Q2-Q3 2026)
**Duration:** 20 weeks

**Weeks 1-3: Discovery & Design**
- Resolve Open Questions #1, #2, #3, #6, #10
- Finalize CRM & Onebeat integration specs
- Design communication workflow & templates
- Consent capture mechanism design

**Weeks 4-8: Customer 360 & Product Discovery**
- Customer profile (with consent, preferences, history)
- Customer search
- Product barcode/QR scanning
- Stock availability check (Onebeat integration)
- Product catalog browser

**Weeks 9-14: Communication Engine**
- Template management (admin portal)
- Template-based messaging (WhatsApp, SMS, Email)
- Consent & DND enforcement
- Daily to-do list & nudges
- Appointment scheduling & invites

**Weeks 15-18: Sales Tools**
- Payment link generation & sharing
- Stock reservation
- Quote management
- Integration with payment gateway

**Weeks 19-20: Testing & Launch**
- UAT with 3 stores (30 advisors)
- Load testing & performance optimization
- Rollout to all stores (phased)
- Training & change management

**Success Criteria:**
- 80% of follow-ups sent via app (not personal WhatsApp)
- 40% increase in customer response rate
- 3x increase in event RSVPs

---

### Phase 3: Advanced Features & Optimization (Q4 2026)
**Duration:** 10 weeks

**Weeks 1-5: Advanced Features**
- Incentive payout calculator (full transparency)
- Meeting calendar sync (Google Calendar, Outlook)
- Advanced analytics & insights
- Leaderboards & gamification

**Weeks 6-8: Optimization**
- Performance tuning
- Offline mode enhancements
- AI-based product recommendations (pilot)

**Weeks 9-10: Testing & Launch**
- UAT & rollout
- Post-launch monitoring

**Success Criteria:**
- 100% incentive transparency (zero disputes)
- 30% reduction in meeting coordination time

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Original Date] | [Original Author] | Initial PRD |
| 2.0 | 2025-11-02 | Claude (Enhanced) | Added complete user stories with acceptance criteria, quantified success metrics, technical architecture, integration specifications, data models, API requirements, and resolved gaps |

---

## Appendix

### Glossary
- **AOV:** Average Order Value
- **ECAL:** Ethos Card Assisted Link
- **HoS:** Head of Store
- **HOC:** Head of Cluster
- **ZH:** Zonal Head
- **NSH:** National Sales Head
- **LTV:** Lifetime Value
- **MTD:** Month-to-Date
- **LMTD:** Last Month-to-Date
- **YTD:** Year-to-Date
- **NPS:** Net Promoter Score
- **DND:** Do Not Disturb
- **DPDP:** Digital Personal Data Protection (Act 2023)
- **SSO:** Single Sign-On
- **JWT:** JSON Web Token
- **API:** Application Programming Interface
- **SKU:** Stock Keeping Unit
- **POS:** Point of Sale
- **ERP:** Enterprise Resource Planning
- **CRM:** Customer Relationship Management
- **CDP:** Customer Data Platform

### Contact Information
- **Product Owner:** [Name]
- **Tech Lead:** [Name]
- **Design Lead:** [Name]
- **Project Manager:** [Name]

---

*End of Document*
