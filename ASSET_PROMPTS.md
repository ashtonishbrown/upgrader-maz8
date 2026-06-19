# Mazda Upgrader — Image Generation Prompts

Three asset groups: **car stage (top-view, spins)**, **generation cards (side photo)**, **USB cards**.
Use the shared **STYLE BLOCK** in every prompt, then append the per-asset **SUBJECT** line.

Brand palette (use for lighting/accents so assets match the UI):
- Background deep indigo-black `#150f23`, surface `#1f1633`
- Rim/accent violet `#6a5fc1` / deep `#422082`
- Highlight lime `#c2ef4e` (use sparingly, one edge kiss)

---

## SHARED STYLE BLOCK (prepend to every prompt)

> Premium automotive studio product render, photorealistic, ultra-clean. Deep
> indigo-to-black seamless studio background (#150f23). Cinematic three-point
> lighting: soft large key light from upper front, cool violet rim light
> (#6a5fc1) tracing the body edges, subtle deep-violet fill (#422082) in the
> shadows, and a single thin lime (#c2ef4e) edge highlight as an accent. Soft
> contact shadow under the subject, gentle floor reflection. High dynamic range,
> crisp specular highlights on paint and glass, 8k detail, no text, no logos
> other than factory badges, no watermark.
>
> Negative: cartoon, low-poly, blurry, noisy, harsh shadows, busy background,
> people, hands, lens flare overload, oversaturated, distorted proportions.

---

## GROUP A — Car stage (top-down, transparent, spins 360°)

Format: **square, 1:1, ~1024×1024, transparent PNG**, subject centred, orthographic
top-down (bird's-eye), roof/bonnet facing up. Soul Red Crystal Metallic paint for
brand pop (or Machine Gray if you prefer neutral). Keep within ~80% of the frame.

> …STYLE BLOCK… **SUBJECT:** direct top-down orthographic view of a {MODEL},
> Soul Red Crystal Metallic, photographed from straight above, symmetrical,
> entire car visible, wheels and mirrors included, transparent background.

| File (`public/cars/top/`) | MODEL |
|---|---|
| `mazda-2.png` | Mazda 2 hatchback |
| `mazda-3.png` | Mazda 3 hatchback |
| `mazda-6.png` | Mazda 6 sedan |
| `cx-3.png` | Mazda CX-3 compact SUV |
| `cx-5.png` | Mazda CX-5 SUV |
| `mx-5.png` | Mazda MX-5 roadster (top down, soft-top up) |
| `_default.png` | neutral silver Mazda sedan silhouette (shown before a model is picked) |

---

## GROUP B — Generation cards (side ¾ photo)

Format: **landscape 16:10, ~1280×800**, transparent or `#150f23` background. Front
3/4 angle, headlights toward camera-left, full car in frame. Machine Gray
Metallic for a neutral, consistent look across generations.

> …STYLE BLOCK… **SUBJECT:** front three-quarter view of a {MODEL+GEN}, Machine
> Gray Metallic, angled 30° toward camera, full vehicle in frame, parked, studio.

| File (`public/cars/side/`) | MODEL + GEN (years for reference) |
|---|---|
| `mazda2-de.png` | Mazda 2 DE hatchback (2007–2014) |
| `mazda2-dj.png` | Mazda 2 DJ hatchback (2014–present) |
| `mazda3-bmbn.png` | Mazda 3 BM/BN (2013–2018) |
| `mazda3-bp.png` | Mazda 3 BP (2019–present) |
| `mazda6-gj.png` | Mazda 6 GJ sedan (2012–2018) |
| `mazda6-gl.png` | Mazda 6 GL sedan facelift (2018–present) |
| `cx3-dk.png` | Mazda CX-3 DK (2015–present) |
| `cx5-ke.png` | Mazda CX-5 KE first-gen (2012–2017) |
| `cx5-kf.png` | Mazda CX-5 KF second-gen (2017–present) |
| `mx5-nd.png` | Mazda MX-5 ND roadster, top down (2015–present) |

---

## GROUP C — USB cards

Format: **landscape 16:10, ~1280×800**, `#150f23` background, tight product shot.

> …STYLE BLOCK… **SUBJECT:** {USB SUBJECT}, floating product shot, cables neatly
> coiled, connectors facing camera, sharp focus, studio.

| File (`public/usb/`) | USB SUBJECT |
|---|---|
| `usb-a-a.png` | two black USB-A cable ends side by side, matte braided cable |
| `usb-a-c.png` | one USB-A connector and one USB-C connector side by side, matte braided cable, the USB-C end subtly highlighted with a lime edge |

---

## Wiring (after you have the PNGs)

1. Drop files into `public/cars/top/`, `public/cars/side/`, `public/usb/`.
2. Generation + USB: set the `photo` fields in `src/config.js`, e.g.
   `BP: { …, photo: '/cars/side/mazda3-bp.png' }`,
   `{ id: 'usb_c', …, photo: '/usb/usb-a-c.png' }`. They render automatically.
3. Car stage top-views need a one-line wiring change in `CarStage.jsx` to pick
   `/cars/top/<model>.png` by selected model — tell me and I'll do it.

## Sourcing from a public repo instead
Top-down and 3/4 Mazda renders exist in car-spec / 3D-asset repos and press
kits. Match the **same file names + folders** above and they slot in identically.
Prefer transparent PNGs; if a source has a white background, the dark card will
show it — ask me to add a quick background-knockout or a tinted frame.
