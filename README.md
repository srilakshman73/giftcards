# A Rose Just for You 🌹
### Premium Romantic Digital Gift Card & Love Letter Experience

A luxury romantic digital gift card website inspired by hand-painted botanical art, luxury stationery, and delicate love letters. Crafted with care to make someone truly special feel appreciated, adored, and cherished.

---

## ✨ Features & Experiences

1. **The Opening Screen Surprise 💌**
   - Heading: *“A Little Something, Just for You…”*
   - Subtitle: *“Some feelings are too beautiful to fit into ordinary words. So, I made this little world just for you.”*
   - 3D luxury blush-pink envelope tied with satin ribbons and embossed gold wax seal.
   - Interactive opening animation: untying ribbons, unfolding flap in 3D, and releasing a burst of floating rose petals and glowing hearts.

2. **Luxury Romantic Greeting Card 📜**
   - Hand-drawn botanical rose motifs, Victorian corner filigree, and layered deckle-edge paper textures.
   - Genuine, heartfelt romantic message:
     - *“To My Favorite Person ❤️”*
     - *“My favorite part of an ordinary day is the thought of you...”*
     - Highlight quote: *“You are someone truly special to me. And if this little card makes you smile, then it has already done its job. 🌹”*
     - Sincere sign-off: *“With love, Someone who thinks you're wonderful. ❤️”*

3. **Interactive Romantic Experiences 💫**
   - **Floating Rose Petals**: GPU-accelerated canvas animation with gentle natural drift, swaying leaves, and reduced-motion support.
   - **Web Audio API Romantic Music Box**: Gentle, warm celesta and piano arpeggios synthesized directly in-browser. Zero external dependencies, never fails or blocks, and respects autoplay policies with an elegant top-right toggle.
   - **Send a Little Love ❤️**: Interactive button with heart burst particle effects, love counter, and sweet confirmation toasts.
   - **Hidden Love Note (“There’s one more thing…”)**: Interactive miniature parchment letter that unfolds smoothly into a handwritten whisper.
   - **Memory Gallery Scrapbook**: Polaroid-style photo keepsakes with botanical illustrations, tape strips, and photo upload support.
   - **Final Surprise Envelope**: Closed rose envelope at page footer that reveals: *“No matter how ordinary today may be, I hope this little gift makes it a little more beautiful. 🌷”*
   - **Replay Surprise & Share**: One-click surprise replay, live in-app personalization modal, and shareable encoded URL generation.

---

## 🎨 Theme & Palette

- **Dusty Rose Pink**: `#C99D9E`, `#A67375`
- **Blush Pink**: `#FDF0F2`, `#F7DCE2`, `#EFA8B0`
- **Deep Cherry Red**: `#6B1626`, `#4A0A17`, `#9E2A44`
- **Soft Ivory & Parchment**: `#FAF6F0`, `#FFFDFB`
- **Champagne Gold Foil**: `#D4AF37`, `#E5C07B`

---

## 🚀 Running Locally

### Option 1: Quick Start (Double Click)
- Double-click `run-dev.bat` to launch the dev server and open your browser at `http://localhost:5173`.
- Double-click `build.bat` to test or generate the production build in `dist/`.

### Option 2: Command Line
```bash
# Start development server
npm run dev
# or
pnpm run dev

# Build for production
npm run build
# or
pnpm run build

# Preview production build
npm run preview
# or
pnpm run preview
```

---

## 💌 Personalizing the Gift Card

You can personalize this gift card in two simple ways:

1. **In the Web App**:
   - Scroll to the bottom and click **“Personalize This Card ✎”**.
   - Edit the recipient's name, sender's name, custom messages, special anniversary date, and memorable inside jokes.
   - Upload personal couple photos directly into the Memory Gallery polaroids.
   - Click **“Copy Shareable Link”** to send your customized version directly to your crush / lover!

2. **In the Codebase**:
   - Open [`src/config.ts`](./src/config.ts) and modify `DEFAULT_CONFIG` with your names, messages, and memories.

---

## 🌐 Free Public Deployment

This website is a zero-dependency static bundle ready to deploy anywhere:

- **Vercel**: Import the GitHub repo and set framework to `Vite`.
- **Netlify**: Drag-and-drop the `dist` folder into Netlify Drop.
- **GitHub Pages**: Build with `npm run build` and deploy the `dist/` directory.

