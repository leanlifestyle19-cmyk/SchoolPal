# SchoolPal

SchoolPal is a family exam and school event tracker for Singapore primary school parents. Parents track exam dates and revision topics for multiple children; an AI study coach (powered by Google Gemini) generates daily revision tasks and a day-by-day timetable, and children earn coins for completing tasks which they redeem for parent-defined rewards.

---

## Deploy on GitHub Pages

1. **Fork or upload** — Create a new GitHub repository and upload all four files (`index.html`, `manifest.json`, `sw.js`, `README.md`) to the root of the `main` branch.
2. **Enable Pages** — Go to your repository's **Settings → Pages**, set Source to `Deploy from a branch`, choose `main` / `(root)`, and click Save.
3. **Open the URL** — GitHub will publish the app at `https://your-username.github.io/your-repo-name/`. It may take 1–2 minutes to go live.

---

## Get a Gemini API Key

1. Visit [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey) and sign in with a Google account.
2. Click **Create API Key** and copy the key shown.
3. Open SchoolPal → **Settings → Gemini AI**, paste the key, and tap **Save key**.
4. Tap **Test connection** to confirm it works.

The key is stored only on your device (in IndexedDB) and is never sent anywhere except directly to Google's Gemini API.

---

## Add to Home Screen

**iPhone (Safari):**
1. Open SchoolPal in Safari.
2. Tap the **Share** button (box with arrow) at the bottom of the screen.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

**Android (Chrome):**
1. Open SchoolPal in Chrome.
2. Tap the **⋮** menu in the top-right corner.
3. Tap **Add to Home screen** (or **Install app** if shown).
4. Tap **Add**.

---

## Coin System (for parents to explain to kids)

| Action | Coins earned |
|--------|-------------|
| Tick a daily AI revision task | +15 coins |
| Mark an exam topic as done | +20 coins |
| Unlock a new badge | +50 coins (one-time) |

Coins are spent in the **Rewards Store** (⭐ Progress tab). Parents set the rewards and coin costs — examples included are 30 min screen time (100 coins), Choose dinner (200 coins), and Sleep 30 min later (150 coins). Use the **+ Add** button to create your own rewards.

Children can see a live leaderboard and badge collection to motivate them. Streaks are tracked by consecutive days of revision — a 7-day streak unlocks the 💎 badge and 50 bonus coins.

---

## Data & Privacy

- **All data is stored locally on this device** using IndexedDB. No account, no server, no cloud sync.
- Your Gemini API key is stored in IndexedDB on your device only. It is never logged, shared, or sent to any server other than Google's Gemini API at `generativelanguage.googleapis.com`.
- When Gemini is used, only anonymised study data is sent — child first names, school grade, subject names, topic names, and event titles. No personal identifiers, school names, or contact details are transmitted.
- Deleting the app or clearing your browser data will remove all SchoolPal data permanently.

---

## Notes

- Notification scheduling uses `setTimeout` (local only, no Push API or backend required). Grant notification permission when prompted to receive a 7pm daily revision reminder.
- The app works fully offline after the first load via the service worker cache.
- Tested on iPhone Safari and Android Chrome.# SchoolPal