/* Marmi360 — static HTML, local catalog and request list. No framework or network API. */
(()=>{
'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const dimensions=window.MARMI360_DIMENSIONS||{};
const data=window.MARMI360_CATALOG,base=document.body.dataset.base||'',byId=new Map(data.products.map(p=>[p.id,p])),cats=new Map(data.categories.map(c=>[c.id,c]));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const searchIndex=new Map(data.products.map(p=>[p.id,norm([p.name,p.description,...p.attributes.map(a=>a.value),...p.variants.map(v=>v.name)].join(' '))]));
const matchesQuery=(p,query)=>searchIndex.get(p.id).includes(norm(query.trim()));
const asset=p=>base+p;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const key='marmi360.request.v1';let cart=[],storageAvailable=true,toastTimer;
try{const current=localStorage.getItem(key),previous=current===null?localStorage.getItem('tenfor.request.v1'):null;const stored=JSON.parse(current??previous??'[]');if(Array.isArray(stored))cart=stored.filter(x=>byId.has(x.id)&&typeof x.variant==='string'&&(!x.variant||byId.get(x.id).variants.some(v=>v.name===x.variant))).map(x=>({...x,qty:Math.max(1,Math.min(9999,Math.floor(Number(x.qty)||1)))}));if(current===null&&previous!==null)localStorage.setItem(key,JSON.stringify(cart));}catch{storageAvailable=false;}
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500);}
function invalidateRequest(){const result=$('#requestResult');if(result)result.hidden=true;}
function save(){try{localStorage.setItem(key,JSON.stringify(cart));}catch{storageAvailable=false;}$$('[data-cart-count]').forEach(el=>el.textContent=cart.length);renderQuote();invalidateRequest();}
function add(id,qty=1,variant=''){if(!byId.has(id))return;qty=Math.max(1,Math.min(9999,Math.floor(Number(qty)||1)));const line=cart.find(x=>x.id===id&&x.variant===variant);if(line)line.qty=Math.min(9999,line.qty+qty);else cart.push({id,variant,qty});save();toast(storageAvailable?'Prodotto aggiunto alla tua richiesta.':'Prodotto aggiunto. Il browser non consente di salvare la selezione dopo la chiusura.');}
function renderQuote(){const container=$('#quoteItems');if(!container)return;if(!cart.length){container.innerHTML='<p class="selection-empty">La tua selezione è ancora vuota.<br>Esplora il catalogo o descrivi direttamente il tuo progetto.</p>';return;}container.innerHTML=cart.map((x,i)=>{const p=byId.get(x.id);return `<div class="quote-item"><img src="${esc(asset(p.image))}" alt="" width="48" height="48"/><div><h4><a href="${base}prodotti/${esc(p.slug)}.html">${esc(p.name)}</a></h4><small>${esc(x.variant||'Configurazione da definire')}</small></div><label>Quantità<input type="number" min="1" max="9999" step="1" value="${x.qty}" data-qty="${i}" aria-label="Quantità per ${esc(p.name)}${x.variant?' — '+esc(x.variant):''}"/></label><button class="remove-item" type="button" data-remove="${i}" aria-label="Rimuovi ${esc(p.name)}${x.variant?' — '+esc(x.variant):''}">×</button></div>`;}).join('');}
$$('[data-cart-count]').forEach(el=>el.textContent=cart.length);renderQuote();
document.addEventListener('click',ev=>{const addBtn=ev.target.closest('[data-add]');if(addBtn){add(addBtn.dataset.add);return;}const remove=ev.target.closest('[data-remove]');if(remove){const index=Number(remove.dataset.remove);cart.splice(index,1);save();const next=$('[data-remove="'+Math.min(index,cart.length-1)+'"]');if(next)next.focus();else $('.contact-intro>.text-link')?.focus();toast('Prodotto rimosso dalla richiesta.');}});
document.addEventListener('change',ev=>{if(ev.target.matches('[data-qty]')){const i=Number(ev.target.dataset.qty);if(cart[i]){cart[i].qty=Math.max(1,Math.min(9999,Math.floor(Number(ev.target.value)||1)));save();}}});
$$('.product-selection').forEach(form=>form.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;const fd=new FormData(form);add(form.dataset.productId,fd.get('quantity'),fd.get('variant')||'');}));

