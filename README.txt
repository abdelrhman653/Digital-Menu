Digital Menu - FINAL Firestore-Only Build

This version intentionally does NOT use Firebase Storage.
Images are resized/compressed in the browser and stored as JPEG Data URLs in Firestore.

Fixed in this build:
- Removed the real Firebase Storage dependency from image saving.
- Fixed logo/item/menu-image saving to use the local Data URL helper.
- Fixed the kitchen page JavaScript syntax error caused by await inside a non-async snapshot callback.
- Fixed lifetime subscriptions on the customer orders page.
- Made license/expiry handling compatible with Firestore Timestamp values and older ISO dates in the browser.
- New license expiry values are stored as Firestore-compatible timestamps.
- Improved Firestore rules for active licenses, restaurant ownership and legacy license migration.
- Kept Storage rules closed; Firebase Storage is not required by the app.
- Verified the JavaScript blocks in index.html, admin.html, kitchen.html and orders.html with Node syntax checking.

Deployment:
1. Replace the website files with the files in this folder.
2. In Firebase Console > Firestore Database > Rules, replace the rules with firestore.rules from this folder and Publish.
3. Do NOT enable/use Firebase Storage for this version.
4. Deploy the website to Vercel/GitHub.
5. Hard refresh the browser (or clear the site's cached files) before testing.

Important:
- Use this firestore.rules file together with this exact code build.
- Do not mix the old firestore.rules or old firestore.js with these files.
- The firebaseConfig belongs to project digital-menu-8d2b4.
