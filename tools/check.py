"""Controllo dell'HTML distribuito e dei riferimenti locali, senza dipendenze."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
ROOT=Path(__file__).resolve().parents[1];errors=[];refs=set();external_targets=[];ids={};pages=list(ROOT.glob('*.html'))+list((ROOT/'prodotti').glob('*.html'))
class Doc(HTMLParser):
 def __init__(self,path):
  super().__init__();self.path=path;self.h1=0;self.title=False;self.meta=False;self.ids=set();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='title':self.title=True
  if tag=='meta' and a.get('name')=='description':self.meta=bool(a.get('content'))
  if tag=='meta' and a.get('http-equiv','').lower()=='refresh':errors.append(f'{self.path.name}: redirect automatico non consentito')
  if tag=='img' and 'alt' not in a:errors.append(f'{self.path.name}: alt mancante')
  urls=[a[k] for k in ('src','href','action') if a.get(k)]
  if a.get('srcset'):urls.extend(x.strip().split()[0] for x in a['srcset'].split(','))
  for u in urls:
   split=urlsplit(u)
   if split.scheme in ('http','https') or split.netloc:
    external_targets.append(u)
    errors.append(f'{self.path.name}: destinazione esterna non consentita {u}')
   if split.scheme or split.netloc:continue
   target=(self.path.parent/unquote(split.path)).resolve() if split.path else self.path
   if not target.is_relative_to(ROOT):errors.append(f'{self.path.name}: riferimento fuori cartella {u}');continue
   if not target.exists():errors.append(f'{self.path.name}: file assente {u}')
   refs.add(str(target.relative_to(ROOT)))
   if split.fragment:self.links.append((target,unquote(split.fragment),u))
docs={}
for p in pages:
 d=Doc(p);d.feed(p.read_text());docs[p.resolve()]=d
 if d.h1!=1:errors.append(f'{p.name}: {d.h1} titoli H1')
 if not d.title or not d.meta:errors.append(f'{p.name}: metadati mancanti')
for path,d in docs.items():
 for target,anchor,url in d.links:
  if target in docs and anchor not in docs[target].ids:errors.append(f'{path.name}: ancora mancante {url}')
c=json.loads((ROOT/'data/catalog.json').read_text())
for p in c['products']:
 if not (ROOT/p['image']).is_file():errors.append(p['id']+': immagine assente')
 if not (ROOT/'prodotti'/f'{p["slug"]}.html').is_file():errors.append(p['id']+': scheda assente')
 for doc in p.get('documents',[]):
  if not (ROOT/doc['url']).is_file():errors.append(p['id']+': documento assente')
report={'htmlPages':len(pages),'products':len(c['products']),'variants':sum(len(p.get('variants',[])) for p in c['products']),'localReferences':len(refs),'externalTargets':len(external_targets),'errors':errors}
(ROOT/'docs/static-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2));raise SystemExit(bool(errors))