// Navigation: closed menu is removed from keyboard and accessibility navigation.
const menuBtn=$('.menu-btn'),menu=$('#mobile-menu');
function closeMenu(focus=false){menu.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Apri menu');if(focus)menuBtn.focus();}
menuBtn.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Chiudi menu':'Apri menu');});
$$('a',menu).forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!menu.hidden)closeMenu(true);});
document.addEventListener('click',ev=>{if(!menu.hidden&&!menu.contains(ev.target)&&!menuBtn.contains(ev.target))closeMenu();});
matchMedia('(min-width: 951px)').addEventListener('change',ev=>{if(ev.matches)closeMenu();});

// Home family filter. Catalog links retain the precise category.
$$('[data-family-filter]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-family-filter]').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});$$('[data-family-group]').forEach(c=>c.hidden=btn.dataset.familyFilter!=='all'&&c.dataset.familyGroup!==btn.dataset.familyFilter);}));

// Homepage search uses the same product index as the full catalog.
if($('#homeSearchInput')){
 const input=$('#homeSearchInput'),preview=$('#homeSearchPreview'),results=$('#homeSearchResults'),status=$('#homeSearchStatus'),all=$('#homeSearchAll');
 const emptyHint=`${data.products.length} prodotti · Cerca per nome, codice o materiale.`;let timer;
 function renderHomeSearch(){
  const query=input.value.trim();preview.hidden=!query;
  if(!query){results.innerHTML='';status.textContent=emptyHint;all.hidden=true;return;}
  const found=data.products.filter(p=>matchesQuery(p,query));
  status.textContent=found.length?`${found.length} ${found.length===1?'prodotto trovato':'prodotti trovati'}`:'Nessun prodotto trovato. Prova un altro nome, codice o materiale.';
  results.innerHTML=found.slice(0,4).map(p=>`<li><a href="prodotti/${esc(p.slug)}.html"><img src="${esc(p.image)}" alt="" width="52" height="52"/><span><strong>${esc(p.name)}</strong><small>${esc(cats.get(p.category).name)}</small></span><span aria-hidden="true">↗</span></a></li>`).join('');
  all.href='catalogo.html?q='+encodeURIComponent(query);all.hidden=!found.length;all.innerHTML=`${found.length===1?'Vedi il risultato nel catalogo':'Tutti i '+found.length+' risultati nel catalogo'} <span aria-hidden="true">↗</span>`;
 }
 input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(renderHomeSearch,120);});
 input.addEventListener('keydown',ev=>{if(ev.key==='Escape'){clearTimeout(timer);input.value='';renderHomeSearch();}else if(ev.key==='ArrowDown'){clearTimeout(timer);renderHomeSearch();const first=$('a',results);if(first){ev.preventDefault();first.focus();}}});
 preview.addEventListener('keydown',ev=>{if(ev.key==='Escape'){input.focus();return;}if(ev.key!=='ArrowDown'&&ev.key!=='ArrowUp')return;const links=$$('a[href]',preview).filter(a=>!a.hidden),index=links.indexOf(document.activeElement);if(index<0)return;ev.preventDefault();if(ev.key==='ArrowUp'&&index===0)input.focus();else links[Math.max(0,Math.min(links.length-1,index+(ev.key==='ArrowDown'?1:-1)))].focus();});
 $('.header-search')?.addEventListener('click',ev=>{ev.preventDefault();input.focus({preventScroll:true});$('#home-search').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'center'});});
 if(location.hash==='#home-search')input.focus({preventScroll:true});
}

