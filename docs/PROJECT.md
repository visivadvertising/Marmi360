# Marmi360 — stato finale, 1 novembre 2026

## Ambito e direzione

Revisione diretta del concept `nastritalia-rebuild-NERO`, conservando palette nera #080808, rossa #d21d24 e carta #f2f1ed. Nuovo nome di fantasia Marmi360. La versione Astro del progetto principale rimane separata. Backup dei quattro file di partenza in `.revision-backup/nero-original/` del progetto principale.

## Nome definitivo — 1 novembre 2026

Nome Marmi360 applicato a header e footer, tutte le 106 pagine, titoli e metadati social, pagina informazioni, riepiloghi e file `Marmi360-richiesta.txt`, sorgenti JavaScript e documentazione. Logo in maiuscolo e dimensione del footer adattati alla parola più lunga; verificati anche su mobile. La chiave di selezione è `marmi360.request.v1`, con importazione della selezione precedente se presente. Archivio aggiornato `Marmi360-html.zip`; versione precedente conservata nel backup locale. La cartella di lavoro conserva il percorso originario per mantenere valida l’anteprima locale già aperta.

Tipografia locale Instrument Sans + DM Sans, gerarchie più misurate, griglie editoriali, controlli leggibili e fotografie di catalogo al posto dei simboli CSS delle famiglie. Hero tessile rossa generata, dichiarata editoriale. SVG con profondità conservato nella sezione materiali, movimento limitato al visibile e rispettoso della preferenza di movimento ridotto. Rimosse luci del cursore, rumore sovrapposto e dichiarazioni non attribuibili al brand inventato, comprese banco da 100 tonnellate, certificazioni attuali, partita IVA e contatti societari.

## Implementazione

HTML, CSS e JavaScript senza framework o dipendenze di esecuzione. 106 pagine: homepage, catalogo, informazioni e 103 schede statiche autonome. Il catalogo conserva 141 varianti e le fotografie/tabelle originali. Dati in `data/catalog.json`; generatore ripetibile in `tools/build.py`. Le immagini mantengono colore e geometria; le dimensioni naturali limitano gli ingrandimenti delle miniature. Font e immagini sono locali.

Catalogo ricercabile per nome/codice/materiale, filtro per famiglia, ordinamento A–Z/Z–A, paginazione, conteggio, stato vuoto e URL dei filtri. Le dodici famiglie con schede contengono i 103 prodotti. La voce bilancino resta consultabile come famiglia senza scheda verificata; la voce informativa rivenditore non è trasformata in SKU. Ogni prodotto ha URL HTML proprio, breadcrumb, immagine ingrandibile, attributi, eventuali varianti, documenti e correlati reali.

Selezione per prodotto/variante, quantità e persistenza nella chiave localStorage `marmi360.request.v1`, separata dal sito originale. Il modulo genera un riepilogo locale da rivedere, copiare o scaricare in .txt; nessuna email inviata, nessun backend inventato. Dati personali del modulo non salvati automaticamente. Pagina dati/fonti/privacy raggiungibile dal footer.

## Verifiche

- Controllo statico di tutti i 106 HTML, immagini, srcset, script, font, documenti e ancore locali: 282 riferimenti distinti, zero errori; 103 prodotti e 141 varianti. Sintassi JavaScript verificata con Node.
- Dodici verifiche browser su homepage, catalogo, scheda fasce colorate e informazioni, a 390 × 844, 768 × 1024 e 1440 × 1000. Corretti 7 px di overflow della tabella su tablet: ora la tabella scorre nel proprio contenitore (427 px, contenuto 580 px), senza allargare la pagina. Nessuna immagine caricata in errore osservata nei casi controllati.
- Ricerca «cricchetto»: 19 risultati; famiglia cricchetti: 5; stato vuoto: 0; ripristino: 103. Cambio pagina e URL verificati. Filtro mobile catene: 11; ordinamento A–Z apre con «Catena grado 80 N-336».
- Scheda fasce: 8 righe varianti; variante «CEN.D — rosso» e quantità 3 aggiunte, mantenute dopo ricaricamento e riportate correttamente nella richiesta. Prodotto di prova rimosso senza cancellare altre selezioni.
- Zoom fotografico e chiusura con Escape; menu mobile, attributi di apertura e ritorno del focus con Escape verificati.
- Riepilogo generato con dati di prova; copia negli appunti confermata dall’interfaccia. Link di download .txt verificato: nome Marmi360-richiesta.txt e contenuto testuale identico al riepilogo. Il browser di anteprima non ha restituito l’evento di salvataggio del file durante il test automatico: nessuna dichiarazione di salvataggio fisico verificato. Modulo poi ricaricato per eliminare i dati di prova dalla pagina.

