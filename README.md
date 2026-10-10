# 🎧 Developer's Room - Hostel Lo-Fi Radio

An interactive, ambient web app featuring an over-the-shoulder view of a developer coding in Hostel Room 4012, integrated with full-length music playback from Spotify playlists, retro side-rolling cassette tape decks, glowing atmospheric lighting, and frosted glassmorphism controls.

---

## ✨ Features

- **Dual Complete Playlists (No 30s Cutoff):**
  - **Indian Barber Shop Bangers** (20 Songs) — Classic 90s/2000s Bollywood lo-fi hits.
  - **Bast** by Raghab Barik (13 Songs) — Curated indie & soulful mix.
  - **1-Click Playlist Switcher:** Switch between playlists via the topbar `Bast ✨` / `Barber Shop 📻` button or the drawer tabs.
  - **Continuous Auto-Play:** When one song finishes, the next song automatically plays.
- **Frosted Glassmorphism Player:**
  - Premium frosted glass dock with dynamic backdrop blur (`backdrop-filter: blur(28px) saturate(1.8)`), specular rim highlight, and sleek responsive layout.
- **Side Rolling Cassette Deck ("casid"):**
  - Interactive retro cassette player with animated dual spinning spools (`rollCassette`), SIDE A badge, and dynamic movie/album highlight artwork for every song.
- **Dark Mode & Room Lighting:**
  - **Lichu Lights ("lichu light"):** Vibrant hostel string/fairy lights glowing with animated neon halos across the ceiling.
  - **Lamb Light ("lamb light"):** Incandescent desk study lamp shining a warm golden beam cone across the desk, keyboard, and typing hands.
  - **Window Scene:** Transitions between morning daylight and 2 AM midnight ambiance with silver moon and twinkling stars.
  - **Room Accents:** Framed photo of Raghab ❤️ on the wall, Room 4012 sign, self-typing code editor, and steaming cup of chai.
- **Full Mobile Support (Android & iOS):**
  - Dynamic SVG camera framing for portrait phones, viewport safe areas (`env(safe-area-inset-*)`), and touch-friendly controls.

---

## 🚀 How to Deploy to Vercel

### Method 1: Deploy with Vercel CLI (Fastest)

Run the following command directly in the project directory:

```bash
npx vercel
```

Follow the quick prompts:
1. `Set up and deploy “d:\developerroom”?` ➔ Press **Enter** (`Y`)
2. `Which scope do you want to deploy to?` ➔ Select your Vercel account
3. `Link to existing project?` ➔ Press **Enter** (`N`)
4. `What’s your project’s name?` ➔ `developers-room` (or your choice)
5. `In which directory is your code located?` ➔ Press **Enter** (`./`)

For production deployment:
```bash
npx vercel --prod
```

---

### Method 2: Deploy with GitHub & Vercel Dashboard

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Developer's Room"
   ```
2. Create a repository on [GitHub](https://github.com/new) and push your code:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), select your GitHub repository, and click **Deploy**. Vercel will automatically detect `vercel.json` and deploy your website in seconds!

---

## 🛠 Local Development

To run locally:
```bash
npm run dev
# or
npx serve .
# or
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
