# ClarityPad Design System Specification (design.md)
*Version: 2026.1 — Universal UX, Liquid Glass UI & Anti-AI Slop Architectural Foundations*

---

## 1. Felsefe ve "Anti-AI Slop" Tasarım Yasaları

Yapay zeka üretimi sıradan arayüzler ("AI slop") her öğeye eşit görsel ağırlık verir, her şeyi merkeze hizalar ve hiyerarşi kurmaktan kaçınır. ClarityPad, insan elinden çıkmış üst düzey bir mühendislik ürünü hissi vermek için şu 4 temel yasaya dayanır:

1. **Aksiyon Odaklı Bilgi Mimarisi**:
   - Pasif sayaçlar ("Toplam 31 Video") yasaktır.
   - Durum ve eylem odaklı veriler sunulur: *"29 Başarılı, 2 İndirilemeyen Video (Yeniden Dene), 1 Yerel Klasör Dinleniyor"*.
2. **Sıfır Temaslı Veri Alma (Zero-Touch Ingestion)**:
   - Panodaki YouTube linki veya yerel klasöre bırakılan `.mp4`, `.mp3`, `.m4a`, `.wav` dosyaları kullanıcı tıklamadan algılanır.
   - Güven Arayüzü (Confidence-Based UI): Doğrudan kuyruğa eklenir ve zaman çizelgesinde canlı işleme kartı belirir.
3. **Tutarlılık ve Tekil Davranış Kuralı**:
   - Tekil fiiller: "Transkript Çıkar", "Kopyala", "Dışa Aktar", "Yeniden Dene". Aynı işlem için farklı terimler kullanılmaz.
   - Tekil etkileşim modeli: Detaylar her zaman split view veya modal sheet ile tutarlı açılır.
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
- Paneller & Pencereler: Sabit `22px` veya `26px` sürekli eğrilik (squircle/continuous).

### Kural 2: Refraction (Kırılma), Frost (Buzlanma) ve Speküler Işıma
- **Ultra-Thin Material**:
  ```css
  background: rgba(255, 255, 255, 0.74); /* Light */
  background: rgba(24, 24, 28, 0.72);    /* Dark */
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  ```
- **1px Speküler Kenar Işıması (Specular Border Glow)**:
  Kartın üst ve sol kenarında ışığın kırıldığı hissini vermek için çift katmanlı iç/dış kenarlık:
  ```css
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.35),
    0 12px 36px -4px rgba(0, 0, 0, 0.10);
  ```

### Kural 3: Dinamik Genişleyen Konteynerler (Hug Contents & Spring Physics)
Statik genişlikler yerine içeriğe göre yayılan ve yay animasyonuyla genişleyen konteynerler:
```css
transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
```

---

## 3. Renk Paleti ve Tasarım Tokenları

```css
:root {
  /* Zemin ve Yüzeyler */
  --bg-canvas: #f2f2f6;
  --glass-surface: rgba(255, 255, 255, 0.76);
  --glass-surface-raised: rgba(255, 255, 255, 0.90);
  --glass-panel: rgba(248, 248, 252, 0.65);
  
  /* Kenarlık ve Speküler Parlama */
  --glass-border: rgba(0, 0, 0, 0.08);
  --glass-border-specular: rgba(255, 255, 255, 0.75);
  --glass-border-strong: rgba(0, 0, 0, 0.16);

  /* Tipografi */
  --text-primary: #111113;
  --text-secondary: #636366;
  --text-tertiary: #8e8e93;

  /* Aksiyon & Durum Renkleri */
  --accent-primary: #0071e3;
  --accent-hover: #0062c4;
  --accent-glow: rgba(0, 113, 227, 0.25);
  --accent-gradient: linear-gradient(135deg, #0071e3 0%, #af52de 100%);
  
  --status-success: #34c759;
  --status-success-bg: rgba(52, 199, 89, 0.14);
  --status-warning: #ff9500;
  --status-warning-bg: rgba(255, 149, 0, 0.14);
  --status-error: #ff3b30;
  --status-error-bg: rgba(255, 59, 48, 0.12);
  --status-active: #5856d6;
  --status-active-bg: rgba(88, 86, 214, 0.14);

  /* Gölgeler */
  --shadow-ambient: 0 16px 48px rgba(0, 0, 0, 0.08);
  --shadow-floating: 0 24px 64px -8px rgba(0, 0, 0, 0.14);
}

.dark {
  --bg-canvas: #09090b;
  --glass-surface: rgba(22, 22, 26, 0.75);
  --glass-surface-raised: rgba(30, 30, 36, 0.88);
  --glass-panel: rgba(18, 18, 22, 0.65);

  --glass-border: rgba(255, 255, 255, 0.10);
  --glass-border-specular: rgba(255, 255, 255, 0.20);
  --glass-border-strong: rgba(255, 255, 255, 0.22);

  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --text-tertiary: #636366;

  --accent-primary: #0a84ff;
  --accent-hover: #409cff;
  --accent-glow: rgba(10, 132, 255, 0.32);

  --shadow-ambient: 0 16px 48px rgba(0, 0, 0, 0.40);
  --shadow-floating: 0 24px 64px -8px rgba(0, 0, 0, 0.60);
}
```

