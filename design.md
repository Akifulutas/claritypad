# ClarityPad Design System Specification (design.md)
*Version: 2026.1 — Universal UX, Liquid Glass UI & Anti-AI Slop Architectural Foundations for AI Outputs*

---

## 1. Philosophy and Anti-AI Slop Design Laws

Default outputs from modern Large Language Models (ChatGPT, Claude, Gemini, DeepSeek, etc.) routinely assign equal visual weight to every element, mangle formulas, shatter markdown tables, and avoid visual hierarchy ("AI slop").

ClarityPad transforms these raw, disjointed technical outputs into a **publication-grade, human-crafted notebook** based on four foundational laws:

1. **Action-Oriented Information Architecture**:
   - Rather than passive statistics ("Total 31 items"), provide state-driven feedback addressing the user's immediate job-to-be-done:
     *"14 Formulas Compiled, 0 Syntax Errors, 2 Tables Formatted • Clean Markdown Ready to Copy"*.
2. **Zero-Touch AI Preprocessing**:
   - The instant raw text is pasted—without requiring extra clicks, prompts, or configuration toggles—bare LaTeX commands (`\alpha`, `\frac`, `\sum`), norms (`||x||`), piecewise environments (`\begin{cases}`), and currency amounts (`$15.50`) are automatically parsed and repaired.
3. **Consistency and Singular Behavior Rule**:
   - Singular, unambiguous action nomenclature across the entire application: "Format", "Copy", "Download", "Reader Mode". Never alternate between disjointed synonyms for identical actions.
4. **The Double-Nesting Prohibition**:
   - Only 4 atomic building blocks: **Card**, **Text / Link**, **Visual / Media**, and **Input**.
   - A bordered card nested inside another bordered card ("padding on top of padding") is strictly forbidden. Visual grouping is achieved strictly through deliberate whitespace and subtle 1px specular dividers.

---

## 2. Liquid Glass UI & Material Physics Rules

Inspired by Apple macOS Sequoia and visionOS, the Liquid Glass design system is governed by three mathematical and optical rules:

### Rule 1: $H / 2$ Capsule Geometry
All interactive buttons, status badges, and filter capsules have a corner radius ($r$) exactly equal to half their height:
$$r = \frac{h}{2}$$
- `h = 28px` $\rightarrow$ `border-radius: 14px`
- `h = 36px` $\rightarrow$ `border-radius: 18px`
- `h = 44px` $\rightarrow$ `border-radius: 22px`
- Panels & App Windows: Fixed `20px` or `24px` continuous curvature (squircle).

### Rule 2: Refraction, Frost, and Specular Border Glow
- **Ultra-Thin Material Physics**:
  ```css
  background: rgba(255, 255, 255, 0.74); /* Light */
  background: rgba(22, 22, 26, 0.72);    /* Dark */
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  ```
- **1px Specular Border Glow**:
  Simulates physical light refracting across the top and left bevel of glass panels:
  ```css
  border: 1px solid var(--glass-border);
  box-shadow:
    inset 0 1px 1px 0 var(--glass-border-specular),
    var(--shadow-ambient);
  ```

### Rule 3: Dynamic Expanding Containers (Hug Contents & Spring Physics)
```css
transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
```

---

## 3. Color Palette & Design Tokens

