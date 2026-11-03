# Marmi360 — Lifting Systems

Revisione del concept HTML nero/rosso NastrItalia, con nome Marmi360, fotografie originali di catalogo e un percorso completo di selezione/richiesta. Versione locale: nessuna pubblicazione sul dominio.

Pacchetto consegnabile: `Marmi360-html.zip`. La cartella di lavoro mantiene il percorso `nastritalia-rebuild-NERO` per conservare l’anteprima esistente. Il brand visibile, i metadati e i riepiloghi usano Marmi360.

## Aprire il sito

Dalla cartella del progetto:

```sh
python3 -m http.server 4323 --bind 127.0.0.1
```

Aprire http://127.0.0.1:4323/ . Non servono npm, installazione o build per usare gli HTML consegnati.

## Contenuto

- Homepage con hero tessile scontornata sul nero #080808, otto famiglie fotografiche, repertorio aziendale, visual SVG con profondità e documenti collegati.
- Hero desktop a tutta larghezza, immagine a filo del bordo destro e testo allineato alla griglia del sito.
- Ricerca anche nella home: icona nell’header, campo per nome/codice/materiale, primi quattro risultati, accesso diretto alle schede e ricerca completa nel catalogo. Utilizzabile anche da tastiera e con invio HTML standard.
- Catalogo completo: 103 prodotti, 141 varianti, ricerca per nome/codice/materiale, filtro per famiglia, ordinamento, paginazione e stato vuoto. Filtri condivisibili tramite URL.
- 103 schede HTML autonome in `prodotti/`, con fotografie originali ingrandibili, attributi, varianti, tavole originali e prodotti della stessa famiglia.
- Richiesta persistente nel browser, quantità e varianti, riepilogo rivedibile, copia e file di testo scaricabile. Nessun invio automatico.
- Menu mobile accessibile, focus, navigazione da tastiera, preferenza di movimento ridotto e animazioni limitate agli elementi visibili.
- Font WOFF2 e immagini WebP locali. Nessun framework, CDN o servizio esterno necessario al rendering.
- Navigazione interamente locale: nessun collegamento al sito originale. I riferimenti di provenienza restano nei file sorgente e nel manifest, esclusi dai dati inviati al browser.

## File da aggiornare

- `assets/styles.css`: palette, caratteri, layout e breakpoint.
- `assets/app.js`: filtri, interazioni, selezione e riepilogo.
- `data/catalog.json`: prodotti, fotografie, attributi, varianti, documenti e fonti.
- `data/image-dimensions.json`: dimensioni naturali delle fotografie, per evitare ingrandimenti eccessivi.
- `tools/build.py`: contenuto/template HTML della homepage, catalogo, informazioni e schede prodotto. Genera gli HTML già presenti; per modifiche durevoli al contenuto comune intervenire qui.

Dopo aver modificato dati o template:

```sh
python3 tools/build.py
python3 tools/check.py
node --check assets/app.js
```

La generazione sovrascrive gli HTML e la copia dati `assets/catalog.js`. Gli HTML restano normali file statici modificabili, ma una rigenerazione sostituisce gli interventi manuali non riportati nel template. Quando si aggiorna CSS o JS, cambiare la stringa di versione nel template evita cache obsolete nelle anteprime già aperte.

## Provenienza e limiti

Marmi360 è un nome di fantasia per questo concept. I dati tecnici e le foto di prodotto provengono dal catalogo NastrItalia già raccolto nel progetto principale. Non sono stati inventati codici, portate o prodotti. La hero è una composizione editoriale generata, dichiarata nel sito; non è una foto tecnica. L’illustrazione SVG è conservata dal concept iniziale.

Manifest in `sources/manifest.json`; prompt della hero in `docs/HERO-PROMPT.md`; verifiche e decisioni in `docs/PROJECT.md`. Non sono stati attribuiti al nuovo brand recapiti, partita IVA, certificazioni o un impianto di collaudo non verificati. Per una pubblicazione commerciale servono identità aziendale e recapiti effettivi. Il modulo attuale prepara un testo da condividere e non invia email.
