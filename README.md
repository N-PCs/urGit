
# urGit - Level Up Your GitHub Profile

**urGit** is a professional, open-source tool designed to help developers create stunning GitHub profile READMEs in seconds.

## Features

- **Real-time Builder** — See changes as you type with a live preview.
- **Handcrafted Templates** — 9 unique layouts ranging from minimalist to data-heavy.
- **Open-source Themes** — 8 beautiful color schemes including Dracula, Nord, and Cyberpunk.
- **Responsive Design** — Build your profile on any device.
- **Markdown Export** — One-click copy to clipboard.
- **GitHub Stats Integration** — Effortlessly add stats widgets, streaks, trophies, and language stats.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/N-PCs/urGit.git
cd urGit
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## How to Use

1. Choose a **Template** from the collection.
2. Go to the **Builder** and fill in your professional details.
3. Select a **Theme** that matches your aesthetic.
4. Preview the output in the real-time window.
5. Click **Copy Markdown** and paste it into your GitHub profile repository (`username/username`).

## Project Structure

```
urGit/
├── components/
│   ├── templates/        # 9 profile templates
│   ├── GithubMarkdownPreview.tsx
│   ├── TemplatePreviews.tsx
│   ├── ThemeToggle.tsx
│   └── LoadingScreen.tsx
├── hooks/
│   └── useProfile.ts
├── services/
│   ├── githubService.ts
│   └── markdownGenerator.ts
├── constants.tsx         # Themes, templates, skill options
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main application component
└── index.tsx             # Entry point
```

## Built With

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- [Lucide Icons](https://lucide.dev/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Vite](https://vitejs.dev/)

## Author

**N-PCs**
- [GitHub](https://github.com/N-PCs)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE.md) for details.

---
*Created with urGit — Take ur profile to another level.*
