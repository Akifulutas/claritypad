# ClarityPad 🖋️📐

> **The Apple-grade Math & Markdown Notebook for AI Outputs (ChatGPT, Claude, Gemini, DeepSeek).**  
> Built with 2026 Liquid Glass UI, Anti-AI Slop design principles, and an automated 48-assertion test suite. Instantly parses, repairs, and renders messy AI formulas, bare LaTeX commands, and mangled tables into publication-quality notes with live preview and one-click export.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design: Liquid Glass](https://img.shields.io/badge/Design-Liquid%20Glass%20UI-blueviolet.svg)](design.md)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-success.svg)](#features)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Local-purple.svg)](#privacy)

---

## 🌟 The Core Mission & Problem ClarityPad Solves

When copying technical explanations, mathematical derivations, or benchmark tables from modern Large Language Models (**ChatGPT**, **Claude**, **Gemini**, **DeepSeek**, etc.):

1. **Broken Delimiters & Bare LaTeX**: AI models frequently output bare LaTeX (`\frac{a}{b}`, `\alpha + \beta = \gamma`, `\operatorname{softmax}`) with **no delimiters at all**, or inconsistent `\[...\]` and `\(...\)` mixes.
2. **Notes App Incompatibility**: Pasting this into **Apple Notes**, **Notion**, **Obsidian**, or **Slack** results in raw, unreadable TeX junk, mangled brackets, and broken symbols.
3. **Mangled Tables**: Tables copied from AI responses often paste as tab-separated or space-aligned plain text rather than valid Markdown tables.
4. **Piecewise Cases & Derivations**: Multi-line equations and `\begin{cases}` environments collapse across lines or fail to align.
5. **Currency False Positives**: Text mentioning multiple prices (`$15.50 and $3.00`) gets corrupted into broken math mode.

**ClarityPad is designed to be the ultimate drop-in clipboard companion for AI outputs.** Paste any AI response into the editor; ClarityPad’s intelligent heuristic engine automatically detects, repairs, and renders it in real time.

---

## ✨ Key Features & 2026 Architectural Innovations

- 💎 **Liquid Glass UI**:
  - Ultra-thin material physics: `backdrop-filter: blur(28px) saturate(190%)` with 1px specular light border glow.
  - Strict $H/2$ capsule geometry (`border-radius: 9999px` on all buttons, badges, and selects).
  - macOS 13pt desktop typography standard for crisp, compact readability.
- 🧠 **Smart AI Math Auto-Detection**:
  - Automatically wraps bare LaTeX commands (`\alpha`, `\frac`, `\sum`, `\int`, `\operatorname{Attention}`, etc.) in proper display math blocks.
  - Balances norms `||x - y|| <= ||x|| + ||y||` into proper `\lVert` and `\rVert` notation.
  - Intelligently isolates currency amounts (`$15.50 and $3.00`) from math formulas.
  - Formats piecewise `\begin{cases}` into clean LaTeX arrays.
  - Translates unicode mathematical symbols (`→`, `←`, `≥`, `≤`, `≠`, `≈`, `∞`, `·`, `×`) into standard TeX.
- 📊 **Table Auto-Converter**:
  - Converts tab-separated or multi-space column data (from 2 to 50+ columns) directly into GFM Markdown tables.
- 📐 **The 8-State Matrix**:
  - Interactive coverage for **Empty**, **Loading**, **Success**, **Error (Actionable LaTeX warning)**, **No Results**, **Disabled**, **Confirmation (5s Undo)**, and **Recovery**.
- ⚡ **Dual-Pane Synchronized Scrolling & Reader Mode**:
  - Smooth, jitter-free scroll synchronization between the Markdown editor and preview pane.
  - One-click collapse of the editor (`Cmd / Ctrl + E`) for full-width reading.
- ⌨️ **Developer-Friendly Keyboard Ergonomics**:
  - `Tab`: Indent 2 spaces (`Shift + Tab` unindents).
  - `Cmd / Ctrl + K`: Floating Command Palette.
  - `Cmd / Ctrl + S`: Instant manual save confirmation.
  - `Cmd / Ctrl + Enter`: Force re-render preview.
  - `Cmd / Ctrl + E`: Toggle Reader Mode.
  - `Cmd / Ctrl + B`: Wrap in `**bold**`.
  - `Cmd / Ctrl + I`: Wrap in `*italic*`.
  - `Cmd / Ctrl + M`: Wrap in `$math$`.
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

ClarityPad includes an automated test harness with **48 comprehensive tests** testing edge cases in AI outputs, formula detection, table formatting, security, responsive layouts, and Liquid Glass design tokens.

To run the test suite:

```bash
# Using npm
npm test

# Or directly with Node.js
node tests/test_claritypad.js
```

### Test Coverage Breakdown (48 Tests):
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
- **Suite 12: Liquid Glass UI & 8-State Matrix** — Verifies material physics, H/2 geometry, telemetry bar, and 5-second Undo confirmation toast.
- **Suite 13: Deterministic Audit Bug Fixes & Heuristics** — Validates math within markdown tables, signed deltas, English prose heuristics ('Set/Let'), preserved user HTML wrappers, 3-column cases environments, safe storage fallback resilience, and bold labels with LaTeX formulas.

---

## 📂 Project Structure

```
claritypad/
├── tests/
│   └── test_claritypad.js    # Automated 48-assertion test suite
├── .gitignore                # Git ignore configuration
├── claritypad-release-v4.html# Synchronized release file
├── design.md                 # Design system specification (Liquid Glass UI tokens)
├── index.html                # Main application file (Zero build)
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
| `Cmd / Ctrl + K` | Open Floating Command Palette |
| `Cmd / Ctrl + S` | Save note immediately with toast confirmation |
| `Cmd / Ctrl + Enter` | Force refresh preview |
| `Cmd / Ctrl + E` | Toggle Reader Mode (hide/show input editor) |
| `Cmd / Ctrl + B` | Wrap selected text in `**bold**` |
| `Cmd / Ctrl + I` | Wrap selected text in `*italic*` |
| `Cmd / Ctrl + M` | Wrap selected text in `$math$` |
| `Esc` | Close dropdown menus and command palette |

---

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
