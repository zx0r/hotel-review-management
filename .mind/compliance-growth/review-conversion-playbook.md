# Hotel Review Conversion Playbook & Legal Compliance

[[MOP|Back to Master Operating Plan]] | [[mobile-qr-ergonomics|Mobile Ergonomics]] | [[analytics-pipeline|Analytics Pipeline]]

---

## 1. The High-Conversion QR Architecture

In hospitality reputation management, review volume and recency are the top two local ranking signals for Google Local Pack and OTA ranking algorithms.

### Key Conversion Metrics
- **NFC / QR Scan-to-Review Conversion Rate**: 12–25% when presented at peak guest satisfaction moments (checkout, relaxing in-room).
- **Direct Booking Uplift**: 25–40% increase in direct bookings from high Google Maps ranking, saving 12–18% OTA commissions ($24–$36 per room night).

---

## 2. In-Hotel Physical Touchpoint Matrix

| Touchpoint | Physical Asset | Guest Psychological Moment | Scan Rate | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Checkout Desk / Key Envelope** | Premium embossed card or keycard sleeve | Departure gratitude, final settlement | **15–20%** | **Highest (Primary)** |
| **In-Room Nightstand** | Brushed metallic / wooden tabletop tent | Evening unwind or morning coffee | **12–18%** | **High** |
| **WiFi Welcome / Access Card** | Dual-sided card (Front: WiFi / Back: Reviews) | Arrival check-in, immediate phone connection | **8–12%** | **High** |
| **Restaurant / Bar Folio** | Leather bill presenter insert | Post-meal satisfaction | **10–15%** | **Medium** |
| **Concierge / Front Desk** | Handed NFC card + verbal prompt | Active staff-assisted departure | **18–28%** | **Highest** |

---

## 3. Regulatory Compliance: FTC 16 CFR Part 465 & Google Review Policies

### Critical Legal Constraints (2024–2026 Mandate)
1. **Strict Prohibition of "Review Gating"**:
   - *Illegal Pattern*: Asking "Did you enjoy your stay? (Yes/No)" and only showing Google/Tripadvisor to happy guests while routing unhappy guests to a private form.
   - *FTC Penalty*: Up to $51,744 per violation under 16 CFR Part 465. Google also actively penalizes or suspends Google Business Profiles caught review gating.
2. **Strict Prohibition of Incentivization**:
   - Offering discounts, free drinks, or loyalty points in exchange for positive reviews is strictly illegal under FTC & EU Omnibus Directive 2019/2161.
3. **The Compliant "Universal Access + Concierge Fallback" Pattern**:
   - All public review platform buttons (Google, Tripadvisor, Booking.com, Agoda) are **unconditionally visible and clickable** to 100% of guests.
   - A distinct, private "Speak directly with General Management / Concierge" option is placed gently below to give guests with immediate service issues a fast, private resolution channel without suppressing their right to leave a public review.

---

## 4. Deep Linking & Write-Review URL Specifications

Direct URLs bypass landing pages and trigger the native app review modal:

- **Google Business Profile**:
  - Direct format: `https://search.google.com/local/writereview?placeid=[PLACE_ID]` or direct Maps universal link `https://maps.app.goo.gl/...`.
- **TripAdvisor**:
  - Direct format: `https://www.tripadvisor.com/UserReview-[HOTEL_ID]`.
- **Booking.com & Agoda**:
  - Direct listing review tab links ensuring mobile browser opens directly into property feedback modal.

---
Related: [[system-design]] | [[luxury-design-system]] | [[catalog|Anti-Patterns Catalog]]
