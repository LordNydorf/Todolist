# ⚡ TaskFlow — Sleek & Modern Task Manager

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)

**A high-performance, distraction-free productivity app designed with an Obsidian Dark aesthetic, titanium glassmorphism, and instant local persistence.**

[Features](#-key-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Keyboard Shortcuts](#-keyboard-shortcuts) • [Architecture](#-project-structure)

</div>

---

## 📸 Overview

**TaskFlow** elevates everyday task management with a refined, tactile user interface. Built without bloated UI component libraries, it leverages modern CSS custom properties, smooth micro-interactions, priority tagging, live progress telemetry, and instant search to keep your daily workflow sharp and focused.

---

## ✨ Key Features

- 🌑 **Obsidian & Zinc Dark Aesthetic**: Crafted with deep dark backgrounds (`#09090b`), translucent frosted glass cards, hairline borders, and emerald/cyan accent glows.
- 🎯 **Priority Management**: Color-coded task tags (**High** / **Medium** / **Low**) with visual left-accent borders for instant urgency recognition.
- 📊 **Real-time Progress Telemetry**: Live completion counter, percentage calculation, and dynamic glowing progress bar.
- 🔍 **Instant Search & Filter Tabs**: Filter tasks effortlessly across **All**, **Active**, and **Done** tabs with instant text search.
- ⚡ **Seamless Inline Editing**: Switch any task into active edit mode with pre-filled inputs and cancellation support.
- 📦 **Zero-Friction Persistence**: Automatic browser `localStorage` syncing with backwards-compatible schema upgrades.
- ⌨️ **Keyboard-First Workflow**: Rapid task entry and navigation with intuitive keyboard shortcuts (`Enter` to submit, `Esc` to clear/cancel).
- 📱 **Fully Responsive**: Flawless layout adaptivity across mobile phones, tablets, and ultra-wide displays.
- 🎨 **Custom Brand Favicon**: SVG vector browser icon featuring a high-contrast glowing geometric checkmark.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Core Framework** | [React 18](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling** | Vanilla CSS3 (Custom Design System, Tokens, Glassmorphism) |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Icons** | [FontAwesome 6](https://fontawesome.com/) |
| **Storage** | Browser `localStorage` API |

---

## 🚀 Getting Started

Follow these steps to run TaskFlow locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LordNydorf/Todolist.git
   cd Todolist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>↵ Enter</kbd> | Add new task or save edited task |
| <kbd>Esc</kbd> | Clear input or cancel editing mode |
| <kbd>Tab</kbd> | Navigate between inputs, priority tags, and action buttons |

---

## 📂 Project Structure

```text
Todolist/
├── public/
│   ├── favicon.svg          # Custom vector browser icon
│   └── vite.svg
├── src/
│   ├── assets/              # Static assets & icons
│   ├── components/
│   │   ├── TodoCard.jsx     # Individual task card with checkbox, tags & actions
│   │   ├── TodoInput.jsx    # Input card with priority selector & shortcuts
│   │   └── TodoList.jsx     # Filter tabs, search bar, bulk actions & empty states
│   ├── App.jsx              # Main application root & state management
│   ├── index.css            # Obsidian design system & CSS styling tokens
│   └── main.jsx             # React DOM entry point
├── index.html               # HTML5 shell, web fonts & SEO metadata
├── package.json             # Project dependencies & scripts
├── vite.config.js           # Vite build configuration
└── README.md                # Project documentation
```

---

## 🧭 Roadmap

- [x] Modern Obsidian Dark design system with emerald accents
- [x] Custom SVG browser favicon
- [x] Priority categorization (High / Medium / Low)
- [x] Live search and status filter tabs
- [x] Progress analytics and completion percentage bar
- [ ] Task reordering via Drag & Drop
- [ ] Due dates and reminder tags
- [ ] Export / Import tasks (JSON & CSV)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
