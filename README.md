# Sneaker Store — Sprint 2 (SoleStudio UI)

Run with `python -m http.server 8000` from this folder and open http://localhost:8000.

## Sprint 2 Jira items
- SNEAK-20 Registration: `register.html`, `js/auth.js`
- SNEAK-21 Login: `login.html`, `js/auth.js`
- SNEAK-22 Logout: header in `js/auth.js`
- SNEAK-23 Invalid login: error message in `js/auth.js`
- SNEAK-24 Quantity changes: `js/cart.js`
- SNEAK-25 Totals: `js/cart.js`
- SNEAK-26 Checkout: `checkout.html`
- SNEAK-27 Checkout validation: `js/checkout.js`
- SNEAK-28 Checkout login gate: `js/checkout.js`
- SNEAK-29/30 Manual test checklist: `TESTING.md`

## IMPORTANT: Academic demo only
This is a **static HTML/JS demo** with browser-local accounts and a browser session, not production authentication. Browser storage is user-editable; SHA-256 hashing in the browser does not provide server-side account security. The checkout is a **simulated order** with no payment processing and no server-side verification. Do not use real passwords or sensitive customer information. A production store requires backend authentication, protected API routes, a real database, HTTPS and server-side order/price validation.

Product visuals are custom local SVG **illustrations**, not official product photographs. Replace them with licensed product photography if required.
