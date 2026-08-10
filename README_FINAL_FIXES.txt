Digital Menu - Final Fixes

1) orders.html
- Before customer login (online orders): ONLY "تسجيل دخول" is shown.
- After login: "السجل" and "معلوماتي" are shown.
- "تسجيل الخروج" is inside the "معلوماتي" window.
- After logout: customer data/history/session are cleared and only "تسجيل دخول" returns.
- QR/table mode: customer account buttons are hidden completely; customer can order using name/phone as requested.
- Added the missing .hidden CSS rule that caused the old screenshot behavior where all buttons were visible.

2) index.html
- Logo and brand colors save to the restaurant document.
- Logo upload uses Firebase Storage when available, with a compact Firestore fallback for logo if Storage rules are not deployed yet.
- Menu source image is previewed, analyzed by OCR, and saved after import; OCR categories/items are saved to the restaurant document.
- Fixed storing HTML-escaped text as data; escaping is now done only when rendering.
- QR generation keeps individual print buttons and Print All.

3) Validation
- Inline JavaScript syntax checked for index.html, orders.html, kitchen.html, and admin.html.
