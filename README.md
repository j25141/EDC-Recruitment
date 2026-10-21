# Frédéric Mazzella — Interactive Entrepreneur Showcase & Portfolio

An interactive entrepreneurial journey, venture architecture showcase, and shared mobility case study for Frédéric Mazzella (co-founder of BlaBlaCar), styled in the modern engineering aesthetic of [aelradi.engineer](https://aelradi.engineer/).

Prepared for the **EDC JSSUN Technical Team Recruitment 2026** evaluation.

---

## 🚀 Live GitHub Pages Deployment (2 Options)

Because this is a modern **React 19 + Vite + Tailwind CSS + Framer Motion** application, GitHub Pages cannot run the uncompiled `.tsx` files directly from the root `/` folder. It must serve the compiled production build from `./dist`.

### Option A: Automatic Deployment via GitHub Actions (Recommended)

A workflow file has been created for you at `.github/workflows/deploy.yml`.

1. Push your repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, change from *Deploy from a branch* to **GitHub Actions**.
4. GitHub will automatically run the workflow, run `npm run build`, and deploy the site in ~1 minute!
5. Your website will be live at `https://<username>.github.io/<repo-name>/`.

---

### Option B: Deploying the `dist` Folder (Manual / Branch Method)

If you prefer deploying via the `main` or `gh-pages` branch:

1. Build the production files:
   ```bash
   npm run build
   ```
2. The compiled static HTML, CSS, JavaScript, and images are generated inside the `dist/` folder.
3. Deploy the contents of the `dist/` folder using `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```
4. In GitHub repository **Settings** → **Pages**, select the `gh-pages` branch and root `/`.

---

## 🛠️ Tech Stack & Key Features

- **React 19 & TypeScript**: Component-driven architecture with strictly typed data layers.
- **Tailwind CSS v4 & Motion**: Styled in the dark kinetic theme with smooth spring physics.
- **Tubes Cursor Trail**: 5 distinct glowing emerald/mint strands trailing the mouse without merging.
- **Interactive Economics Simulator**: Real-time ridesharing cost sharing and CO₂ avoidance calculator with 4-seat vehicle occupancy visualization.
- **Bento Grid Hero & Ventures**: 4 chronological milestones (2003–2024), D.R.I.V.E. trust framework, and multi-modal transit analysis.
- **15 Viva Questions & 100-Mark Rubric Matrix**: Embedded evaluation companion and pre-flight checklist.

---

## 📑 Research Sources & Attribution

- [BlaBlaCar Official Company Story & Timeline](https://newsroom.blablacar.com/about-us/story)
- [Founders Biography & Roles](https://newsroom.blablacar.com/about-us/founders)
- [Inside Story: Fail, Learn, Succeed](https://newsroom.blablacar.com/inside-story/fail-learn-succeed)
- [Environmental & Carbon Impact Methodology](https://newsroom.blablacar.com/about-us)
- [Multi-Modal Rail Integration Announcement](https://newsroom.blablacar.com/news/blablacar-adds-train-booking-in-spain)

---

## 🤖 AI-Use Disclosure

In accordance with recruitment task guidelines: AI assistance was used to help plan project structure, assist with component architecture and Framer Motion spring physics, and format documentation. All historical dates, co-founder roles, and company claims were cross-referenced with official BlaBlaCar Newsroom records.
