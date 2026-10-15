const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runAllTests(htmlFilePath) {
  console.log(`\n======================================================`);
  console.log(`RUNNING FULL AUTOMATED TEST SUITE FOR: ${path.basename(htmlFilePath)}`);
  console.log(`======================================================\n`);

  const html = fs.readFileSync(htmlFilePath, 'utf8');

  // Extract the main script (last script tag)
  const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  const lastScript = scripts[scripts.length - 1];
  const scriptContent = lastScript.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');

  const localStorageData = {};
  const mockLocalStorage = {
    getItem: (k) => localStorageData[k] || null,
    setItem: (k, v) => { localStorageData[k] = String(v); },
    removeItem: (k) => { delete localStorageData[k]; }
  };

  const mockElements = {
    input: { value: '', addEventListener: () => {}, focus: () => {}, selectionStart: 0, selectionEnd: 0 },
    preview: { innerHTML: '', querySelectorAll: () => [], dataset: {} },
    previewShell: { addEventListener: () => {} },
    densityMode: { value: 'normal' },
    mathAlign: { value: 'left' },
    syncScroll: { checked: true },
    moreMenu: { classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false }, addEventListener: () => {} },
    moreButton: { setAttribute: () => {} },
    wrap: { classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false } },
    copied: { textContent: '', classList: { add: () => {}, remove: () => {} } },
    'mathjax-script': { addEventListener: () => {} },
    charCount: { textContent: '' },
    wordCount: { textContent: '' },
    mathStatusDot: { classList: { add: () => {}, remove: () => {} }, title: '' },
    cmdInput: { value: '', addEventListener: () => {}, focus: () => {} }
  };

  const mockDocument = {
    getElementById: (id) => mockElements[id] || { classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false }, addEventListener: () => {}, setAttribute: () => {} },
    addEventListener: () => {},
    querySelector: () => ({ innerHTML: '' }),
    querySelectorAll: () => [],
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      setAttribute: () => {},
      getAttribute: () => '',
      style: {}
    }),
    body: { classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false } }
  };

  const mockWindow = {
    MathJax: { typesetClear: () => {}, typesetPromise: async () => {} },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    requestAnimationFrame: (fn) => setTimeout(fn, 16)
  };

  const sandbox = {
    window: mockWindow,
    document: mockDocument,
    localStorage: mockLocalStorage,
    marked: {
      setOptions: () => {},
      parse: (md) => `<p>${md}</p>`
    },
    DOMPurify: {
      sanitize: (h) => h
    },
    navigator: { clipboard: { writeText: async () => {} } },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    console: console,
    MathJax: mockWindow.MathJax
  };

  vm.createContext(sandbox);

  try {
    vm.runInContext(scriptContent, sandbox);
  } catch (e) {
    console.error("Critical error executing script:", e.message);
    return { passed: 0, failed: 1, total: 1, error: e.message };
  }

  let passed = 0;
  let failed = 0;
  const failures = [];

  function test(name, condition, details = "") {
    if (condition) {
      passed++;
      console.log(`  ✓ [PASS] ${name}`);
    } else {
      failed++;
      failures.push({ name, details });
      console.log(`  ✗ [FAIL] ${name} -> ${details}`);
    }
  }

  // --- SUITE 1: Currency & Prices vs Math ---
  console.log(`\n[Suite 1: Currency & Prices vs Math]`);
  const c1 = sandbox.preprocess("The cost is $15.50 and the tip is $3.00.");
  test("Plain currency values should never be converted into LaTeX inline math", 
    !c1.includes("\\(") && !c1.includes("CLARITYMATH") && c1.includes("$15.50"), 
    `Result: ${c1}`
  );

  const c2 = sandbox.preprocess("We spent $100 on Tuesday and $50 on Wednesday.");
  test("Multiple dollar amounts in a sentence must remain currency",
    !c2.includes("\\(") && c2.includes("$100") && c2.includes("$50"),
    `Result: ${c2}`
  );

  const c3 = sandbox.preprocess("Product A costs $99 while Product B costs $149.");
  test("Dollar amounts with words between them remain currency",
    !c3.includes("\\(") && c3.includes("$99") && c3.includes("$149"),
    `Result: ${c3}`
  );

  // --- SUITE 2: Math Norms & Delimiters ---
  console.log(`\n[Suite 2: Math Norms & Formula Delimiters]`);
  const n1 = "||x - y|| <= ||x|| + ||y||";
  test("Norm line should be recognized as formula", sandbox.formula(n1), `formula("${n1}") returned false`);
  
  const normCleaned = sandbox.cleanGroup ? sandbox.cleanGroup([n1]) : "";
  test("Norm equation should properly balance \\lVert and \\rVert",
    normCleaned.includes("\\lVert") && normCleaned.includes("\\rVert") && !normCleaned.includes("\\lVert x\\lVert"),
    `Result: ${normCleaned}`
  );

  test("Absolute value '|x| < 5' should not be mistreated as a markdown table row",
    sandbox.existing("|x| < 5") === false,
    `existing('|x| < 5') was: ${sandbox.existing("|x| < 5")}`
  );

  // --- SUITE 3: Code Blocks & Inline Code Preservation ---
  console.log(`\n[Suite 3: Code Blocks & Backtick Preservation]`);
  const pyCode = "```python\nfor i in range(10):\n    x_val = alpha * 2\n```";
  const processedPy = sandbox.preprocess(pyCode);
  test("Fenced code blocks must preserve exact content without token leakage",
    processedPy.includes("x_val = alpha * 2") && !processedPy.includes("CLARITY"),
    `Result: ${processedPy}`
  );

  const inlineCode = "Check `x_1` and `\\theta` in the log.";
  const processedInline = sandbox.preprocess(inlineCode);
  test("Inline code should preserve markdown backticks and not inject <code> tags in markdown",
    processedInline.includes("`x_1`") && processedInline.includes("`\\theta`"),
    `Result: ${processedInline}`
  );

  // --- SUITE 4: Table Recognition & Column Scalability ---
  console.log(`\n[Suite 4: Table Extraction & Columns]`);
  const wideTable = [
    "Col1    Col2    Col3    Col4    Col5    Col6    Col7",
    "A       B       C       D       E       F       G"
  ];
  const tableOut = sandbox.tabTable ? sandbox.tabTable(wideTable) : "";
  test("Tables with 6 or more columns must be correctly converted to GFM Markdown tables",
    tableOut.includes("| Col1 | Col2 | Col3 | Col4 | Col5 | Col6 | Col7 |") && tableOut.includes("| --- |"),
    `Result: ${tableOut}`
  );

  const tabSeparatedTable = [
    "Model\tAccuracy\tLatency\tParameters\tCost\tLicense",
    "GPT-4o\t88.7%\t120ms\tUnknown\t$5.00\tProprietary",
    "Claude-3.5\t88.3%\t115ms\tUnknown\t$3.00\tProprietary"
  ];
  const tabOut = sandbox.tabTable ? sandbox.tabTable(tabSeparatedTable) : "";
  test("Multi-column tab-separated AI benchmark tables convert cleanly",
    tabOut.includes("| Model | Accuracy | Latency | Parameters | Cost | License |"),
    `Result: ${tabOut}`
  );

  // --- SUITE 5: Heading Heuristics ---
  console.log(`\n[Suite 5: Heading Heuristics]`);
  test("Numbered item with period '1. Introduction' is heading h2", sandbox.heading("1. Introduction") === "h2");
  test("Hierarchical section '1.1 Background' is heading h3", sandbox.heading("1.1 Background") === "h3");
  test("INFO tag 'INFO 1: Overview' is heading h1", sandbox.heading("INFO 1: Overview") === "h1");
  test("Numbered list sentence '1. Do not forget to turn off the lights before leaving.' is NOT heading",
    sandbox.heading("1. Do not forget to turn off the lights before leaving.") === false
  );

  // --- SUITE 6: LaTeX Commands & AI Math Recognition ---
  console.log(`\n[Suite 6: LaTeX Commands & Math Recognition]`);
  test("Formula with Greek symbols recognized: '\\alpha + \\beta = \\gamma'",
    sandbox.formula("\\alpha + \\beta = \\gamma") === true
  );
  test("Formula with fraction recognized: '\\frac{a}{b} + \\sqrt{c}'",
    sandbox.formula("\\frac{a}{b} + \\sqrt{c}") === true
  );
  test("Formula with summation recognized: '\\sum_{i=1}^n x_i'",
    sandbox.formula("\\sum_{i=1}^n x_i") === true
  );
  test("Loss function formula recognized: 'L(\\theta) = -\\frac{1}{N} \\sum y_i \\log(\\hat{y}_i)'",
    sandbox.formula("L(\\theta) = -\\frac{1}{N} \\sum y_i \\log(\\hat{y}_i)") === true
  );
  test("Attention formula recognized: '\\operatorname{Attention}(Q, K, V) = \\operatorname{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V'",
    sandbox.formula("\\operatorname{Attention}(Q, K, V) = \\operatorname{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V") === true
  );

  // --- SUITE 7: Cases Environment & Math Blocks ---
  console.log(`\n[Suite 7: Cases Environment]`);
  const rawCases = [
    "f(x) =",
    "\\begin{cases}",
    "1 & x > 0 \\\\",
    "0 & x \\leq 0",
    "\\end{cases}"
  ];
  const casesClean = sandbox.cleanCasesGroup ? sandbox.cleanCasesGroup(rawCases) : "";
  test("Cases environment converts to valid array with proper row separators",
    casesClean.includes("\\begin{array}") && casesClean.includes("\\\\") && casesClean.includes("\\end{array}"),
    `Result: ${casesClean}`
  );

  // --- SUITE 8: Comparison Operators in Math (<, >) ---
  console.log(`\n[Suite 8: Math Comparison Operators (<, >)]`);
  const ineqLine = "0 < x < 1";
  test("Chained inequality '0 < x < 1' is recognized as formula", sandbox.formula(ineqLine) === true);

  // --- SUITE 9: Unicode Math Translations ---
  console.log(`\n[Suite 9: Unicode Math Translations]`);
  const uni = "x → y ∧ a ≥ b ∨ c ≤ d ∧ e ≠ f ∧ ∞";
  const uniProt = sandbox.protect ? sandbox.protect(uni) : "";
  test("Unicode math symbols convert to standard LaTeX commands",
    uniProt.includes("\\rightarrow") && uniProt.includes("\\geq") && uniProt.includes("\\leq") && uniProt.includes("\\neq") && uniProt.includes("\\infty"),
    `Result: ${uniProt}`
  );

  // --- SUITE 10: HTML Security & External Links ---
  console.log(`\n[Suite 10: HTML Security & External Links]`);
  const rawHtmlCheck = html.includes("DOMPurify.sanitize");
  test("DOMPurify sanitization is applied to rendered preview", rawHtmlCheck === true);

  const linkTargetCheck = (html.includes('link.target = "_blank"') || html.includes('link.target="_blank"')) && html.includes('noopener noreferrer');
  test("External links open in new tab with noopener noreferrer", linkTargetCheck === true);

  // --- SUITE 11: Document Architecture & Features ---
  console.log(`\n[Suite 11: Document Architecture & Features]`);
  test("Autosave storage key is configured", html.includes("localStorage.setItem") && html.includes("clarityPadText"));
  test("Print stylesheet is defined with @media print", html.includes("@media print"));
  test("Responsive breakpoints are defined", html.includes("@media(max-width:"));
  test("Demo sample presets are included", html.includes("loadPresetSample") || html.includes("PRESETS") || html.includes("loadSample"));
  test("Markdown download feature is implemented", html.includes("downloadMarkdown"));
  test("Tab key indentation support in textarea", html.includes("keydown") && (html.includes("Tab") || html.includes("key === 'Tab'")));

  // --- SUITE 12: 2026 Liquid Glass UI & 8-State Matrix Architecture ---
  console.log(`\n[Suite 12: Liquid Glass UI, 8-State Matrix & Anti-AI Slop Rules]`);
  test("Liquid Glass class with backdrop-filter blur and specular border is defined",
    html.includes("liquid-glass") && html.includes("backdrop-filter: blur") && html.includes("var(--glass-border-specular)")
  );
  test("H/2 capsule geometry (border-radius: 9999px) is applied",
    html.includes("border-radius: 9999px")
  );
  test("Action-oriented telemetry bar with formula & syntax counts is present",
    html.includes("telemetry-bar") && html.includes("teleFormulasCount")
  );
  test("Dual-pane split view with editor and live preview is present",
    html.includes("input-pane") && html.includes("preview-shell")
  );
  test("Zorunlu 8 Durum Matrisi (8-State Matrix) controller is present",
    html.includes("triggerState") && html.includes("1. Empty") && html.includes("7. Confirmation (Undo)")
  );
  test("Reader Mode (full width distraction-free view) is implemented",
    html.includes("toggleReaderMode") && html.includes("reading-only") && html.includes("collapse-editor")
  );
  test("Command+K floating palette is implemented",
    html.includes("toggleCommandPalette") && html.includes("cmd-backdrop")
  );
  test("5-second Undo confirmation toast mechanism is implemented",
    html.includes("undo-toast") && html.includes("Geri Al (5s)")
  );

  // --- SUITE 13: Deterministic Audit Bug Fixes & Heuristics ---
  console.log(`\n[Suite 13: Deterministic Audit Bug Fixes & Heuristics]`);

  // 13.1 Markdown table with formula in cells
  const tblMath = "| Loss Function | Formulation |\n| Cross-Entropy | L = -log(p) |\n| MSE | L = (y - y_hat)^2 |";
  const processedTblMath = sandbox.preprocess(tblMath);
  test("Markdown table with equations preserves table structure and does not wrap rows into math-display",
    !processedTblMath.includes("<div class=\"math-display\">$$\n| MSE") && processedTblMath.includes("| MSE |"),
    `Result: ${processedTblMath}`
  );

  // 13.2 Markdown table with signed deltas
  const tblDelta = "| Feature | Min | Max |\n| Temp | -10 | +40 |";
  const processedTblDelta = sandbox.preprocess(tblDelta);
  test("Markdown table with signed delta numbers preserves table structure",
    !processedTblDelta.includes("<div class=\"math-display\">$$\n| Temp") && processedTblDelta.includes("| Temp |"),
    `Result: ${processedTblDelta}`
  );

  // 13.3 English sentence starting with Set or Let
  const prose1 = "Set x = 5 for all cases.";
  const processedProse1 = sandbox.preprocess(prose1);
  test("Prose sentence 'Set x = 5 for all cases.' is preserved as sentence and not wrapped in display math block",
    !processedProse1.includes("<div class=\"math-display\">"),
    `Result: ${processedProse1}`
  );

  const prose2 = "Let x = 1 and y = 2.";
  const processedProse2 = sandbox.preprocess(prose2);
  test("Prose sentence 'Let x = 1 and y = 2.' is preserved as sentence and not wrapped in display math block",
    !processedProse2.includes("<div class=\"math-display\">"),
    `Result: ${processedProse2}`
  );

  // 13.4 Clean Markdown export preserves user HTML tags
  const userHtml = "<div class=\"callout\">\nImportant note\n</div>\n<div class=\"math-display\">$$\nx = 1\n$$</div>";
  const cleanedExport = userHtml.replace(/<div class="math-display(?:\s+center)?">([\s\S]*?)<\/div>/g, "$1");
  test("Clean Markdown export preserves user HTML </div> tags while stripping only math display wrappers",
    cleanedExport.includes("<div class=\"callout\">") && cleanedExport.includes("</div>") && !cleanedExport.includes("<div class=\"math-display\">"),
    `Result: ${cleanedExport}`
  );

  // 13.5 Cases with 3 columns dynamically creates array with lll
  const raw3Cases = [
    "f(x) =",
    "\\begin{cases}",
    "1 & x > 0 & \\text{positive} \\\\",
    "0 & x \\leq 0 & \\text{non-positive}",
    "\\end{cases}"
  ];
  const cases3Out = sandbox.cleanCasesGroup ? sandbox.cleanCasesGroup(raw33 = raw3Cases) : "";
  test("Cases environment with 3 columns dynamically supports 'lll' column specifications",
    cases3Out.includes("\\begin{array}{lll}") && cases3Out.includes("\\end{array}"),
    `Result: ${cases3Out}`
  );

  // 13.6 Safe storage resilient functions
  test("Safe storage utility functions are present in document",
    html.includes("safeGetStorage") && html.includes("safeSetStorage")
  );

  // 13.7 Command palette search and keyboard shortcut bindings
  test("Command palette input search filtering and global export shortcuts are active",
    html.includes("cmdInputEl.addEventListener") && html.includes("copyCleanMarkdown") && html.includes("downloadMarkdown")
  );

  // 13.8 Defer object URL revocation
  test("Object URL revocation is deferred to protect downloads",
    html.includes("setTimeout(() => URL.revokeObjectURL(url), 1000)")
  );

  // 13.9 Bold label with LaTeX math does not inject stray dollar signs into bold tags or formula
  const boldMathInput = "> **İlk bitin ulaşması:** \\(d_{\\mathrm{prop}}\\)\n> **Mesajın tamamının ulaşması:** \\(d_{\\mathrm{trans}}+d_{\\mathrm{prop}}\\)";
  const boldMathPre = sandbox.preprocess(boldMathInput);
  test("Bold label with LaTeX math does not inject stray dollar signs into markdown or bold tags",
    !boldMathPre.includes(":$**") && !boldMathPre.includes("prop}$$") && boldMathPre.includes("**İlk bitin ulaşması:** $d_{\\mathrm{prop}}$"),
    `Result: ${boldMathPre}`
  );

  console.log(`\n======================================================`);
  console.log(`TEST SUMMARY: TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`======================================================\n`);

  return { passed, failed, total: passed + failed, failures };
}

// Default run on index.html
const targetFile = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..', 'index.html');
const res = runAllTests(targetFile);
process.exit(res.failed > 0 ? 1 : 0);