Report in `static-validation.json`, `browser-layout.json` e `browser-flow.json`; screenshot in `screenshots/`. Nessun punteggio prestazionale o attestazione di conformità dichiarato.

## Limiti concreti

Marmi360 è un concept locale senza identità aziendale o recapiti operativi attribuiti. Il catalogo conserva la provenienza NastrItalia nei documenti e nei rimandi alle fonti. Tavole storiche e immagini a bassa risoluzione richiedono l’originale per l’ispezione; la foto specifica N-135 e la pagina bilancino erano inaccessibili nelle fonti raccolte. Mancanze e note sono conservate nei dati e nelle schede. Per un uso commerciale pubblico servono identità, recapiti e documentazione effettivi. Nessuna pubblicazione effettuata.


## Revisione ricerca home e sfondo hero — 31 ottobre 2026

Aggiunta ricerca nella sezione prodotti della home, raggiungibile anche dall’icona nell’header. Usa lo stesso indice del catalogo: anteprima dei primi quattro risultati con foto e collegamento alle schede, conteggio, stato vuoto e collegamento a tutti i risultati. Invio passa al catalogo con il parametro q; il form GET funziona anche senza JavaScript. Freccia giù porta al primo risultato, le frecce attraversano i collegamenti e Escape nel campo azzera la ricerca.

Hero scontornata con image_gen integrato: PNG RGBA conservato e due WebP con alpha, sfondo del contenitore uguale al fondo del sito #080808. Didascalia sotto l’immagine rimossa. Provenienza mantenuta nell’alt e nella pagina informazioni. Materiale originale, prompt di generazione e prompt di scontorno conservati in HERO-PROMPT.md.

Verifiche specifiche: ricerca «cricchetto» → 19 prodotti e 4 anteprime; stato vuoto → 0; Escape → campo azzerato e anteprima nascosta; Invio → catalogo con 19 risultati; «N-112» → 1 risultato con apertura della scheda «Blizzar 50 mm N-112» da mobile. Nessun errore console osservato. A 390/768/1440 px: nessun overflow della home, immagine caricata, figcaption assente e fondi hero/figura entrambi rgb(8, 8, 8). Campioni trasparenti del file verificati anche al centro dell’anello. Report in home-search-layout.json. Archivio Marmi360-html.zip aggiornato con la revisione.


## Rimozione rimandi esterni — 31 ottobre 2026

Rimossi 104 collegamenti al sito NastrItalia: uno da ciascuna delle 103 schede e uno dalla pagina informazioni. Tutte le fotografie e i documenti collegati restano nelle cartelle locali. Eliminata la classe CSS inutilizzata dei link alle fonti. La pagina informazioni descrive la consultazione locale dei documenti.

Il catalogo JavaScript destinato al browser esclude i campi source e sourceUrl, mantenendo la provenienza nei dati di lavoro e nel manifest. Nessun URL nastritalia.it rimane negli HTML o nel catalogo JavaScript. Lo script di controllo verifica ora anche le action dei form, rifiuta destinazioni HTTP esterne e meta refresh e riporta il conteggio delle destinazioni esterne.

Verifica dei 106 HTML: zero destinazioni esterne, zero errori di integrità. Nel browser, scheda fasce e pagina informazioni senza link esterni; documento della scheda diretto all’asset locale cbac83-fasce-strato-doppio-1.webp. Nessun redirect automatico al sito originale presente nel codice delle interazioni. Archivio Marmi360-html.zip aggiornato.


## Hero desktop a tutta larghezza — 31 ottobre 2026

La hero desktop supera il limite del contenitore centrale: la griglia esterna occupa il 100% della viewport, il testo resta allineato alla griglia centrale da 1320 px e la figura si estende dal centro al bordo destro dello schermo. Quattro colonne CSS con due margini flessibili mantengono l’allineamento senza calcoli basati su viewport o margini negativi.

Il nastro usa object-fit: contain e object-position: right bottom su desktop per conservare l’anello intero e far coincidere l’estremità della foto con il bordo della viewport. Il punto di origine della lieve inclinazione è sul bordo destro. Nessuna modifica al file immagine, al brand o alle strutture tablet/mobile.

Verifica a 390, 768, 1024, 1440, 1708 e 2560 px: nessun overflow; sui desktop bordo destro della figura uguale alla larghezza della viewport e titolo allineato esattamente agli accessi per applicazione. Controllo aggiuntivo a 1920 px anche durante l’interazione con la figura: bordo destro mantenuto a 1920 px. Report in hero-width-check.json e screenshot aggiornati. Archivio HTML aggiornato.
