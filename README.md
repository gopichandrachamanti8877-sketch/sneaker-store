# SoleStudio — Sneaker Store | Sprint 3 Final Demo

A polished static HTML/CSS/JavaScript **academic demonstration** continuing the existing Sprint 1 and Sprint 2 project.

## Run locally

```powershell
python -m http.server 8000
```

Open `http://localhost:8000`. Deploy to GitHub Pages using `main` / `(root)` after testing.

## Features

- 18 curated sneaker products, each with original SVG concept artwork
- Homepage, product catalogue, individual product details, about/contact pages
- Search, brand/category filters, low-to-high and high-to-low sorting
- Product availability, stock restrictions, EU size selection
- Size-aware cart, quantities, removal, live totals, cart badge and notifications
- Browser-only registration, login, logout and checkout login gate
- Shipping validation, **simulated** payment choices and demo order confirmation
- Responsive desktop/tablet/mobile design

## Jira Sprint 3 mapping

- **SNEAK-32** Simulated Payment Process → `checkout.html`, `js/checkout.js`
- **SNEAK-33** Order Confirmation Page → `success.html`
- **SNEAK-34** Order Summary & Cart Completion → `js/cart.js`, `js/checkout.js`
- **SNEAK-35** Integrate the Complete Shopping Journey → all HTML and JS pages
- **SNEAK-36** Fix Critical and High-Priority Bugs → see `TESTING.md` (test before marking Done)
- **SNEAK-37** Responsive Layout & Navigation Check → `css/style.css`, `TESTING.md`
- **SNEAK-38** End-to-End Website Testing → `TESTING.md`
- **SNEAK-39** Final Test Report & Evidence → `TESTING.md` (fill with actual evidence)
- **SNEAK-40** Final Documentation & Demonstration → this README and `DEMO_SCRIPT.md`

> Product expansion and catalogue filters are additional enhancements beyond the 9 visible Sprint 3 issues. Add Jira issues if your professor requires traceability.

## Critical limitations — NOT production ready

This is **not a real store**. No real money is collected, no payment gateway is integrated, and no orders are sent to a server. Payment methods are simulated; never enter real card details. Authentication and order storage are local to each browser and can be modified by users. Client-side password hashing is not a replacement for secure server-side authentication. Do not enter real personal information or reuse real passwords. Real e-commerce needs server-side account handling, a database, inventory/order verification, payment processor, security controls and legal/compliance review.

Artwork is original SVG illustration; product names are for a student demonstration and are not endorsements or official product photographs.