// Full catalog, URL-addressable filters, sorting, empty state and pagination.
if($('#catalogGrid')){
 const params=new URLSearchParams(location.search),search=$('#searchInput'),select=$('#categorySelect'),sort=$('#sortSelect'),count=$('#resultCount'),grid=$('#catalogGrid');
 let query=params.get('q')||'',category=cats.has(params.get('categoria'))?params.get('categoria'):'all',group=data.categories.some(c=>c.group===params.get('gruppo'))?params.get('gruppo'):'',order=['az','za'].includes(params.get('ordine'))?params.get('ordine'):'catalog',page=Math.max(1,Number(params.get('pagina'))||1);
 const pageSize=12;let timer;
 search.value=query;select.value=group?'group:'+group:category;sort.value=order;
 const card=p=>`<article class="product-card"><a class="product-open" href="prodotti/${esc(p.slug)}.html"><div class="product-photo"><img src="${esc(p.image)}" alt="${esc(p.name)}" width="${dimensions[p.image]?.width||600}" height="${dimensions[p.image]?.height||400}" loading="lazy" decoding="async"/><span class="card-arrow" aria-hidden="true">↗</span></div><div class="product-meta"><span>${esc(cats.get(p.category).name)}</span><h3>${esc(p.name)}</h3><p>${p.variants.length?p.variants.length+' varianti documentate':'Consulta i dati del prodotto'}</p></div></a><button class="quick-add" type="button" data-add="${esc(p.id)}" aria-label="Aggiungi ${esc(p.name)} alla richiesta">＋<span>Aggiungi alla richiesta</span></button></article>`;
 function render(focus=false){
  let filtered=data.products.filter(p=>(category==='all'||p.category===category)&&(!group||cats.get(p.category).group===group)&&matchesQuery(p,query));
  if(order!=='catalog')filtered.sort((a,b)=>a.name.localeCompare(b.name,'it')*(order==='za'?-1:1));
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(pages,Math.max(1,Math.floor(page)));
  grid.innerHTML=filtered.slice((page-1)*pageSize,page*pageSize).map(card).join('');count.textContent=`${filtered.length} ${filtered.length===1?'prodotto':'prodotti'}${group?' · '+group:''}`;
  $$('[data-category]').forEach(b=>{const active=b.dataset.category===category&&!group;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  select.value=group?'group:'+group:category;$('#resetFilters').hidden=!query&&!group&&category==='all'&&order==='catalog';$('#emptyState').hidden=filtered.length>0;grid.hidden=!filtered.length;
  $('#emptyMessage').textContent=category==='bilancini'?'La famiglia è indicata nel catalogo di origine, ma non dispone di una scheda verificabile. Descrivi le tue esigenze nella richiesta.':'Prova un altro nome o codice, oppure azzera i filtri.';
  const nav=$('#pagination');nav.hidden=pages<=1;
  let controls=`<button type="button" data-page="${page-1}" aria-label="Pagina precedente" ${page===1?'disabled':''}>←</button>`;
  const visible=[...new Set([1,page-1,page,page+1,pages])].filter(n=>n>0&&n<=pages).sort((a,b)=>a-b);let previous=0;
  for(const n of visible){if(previous&&n-previous>1)controls+='<span aria-hidden="true" style="align-self:center;color:#777;font-size:11px">…</span>';controls+=`<button type="button" data-page="${n}" aria-label="Pagina ${n}" ${n===page?'aria-current="page"':''}>${n}</button>`;previous=n;}
  controls+=`<button type="button" data-page="${page+1}" aria-label="Pagina successiva" ${page===pages?'disabled':''}>→</button>`;nav.innerHTML=controls;
  const next=new URLSearchParams();if(query)next.set('q',query);if(category!=='all')next.set('categoria',category);if(group)next.set('gruppo',group);if(order!=='catalog')next.set('ordine',order);if(page>1)next.set('pagina',page);
  try{history.replaceState(null,'',location.pathname+(next.size?'?'+next.toString():''));}catch{}
  if(focus){count.setAttribute('tabindex','-1');count.focus({preventScroll:true});grid.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'});}
 }
 function reset(){query='';category='all';group='';order='catalog';page=1;search.value='';select.value='all';sort.value='catalog';render();}
 $('#catalogSearch').addEventListener('submit',ev=>{ev.preventDefault();clearTimeout(timer);query=search.value;page=1;render();});
 search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{query=search.value;page=1;render();},140);});
 select.addEventListener('change',()=>{if(select.value.startsWith('group:')){group=select.value.slice(6);category='all';}else{category=select.value;group='';}page=1;render();});
 $$('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.category;group='';page=1;render();}));
 sort.addEventListener('change',()=>{order=sort.value;page=1;render();});
 $('#resetFilters').addEventListener('click',reset);$('[data-reset]').addEventListener('click',reset);
 $('#pagination').addEventListener('click',ev=>{const btn=ev.target.closest('[data-page]');if(!btn||btn.disabled)return;page=Number(btn.dataset.page);render(true);});
 render();
}

// Native image dialog, preserving the original product image and caption.
const imageDialog=$('#imageDialog');let zoomOpener;
$$('[data-zoom]').forEach(btn=>btn.addEventListener('click',()=>{zoomOpener=btn;$('#enlargedImage').src=btn.dataset.zoom;$('#enlargedImage').alt=$('img',btn).alt;$('#enlargedCaption').textContent=btn.dataset.caption;imageDialog.showModal();}));
$('.dialog-close',imageDialog).addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',ev=>{if(ev.target===imageDialog)imageDialog.close();});
imageDialog.addEventListener('close',()=>zoomOpener?.focus());

// Quote is prepared and reviewed locally. No request is transmitted.
const form=$('#quoteForm');
if(form){
 form.addEventListener('input',invalidateRequest);
 form.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;const fields=new FormData(form);const items=cart.map((x,i)=>`${i+1}. ${byId.get(x.id).name}\n   Variante: ${x.variant||'Da definire'}\n   Quantità: ${x.qty}`).join('\n\n');$('#requestText').value=`Marmi360 — Richiesta di informazioni\n\nNome: ${fields.get('name')}\nAzienda: ${fields.get('company')||'—'}\nEmail: ${fields.get('email')}\nTelefono: ${fields.get('phone')||'—'}\n\nPRODOTTI SELEZIONATI\n${items||'Nessun prodotto selezionato: richiesta generale.'}\n\nPROGETTO\n${fields.get('message')}\n\nRichiesta da condividere dopo verifica del riepilogo. Nessun invio automatico.`;$('#downloadRequest').href='data:text/plain;charset=utf-8,'+encodeURIComponent($('#requestText').value);$('#requestResult').hidden=false;$('#requestStatus').textContent='Riepilogo pronto. Nessun messaggio è stato inviato.';$('#requestResult').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'center'});});
 $('#copyRequest').addEventListener('click',async()=>{const text=$('#requestText'),status=$('#requestStatus');text.focus();text.select();let copied=false;try{copied=document.execCommand('copy');}catch{}if(copied){status.textContent='Testo copiato negli appunti.';return;}try{await Promise.race([navigator.clipboard.writeText(text.value),new Promise((_,reject)=>setTimeout(()=>reject(new Error('clipboard unavailable')),1000))]);status.textContent='Testo copiato negli appunti.';}catch{status.textContent='Testo selezionato: usa il comando Copia del browser.';}});
 $('#downloadRequest').addEventListener('click',()=>{$('#requestStatus').textContent='File di testo pronto per il salvataggio.';});
}

// Lightweight motion stays inside the visual, and stops with reduced motion/offscreen.
const visual=$('[data-tilt]');if(visual){let frame=0;visual.addEventListener('pointermove',ev=>{if(reduce.matches||!matchMedia('(hover: hover) and (min-width: 951px)').matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=visual.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;visual.style.transform=`perspective(1200px) rotateX(${-y*2}deg) rotateY(${x*3}deg)`;});});visual.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);visual.style.transform='';});reduce.addEventListener('change',()=>visual.style.transform='');}
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{$('img',entry.target).style.animationPlayState=entry.isIntersecting?'running':'paused';}),{threshold:.05});$$('.sculpture-stage').forEach(el=>io.observe(el));}
$('#year').textContent=new Date().getFullYear();
})();