```css
:root {
  --bg-canvas: #f4f4f7;
  --glass-surface: rgba(255, 255, 255, 0.74);
  --glass-surface-raised: rgba(255, 255, 255, 0.90);
  --glass-panel: rgba(255, 255, 255, 0.60);
  --glass-input: rgba(255, 255, 255, 0.98);

  --glass-border: rgba(0, 0, 0, 0.08);
  --glass-border-specular: rgba(255, 255, 255, 0.85);
  --glass-border-strong: rgba(0, 0, 0, 0.16);

  --text-primary: #121214;
  --text-secondary: #58585e;
  --text-tertiary: #8a8a92;

  --accent: #0071e3;
  --accent-hover: #0062c4;
  --accent-glow: rgba(0, 113, 227, 0.22);
  --accent-gradient: linear-gradient(135deg, #0071e3 0%, #af52de 100%);

  --status-success: #34c759;
  --status-success-bg: rgba(52, 199, 89, 0.12);
  --status-warning: #ff9500;
  --status-warning-bg: rgba(255, 149, 0, 0.12);
  --status-error: #ff3b30;
  --status-error-bg: rgba(255, 59, 48, 0.12);

  --shadow-ambient: 0 16px 48px -4px rgba(0, 0, 0, 0.07);
  --shadow-floating: 0 24px 60px -8px rgba(0, 0, 0, 0.14);
}

.dark {
  --bg-canvas: #09090b;
  --glass-surface: rgba(22, 22, 26, 0.74);
  --glass-surface-raised: rgba(30, 30, 36, 0.88);
  --glass-panel: rgba(18, 18, 22, 0.60);
  --glass-input: rgba(16, 16, 18, 0.98);

  --glass-border: rgba(255, 255, 255, 0.11);
  --glass-border-specular: rgba(255, 255, 255, 0.22);
  --glass-border-strong: rgba(255, 255, 255, 0.24);

  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --text-tertiary: #6b6b72;

  --accent: #0a84ff;
  --accent-hover: #409cff;
  --accent-glow: rgba(10, 132, 255, 0.30);

  --shadow-ambient: 0 16px 48px -4px rgba(0, 0, 0, 0.45);
  --shadow-floating: 0 24px 60px -8px rgba(0, 0, 0, 0.65);
}
```

---

## 4. Typography Scale (macOS 13pt Desktop Standard)

- **Base UI (Body)**: **13pt (13px)** / line-height: 1.55 / weight: 450
- **Editor Text**: 14px / line-height: 1.65 / `ui-monospace`
- **Rendered Reading**: 16px / line-height: 1.70
- **Headers**:
  - `Hero Display`: 40px / line-height: 1.15 / tracking: -0.035em / weight: 800
  - `Preview H1`: 30px / line-height: 1.20 / weight: 750
  - `Preview H2`: 22px / line-height: 1.25 / weight: 700
  - `Preview H3`: 17px / line-height: 1.35 / weight: 650

---

## 5. The 8-State Matrix — Tailored for AI Outputs

| State | Design & Behavioral Rule | ClarityPad AI Notebook Implementation |
| :--- | :--- | :--- |
| **1. Empty** | Minimalist focused greeting and onboarding state. | *"Paste output from ChatGPT, Claude, Gemini, or load a preset sample."* |
| **2. Loading** | Real-time live compilation & save state. | Debounced amber status dot indicator (`saving` / `rendering`). |
| **3. Success** | Emerald status badge and formula counter. | `● All Formulas Compiled Cleanly (14 Formulas)` |
| **4. Error** | Actionable LaTeX syntax error badge and hints. | Red status dot warning and `2 Formula Syntax Errors (Review)`. |
| **5. No Results** | Search / filter empty state. | Suggestion to clear search filter when no matched query exists in document. |
| **6. Disabled** | Micro-hint when editing is locked. | Read-only lock indicator when full-width Reader Mode is engaged. |
| **7. Confirmation** | 5-second non-blocking Undo window for destructive actions. | **5-Second "Undo (5s)"** floating toast notification when note is cleared. |
| **8. Recovery** | Resilient session recovery across disruptions. | Automatic instant restoration of last session from `localStorage`. |

---

## 6. AI Reasoning, Admonitions & Math Interaction Components

### 6.1 AI Chain of Thought (`.think-card`)
- Used for raw `<think>...</think>` reasoning outputs (DeepSeek-R1, OpenAI o1, Claude 3.7 Sonnet).
- Optical token: `background: rgba(147, 51, 234, 0.04)` (Dark: `rgba(168, 85, 247, 0.07)`), border `1px solid rgba(147, 51, 234, 0.18)`.
- Collapsible interactive `<details open>` with `<summary class="think-summary">` header and purple capsule badge.
- Inner text italicized with 1.65 line-height and math delimiters preserved.

### 6.2 GitHub / AI Admonitions (`.callout`)
- Parses `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, and `> [!CAUTION]`.
- 4px vertical accent stripe on left edge with color-coded typography and emoji icons.
- Avoids double-nesting by styling markdown `blockquote` elements directly into Liquid Glass cards.

### 6.3 Formula Copy & Math Actions (`.math-copy-btn`)
- Every `.math-display` element stores the unparsed, pristine LaTeX equation in `data-tex`.
- On cursor hover, a smooth $H/2$ capsule button floats at the top-right corner (`opacity: 1`, `z-index: 5`), providing 1-click clipboard copy of raw LaTeX.

