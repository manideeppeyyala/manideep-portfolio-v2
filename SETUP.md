# Setup Guide

Your site works as a static portfolio right out of the box. Two features need a
free Firebase project to actually work: the **admin panel** (edit every detail
of the site live) and **Feedback & Ratings** (visitors leaving reviews). Until
you do this, the site still looks and works fine — those two features just
show a "not connected yet" message.

This takes about 10 minutes.

## 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with your Google account.
2. Click **Add project**, name it something like `manideep-portfolio`, and finish the wizard (you can skip Google Analytics).

## 2. Enable Firestore (the database)

1. In the left sidebar, click **Build → Firestore Database**.
2. Click **Create database**, choose **Production mode**, pick a region close to you, click **Enable**.
3. Go to the **Rules** tab, delete everything there, and paste in the contents of `firestore.rules` from this project folder. Click **Publish**.

## 3. Enable Authentication (so only you can access /admin.html)

1. In the left sidebar, click **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user**. Enter your own email and a password you'll remember — this is your admin login. (Do this only for yourself; there's no public sign-up on the admin page.)

## 4. Get your Firebase config and paste it in

1. In the left sidebar, click the gear icon → **Project settings**.
2. Scroll to **Your apps**, click the **</>** (Web) icon to register a new web app. Name it anything, skip Firebase Hosting.
3. You'll see a `firebaseConfig` object with `apiKey`, `authDomain`, `projectId`, etc. Copy those values into **`firebase-config.js`** in this project folder, replacing the `REPLACE_WITH_...` placeholders.

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "manideep-portfolio.firebaseapp.com",
  projectId: "manideep-portfolio",
  storageBucket: "manideep-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Save the file. That's it for Firebase — reload the site and the admin panel + feedback form will be live.

## 5. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login is easiest).
2. Either:
   - **Drag and drop**: on the "Import Project" screen, drag the whole `portfolio-website` folder in, or
   - **Connect GitHub**: push this folder to a new GitHub repo, then import that repo in Vercel.
3. Framework preset: choose **Other** (it's a static site, no build step needed). Leave build/output settings blank.
4. Click **Deploy**. Vercel gives you a live URL like `manideep-portfolio.vercel.app` in about 30 seconds.
5. (Optional) In Vercel project settings → Domains, add a custom domain if you have one.

## 6. Using the admin panel

Visit `https://your-site.vercel.app/admin.html`, sign in with the email/password
you created in step 3, and edit any section from the sidebar. Each tab has its
own **Save** button — changes go live immediately, no redeploy needed. The
**Feedback & Ratings** tab lets you read and delete what visitors submit. The
**Overview** tab shows page views, feedback count, and average rating.

## Notes

- `firebase-config.js` is safe to be public — it's not a secret. Firestore's
  `firestore.rules` is what actually controls who can read/write what.
- Only create one admin user in step 3. Anyone with that email/password can
  edit your site, so keep it private.
- If you ever want to reset a section back to its original text, the defaults
  are preserved in `content-schema.js` — you can copy values back manually.
