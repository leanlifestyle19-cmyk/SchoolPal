# SchoolPal 📚

Family exam tracker + AI study coach for Singapore primary school parents.

## Features
- Track exams and topics for up to 3 children
- Calendar view showing all exams and events
- AI study coach via Google Gemini (daily tips, revision checklist, timetable)
- Gamification: coins + badges for completing topics and tasks
- Rewards store: kids redeem coins for parent-defined rewards
- **Family Room sync**: share all data between two devices (no account needed)
- Offline-first PWA — works without internet after first load

---

## Deploy to GitHub Pages (3 steps)

1. Create a GitHub repo, upload all 4 files (`index.html`, `sw.js`, `manifest.json`, `README.md`)
2. Go to **Settings → Pages → Source → main branch**
3. Your app is live at `https://yourusername.github.io/your-repo-name/`

---

## Install to Home Screen

**iPhone (Safari):** Open URL → Share button → Add to Home Screen  
**Android (Chrome):** Open URL → ⋮ menu → Add to Home Screen / Install App

---

## Family Room Sync

Share all data between your phone and your wife's — no account needed.

**One-time setup (takes 30 seconds):**

1. One parent opens **Settings → Family Room → Create Family Room**
2. A short room code appears — tap **Copy Code** and send via WhatsApp
3. The other parent opens Settings → Family Room → paste the code → **Join**

**After setup:**
- Tap **Sync Now** on either device to push and pull changes
- The app also auto-syncs in the background when it opens
- Sync merges data from both devices — nothing is lost

---

## AI Study Coach

Get a free API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

Paste it in **Settings → Gemini AI Key → Save**. Then tap **Test Connection** — the app auto-selects the best available model. If you see a quota error, try switching to `gemini-1.5-flash` or `gemini-1.5-flash-8b` in the Model dropdown.

**AI features:**
| Feature | Where | Cache |
|---|---|---|
| Coaching tips (3 per day) | Home tab | Per child per day |
| Revision checklist (3–5 tasks) | Home tab | Per child per day |
| Full revision timetable | Home tab | On demand |

---

## Coin System

| Action | Coins |
|---|---|
| Complete a revision topic | +20 🪙 |
| Complete a checklist task | +15 🪙 |
| Unlock a badge | +50 🪙 |

**Badges:** 🔥 3-day streak · ✅ First topic · ⭐ 100 coins · 🏆 All done · 👑 500 coins · 💎 7-day streak

---

## Privacy

All data is stored on-device (IndexedDB). The Family Room sync uses [kvdb.io](https://kvdb.io) — a simple key-value store. Your room code is randomly generated and hard to guess. AI features only send exam subjects/topics and child grade to Google's Gemini API — no names or personal details.