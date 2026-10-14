# ClarityPad Design System Specification (design.md)
*Version: 2026.1 — Universal UX, Liquid Glass UI & Anti-AI Slop Architectural Foundations for AI Outputs*

---

## 1. Felsefe ve "Anti-AI Slop" Tasarım Yasaları

Yapay zeka araçlarının varsayılan çıktıları (ChatGPT, Claude, Gemini, DeepSeek vb.) genellikle her öğeye eşit görsel ağırlık verir, formülleri bozar, tabloları dağıtır ve hiyerarşi kurmaktan kaçınır ("AI slop").

ClarityPad, yapay zekadan kopyalanan bu ham ve dağınık teknik çıktıları **insan elinden çıkmış, yayın kalitesinde kusursuz bir not defterine** dönüştürmek için şu 4 temel yasaya dayanır:

1. **Aksiyon Odaklı Bilgi Mimarisi**:
   - Pasif sayaçlar yerine, kullanıcının o anki işini çözen durum odaklı geri bildirim:
     *"14 Formül Derlendi, 0 Sözdizimi Hatası, 2 Tablo Biçimlendirildi • Temiz Markdown Kopyalanmaya Hazır"*.
2. **Sıfır Temaslı Ön İşleme (Zero-Touch AI Preprocessing)**:
   - Kullanıcı ham metni yapıştırdığı anda hiçbir ek ayar veya butona basmadan bare LaTeX komutları (`\alpha`, `\frac`, `\sum`), normlar (`||x||`), parçalı fonksiyonlar (`\begin{cases}`) ve para birimleri otomatik olarak ayrıştırılır ve onarılır.
3. **Tutarlılık ve Tekil Davranış Kuralı**:
   - Tekil eylem adlandırmaları: "Biçimlendir", "Kopyala", "İndir", "Okuma Modu". Aynı işlem için farklı terimler kullanılmaz.
4. **İç İçe Kart (Double-Nesting) Yasağı**:
   - Yalnızca 4 atomik yapı taşı: **Kart**, **Metin/Bağlantı**, **Görsel/Medya** ve **Girdi (Input)**.
   - Kart içinde çerçeveli kart (padding üstüne padding) kesinlikle yasaktır. Gruplamalar saf beyaz boşluk (whitespace) ve 1px mikro ayırıcılarla yapılır.

---

## 2. Liquid Glass UI (Sıvı Cam) ve Materyal Fizik Kuralları

Apple macOS Sequoia / visionOS esintili Liquid Glass tasarım sistemi 3 matematiksel kurala dayanır:

### Kural 1: $H / 2$ Kapsül Geometrisi (Capsule Geometry)
Tüm butonlar, durum rozetleri ve filtre kapsüllerinin köşe yarıçapı ($r$), yüksekliklerinin tam yarısıdır:
$$r = \frac{h}{2}$$
- `h = 28px` $\rightarrow$ `border-radius: 14px`
- `h = 36px` $\rightarrow$ `border-radius: 18px`
- `h = 44px` $\rightarrow$ `border-radius: 22px`
- Paneller & Pencereler: Sabit `20px` veya `24px` sürekli eğrilik (squircle).

### Kural 2: Refraction (Kırılma), Frost (Buzlanma) ve Speküler Işıma
- **Ultra-Thin Material**:
  ```css
  background: rgba(255, 255, 255, 0.74); /* Light */
  background: rgba(22, 22, 26, 0.72);    /* Dark */
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  ```
- **1px Speküler Kenar Işıması (Specular Border Glow)**:
  Kartın üst ve sol kenarında ışığın kırıldığı hissini vermek için:
  ```css
  border: 1px solid var(--glass-border);
  box-shadow:
    inset 0 1px 1px 0 var(--glass-border-specular),
    var(--shadow-ambient);
  ```

### Kural 3: Dinamik Genişleyen Konteynerler (Hug Contents & Spring Physics)
```css
transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
```

---

## 3. Renk Paleti ve Tasarım Tokenları

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

## 4. Tipografi Ölçeği (macOS 13pt Standardı)

- **Base UI (Body)**: **13pt (13px)** / line-height: 1.55 / weight: 450
- **Editor Text**: 14px / line-height: 1.65 / `ui-monospace`
- **Rendered Reading**: 16px / line-height: 1.70
- **Headers**:
  - `Hero Display`: 40px / line-height: 1.15 / tracking: -0.035em / weight: 800
  - `Preview H1`: 30px / line-height: 1.20 / weight: 750
  - `Preview H2`: 22px / line-height: 1.25 / weight: 700
  - `Preview H3`: 17px / line-height: 1.35 / weight: 650

---

## 5. Zorunlu 8 Durum Matrisi (The 8-State Matrix) — Yapay Zeka Çıktılarına Özel

| Durum | Tasarım & Davranış Kuralı | ClarityPad AI Not Defteri Karşılığı |
| :--- | :--- | :--- |
| **1. Empty** | Minimalist odaklanmış karşılama ekranı. | *"ChatGPT, Claude, Gemini çıktısını yapıştırın veya bir örnek şablon yükleyin."* |
| **2. Loading** | Anlık canlı derleme durumu. | Debounce sırasında sarı durum noktası (`saving` / `rendering`). |
| **3. Success** | Zümrüt durum rozeti ve formül sayacı. | `● Tüm Formüller Kusursuz Derlendi (14 Formül)` |
| **4. Error** | Eyleme dönüştürülebilir LaTeX sözdizimi hata kartı. | Kırmızı durum noktası ve `2 Formül Sözdizimi Hatası Bulundu` uyarısı. |
| **5. No Results** | Arama / filtre boş durumu. | Belgede eşleşen terim bulunamadığında temizleme önerisi. |
| **6. Disabled** | Düzenleme kilitlendiğinde mikro ipucu. | Okuma modunda salt okunur (read-only) kilit göstergesi. |
| **7. Confirmation** | Yıkıcı işlemlerde 5 saniyelik geri alma (Undo). | Not temizlendiğinde beliren **5 saniyelik "Geri Al (Undo)"** toast bildirimi. |
| **8. Recovery** | Kesintiye uğrayan oturumu kurtarma. | Tarayıcı kapansa bile `localStorage`'dan son notu otomatik geri getirme. |
