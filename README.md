# ClarityPad 🖋️🎙️📐

> **The Apple-grade YouTube Transcript Engine, Zero-Touch Local Recording Watcher & AI Math Notebook.**  
> Built with 2026 Liquid Glass UI, Anti-AI Slop design principles, and an automated 38-assertion test suite. Instantly parses, repairs, and renders messy AI formulas, multi-video playlists, and local voice memos into publication-quality notes with click-to-seek timestamps and one-click export.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design: Liquid Glass](https://img.shields.io/badge/Design-Liquid%20Glass%20UI-blueviolet.svg)](design.md)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-success.svg)](#features)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Local-purple.svg)](#privacy)

---

## 🌟 The Core Mission & Problem ClarityPad Solves

When working with technical lectures, research meetings, and outputs from modern Large Language Models (**ChatGPT**, **Claude**, **Gemini**, **DeepSeek**, etc.):

1. **Passive Dashboards vs Action-Oriented Feedback**: Generic tools show passive counters ("Total 31 videos") instead of immediately actionable telemetry ("29 Successful, 2 Failed Videos -> Retry / Update Cookies").
2. **Manual Ingestion Friction**: Users waste time manually uploading audio files or pasting links one by one. ClarityPad watches your local recording directory (`~/Recordings`) in the background and ingests clipboard playlists with zero clicks.
3. **Broken Delimiters & Apple Notes Incompatibility**: AI models output bare LaTeX (`\frac{a}{b}`, `\operatorname{softmax}`) with no delimiters, causing Apple Notes, Notion, and Slack to render unreadable TeX junk.
4. **Mangled Tables & Pieces**: Multi-column AI benchmark tables and `\begin{cases}` piecewise equations collapse into messy plain text.

---

## ✨ Key Features & 2026 Architectural Innovations

- 🎙️ **Zero-Touch Local Recording Watcher**:
  - Automatically monitors local audio/video folders (`~/Recordings`, Voice Memos, OBS, QuickTime).
  - Background audio ingestion with zero manual clicks and immediate transcript generation.
- ▶️ **31-Item YouTube Batch Transcript Engine**:
  - Full playlist ingestion with actionable error handling (Cookie Fallback for age-restricted or member-only videos).
- 💎 **Liquid Glass UI (Sıvı Cam)**:
  - Strict $H/2$ capsule geometry (`border-radius: 9999px` on all buttons and pills).
  - Ultra-thin material physics: `backdrop-filter: blur(28px) saturate(190%)` with 1px specular light border glow.
  - Asymmetric Hero with two floating live telemetry cards.
- 📐 **Zorunlu 8 Durum Matrisi (The 8-State Matrix)**:
  - Interactive coverage for **Empty**, **Loading**, **Success**, **Error (Actionable Retry)**, **No Results**, **Disabled**, **Confirmation (5s Undo)**, and **Recovery**.
- ⏱️ **Interactive Click-to-Seek Timestamps**:
  - Click any timestamp (`00:14`, `01:05`) to jump to that moment, highlight the sentence, and sync audio scrubbing.
- 🧠 **Smart AI Math Auto-Detection**:
  - Automatically wraps bare LaTeX commands (`\alpha`, `\frac`, `\sum`, `\operatorname{Attention}`, etc.) in proper math blocks.
  - Balances norms `||x - y|| <= ||x|| + ||y||` into proper `\lVert` and `\rVert` notation.
  - Intelligently isolates currency amounts (`$15.50 and $3.00`) from math formulas.
- ⌨️ **macOS Ergonomics & Keyboard Shortcuts**:
  - `Cmd / Ctrl + K`: Floating Command Palette.
  - `Cmd / Ctrl + V`: Zero-touch clipboard ingestion.
  - `Cmd / Ctrl + S`: Instant local save confirmation.
  - `Cmd / Ctrl + Shift + C`: Copy clean GFM Markdown.
  - `Tab` / `Shift + Tab`: Code & note indentation.

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