---

## 4. Tipografi Ölçeği (macOS 13pt Standardı)

- **Base System Font**: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif`
- **Monospace Font**: `ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`
- **Ölçek**:
  - `Hero Display`: 48px / line-height: 1.08 / tracking: -0.04em / weight: 800
  - `Section Title (h2)`: 28px / line-height: 1.20 / tracking: -0.025em / weight: 750
  - `Panel Title (h3)`: 18px / line-height: 1.30 / tracking: -0.015em / weight: 700
  - `Base UI (Body)`: **13pt (13px)** / line-height: 1.55 / weight: 450
  - `Transcript Reading`: 15px / line-height: 1.65 / weight: 400
  - `Captions & Timestamps`: 11px / line-height: 1.30 / font-feature-settings: "tnum" / weight: 600
  - `Chapter Label`: 10.5px / tracking: 0.12em / text-transform: uppercase / weight: 750

---

## 5. Zorunlu 8 Durum Matrisi (The 8-State Matrix)

| Durum | Tasarım & Davranış Kuralı | ClarityPad Uygulama Karşılığı |
| :--- | :--- | :--- |
| **1. Empty** | Odaklanmış tek bir ana aksiyona yönlendiren minimalist popover/alan. | *"Henüz transkript kuyruğu boş. Bir YouTube oynatma listesi yapıştırın veya yerel izleme klasörü bağlayın."* |
| **2. Loading** | Canlı adım göstergesi, skeleton kartlar ve gerçek zamanlı yüzdelik. | *"29/31 Video işleniyor... (Ses ayrıştırılıyor • 88%)"* |
| **3. Success** | Zümrüt durum rozeti, süre damgası ve anında erişilebilir aksiyonlar. | `✓ 29 Başarılı • 0.4sn` rozeti ve tek tıkla *"Markdown Kopyala"*. |
| **4. Error** | Neden başarısız olduğunu ve sonraki eylemi bildiren net kart. | `[FAILED: Video 1 - İndirilemedi] -> Bağlantıyı Yenile / Çerezleri Güncelle` |
| **5. No Results** | Arama sonucu boşsa net görsel ve tek tıkla *"Filtreyi Temizle"*. | *"Anahtar kelime bulunamadı. Filtreyi Sıfırla (Esc)"* |
| **6. Disabled** | Tıklanamayan butonun neden pasif olduğunu anlatan mikro tooltip. | Klasör seçilmeden önce pasif duran *"Yerel İzlemeyi Başlat"* butonu. |
| **7. Confirmation** | Yıkıcı işlemlerde 5 saniyelik geri alma (Undo) bildirim çubuğu. | Kuyruğu temizledikten sonra çıkan yüzen *"Geri Al (5s)"* çubuğu. |
| **8. Recovery** | Kesintiye uğrayan işlemleri sıfırdan başlatmadan devam ettiren taslak koruma. | Sayfa yeniden yüklendiğinde 29. videodan devam eden oturum kurtarma. |

---

## 6. Asimetrik Hero ve Görsel İmza

- **Asimetrik Düzen**:
  - Sol %45: Değer önerisi, aksiyon butonu ve minimal güven şeridi.
  - Sağ %55: Sağa doğru taşan, hafif derinlikli, canlı çalışan Liquid Glass işletim paneli.
- **2 Yüzen Canlı Kart**:
  1. `● ~/Recordings/ (Canlı İzleniyor • 1 Yeni Dosya)`
  2. `⚡ 29/31 Başarılı • 2 Aksiyon Bekliyor • 0.4s`
- **The Rule of Two (İkili İmza)**:
  1. Çift renkli gradyan başlık tipografisi (`#0071e3` $\rightarrow$ `#af52de`).
  2. Görsellerin önüne taşan Liquid Glass canlı telemetri pencereleri.
