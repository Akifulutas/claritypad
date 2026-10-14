# ClarityPad 🖋️📐

> **The Apple-grade Math & Markdown Notebook for AI Outputs (ChatGPT, Claude, Gemini, DeepSeek).**  
> Automatically repairs, normalizes, and renders messy AI formulas, code, and tables into publication-quality notes with live preview and one-click export.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-success.svg)](#features)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Local-purple.svg)](#privacy)

---

## 🌟 The Problem ClarityPad Solves

When copying technical explanations, mathematical derivations, or benchmark tables from modern Large Language Models (**ChatGPT**, **Claude**, **Gemini**, **DeepSeek**, etc.):

1. **Broken Delimiters**: AI models use inconsistent math delimiters — sometimes `\[...\]`, `\(...\)`, `$$...$$`, `$..$`, or bare raw LaTeX (`\frac{a}{b}`, `\alpha + \beta = \gamma`) with **no delimiters at all**.
2. **Notes App Incompatibility**: Pasting this into **Apple Notes**, **Notion**, **Obsidian**, or **Slack** results in raw, unreadable TeX junk, mangled brackets, and broken symbols.
3. **Mangled Tables**: Tables copied from AI responses often paste as tab-separated or space-aligned plain text rather than valid Markdown tables.
4. **Equation Derivations & Piecewise Cases**: Multi-line equations and `\begin{cases}` environments break across lines or fail to align properly.

**ClarityPad is designed to be the ultimate drop-in clipboard companion for AI outputs.** Paste anything into the editor; ClarityPad’s intelligent preprocessing engine automatically detects, repairs, and renders it in real time.

---

## ✨ Key Features

- 🧠 **Smart AI Math Auto-Detection**:
  - Automatically wraps bare LaTeX commands (`\alpha`, `\frac`, `\sum`, `\int`, `\operatorname{softmax}`, etc.) in proper math blocks.
  - Balances norms `||x - y|| <= ||x|| + ||y||` into proper `\lVert` and `\rVert` notation.
  - Intelligently separates currency prices (`$15.50 and $3.00`) from inline math formulas.
  - Formats piecewise `\begin{cases}` into clean LaTeX arrays.
  - Translates unicode mathematical symbols (`→`, `←`, `≥`, `≤`, `≠`, `≈`, `∞`, `·`, `×`) into standard TeX.
- 📊 **Table Auto-Converter**:
  - Converts tab-separated or multi-space column data (from 2 to 50+ columns) directly into GFM Markdown tables.
- 🍏 **Apple-Grade Aesthetic**:
  - macOS Sonoma/Ventura glassmorphism styling, SF Pro typography, and polished micro-interactions.
  - Light and Dark modes with automatic OS system preference detection (`prefers-color-scheme`).
- ⚡ **Dual-Pane Synchronized Scrolling**:
  - Smooth, jitter-free scroll synchronization between the Markdown editor and preview pane.
- 📖 **Reader Mode**:
  - One-click collapse of the editor for a full-width, distraction-free reading experience.
- ⌨️ **Developer-Friendly Keyboard Shortcuts**:
  - `Tab`: Indent 2 spaces (Shift+Tab unindents).
  - `Cmd / Ctrl + S`: Instant manual save confirmation.
  - `Cmd / Ctrl + Enter`: Force re-render preview.
  - `Cmd / Ctrl + E`: Toggle Reader Mode.
  - `Cmd / Ctrl + B`: Wrap selection in `**bold**`.
  - `Cmd / Ctrl + I`: Wrap selection in `*italic*`.
  - `Cmd / Ctrl + M`: Wrap selection in `$math$`.
- 📋 **Code Snippets with Syntax Header & One-Click Copy**:
  - Code blocks include a language indicator badge and an instant "Copy" button.
- 📤 **One-Click Exports**:
  - **Copy Cleaned Markdown**: Exports standard, cleaned GitHub Flavored Markdown with proper `$$` and `$` delimiters.
  - **Download Markdown (`.md`)**: Save the note directly to your filesystem.
  - **Copy Preview HTML**: Copy the rendered HTML markup.
  - **Download Standalone HTML**: Exports an offline HTML file with embedded styling and MathJax.
  - **Print / PDF**: Custom print stylesheet hides editor controls and formats the preview for paper/PDF.
- 🔒 **100% Private & Local**:
  - Zero server calls, zero telemetry. All text is stored locally in your browser's `localStorage`.

---

## 🚀 Quick Start

### Option 1: Live Demo (GitHub Pages)
Visit your published GitHub Pages deployment: **`https://akifulutas.github.io/claritypad`**

### Option 2: Run Locally (Zero Setup)
No build tools, bundlers, or servers required!
1. Clone this repository:
   ```bash
   git clone https://github.com/Akifulutas/claritypad.git
   cd claritypad
   ```
2. Double-click `index.html` to open it in any modern browser (Safari, Chrome, Arc, Firefox, Edge).

---

## 🧪 Automated Test Suite

ClarityPad includes an automated test harness with **30 comprehensive tests** testing edge cases in AI outputs, formula detection, table formatting, security, and responsive layouts.

To run the test suite:

```bash
# Using npm
npm test

# Or directly with Node.js
node tests/test_claritypad.js
```

### Test Coverage Highlights:
- **Suite 1: Currency vs Math** — Prevents `$10 ... $5` from becoming broken math.
- **Suite 2: Math Norms & Formula Delimiters** — Ensures `||x||` balances `\lVert` and `\rVert`.
- **Suite 3: Code Blocks & Inline Code** — Ensures backticks and fenced code blocks remain untouched.
- **Suite 4: Table Recognition & Scalability** — Supports wide benchmark tables with 6+ columns.
- **Suite 5: Heading Heuristics** — Differentiates numbered headings (`1. Introduction`) from lists (`1. Turn off lights.`).
- **Suite 6: LaTeX & Deep Learning Vocabulary** — Supports Attention, Loss functions, Softmax, matrices, etc.
- **Suite 7: Piecewise Cases** — Cleans and aligns `\begin{cases}`.
- **Suite 8: Comparison Operators** — Preserves `<` and `>` without HTML/DOMPurify stripping.
- **Suite 9: Unicode Math Translations** — Converts unicode arrows, inequalities, and dots.
- **Suite 10: Security & XSS** — Verifies DOMPurify sanitization and `rel="noopener noreferrer"`.
- **Suite 11: Architecture & Shortcuts** — Tests autosave, print styles, and Tab key indentation.

---

## 📂 Project Structure

```
claritypad/
├── .github/
│   └── workflows/
│       └── test.yml          # GitHub Actions CI workflow (Node 18, 20, 22)
├── tests/
│   └── test_claritypad.js    # Automated 30-assertion test suite
├── .gitignore                # Git ignore configuration
├── claritypad-release-v4.html# Backwards-compatible release file
├── index.html                # Main application file (GitHub Pages ready)
├── LICENSE                   # MIT License
├── package.json              # NPM metadata & test script
└── README.md                 # Documentation
```

---

## 💡 Keyboard Shortcuts Cheatsheet

| Shortcut | Action |
| :--- | :--- |
| `Tab` | Indent line / selection by 2 spaces |
| `Shift + Tab` | Unindent line / selection by 2 spaces |
| `Cmd / Ctrl + S` | Save note immediately with toast confirmation |
| `Cmd / Ctrl + Enter` | Force refresh preview |
| `Cmd / Ctrl + E` | Toggle Reader Mode (hide/show input editor) |
| `Cmd / Ctrl + B` | Wrap selected text in `**bold**` |
| `Cmd / Ctrl + I` | Wrap selected text in `*italic*` |
| `Cmd / Ctrl + M` | Wrap selected text in `$math$` |
| `Esc` | Close dropdown menus |

---

## 🤝 Contributing

Contributions, feedback, and suggestions for additional AI output formats are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Run the tests (`npm test`)
4. Commit your Changes (`git commit -m 'Add AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
