# Hero Marmi360 — immagine editoriale

Strumento usato: image_gen integrato, modalità predefinita; nessun fallback CLI/API.

Riferimento: foto reale `ba7d16-nastri-colorati-nuova.webp` del catalogo NastrItalia. Usata solo per il materiale tessile e il rosso della fascia inferiore, non per documentare un modello generato.

Originale conservato: `sources/editorial/hero-red-webbing.png`, 1122 × 1402. Dopo il riscontro del 31 ottobre, lo sfondo è stato rimosso con image_gen integrato. Nuovo sorgente: `sources/editorial/hero-red-webbing-cutout.png`. File usati dal sito: `assets/hero-red-webbing-cutout.webp` (1122 × 1402) e `assets/hero-red-webbing-cutout-700.webp` (700 × 875), entrambi con canale alpha. L’area intorno al tessuto e il foro dell’anello sono trasparenti; il fondo mostrato è direttamente #080808 del sito. Conversione WebP e copia ridotta, nessun ritocco creativo successivo. La didascalia è stata rimossa su richiesta. La provenienza editoriale resta nell’alt text e nella pagina informazioni; l’immagine non è usata nelle schede tecniche o in applicazioni di sollevamento.

## Prompt finale

```text
Use case: product-mockup. Asset type: an editorial photographic hero for Marmi360, an Italian industrial lifting equipment concept brand with a black and red design. Input image is a REFERENCE ONLY for the heavy woven polyester material and the deep red color of the bottom lifting webbing. Create an exquisitely tactile editorial still life of a single substantial red flat lifting webbing, loosely folded into one broad upright oval eye-shaped curve, resting on a near-black matte graphite studio surface. The band is broad and heavy, naturally woven, with finely visible red warp and weft, believable reinforced longitudinal stitching, unmarked, no lettering or logos. Its two long ends loosely overlap at the bottom of the frame and continue to the lower right. Side view with a subtle overhead angle; the opening in the loop is visible, the band has thickness and natural stiffness. This is an editorial material composition, never a technical product photograph or a demonstration of lifting. Absolutely NO hooks, chain, metal, loads, people, lifting equipment in use, labels or invented ratings. Directional softbox from upper left, a faint grazing light defines the textile edges and natural folds, beautiful highlights in the scarlet-red fabric, physically believable soft shadow. Deep black charcoal backdrop, no scenery or workshop; no red ambient light, no glowing objects, no particles, no lens flare, no render gloss, no synthetic ribbon, no graphic gradient. Studio photographic realism, premium industrial magazine, strong sculptural composition with an honest physical grounded shape. Portrait-near-square framing about 4:5. Entire loop comfortably inside frame with a little breathing room at the top and sides, strongly centered subject, object dominant. Bottom surface and background both almost black to blend into the website. No text or watermark.
```


## Prompt finale dello scontorno — 31 ottobre 2026

Strumento: image_gen integrato, modifica della precedente immagine locale, `transparent_background: true`.

```text
Use case: background-extraction. This input is the EDIT TARGET, not inspiration. Remove only the studio background and floor from this exact red woven polyester webbing image. Return the identical webbing as a clean high fidelity cutout on a genuinely TRANSPARENT alpha background. Preserve the exact loop silhouette, placement, scale, proportions, perspective, overlap, red color, black stitched lines, woven texture, highlights and self-shadows of the textile. Every pixel outside the webbing, including the large opening INSIDE the loop, must be transparent. Remove the grey floor, all studio haze, any ambient light in the background, and all cast floor shadows, leaving no rectangular field, no dark halo, no grey edge, no opaque shadow beneath the object. Keep the image framing and portrait 1122:1402 aspect ratio. The cutout will sit directly on a flat #080808 website background, so clean alpha edges and transparency inside the loop are essential. Do not change, regenerate, recolor, redesign or add anything to the webbing itself. No text, no new objects, no watermark. Output transparent PNG.
```

Canale alpha verificato nel PNG e conservato nei WebP. Campioni nei tre angoli liberi e al centro del foro: alpha 0. Nel browser, fondo della hero e contenitore dell’immagine entrambi rgb(8, 8, 8) a 390, 768 e 1440 px. Nessun elemento figcaption rimane nella hero.
