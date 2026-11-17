import * as THREE from 'three';

/* ================= config ================= */
const WA_NUMBER = '381603588080';
const IG = {main:'dinatajic', photo:'dinatajic.photo', design:'dinatajic.design', art:'dinatajic.art'};
const DISC = {photo:'Photo', design:'Design', art:'Art'};
// Real images live in img/ beside this page. Map a work id to its file name here.
const MEDIA = {};

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LOCAL = /^(sr|hr|bs|sh|me|cnr)\b/i.test(navigator.language||'');
const wait = ms => new Promise(r=>setTimeout(r,ms));
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5c-5.25 0-9.5 3.86-9.5 8.62 0 2.5 1.17 4.75 3.04 6.32l-.86 3.9c-.1.45.36.82.78.62l4.17-1.97c.76.17 1.55.25 2.37.25 5.25 0 9.5-3.86 9.5-8.62S17.25 2.5 12 2.5Z"/></svg>';

function waLink({project, disc}={}){
  const sr = {photo:'fotografiju', design:'dizajn', art:'sliku po narudžbini'};
  const en = {photo:'a photo shoot', design:'a design project', art:'a painting commission'};
  let m;
  if (LOCAL){
    m = project ? `Zdravo Dina! Javljam se preko tvog sajta. Svideo mi se projekat „${project}“ i zanima me nešto slično. Evo ideje: `
      : disc ? `Zdravo Dina! Javljam se preko tvog sajta, zanima me saradnja za ${sr[disc]}. Evo ideje: `
      : 'Zdravo Dina! Javljam se preko tvog sajta, zanima me saradnja. Evo ideje: ';
  } else {
    m = project ? `Hi Dina! I found you through your website. I love your project "${project}" and I'd like something similar. Here's my idea: `
      : disc ? `Hi Dina! I found you through your website and I'd like to hire you for ${en[disc]}. Here's my idea: `
      : "Hi Dina! I found you through your website and I'd like to hire you. Here's my idea: ";
  }
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`;
}
const hire = (label='Hire me', attrs='', cls='') => `<a class="hire ${cls}" data-hire ${attrs}>${ICON}<span>${label}</span></a>`;
function wireHire(root, ctx){
  $$('[data-hire]', root).forEach(a=>{
    a.href = waLink({project: a.dataset.project || ctx.project, disc: a.dataset.disc || ctx.disc});
    a.target = '_blank'; a.rel = 'noopener';
  });
}

/* ================= content ================= */
const W = (id,title,meta,ar=[3,4]) => ({id,title,meta,ar});
const T = (bg,fg,accent,ink,mu=.7,li=.22) => {
  const rgb = h => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)).join(',');
  return {bg,fg,accent,ink,muted:`rgba(${rgb(fg)},${mu})`,line:`rgba(${rgb(fg)},${li})`};
};
const HOME_THEME = T('#4A3F42','#F3EEEA','#FFC64A','#1E1819',.72,.24);

const PROJECTS = [
  { slug:'korak-ispred', title:'Korak ispred', disc:'design', kind:'Enrollment campaign for Univerzitet u Novom Pazaru, 2026/27',
    theme:T('#16223F','#E9EDF5','#F4D35E','#16223F'), hero:'hz-bl', tf:'tf-wide', scene:'building', layout:'campaign', client:'Univerzitet u Novom Pazaru',
    lede:'The 2026/27 enrollment campaign. The university building drawn in a single white line on deep navy, every department in one clear column, from the poster down to the billboard.',
    note:'A step ahead, from the poster to the street.',
    works:[W('unp-poster','Poster','Upis 2026/27',[3,4]), W('unp-billboard','Billboard','Outdoor, Novi Pazar',[3,1])] },
  { slug:'book-covers', title:'Book covers', disc:'design', kind:'Covers for academic and literary titles',
    theme:T('#CFCAC4','#1A1A1C','#1F3A93','#FFFFFF',.68,.25), hero:'hz-tl', tf:'tf-black', scene:'books', layout:'shelf',
    lede:'Covers for academic titles from Univerzitet u Novom Pazaru and literary titles from SENT. Each one has to work as a thumbnail in a web shop and as an object on a desk.',
    works:[W('book-eko','Pedagoške osnove ekološkog vaspitanja','Univerzitet u Novom Pazaru',[2,3]), W('book-krim','Pravna kriminalistika','Univerzitet u Novom Pazaru',[2,3]), W('book-tqm','Upravljanje totalnim kvalitetom','Univerzitet u Novom Pazaru',[2,3]), W('book-tespih','Tespih','SENT',[2,3]), W('book-perje','Sirovo perje','SENT',[2,3])] },
  { slug:'epistema-velumo', title:'Epistema & Velumo', disc:'design', kind:'Editorial design for a university journal and a magazine',
    theme:T('#EEF0F3','#111521','#111521','#EEF0F3',.66,.2), hero:'hz-tr', tf:'tf-light', scene:'sheets', layout:'split',
    lede:'Print work for a university journal and a magazine: covers, grids and the quiet details that make a publication feel like a series.',
    works:[W('epistema','Epistema','Journal, Univerzitet u Novom Pazaru',[4,5]), W('velumo','Velumo','Magazine cover',[4,5])] },
  { slug:'miraj', title:'Miraj', disc:'design', kind:'Vinyl record sleeve and label', tall:true, cue:'Scroll to pull out the record',
    theme:T('#E2672A','#2A1206','#2A1206','#F7C873',.72,.25), hero:'hz-bl', tf:'tf-italic', scene:'vinyl', layout:'single',
    lede:'A record sleeve built around a desert at dusk: warm gradients, a caravan on the horizon and lettering that holds at thirty centimeters and at thumbnail size.',
    specs:[['Format','12-inch record'],['Work','Sleeve, label, lettering']],
    works:[W('miraj','Miraj','Sleeve and record',[1,1])] },
  { slug:'bamboco', title:'Bamboco Box', disc:'design', kind:'Packaging for a bamboo box set', tall:true, cue:'Scroll to open the box',
    theme:T('#2D6A3B','#F1E9D2','#E8C27A','#1E3B22',.74,.24), hero:'hz-tl', tf:'tf-cond', scene:'box', layout:'single',
    lede:'Packaging for a bamboo box set. Natural wood, one green sleeve and a short promise printed on it: write, cook, recycle.',
    specs:[['Format','Gift box with sleeve'],['Work','Logo, sleeve, packaging']],
    works:[W('bamboco','Bamboco Box','Box, sleeve and inserts',[1,1])] },
  { slug:'imana', title:'IMANA', disc:'photo', kind:'Studio lookbook for the fashion label IMANA',
    theme:T('#E8E4E0','#161414','#A3192B','#FFFFFF',.68,.2), hero:'hz-bl', tf:'tf-cond', scene:'cloth', layout:'lookbook', client:'IMANA',
    lede:'A studio lookbook for the label IMANA. Clean backdrop, long silhouettes and fabric that keeps moving after the shutter closes.',
    works:[W('imana-1','Black','Studio',[3,4]), W('imana-2','Sand','Studio',[3,4]), W('imana-3','Red','Studio',[3,4])] },
  { slug:'editorial', title:'Editorial', disc:'photo', kind:'Fashion editorial in lived-in interiors', tall:true, cue:'Scroll to open the aperture',
    theme:T('#170A08','#F3E6E0','#E8402F','#170A08',.66,.18), hero:'hz-tl', tf:'tf-serif', scene:'aperture', layout:'sheet',
    lede:'An editorial shot in interiors with a history: patterned wallpaper, warm lamps and black fabric that soaks up the light.',
    works:[W('edit-1','Frame 11','Interior',[3,4]), W('edit-2','Frame 13','Interior',[3,4]), W('edit-3','Frame 15','Interior',[3,4])] },
  { slug:'weddings', title:'Weddings & couples', disc:'photo', kind:'Weddings and couple portraits outdoors',
    theme:T('#2B2118','#F6E9D7','#E9A54B','#2B2118',.7,.2), hero:'hz-cb', tf:'tf-italic', scene:'bokeh', layout:'strip',
    lede:'Weddings and couple portraits, mostly outdoors and mostly in the last hour of daylight.',
    works:[W('wed-1','On the hill','Wedding',[3,4]), W('wed-2','On the hill','Wedding',[3,4]), W('couple-1','In the forest','Couple portrait',[3,4]), W('couple-2','In the forest','Couple portrait',[3,4]), W('couple-3','In the forest','Couple portrait',[3,4])] },
  { slug:'landscapes', title:'Landscapes', disc:'art', kind:'Paintings of forest, water and fields',
    theme:T('#1D3326','#EEF2E6','#D9342B','#FFFFFF',.7,.2), hero:'hz-bl', tf:'tf-serif', scene:'hills', layout:'wall',
    lede:'Forest, water and fields, painted slowly. The greens carry most of the weight; a few reds and yellows do the rest.',
    works:[W('art-forest','Forest Water','Painting',[3,4]), W('art-lake','Stones in the Lake','Painting',[4,3]), W('art-flowers','Wildflowers','Painting',[3,4]), W('art-poppies','Poppies','Painting',[4,3])] },
  { slug:'abstractions', title:'Abstractions', disc:'art', kind:'Abstract paintings and works on paper',
    theme:T('#142045','#F3EADF','#E39A3B','#142045',.7,.2), hero:'hz-cb', tf:'tf-italic', scene:'blob', layout:'stagger',
    lede:'Paintings and works on paper where color leads and the subject follows.',
    works:[W('art-blue-ochre','Blue and Ochre','Painting',[4,3]), W('art-cells','Cells','Painting',[3,4]), W('art-rose','Rose Ground','Work on paper',[4,3])] },
  { slug:'light-and-shadow', title:'Light & Shadow', disc:'art', kind:'Still life, city motifs and drawing',
    theme:T('#120D09','#F5E6C8','#F2B544','#120D09',.68,.18), hero:'hz-tr', tf:'tf-serif', scene:'candle', layout:'salon',
    lede:'A candle, a minaret at dusk, a dome among leaves and a drawing in graphite. Works about how little light it takes to describe a thing.',
    works:[W('art-candle','Candle','Painting',[3,4]), W('art-minaret','Minaret','Painting',[3,4]), W('art-dome','Dome','Painting',[4,3]), W('art-figures','Two Figures','Graphite drawing',[4,3])] },
];

/* ================= real works (from Dina's Instagram profiles) ================= */
const WORKS = {"korak-ispred": [{"title": "Enrollment poster", "meta": "Upis 2026/27, A1 poster", "imgs": [["korak-ispred-01", 1600, 1200], ["korak-ispred-02", 1600, 1200]]}, {"title": "Campaign and merchandise", "meta": "Billboard, roll-ups and branded items", "imgs": [["korak-ispred-03", 1440, 960], ["korak-ispred-04", 1440, 962], ["korak-ispred-05", 1440, 960], ["korak-ispred-06", 1440, 960], ["korak-ispred-07", 1440, 960], ["korak-ispred-08", 1440, 960], ["korak-ispred-09", 1440, 960], ["korak-ispred-10", 1440, 960], ["korak-ispred-11", 1440, 960], ["korak-ispred-12", 1440, 960], ["korak-ispred-13", 1440, 960], ["korak-ispred-14", 1440, 960], ["korak-ispred-15", 1440, 960], ["korak-ispred-16", 1440, 960], ["korak-ispred-17", 1440, 960], ["korak-ispred-18", 1440, 960]]}], "book-covers": [{"title": "Pedagoške osnove ekološkog vaspitanja", "meta": "Cover, Univerzitet u Novom Pazaru", "imgs": [["book-covers-01", 1440, 1080], ["book-covers-02", 1440, 1080], ["book-covers-03", 1440, 1080], ["book-covers-04", 1440, 1080]]}, {"title": "Pravna kriminalistika", "meta": "Cover, Univerzitet u Novom Pazaru", "imgs": [["book-covers-05", 1440, 1079], ["book-covers-06", 1440, 1080], ["book-covers-07", 1440, 1079]]}, {"title": "Upravljanje totalnim kvalitetom", "meta": "Cover, Univerzitet u Novom Pazaru", "imgs": [["book-covers-08", 1440, 1080], ["book-covers-09", 1440, 1080], ["book-covers-10", 1440, 1080]]}, {"title": "Tespih", "meta": "Cover photograph, SENT", "imgs": [["book-covers-11", 1440, 960], ["book-covers-12", 859, 574]]}, {"title": "Sirovo perje", "meta": "Cover photograph, SENT", "imgs": [["book-covers-13", 1440, 960], ["book-covers-14", 1399, 934]]}], "epistema-velumo": [{"title": "Epistema", "meta": "Student magazine, second issue", "imgs": [["epistema-velumo-01", 1440, 960], ["epistema-velumo-02", 1440, 960], ["epistema-velumo-03", 1440, 960], ["epistema-velumo-04", 1440, 960]]}, {"title": "Velumo", "meta": "Art magazine", "imgs": [["epistema-velumo-05", 1440, 960], ["epistema-velumo-06", 1440, 960], ["epistema-velumo-07", 1440, 960], ["epistema-velumo-08", 1440, 960], ["epistema-velumo-09", 1440, 960]]}], "miraj": [{"title": "Miraj", "meta": "Visual identity and promotional campaign", "imgs": [["miraj-01", 1440, 959], ["miraj-02", 1440, 959], ["miraj-03", 1440, 959], ["miraj-04", 1440, 959], ["miraj-05", 1440, 959], ["miraj-06", 1440, 959], ["miraj-07", 1440, 959]]}], "bamboco": [{"title": "Bamboco", "meta": "Sustainable product design", "imgs": [["bamboco-01", 1440, 960], ["bamboco-02", 1440, 960], ["bamboco-03", 1440, 960], ["bamboco-04", 1440, 960]]}], "imana": [{"title": "Black", "meta": "Model: Alma Dupljak", "imgs": [["imana-01", 1201, 1600]]}, {"title": "Sand", "meta": "Model: Emina Z", "imgs": [["imana-02", 1201, 1600], ["imana-03", 1201, 1600], ["imana-04", 1201, 1600]]}, {"title": "Red", "meta": "Model: @leyygo", "imgs": [["imana-05", 1200, 1600], ["imana-06", 1201, 1600]]}], "editorial": [{"title": "Editorial", "meta": "With Alisa Zekić", "imgs": [["editorial-01", 1200, 1600], ["editorial-02", 1440, 959], ["editorial-03", 1440, 962], ["editorial-04", 1200, 1600], ["editorial-05", 1201, 1600], ["editorial-06", 1200, 1600]]}], "weddings": [{"title": "Wedding", "meta": "Golden hour on the hill", "imgs": [["weddings-01", 1600, 1066], ["weddings-02", 1600, 1066], ["weddings-03", 1600, 1066], ["weddings-04", 1600, 1066], ["weddings-05", 1600, 1066], ["weddings-06", 1600, 1066], ["weddings-07", 1600, 1066], ["weddings-08", 1600, 1066], ["weddings-09", 1600, 1066], ["weddings-10", 1600, 1066], ["weddings-11", 1600, 1066]]}, {"title": "In the forest", "meta": "Couple portraits", "imgs": [["weddings-12", 1600, 1280], ["weddings-13", 1600, 1280], ["weddings-14", 1600, 1280], ["weddings-15", 1600, 1280], ["weddings-16", 1600, 1280], ["weddings-17", 1600, 1280], ["weddings-18", 1600, 1280], ["weddings-19", 1600, 1281], ["weddings-20", 1600, 1281], ["weddings-21", 1600, 1281], ["weddings-22", 1600, 1281]]}], "landscapes": [{"title": "Forest Water", "meta": "Acrylic on canvas", "imgs": [["landscapes-01", 1440, 960], ["landscapes-02", 1440, 960]]}, {"title": "Stones in the Lake", "meta": "Acrylic on canvas", "imgs": [["landscapes-03", 1440, 1080]]}, {"title": "Wildflowers", "meta": "Acrylic on canvas", "imgs": [["landscapes-04", 1440, 1080], ["landscapes-05", 1440, 1080], ["landscapes-06", 1440, 1080]]}, {"title": "Poppies", "meta": "Acrylic on canvas", "imgs": [["landscapes-07", 1440, 1440]]}], "abstractions": [{"title": "Blue and Ochre", "meta": "Acrylic on canvas", "imgs": [["abstractions-01", 1440, 1080]]}, {"title": "Cells", "meta": "Acrylic on canvas", "imgs": [["abstractions-02", 1440, 1080], ["abstractions-03", 1440, 1080]]}, {"title": "Untitled", "meta": "Digital painting", "imgs": [["abstractions-04", 1440, 1080], ["abstractions-05", 1440, 1080]]}], "light-and-shadow": [{"title": "Candle", "meta": "Acrylic on canvas", "imgs": [["light-and-shadow-01", 1440, 1080], ["light-and-shadow-02", 1440, 1080], ["light-and-shadow-03", 1440, 1080]]}, {"title": "Minaret", "meta": "Acrylic on canvas", "imgs": [["light-and-shadow-04", 1440, 1080], ["light-and-shadow-05", 1440, 1080], ["light-and-shadow-06", 1440, 1080], ["light-and-shadow-07", 1440, 1080], ["light-and-shadow-08", 1440, 1080], ["light-and-shadow-09", 1440, 1080], ["light-and-shadow-10", 1440, 1080]]}, {"title": "Dome", "meta": "Acrylic on canvas", "imgs": [["light-and-shadow-11", 1440, 1119]]}, {"title": "Two Figures", "meta": "Drawing", "imgs": [["light-and-shadow-12", 1440, 803]]}]};
const COVERS = {'korak-ispred':'korak-ispred-03','book-covers':'book-covers-05','epistema-velumo':'epistema-velumo-02','miraj':'miraj-01','bamboco':'bamboco-01','imana':'imana-05','editorial':'editorial-02','weddings':'weddings-02','landscapes':'landscapes-01','abstractions':'abstractions-01','light-and-shadow':'light-and-shadow-01'};
const REAL = {
  'korak-ispred':{kind:'Admission campaign 2026/27 for Univerzitet u Novom Pazaru', client:'Univerzitet u Novom Pazaru',
    lede:'Visual identity and campaign design for the university’s 2026/27 enrollment season. The building drawn in a single white line on deep navy, carried from the poster to the billboard, roll-ups and a full set of branded items.',
    note:'One line drawing, from a poster on the wall to a hoodie on a student.'},
  'book-covers':{kind:'Covers for academic titles and photographs for literary covers', client:'Univerzitet u Novom Pazaru, SENT',
    lede:'Covers for three academic titles published by Univerzitet u Novom Pazaru, and photographs made for the covers of two SENT titles, Tespih and Sirovo perje.'},
  'epistema-velumo':{kind:'Editorial design for a student magazine and an art magazine',
    lede:'Epistema is the student magazine of Univerzitet u Novom Pazaru, shown here in its second issue. Velumo is an art magazine: cover and editorial layout.'},
  'miraj':{kind:'Visual identity and promotional campaign',
    lede:'A complete identity built around a desert at dusk: record, cassette, poster, tote bag, T-shirt, bucket hat and shopping bag, all carrying the same warm caravan on the horizon.',
    specs:[['Applications','Record, cassette, poster, merchandise'],['Work','Visual identity, campaign']]},
  'bamboco':{kind:'Sustainable product design',
    lede:'A bamboo box set designed to be used again: a wooden notebook, a spoon and a printed guide, in natural materials with a single green accent.',
    specs:[['Type','Sustainable product design'],['Work','Product, packaging, print']]},
  'imana':{kind:'Studio lookbook for the fashion label IMANA', client:'IMANA',
    lede:'Minimal lines and long silhouettes: a studio lookbook for IMANA, from a black set to a sand cape to a fiery red set with a satin cape.'},
  'editorial':{kind:'Fashion editorial with Alisa Zekić',
    lede:'An editorial shot in interiors with a history: patterned wallpaper, warm lamps and black fabric that soaks up the light.'},
  'weddings':{kind:'A wedding and a couple session',
    lede:'A wedding at golden hour on a hilltop, and a couple portrait session among the pines.'},
  'landscapes':{kind:'Acrylic paintings of forest, water and fields',
    lede:'Forest, water and fields in acrylic on canvas. The greens carry most of the weight; a few reds and yellows do the rest.'},
  'abstractions':{kind:'Acrylic and digital paintings',
    lede:'Paintings where color leads and the subject follows: acrylic on canvas and one digital painting.'},
  'light-and-shadow':{kind:'Acrylic paintings and a drawing',
    lede:'A candle, a minaret, a dome among red leaves and two figures in graphite.'},
};
PROJECTS.forEach(p=>{ Object.assign(p, REAL[p.slug]||{}); p.works = WORKS[p.slug]; p.cover = COVERS[p.slug]; });
PROJECTS.find(p=>p.slug==='epistema-velumo').works[0].credit = 'Publisher: Univerzitet u Novom Pazaru. Editor in chief: Nedžla Zukorlić. Design and layout: Dina Tajić and Ali Maljanović.';
const allImgs = p => p.works.flatMap(w=>w.imgs.map(im=>({w,im})));


/* ================= WebGL core ================= */
const canvas = $('#gl');
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
} catch(e){ document.body.classList.add('no-gl'); }
const ANISO = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 1;
const S = {t:0, dt:0, mx:0, my:0, sx:0, sy:0, speed:0, scrollY:0, vw:innerWidth, vh:innerHeight, wide:true, docH:1};
let cur = null;
const halfH = (cam, dist) => Math.tan(THREE.MathUtils.degToRad(cam.fov/2))*dist;

function fitCamera(){ if(!cur) return; cur.camera.aspect = S.vw/S.vh; cur.camera.updateProjectionMatrix(); cur.resize && cur.resize(S); }
function onResize(){
  S.vw = innerWidth; S.vh = innerHeight; S.wide = S.vw/S.vh >= 1.05;
  if(renderer) renderer.setSize(S.vw, S.vh, false);
  fitCamera(); S.docH = document.documentElement.scrollHeight;
}
addEventListener('resize', onResize);
addEventListener('pointermove', e=>{
  const nx = e.clientX/S.vw*2-1, ny = e.clientY/S.vh*2-1;
  S.speed = Math.min(1, S.speed + Math.hypot(nx-S.mx, ny-S.my)*2); S.mx = nx; S.my = ny;
}, {passive:true});
addEventListener('scroll', ()=>{
  S.scrollY = scrollY; S.docH = document.documentElement.scrollHeight;
  $('.nav').classList.toggle('scrolled', scrollY > 40);
}, {passive:true});

function disposeScene(scene){
  scene.traverse(o=>{
    if(o.geometry) o.geometry.dispose();
    const m = o.material; if(!m) return;
    (Array.isArray(m)?m:[m]).forEach(mm=>{
      for(const k in mm){ const v = mm[k]; if(v && v.isTexture) v.dispose(); }
      if(mm.uniforms) for(const k in mm.uniforms){ const v = mm.uniforms[k].value; if(v && v.isTexture) v.dispose(); }
      mm.dispose();
    });
  });
}
function setScene(name, p){
  if(!renderer) return;
  if(cur){ cur.dispose && cur.dispose(); disposeScene(cur.scene); cur = null; }
  canvas.style.opacity = 1;
  if(!name) return;
  try { cur = SCENES[name](S, p); fitCamera(); }
  catch(e){ console.error(e); cur = null; }
}
const clock = new THREE.Clock();
function loop(){
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), .05);
  S.dt = dt; S.t += dt*(reduced?.3:1);
  const k = 1-Math.exp(-dt*4); S.sx += (S.mx-S.sx)*k; S.sy += (S.my-S.sy)*k;
  S.speed *= Math.exp(-dt*2.5);
  if(renderer && thumbQueue.length && mode==='home' && ++thumbTick % 14 === 0) makeThumb(thumbQueue.shift());
  if(!cur || !renderer) return;
  if(cur.until && S.scrollY > cur.until*S.vh) return;
  cur.update(S);
  renderer.render(cur.scene, cur.camera);
}

/* ================= canvas helpers ================= */
function rng(seed){ let a = seed>>>0 || 1; return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function mk(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }
function ctex(c){ const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = ANISO; return t; }
function radial(size, stops){ const c=mk(size,size), g=c.getContext('2d'); const r=g.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2); stops.forEach(([o,col])=>r.addColorStop(o,col)); g.fillStyle=r; g.fillRect(0,0,size,size); return c; }
function vgrad(w,h,stops){ const c=mk(w,h), g=c.getContext('2d'); const l=g.createLinearGradient(0,0,0,h); stops.forEach(([o,col])=>l.addColorStop(o,col)); g.fillStyle=l; g.fillRect(0,0,w,h); return c; }
function stretch(g,v){ if('fontStretch' in g) g.fontStretch=v; }

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

/* ================= scenes ================= */
const SCENES = {};

/* --- home: a live canvas of wet paint (GPU fluid) --- */
const PAINT = [[1.0,.78,.29],[.78,.27,.35],[.2,.26,.84],[.95,.93,.92],[.2,.45,.3],[.95,.45,.2]];
SCENES.fluid = (S)=>{
  const ok = renderer.capabilities.isWebGL2 && (renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float'));
  if(!ok) return SCENES.blob(S);
  const quadCam = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const scene = new THREE.Scene();
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2)); quad.frustumCulled = false; scene.add(quad);
  const res = r => { let a = S.vw/S.vh; if(a<1) a = 1/a; const lo = Math.round(r), hi = Math.round(r*a); return S.vw>S.vh ? {w:hi,h:lo} : {w:lo,h:hi}; };
  const sim = res(128), dyeR = res(S.wide ? 1024 : 512);
  const base = {type:THREE.HalfFloatType, format:THREE.RGBAFormat, depthBuffer:false, stencilBuffer:false};
  const rt = (w,h,f) => new THREE.WebGLRenderTarget(w,h,{...base, minFilter:f, magFilter:f});
  const dbl = (w,h,f=THREE.LinearFilter) => { let a = rt(w,h,f), b = rt(w,h,f); return { get read(){return a;}, get write(){return b;}, swap(){ const t=a; a=b; b=t; }, dispose(){ a.dispose(); b.dispose(); } }; };
  const vel = dbl(sim.w,sim.h), dye = dbl(dyeR.w,dyeR.h), prs = dbl(sim.w,sim.h,THREE.NearestFilter);
  const divRT = rt(sim.w,sim.h,THREE.NearestFilter), curlRT = rt(sim.w,sim.h,THREE.NearestFilter);
  const VS = `uniform vec2 texelSize; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ vUv=uv; vL=vUv-vec2(texelSize.x,0.); vR=vUv+vec2(texelSize.x,0.); vT=vUv+vec2(0.,texelSize.y); vB=vUv-vec2(0.,texelSize.y); gl_Position=vec4(position.xy,0.,1.); }`;
  const mats = [];
  const M = (fs, u) => { const m = new THREE.ShaderMaterial({vertexShader:VS, fragmentShader:fs, uniforms:{texelSize:{value:new THREE.Vector2()}, ...u}, depthTest:false, depthWrite:false}); mats.push(m); return m; };
  const splatM = M(`uniform sampler2D uTarget; uniform float aspect,radius; uniform vec3 color; uniform vec2 point; varying vec2 vUv;
    void main(){ vec2 p=vUv-point; p.x*=aspect; vec3 s=exp(-dot(p,p)/radius)*color; gl_FragColor=vec4(texture2D(uTarget,vUv).xyz+s,1.); }`,
    {uTarget:{value:null}, aspect:{value:1}, radius:{value:.0025}, color:{value:new THREE.Vector3()}, point:{value:new THREE.Vector2()}});
  const advM = M(`uniform sampler2D uVelocity,uSource; uniform vec2 velTexel; uniform float dt,dissipation; varying vec2 vUv;
    void main(){ vec2 c=vUv-dt*texture2D(uVelocity,vUv).xy*velTexel; gl_FragColor=texture2D(uSource,c)/(1.+dissipation*dt); }`,
    {uVelocity:{value:null}, uSource:{value:null}, velTexel:{value:new THREE.Vector2(1/sim.w,1/sim.h)}, dt:{value:.016}, dissipation:{value:1}});
  const divM = M(`uniform sampler2D uVelocity; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ float L=texture2D(uVelocity,vL).x, R=texture2D(uVelocity,vR).x, T=texture2D(uVelocity,vT).y, B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy;
      if(vL.x<0.)L=-C.x; if(vR.x>1.)R=-C.x; if(vT.y>1.)T=-C.y; if(vB.y<0.)B=-C.y; gl_FragColor=vec4(.5*(R-L+T-B),0.,0.,1.); }`, {uVelocity:{value:null}});
  const curlM = M(`uniform sampler2D uVelocity; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ float L=texture2D(uVelocity,vL).y, R=texture2D(uVelocity,vR).y, T=texture2D(uVelocity,vT).x, B=texture2D(uVelocity,vB).x; gl_FragColor=vec4(.5*(R-L-T+B),0.,0.,1.); }`, {uVelocity:{value:null}});
  const vortM = M(`uniform sampler2D uVelocity,uCurl; uniform float curl,dt; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ float L=texture2D(uCurl,vL).x, R=texture2D(uCurl,vR).x, T=texture2D(uCurl,vT).x, B=texture2D(uCurl,vB).x, C=texture2D(uCurl,vUv).x;
      vec2 f=.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); f/=length(f)+.0001; f*=curl*C; f.y*=-1.;
      vec2 v=texture2D(uVelocity,vUv).xy+f*dt; gl_FragColor=vec4(clamp(v,-1000.,1000.),0.,1.); }`, {uVelocity:{value:null}, uCurl:{value:null}, curl:{value:24}, dt:{value:.016}});
  const clearM = M(`uniform sampler2D uTexture; uniform float value; varying vec2 vUv; void main(){ gl_FragColor=value*texture2D(uTexture,vUv); }`, {uTexture:{value:null}, value:{value:.8}});
  const prsM = M(`uniform sampler2D uPressure,uDivergence; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x, T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x, d=texture2D(uDivergence,vUv).x; gl_FragColor=vec4((L+R+B+T-d)*.25,0.,0.,1.); }`, {uPressure:{value:null}, uDivergence:{value:null}});
  const gradM = M(`uniform sampler2D uPressure,uVelocity; varying vec2 vUv,vL,vR,vT,vB;
    void main(){ float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x, T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x; gl_FragColor=vec4(texture2D(uVelocity,vUv).xy-vec2(R-L,T-B),0.,1.); }`, {uPressure:{value:null}, uVelocity:{value:null}});
  const dispM = M(`uniform vec2 texelSize; uniform sampler2D uDye; uniform vec3 uBase; uniform vec2 uRes; uniform float uTime,uDim; varying vec2 vUv;
    float lum(vec3 c){ return dot(c,vec3(.3,.59,.11)); }
    float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec3 c=texture2D(uDye,vUv).rgb; vec2 t=texelSize*1.5;
      float dx=lum(texture2D(uDye,vUv+vec2(t.x,0.)).rgb)-lum(texture2D(uDye,vUv-vec2(t.x,0.)).rgb);
      float dy=lum(texture2D(uDye,vUv+vec2(0.,t.y)).rgb)-lum(texture2D(uDye,vUv-vec2(0.,t.y)).rgb);
      vec3 n=normalize(vec3(-dx*7.,-dy*7.,1.)); vec3 L=normalize(vec3(-.45,.6,.66));
      float dif=clamp(dot(n,L),0.,1.); float sp=pow(max(dot(reflect(-L,n),vec3(0.,0.,1.)),0.),26.);
      float a=max(c.r,max(c.g,c.b)); float cov=smoothstep(.0,.55,a);
      vec3 paint=c/max(a,.0001);
      vec3 col=mix(uBase,paint,cov);
      col*=.8+.32*dif; col+=sp*.22*cov;
      vec2 px=vUv*uRes; col*=.965+.035*sin(px.x*1.3)*sin(px.y*1.3);
      col+=(hash(vUv*uRes+fract(uTime)*91.)-.5)*.045;
      col*=mix(.82,1.,smoothstep(1.15,.3,length(vUv-.5)*1.5));
      col=mix(col,uBase,uDim);
      gl_FragColor=vec4(col,1.); }`,
    {uDye:{value:null}, uBase:{value:new THREE.Vector3(0x4A/255,0x3F/255,0x42/255)}, uRes:{value:new THREE.Vector2(S.vw,S.vh)}, uTime:{value:0}, uDim:{value:0}});
  const simT = new THREE.Vector2(1/sim.w,1/sim.h);
  [divM,curlM,vortM,prsM,gradM,clearM,advM].forEach(m=>m.uniforms.texelSize.value.copy(simT));
  dispM.uniforms.texelSize.value.set(1/dyeR.w,1/dyeR.h);
  const pass = (m, target) => { quad.material = m; renderer.setRenderTarget(target); renderer.render(scene, quadCam); };
  function splat(x,y,dx,dy,col){
    const asp = S.vw/S.vh; splatM.uniforms.aspect.value = asp; splatM.uniforms.point.value.set(x,y);
    splatM.uniforms.radius.value = .0028*(asp>1?asp:1);
    splatM.uniforms.uTarget.value = vel.read.texture; splatM.uniforms.color.value.set(dx,dy,0); pass(splatM, vel.write); vel.swap();
    splatM.uniforms.uTarget.value = dye.read.texture; splatM.uniforms.color.value.set(col[0],col[1],col[2]); pass(splatM, dye.write); dye.swap();
  }
  let ci = 0; const nextColor = k => { ci = (ci+1+((Math.random()*2)|0))%PAINT.length; return PAINT[ci].map(v=>v*k); };
  const burst = (k=.7) => splat(Math.random(), Math.random(), 1400*(Math.random()-.5), 1400*(Math.random()-.5), nextColor(k));
  function step(dt){
    curlM.uniforms.uVelocity.value = vel.read.texture; pass(curlM, curlRT);
    vortM.uniforms.uVelocity.value = vel.read.texture; vortM.uniforms.uCurl.value = curlRT.texture; vortM.uniforms.dt.value = dt; pass(vortM, vel.write); vel.swap();
    divM.uniforms.uVelocity.value = vel.read.texture; pass(divM, divRT);
    clearM.uniforms.uTexture.value = prs.read.texture; pass(clearM, prs.write); prs.swap();
    prsM.uniforms.uDivergence.value = divRT.texture;
    for(let i=0;i<18;i++){ prsM.uniforms.uPressure.value = prs.read.texture; pass(prsM, prs.write); prs.swap(); }
    gradM.uniforms.uPressure.value = prs.read.texture; gradM.uniforms.uVelocity.value = vel.read.texture; pass(gradM, vel.write); vel.swap();
    advM.uniforms.dt.value = dt;
    advM.uniforms.uVelocity.value = vel.read.texture; advM.uniforms.uSource.value = vel.read.texture; advM.uniforms.dissipation.value = .22; pass(advM, vel.write); vel.swap();
    advM.uniforms.uVelocity.value = vel.read.texture; advM.uniforms.uSource.value = dye.read.texture; advM.uniforms.dissipation.value = .42; pass(advM, dye.write); dye.swap();
  }
  const ptr = {x:0,y:0,px:0,py:0,init:false,moved:false,col:nextColor(.17),ct:0};
  let lastMove = 0, auto = .2, introLeft = 7;
  const onMove = e => {
    const x = e.clientX/S.vw, y = 1-e.clientY/S.vh;
    if(!ptr.init){ ptr.x = ptr.px = x; ptr.y = ptr.py = y; ptr.init = true; return; }
    ptr.px = ptr.x; ptr.py = ptr.y; ptr.x = x; ptr.y = y; ptr.moved = true; lastMove = performance.now();
  };
  const onDown = e => { ptr.init = false; onMove(e); };
  addEventListener('pointermove', onMove, {passive:true});
  addEventListener('pointerdown', onDown, {passive:true});
  return { scene, camera:quadCam, until:Infinity, noAspect:true,
    resize(S){ dispM.uniforms.uRes.value.set(S.vw,S.vh); },
    update(S){
      const dt = Math.min(Math.max(S.dt,.001), 1/30);
      if(introLeft>0 && Math.random()<.5){ introLeft--; burst(.8); }
      if(ptr.moved){
        ptr.moved = false; const asp = S.vw/S.vh;
        let dx = (ptr.x-ptr.px), dy = (ptr.y-ptr.py); if(asp<1) dx *= asp; if(asp>1) dy /= asp;
        splat(ptr.x, ptr.y, dx*6000, dy*6000, ptr.col);
        ptr.ct += dt; if(ptr.ct>.45){ ptr.ct = 0; ptr.col = nextColor(.17); }
      }
      auto -= dt;
      if(auto<=0){ const idle = performance.now()-lastMove > 2500; auto = idle ? .7+Math.random()*.6 : 3; burst(idle ? .45 : .3); }
      step(dt);
      dispM.uniforms.uDye.value = dye.read.texture; dispM.uniforms.uTime.value = S.t;
      dispM.uniforms.uDim.value = Math.min(1, Math.max(0,(S.scrollY-S.vh*.45)/(S.vh*.7)))*.55;
      quad.material = dispM; renderer.setRenderTarget(null);
    },
    dispose(){
      removeEventListener('pointermove', onMove); removeEventListener('pointerdown', onDown);
      vel.dispose(); dye.dispose(); prs.dispose(); divRT.dispose(); curlRT.dispose(); mats.forEach(m=>m.dispose());
      quad.material = new THREE.MeshBasicMaterial();
    }
  };
};

/* --- Korak ispred: the building as a line drawing --- */
SCENES.building = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#16223F');
  const camera = new THREE.PerspectiveCamera(38, S.vw/S.vh, .1, 100);
  const mat = new THREE.LineBasicMaterial({color:'#E9EDF5', transparent:true, opacity:0});
  const root = new THREE.Group(); scene.add(root);
  const add = (geo,x,y,z)=>{ const l = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), mat); l.position.set(x,y,z); root.add(l); geo.dispose(); return l; };
  for(let i=0;i<5;i++){ const h=(i+1)*.14; add(new THREE.BoxGeometry(4.4,h,.3), 0, h/2, 2.05-i*.3); }
  add(new THREE.BoxGeometry(7.2,.7,2.4), 0, .35, -.3);
  add(new THREE.BoxGeometry(6.2,2.6,2.0), 0, 2.0, -.4);
  for(let i=0;i<6;i++) add(new THREE.CylinderGeometry(.09,.1,2.0,8), -2.1+i*.84, 1.7, .78);
  add(new THREE.BoxGeometry(5.0,.28,.32), 0, 2.84, .78);
  const ped = new THREE.Shape(); ped.moveTo(-2.7,0); ped.lineTo(2.7,0); ped.lineTo(0,.85); ped.closePath();
  const pg = new THREE.ExtrudeGeometry(ped,{depth:.3,bevelEnabled:false}); add(pg, 0, 2.98, .63);
  [-1,1].forEach(s=>{
    add(new THREE.BoxGeometry(2.4,2.1,1.8), s*4.4, 1.75, -.5);
    for(let r=0;r<2;r++) for(let c=0;c<3;c++){ const win = new THREE.PlaneGeometry(.42,.62); add(win, s*4.4-.72+c*.72, 1.3+r*.95, .41); }
  });
  for(let c=0;c<5;c++){ add(new THREE.PlaneGeometry(.5,.7), -1.7+c*.85, 2.45, .61); }
  const grid = new THREE.GridHelper(40, 40, '#E9EDF5', '#E9EDF5'); grid.material.transparent=true; grid.material.opacity=.12; root.add(grid);
  let intro=0;
  return { scene, camera, until:1.3, update(S){
    intro = Math.min(1, intro+S.dt/1.6); mat.opacity = .85*(1-Math.pow(1-intro,2));
    const f = Math.min(1, S.scrollY/S.vh);
    const a = -.55 + Math.sin(S.t*.12)*.22 + S.sx*.3;
    const rad = (S.wide?13:17) - f*4, h = 4.2 - f*1.8 - S.sy*.6;
    camera.position.set(Math.sin(a)*rad, h, Math.cos(a)*rad);
    camera.lookAt(S.wide?-2.9:0, S.wide?1.2:1.6, 0);
  }};
};

/* --- Book covers: a fan of books --- */
SCENES.books = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#CFCAC4');
  const camera = new THREE.PerspectiveCamera(32, S.vw/S.vh, .1, 100); camera.position.set(0,0,11);
  scene.add(new THREE.HemisphereLight('#ffffff','#8a847e',2.3));
  const dl = new THREE.DirectionalLight('#ffffff',2.2); dl.position.set(-4,5,6); scene.add(dl);
  const pc = mk(64,256), pg = pc.getContext('2d'); pg.fillStyle='#F2EEE6'; pg.fillRect(0,0,64,256); pg.strokeStyle='rgba(120,110,95,.35)';
  for(let x=1;x<64;x+=3){ pg.beginPath(); pg.moveTo(x,0); pg.lineTo(x,256); pg.stroke(); }
  const pagesMat = new THREE.MeshStandardMaterial({map:ctex(pc), roughness:.9});
  const cols = ['#2F7A4A','#163A5F','#1D2B6B','#1C1A19','#3C4A2A'];
  const root = new THREE.Group(); scene.add(root);
  const pivots = cols.map((c,i)=>{
    const cover = new THREE.MeshStandardMaterial({color:c, roughness:.55});
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.45,2.15,.26), [pagesMat, cover, pagesMat, pagesMat, cover, cover]);
    const band = new THREE.Mesh(new THREE.BoxGeometry(1.46,.12,.265), new THREE.MeshStandardMaterial({color:i%2?'#E9EDF5':'#F4D35E', roughness:.5}));
    band.position.y = -.55 + i*.05; m.add(band);
    const p = new THREE.Group(); m.position.set(0, 3.4, i*.3); p.add(m); p.position.y = -3.6; root.add(p); return p;
  });
  let spread = 0;
  return { scene, camera, until:1.3, update(S){
    const target = .75 + Math.min(1, S.scrollY/S.vh)*.5;
    spread += (target-spread)*(1-Math.exp(-S.dt*2.5));
    pivots.forEach((p,i)=>{ const k = i-2; p.rotation.z = -k*.2*spread; const b = p.children[0]; b.rotation.y = Math.sin(S.t*.6+i)*.25 + S.sx*.35; b.rotation.x = S.sy*.15; });
    root.scale.setScalar(S.wide?1:.66); root.position.set(S.wide? halfH(camera,11)*camera.aspect*.38 : 0, S.wide?-.3:.6, 0);
  }};
};

/* --- Epistema & Velumo: a ring of printed sheets --- */
function sheetCanvas(i){
  const w=600, h=760, c=mk(w,h), g=c.getContext('2d'), r=rng(40+i);
  const dark = i%3===1;
  g.fillStyle = dark ? '#1b1d22' : '#FAFAF8'; g.fillRect(0,0,w,h);
  g.strokeStyle = dark ? 'rgba(240,240,240,.55)' : '#1D2B6B'; g.lineWidth=2;
  if(i%2===0){ // arcade line drawing
    const base=h*.72, n=5, cw=w*.7/n, x0=w*.15;
    for(let k=0;k<n;k++){ const x=x0+k*cw; g.beginPath(); g.moveTo(x+cw*.15,base); g.lineTo(x+cw*.15,base-140); g.arc(x+cw*.5,base-140,cw*.35,Math.PI,0); g.lineTo(x+cw*.85,base); g.stroke(); }
    g.strokeRect(x0-10, base-230, w*.7+20, 230); g.beginPath(); g.moveTo(x0-30,base); g.lineTo(x0+w*.7+30,base); g.stroke();
  } else { // photographic gradient block
    const gr = g.createLinearGradient(0,h*.15,0,h*.85); gr.addColorStop(0,dark?'#9a9da4':'#3a3d45'); gr.addColorStop(1,dark?'#2a2c31':'#c9ccd2');
    g.fillStyle=gr; g.fillRect(w*.12,h*.18,w*.76,h*.56);
    g.fillStyle = dark?'rgba(255,255,255,.85)':'rgba(20,20,25,.85)'; g.beginPath(); g.ellipse(w*(.4+r()*.2),h*.5,40,110,0,0,Math.PI*2); g.fill();
  }
  g.fillStyle = dark ? 'rgba(240,240,240,.8)' : 'rgba(29,43,107,.85)';
  for(let k=0;k<4;k++) g.fillRect(w*.12, h*.82+k*16, w*(.3+r()*.4), 5);
  g.fillRect(w*.12, h*.07, w*.4, 18);
  return c;
}
SCENES.sheets = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#EEF0F3');
  const camera = new THREE.PerspectiveCamera(38, S.vw/S.vh, .1, 100); camera.position.set(0,-.2,10);
  const ring = new THREE.Group(); scene.add(ring);
  const N=6, Rr=3.3, pw=1.9, ph=pw*1.27, geo = new THREE.PlaneGeometry(pw,ph), back = new THREE.MeshBasicMaterial({color:'#D9DCE1'});
  const items = [];
  for(let i=0;i<N;i++){
    const g = new THREE.Group(), a=i/N*Math.PI*2; g.position.set(Math.sin(a)*Rr,0,Math.cos(a)*Rr); g.rotation.y=a;
    g.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({map:ctex(sheetCanvas(i))})));
    const b = new THREE.Mesh(geo, back); b.rotation.y=Math.PI; b.position.z=-.004; g.add(b);
    ring.add(g); items.push(g);
  }
  let rot=0;
  return { scene, camera, until:1.3, update(S){
    rot += S.dt*.12;
    ring.rotation.y = -rot - S.scrollY*.0025 + S.sx*.25; ring.rotation.x = .1 + S.sy*.08;
    items.forEach((g,i)=>{ g.position.y = Math.sin(S.t*.9+i*1.3)*.15; });
    ring.scale.setScalar(S.wide?1:.6); ring.position.set(S.wide?-1.2:0, S.wide?-.5:-.6, 0);
  }};
};

/* --- Miraj: record and sleeve --- */
SCENES.vinyl = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#E2672A');
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100); camera.position.set(0,0,10);
  scene.add(new THREE.HemisphereLight('#fff3e0','#7a2a08',1.9));
  const d1 = new THREE.DirectionalLight('#ffffff',2.6); d1.position.set(3,4,5); scene.add(d1);
  const d2 = new THREE.DirectionalLight('#ffb27a',1.0); d2.position.set(-4,-2,3); scene.add(d2);
  const gc = mk(1024,1024), g = gc.getContext('2d'); g.fillStyle='#0e0c0b'; g.fillRect(0,0,1024,1024);
  for(let r=180;r<505;r+=2.5){ g.strokeStyle=`rgba(255,255,255,${.025+((r*7)%11)/300})`; g.lineWidth=1; g.beginPath(); g.arc(512,512,r,0,Math.PI*2); g.stroke(); }
  g.fillStyle='#F7C873'; g.beginPath(); g.arc(512,512,168,0,Math.PI*2); g.fill();
  g.strokeStyle='#2A1206'; g.lineWidth=3; g.beginPath(); g.arc(512,512,140,0,Math.PI*2); g.stroke();
  g.fillStyle='#2A1206'; g.beginPath(); g.arc(512,512,10,0,Math.PI*2); g.fill();
  const groove = ctex(gc);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,.035,128), [new THREE.MeshStandardMaterial({color:'#111'}), new THREE.MeshStandardMaterial({map:groove, roughness:.32, metalness:.25}), new THREE.MeshStandardMaterial({map:groove, roughness:.32, metalness:.25})]);
  const rec = new THREE.Group(); disc.rotation.x = Math.PI/2; rec.add(disc);
  const sc = vgrad(512,512,[[0,'#3b1747'],[.45,'#c2413a'],[.75,'#f19a3e'],[1,'#f7d27a']]); const sg = sc.getContext('2d');
  sg.fillStyle='rgba(255,226,160,.9)'; sg.beginPath(); sg.arc(256,330,70,0,Math.PI*2); sg.fill();
  sg.fillStyle='#2A1206'; sg.fillRect(0,400,512,112);
  const sleeveFront = new THREE.MeshStandardMaterial({map:ctex(sc), roughness:.7});
  const paper = new THREE.MeshStandardMaterial({color:'#F2D3B0', roughness:.8});
  const sleeve = new THREE.Mesh(new THREE.BoxGeometry(3.6,3.6,.05), [paper,paper,paper,paper,sleeveFront,paper]);
  const root = new THREE.Group(); root.add(rec, sleeve); scene.add(root);
  rec.position.z = -.06;
  let out=0, intro=0;
  return { scene, camera, until:2.2, update(S){
    intro = Math.min(1, intro+S.dt/1.8);
    const target = .45*intro + .55*Math.min(1, S.scrollY/(S.vh*.8));
    out += (target-out)*(1-Math.exp(-S.dt*4));
    const e = out<.5 ? 2*out*out : 1-Math.pow(-2*out+2,2)/2;
    rec.position.x = e*2.2; disc.rotation.y -= S.dt*(1.2+e*2.5);
    root.rotation.y = -.35 + S.sx*.3 + Math.sin(S.t*.4)*.05; root.rotation.x = S.sy*.2 - .05;
    const w = S.wide; root.scale.setScalar(w?1:.52); root.position.set(w?.4:-.5, w?.2:1.0, 0);
  }};
};

/* --- Bamboco: a bamboo box that opens --- */
SCENES.box = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#2D6A3B');
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100);
  scene.add(new THREE.HemisphereLight('#fffaf0','#1e3b22',2.0));
  const dl = new THREE.DirectionalLight('#ffffff',2.4); dl.position.set(3,6,5); scene.add(dl);
  const wc = mk(512,512), g = wc.getContext('2d'), r = rng(9); g.fillStyle='#D8B57C'; g.fillRect(0,0,512,512);
  for(let i=0;i<70;i++){ g.strokeStyle=`rgba(${150+r()*30|0},${110+r()*20|0},${60+r()*15|0},${.25+r()*.35})`; g.lineWidth=1+r()*2.5; const y=r()*512; g.beginPath(); g.moveTo(0,y); g.bezierCurveTo(170,y+(r()-.5)*14,340,y+(r()-.5)*14,512,y+(r()-.5)*10); g.stroke(); }
  for(let x=60;x<512;x+=130+r()*60){ g.fillStyle='rgba(140,100,55,.35)'; g.fillRect(x,0,3,512); }
  const wood = new THREE.MeshStandardMaterial({map:ctex(wc), roughness:.7});
  const dark = new THREE.MeshStandardMaterial({color:'#C3945A', roughness:.6});
  const cream = new THREE.MeshStandardMaterial({color:'#F1E9D2', roughness:.8});
  const box = new THREE.Group(); scene.add(box);
  const panel = (w,h,d,x,y,z)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),wood); m.position.set(x,y,z); box.add(m); };
  panel(3,.06,2.2, 0,.03,0); panel(3,.9,.06, 0,.45,1.07); panel(3,.9,.06, 0,.45,-1.07); panel(.06,.9,2.2, -1.47,.45,0); panel(.06,.9,2.2, 1.47,.45,0);
  const handle = new THREE.Mesh(new THREE.CapsuleGeometry(.05,1.5,6,12), dark); handle.rotation.z=Math.PI/2; handle.position.set(-.1,.22,.5); box.add(handle);
  const bowl = new THREE.Mesh(new THREE.SphereGeometry(.22,24,16), dark); bowl.scale.set(1.35,.32,1); bowl.position.set(.95,.22,.5); box.add(bowl);
  const book = new THREE.Mesh(new THREE.BoxGeometry(1.1,.1,1.0), cream); book.position.set(-.55,.12,-.45); box.add(book);
  const rings = new THREE.Group(); for(let i=0;i<6;i++){ const t=new THREE.Mesh(new THREE.TorusGeometry(.06,.012,8,20), dark); t.position.set(-1.05,.17,-.85+i*.16); t.rotation.y=Math.PI/2; rings.add(t); } box.add(rings);
  const hinge = new THREE.Group(); hinge.position.set(0,.9,-1.1); box.add(hinge);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(3.08,.12,2.28), wood); lid.position.set(0,.06,1.14); hinge.add(lid);
  const sleeve = new THREE.Mesh(new THREE.BoxGeometry(3.12,.14,.62), new THREE.MeshStandardMaterial({color:'#1F7A3E', roughness:.6})); sleeve.position.set(0,.06,1.14); hinge.add(sleeve);
  let open=0, intro=0;
  return { scene, camera, until:2.2, update(S){
    intro = Math.min(1, intro+S.dt/1.6);
    const target = .12*intro + .88*Math.min(1, S.scrollY/(S.vh*.8));
    open += (target-open)*(1-Math.exp(-S.dt*4));
    hinge.rotation.x = -open*1.95 - (1-open)*Math.max(0,Math.sin(S.t*1.6))*.04;
    box.rotation.y = -.6 + Math.sin(S.t*.3)*.15 + S.sx*.3;
    box.scale.setScalar(S.wide?1:.5); box.position.set(S.wide?1.4:0, S.wide?-.4:.1, 0);
    camera.position.set(0, 3.2 - S.sy*.5, 8); camera.lookAt(S.wide?.4:0, .4, 0);
  }};
};

/* --- IMANA: flowing fabric --- */
SCENES.cloth = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#E8E4E0');
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100); camera.position.set(0,0,10);
  const U = {uTime:{value:0}, uA:{value:new THREE.Color('#141114')}, uB:{value:new THREE.Color('#BFA58C')}, uMix:{value:0}};
  const mat = new THREE.ShaderMaterial({ uniforms:U, side:THREE.DoubleSide,
    vertexShader:`${NOISE}
      uniform float uTime; varying vec3 vN; varying vec3 vV;
      float hgt(vec2 p){ float fall=(5.0-p.y)/10.0;
        float w = snoise(vec3(p.x*.28, p.y*.12, uTime*.08))*2.2;
        return (sin(p.x*2.1 + w + uTime*.45)*.22 + sin(p.x*4.3 - w*.5 + uTime*.3)*.07 + snoise(vec3(p*.22, uTime*.1))*.28) * (.45+fall*.85); }
      void main(){
        vec2 p = position.xy; float e=.04;
        float h = hgt(p), hx = hgt(p+vec2(e,0.)), hy = hgt(p+vec2(0.,e));
        vec3 n = normalize(vec3(-(hx-h)/e, -(hy-h)/e, 1.0));
        vec3 pos = vec3(p.x + sin(p.y*.5+uTime*.4)*.3, p.y, h);
        vec4 mv = modelViewMatrix*vec4(pos,1.0); vV=-mv.xyz; vN=normalize(normalMatrix*n);
        gl_Position = projectionMatrix*mv; }`,
    fragmentShader:`uniform vec3 uA,uB; uniform float uMix; varying vec3 vN; varying vec3 vV;
      void main(){ vec3 N=normalize(vN); if(!gl_FrontFacing) N=-N; vec3 V=normalize(vV);
        vec3 L=normalize(vec3(-.5,.6,.8)); float dif=max(dot(N,L),0.);
        float sp=pow(max(dot(reflect(-L,N),V),0.),28.); float rim=pow(1.-max(dot(N,V),0.),2.);
        vec3 base=mix(uA,uB,uMix);
        vec3 col=base*(.38+.72*dif) + sp*mix(vec3(1.),base,.4)*.22 + rim*base*.3;
        gl_FragColor=vec4(col,1.); }` });
  const seg = S.wide ? [140,200] : [80,120];
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(7,10,seg[0],seg[1]), mat); scene.add(mesh);
  const looks = ['#141114','#BFA58C','#9E1426'].map(c=>new THREE.Color(c));
  return { scene, camera, until:1.3, update(S){
    U.uTime.value = S.t;
    const ph = S.t*.12 + S.scrollY/S.vh*1.2, i = Math.floor(ph)%3, f = ph-Math.floor(ph);
    U.uA.value.copy(looks[i]); U.uB.value.copy(looks[(i+1)%3]); U.uMix.value = THREE.MathUtils.smoothstep(f,.7,1);
    mesh.rotation.set(-.2 + S.sy*.1, S.sx*.25, -.25);
    mesh.scale.setScalar(S.wide?1:.75); mesh.position.set(S.wide?halfH(camera,10)*camera.aspect*.62:0, S.wide?0:2.7, 0);
  }};
};

/* --- Editorial: camera aperture --- */
SCENES.aperture = (S)=>{
  const bg='#170A08';
  const scene = new THREE.Scene(); scene.background = new THREE.Color(bg);
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100); camera.position.set(0,0,9);
  scene.add(new THREE.AmbientLight('#ffe0cc',.7));
  const pl = new THREE.PointLight('#ffb27a',16,0,2); pl.position.set(2.2,2.0,2.6); scene.add(pl);
  const dl = new THREE.DirectionalLight('#ffd7b5',1.2); dl.position.set(-3,3,4); scene.add(dl);
  const rig = new THREE.Group(); scene.add(rig);
  const Rh = 2.2;
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(6,6), new THREE.MeshBasicMaterial({map:ctex(radial(512,[[0,'rgba(255,236,205,1)'],[.35,'rgba(255,180,110,.9)'],[.7,'rgba(190,70,30,.35)'],[1,'rgba(120,30,10,0)']])), transparent:true, depthWrite:false}));
  glow.position.z=-1.2; rig.add(glow);
  const barMat = new THREE.MeshBasicMaterial({color:'#2a120c', transparent:true, opacity:.55});
  const b1 = new THREE.Mesh(new THREE.PlaneGeometry(.08,4.4), barMat); b1.position.set(.25,0,-1.1); rig.add(b1);
  const b2 = new THREE.Mesh(new THREE.PlaneGeometry(4.4,.08), barMat); b2.position.set(0,.35,-1.1); rig.add(b2);
  const N=7, shape = new THREE.Shape();
  shape.moveTo(-3.4,0); shape.quadraticCurveTo(0,-.22,3.4,0); shape.lineTo(3.4,3.8); shape.lineTo(-3.4,3.8); shape.closePath();
  const bladeGeo = new THREE.ExtrudeGeometry(shape,{depth:.025, bevelEnabled:false, curveSegments:24});
  const bladeMat = new THREE.MeshStandardMaterial({color:'#24150f', metalness:.65, roughness:.34});
  const bladeEdge = new THREE.EdgesGeometry(bladeGeo, 30), edgeMat = new THREE.LineBasicMaterial({color:'#b07a5e', transparent:true, opacity:.55});
  const pivots=[], blades=[];
  for(let i=0;i<N;i++){ const p=new THREE.Group(); p.position.z=i*.03; const b=new THREE.Mesh(bladeGeo,bladeMat); b.add(new THREE.LineSegments(bladeEdge, edgeMat)); b.position.x=.9; p.add(b); rig.add(p); pivots.push(p); blades.push(b); }
  const mask = new THREE.Mesh(new THREE.RingGeometry(Rh,14,120), new THREE.MeshBasicMaterial({color:bg})); mask.position.z=.4; rig.add(mask);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(Rh,.07,20,160), new THREE.MeshStandardMaterial({color:'#6e4a3c', metalness:.6, roughness:.3})); torus.position.z=.42; rig.add(torus);
  const outer = Rh+.75, mc = mk(1024,1024), mg = mc.getContext('2d'); mg.translate(512,512); const sc = 512/outer;
  mg.strokeStyle='rgba(243,230,224,.55)'; mg.lineWidth=2;
  for(let i=0;i<120;i++){ const a=i/120*Math.PI*2, r0=(Rh+.14)*sc, r1=(Rh+(i%5===0?.3:.22))*sc; mg.beginPath(); mg.moveTo(Math.cos(a)*r0,Math.sin(a)*r0); mg.lineTo(Math.cos(a)*r1,Math.sin(a)*r1); mg.stroke(); }
  const fs=['1.4','2','2.8','4','5.6','8','11','16']; mg.fillStyle='rgba(243,230,224,.85)'; mg.font='600 30px Archivo'; mg.textAlign='center'; mg.textBaseline='middle';
  fs.forEach((f,i)=>{ const a=-Math.PI*.85+i/(fs.length-1)*Math.PI*.7; mg.save(); mg.rotate(a+Math.PI/2); mg.translate(0,-(Rh+.5)*sc); mg.fillText(f,0,0); mg.restore(); });
  mg.fillStyle='#E8402F'; mg.beginPath(); mg.arc(0,-(Rh+.66)*sc,7,0,Math.PI*2); mg.fill();
  const marks = new THREE.Mesh(new THREE.RingGeometry(Rh+.1,outer,160), new THREE.MeshBasicMaterial({map:ctex(mc), transparent:true})); marks.position.z=.43; rig.add(marks);
  let open=0;
  return { scene, camera, until:2.2, update(S){
    const target = Math.min(1, Math.max(0, S.scrollY/(S.vh*.85)));
    open += (target-open)*(1-Math.exp(-S.dt*6));
    const e = open<.5 ? 4*open**3 : 1-Math.pow(-2*open+2,3)/2;
    const d = .16 + e*1.8 + (1-open)*Math.sin(S.t*1.4)*.05;
    blades.forEach(b=>b.position.y=d);
    pivots.forEach((p,i)=>p.rotation.z = i/N*Math.PI*2 + e*.55 + S.t*.02);
    glow.material.opacity = .45+.55*e;
    rig.rotation.y = S.sx*.22; rig.rotation.x = S.sy*.18;
    const hw = halfH(camera,9)*camera.aspect;
    rig.scale.setScalar(S.wide ? .86 : Math.min(1, hw*.95/(Rh+.3)));
    rig.position.x = S.wide ? hw*.3 : 0;
  }};
};

/* --- Weddings: golden-hour bokeh --- */
SCENES.bokeh = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#2B2118');
  const camera = new THREE.PerspectiveCamera(45, S.vw/S.vh, .1, 100); camera.position.set(0,0,10);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(70,44), new THREE.MeshBasicMaterial({map:ctex(vgrad(16,256,[[0,'#2B2118'],[.55,'#5a3520'],[.78,'#b0612a'],[1,'#3a2416']]))}));
  sky.position.z=-22; scene.add(sky);
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(16,16), new THREE.MeshBasicMaterial({map:ctex(radial(256,[[0,'rgba(255,214,150,.9)'],[.25,'rgba(255,170,90,.45)'],[1,'rgba(255,120,40,0)']])), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending}));
  sun.position.set(3.5,-2.2,-18); scene.add(sun);
  const N = S.wide?220:130, r = rng(12), pos = new Float32Array(N*3), col = new Float32Array(N*3), sz = new Float32Array(N), sd = new Float32Array(N);
  const pal = ['#FFC56B','#FF9A4D','#FFE2A8','#FF8FA3','#FFD27F'].map(c=>new THREE.Color(c));
  for(let i=0;i<N;i++){ pos.set([(r()-.5)*26,(r()-.5)*15,-14+r()*20],i*3); const c=pal[(r()*pal.length)|0]; col.set([c.r,c.g,c.b],i*3); sz[i]=.4+r()*1.4; sd[i]=r(); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.BufferAttribute(pos,3)); geo.setAttribute('aCol',new THREE.BufferAttribute(col,3)); geo.setAttribute('aSize',new THREE.BufferAttribute(sz,1)); geo.setAttribute('aSeed',new THREE.BufferAttribute(sd,1));
  const U = {uTime:{value:0}, uPR:{value:renderer.getPixelRatio()}, uH:{value:S.vh}};
  const mat = new THREE.ShaderMaterial({ uniforms:U, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    vertexShader:`attribute vec3 aCol; attribute float aSize; attribute float aSeed; uniform float uTime,uPR,uH; varying vec3 vC; varying float vB; varying float vA;
      void main(){ vec3 p=position; p.y+=sin(uTime*.2+aSeed*6.)*.5; p.x+=cos(uTime*.15+aSeed*5.)*.6;
        vec4 mv=modelViewMatrix*vec4(p,1.); float z=-mv.z; vB=clamp(abs(z-9.)/8.,0.,1.);
        gl_PointSize=aSize*uPR*uH*.09*(.5+vB*1.2)/z; vC=aCol; vA=mix(.9,.35,vB); gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`varying vec3 vC; varying float vB; varying float vA;
      void main(){ float d=length(gl_PointCoord-.5)*2.; if(d>1.) discard; float edge=mix(.06,.6,vB);
        float a=smoothstep(1.,1.-edge,d); float ring=smoothstep(.72,.95,d)*(1.-vB)*.6;
        gl_FragColor=vec4(vC,(a*.3+ring*a)*vA); }` });
  scene.add(new THREE.Points(geo, mat));
  return { scene, camera, until:1.3, resize(S){ U.uH.value=S.vh; }, update(S){
    U.uTime.value = S.t;
    camera.position.set(S.sx*.9, -S.sy*.5 + S.scrollY/S.vh*.8, 10); camera.lookAt(0,0,0);
  }};
};

/* --- Landscapes: layered hills and drifting petals --- */
SCENES.hills = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#5E7A6A');
  const camera = new THREE.PerspectiveCamera(40, S.vw/S.vh, .1, 200);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(120,70), new THREE.MeshBasicMaterial({map:ctex(vgrad(16,256,[[0,'#34503F'],[.55,'#7E9884'],[1,'#B7C7B2']]))}));
  sky.position.set(0,10,-40); scene.add(sky);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(2.2,64), new THREE.MeshBasicMaterial({color:'#E6E8D6'})); sun.position.set(-6,7,-38); scene.add(sun);
  const L=7, cFar=new THREE.Color('#93AB98'), cNear=new THREE.Color('#1D3326'), r=rng(31), layers=[];
  for(let k=0;k<L;k++){
    const t=k/(L-1), z=-26+t*26, base=THREE.MathUtils.lerp(4.2,-1.1,t), amp=THREE.MathUtils.lerp(2.4,.55,t);
    const ph=[r()*6,r()*6,r()*6], sh=new THREE.Shape(), X=40;
    sh.moveTo(-X,-30);
    for(let i=0;i<=200;i++){ const x=-X+i/200*2*X; const y=base + amp*(Math.sin(x*.18+ph[0])*.6 + Math.sin(x*.47+ph[1])*.28 + Math.sin(x*1.3+ph[2])*.08); sh.lineTo(x,y); }
    sh.lineTo(X,-30); sh.closePath();
    const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({color:cFar.clone().lerp(cNear,Math.pow(t,1.3))}));
    m.position.z=z; scene.add(m); layers.push(m);
  }
  const P=60, petals=[], pg=new THREE.CircleGeometry(.09,10);
  const red=new THREE.MeshBasicMaterial({color:'#D9342B',side:THREE.DoubleSide}), yel=new THREE.MeshBasicMaterial({color:'#F2C94C',side:THREE.DoubleSide});
  for(let i=0;i<P;i++){ const m=new THREE.Mesh(pg, i%4===0?yel:red); m.scale.set(1,.6,1); m.position.set((r()-.5)*16,(r()-.5)*8+1,-r()*6+2); m.userData={s:.2+r()*.4,ph:r()*6,rx:r()*3,ry:r()*3}; scene.add(m); petals.push(m); }
  return { scene, camera, until:1.3, update(S){
    const f = Math.min(1, S.scrollY/S.vh);
    camera.position.set(S.sx*1.2, 1.5 - S.sy*.4 + f*.5, 10 - f*2.5); camera.lookAt(S.sx*.3, 1, 0);
    petals.forEach(m=>{ const u=m.userData; m.position.y -= S.dt*u.s*.5; m.position.x += Math.sin(S.t*.8+u.ph)*S.dt*.4 + S.dt*.15;
      if(m.position.y<-3.5){ m.position.y=6; m.position.x=(Math.random()-.5)*16; }
      m.rotation.x += S.dt*u.rx; m.rotation.y += S.dt*u.ry; });
  }};
};

/* --- Abstractions: a living drop of paint --- */
SCENES.blob = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#142045');
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100); camera.position.set(0,0,7.5);
  const U = {uTime:{value:0}, uAmp:{value:.3}, uFreq:{value:.85}, uShift:{value:0}};
  const mat = new THREE.ShaderMaterial({ uniforms:U,
    vertexShader:`${NOISE}
      uniform float uTime,uAmp,uFreq; varying vec3 vN; varying vec3 vV; varying float vH;
      vec3 disp(vec3 n){ float h=snoise(n*uFreq*1.6+vec3(uTime*.16,uTime*.11,-uTime*.07)); h+=.45*snoise(n*uFreq*3.4-vec3(uTime*.12)); return n*(1.5+h*uAmp); }
      void main(){ vec3 n=normalize(position); vec3 t=normalize(cross(n, abs(n.y)<.98?vec3(0.,1.,0.):vec3(1.,0.,0.))); vec3 b=normalize(cross(n,t)); float e=.012;
        vec3 p0=disp(n), p1=disp(normalize(n+t*e)), p2=disp(normalize(n+b*e));
        vec3 nn=normalize(cross(p1-p0,p2-p0)); if(dot(nn,n)<0.) nn=-nn;
        vH=length(p0)-1.5; vec4 mv=modelViewMatrix*vec4(p0,1.); vV=-mv.xyz; vN=normalize(normalMatrix*nn); gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`uniform float uShift; varying vec3 vN; varying vec3 vV; varying float vH;
      vec3 pal(float t){ return vec3(.5)+vec3(.5)*cos(6.28318*(vec3(1.)*t+vec3(.0,.33,.67))); }
      void main(){ vec3 N=normalize(vN), V=normalize(vV); float fr=pow(1.-max(dot(N,V),0.),2.2);
        vec3 L=normalize(vec3(-.4,.7,.6)); float dif=max(dot(N,L),0.); vec3 H=normalize(L+V); float sp=pow(max(dot(N,H),0.),60.);
        vec3 base=mix(vec3(.10,.20,.62), vec3(.89,.58,.22), smoothstep(-.22,.32,vH));
        vec3 col=mix(base, pal(fr*.8+vH*1.3+uShift), .18+fr*.5);
        col*=.35+.85*dif; col+=sp*vec3(1.,.93,.82)*.9; col+=fr*vec3(.95,.62,.3)*.22;
        gl_FragColor=vec4(col,1.); }` });
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1, S.wide?64:40), mat); scene.add(mesh);
  return { scene, camera, until:1.3, update(S){
    U.uTime.value=S.t; U.uAmp.value += ((.28+S.speed*.35)-U.uAmp.value)*.06; U.uShift.value = S.scrollY/S.vh*.35 + S.t*.02;
    mesh.rotation.y = S.t*.08 + S.sx*.5; mesh.rotation.x = S.sy*.3;
    mesh.scale.setScalar(S.wide?1:Math.min(1,(S.vw/S.vh)*1.35)); mesh.position.y = S.wide?.25:.6;
  }};
};

/* --- Light & Shadow: a candle --- */
SCENES.candle = (S)=>{
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#120D09');
  const camera = new THREE.PerspectiveCamera(35, S.vw/S.vh, .1, 100);
  scene.add(new THREE.AmbientLight('#ffe2b8',.45));
  const fill = new THREE.DirectionalLight('#ffcf94',.7); fill.position.set(1,2,6); scene.add(fill);
  const root = new THREE.Group(); scene.add(root);
  const brass = new THREE.MeshStandardMaterial({color:'#C9A14A', metalness:.85, roughness:.3});
  const prof = [[0,0],[1.1,0],[1.15,.05],[1.12,.12],[.5,.18],[.32,.3],[.28,.55],[.4,.62],[.42,.7],[0,.7]].map(p=>new THREE.Vector2(p[0],p[1]));
  root.add(new THREE.Mesh(new THREE.LatheGeometry(prof,64), brass));
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.25,.05,12,32,Math.PI*1.3), brass); handle.position.set(1.25,.25,0); handle.rotation.z=-Math.PI*.6; root.add(handle);
  const wax = new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,1.8,48), new THREE.MeshStandardMaterial({color:'#F6EBD3', roughness:.8, emissive:'#5a3615', emissiveIntensity:.35})); wax.position.y=1.6; root.add(wax);
  const wick = new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.14,6), new THREE.MeshBasicMaterial({color:'#1a120c'})); wick.position.y=2.57; root.add(wick);
  const FU = {uTime:{value:0}, uLean:{value:0}};
  const flame = new THREE.Mesh(new THREE.PlaneGeometry(.42,.95), new THREE.ShaderMaterial({ uniforms:FU, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader:`uniform float uTime,uLean; varying vec2 vUv;
      void main(){ vec2 p=vUv*2.-1.; float t=vUv.y;
        p.x += (sin(uTime*9.+t*4.)*.05 + sin(uTime*13.7)*.02 + uLean*.25)*t*t;
        float hw = .62*pow(1.-t,.85)*smoothstep(0.,.28,t)+.001;
        float a = smoothstep(hw, hw*.25, abs(p.x)) * smoothstep(0.,.1,t) * smoothstep(1.,.8,t);
        float core = smoothstep(hw*.6, 0., abs(p.x)) * smoothstep(.75,.15,t);
        vec3 col = mix(vec3(1.,.48,.12), vec3(1.,.93,.72), core);
        col = mix(col, vec3(.35,.5,1.), smoothstep(.22,.02,t)*.7);
        gl_FragColor = vec4(col, a*(.85+.15*sin(uTime*21.))); }` }));
  flame.position.y = 2.95; root.add(flame);
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(5,5), new THREE.MeshBasicMaterial({map:ctex(radial(256,[[0,'rgba(255,190,110,.55)'],[.3,'rgba(255,150,60,.18)'],[1,'rgba(255,120,40,0)']])), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending}));
  halo.position.set(0,2.9,-.4); root.add(halo);
  const light = new THREE.PointLight('#ffb35c', 6, 0, 2); light.position.set(0,3.0,.25); root.add(light);
  const E=70, ep=new Float32Array(E*3), ed=[], r=rng(5);
  for(let i=0;i<E;i++){ ed.push({v:.2+r()*.5, ph:r()*6, life:r()}); }
  const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(ep,3));
  const embers = new THREE.Points(eg, new THREE.PointsMaterial({color:'#FFB35C', size:.035, transparent:true, opacity:.8, depthWrite:false, blending:THREE.AdditiveBlending})); root.add(embers);
  return { scene, camera, until:1.3, update(S){
    FU.uTime.value=S.t; FU.uLean.value += ((-S.sx*.8)-FU.uLean.value)*.05;
    const fl = .85 + Math.sin(S.t*11.)*.06 + Math.sin(S.t*23.)*.04 + Math.sin(S.t*3.1)*.05;
    light.intensity = 6*fl; halo.material.opacity = .8*fl + .2;
    flame.lookAt(camera.position.x, flame.getWorldPosition(new THREE.Vector3()).y, camera.position.z);
    ed.forEach((e,i)=>{ e.life += S.dt*e.v*.35; if(e.life>1) e.life-=1; ep[i*3]=Math.sin(S.t*.8+e.ph)*.25*e.life + FU.uLean.value*e.life*.6; ep[i*3+1]=3.1+e.life*2.6; ep[i*3+2]=Math.cos(S.t*.7+e.ph)*.2*e.life; });
    eg.attributes.position.needsUpdate = true;
    root.rotation.y = S.sx*.35 + Math.sin(S.t*.2)*.1;
    root.scale.setScalar(S.wide?1:.8); root.position.set(S.wide?-1.6:0, S.wide?-1.7:-1.1, 0);
    camera.position.set(0, 2.0 - S.sy*.4 + S.scrollY/S.vh*.6, 8.5); camera.lookAt(S.wide?-.6:0, S.wide?.9:1.2, 0);
  }};
};

/* ================= motion system ================= */
const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
const HAS_GSAP = !!(gsap && ScrollTrigger);
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
if(HAS_GSAP){ gsap.registerPlugin(ScrollTrigger); if(SplitText) gsap.registerPlugin(SplitText); }
let lenis = null;
try{
  if(window.Lenis && !reduced){
    lenis = new window.Lenis({lerp:.09});
    if(HAS_GSAP){ lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = t=>{ lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }
}catch(e){ lenis = null; }
let cleanups = [];
const onCleanup = f => cleanups.push(f);
function cleanupView(){ try{ lbClose(); }catch(_){} cleanups.forEach(f=>{ try{ f(); }catch(_){} }); cleanups = []; if(HAS_GSAP) ScrollTrigger.getAll().forEach(t=>t.kill()); }
function split(el, type, opts={}){ if(!SplitText || !el) return null; try{ return SplitText.create(el, {type, ...opts}); }catch(e){ return null; } }
function magnet(el, k=.32){
  if(!FINE || !HAS_GSAP || !el) return;
  const xTo = gsap.quickTo(el,'x',{duration:.7,ease:'elastic.out(1,.45)'}), yTo = gsap.quickTo(el,'y',{duration:.7,ease:'elastic.out(1,.45)'});
  el.addEventListener('pointermove', e=>{ const r = el.getBoundingClientRect(); xTo((e.clientX-(r.left+r.width/2))*k); yTo((e.clientY-(r.top+r.height/2))*k); });
  el.addEventListener('pointerleave', ()=>{ xTo(0); yTo(0); });
}
function skewOnScroll(els, prop='skewY', max=6, div=350, onV){
  if(!HAS_GSAP || !els.length) return;
  const set = els.map(el=>gsap.quickSetter(el, prop, 'deg')); let tgt = 0, v = 0;
  ScrollTrigger.create({onUpdate:self=>{ tgt = gsap.utils.clamp(-max, max, self.getVelocity()/-div); }});
  const tick = ()=>{ v += (tgt-v)*.12; tgt *= .9; if(Math.abs(v)<.005) v = 0; set.forEach(s=>s(v)); onV && onV(v); };
  gsap.ticker.add(tick); onCleanup(()=>gsap.ticker.remove(tick));
}
// custom cursor
const cursorEl = $('.cursor'), cursorLabel = $('.cursor span');
if(FINE && HAS_GSAP){
  document.body.classList.add('has-cursor');
  const cx = gsap.quickTo(cursorEl,'x',{duration:.2,ease:'power3'}), cy = gsap.quickTo(cursorEl,'y',{duration:.2,ease:'power3'});
  addEventListener('pointermove', e=>{ cx(e.clientX); cy(e.clientY); }, {passive:true});
  document.addEventListener('pointerover', e=>{
    const c = e.target.closest('[data-cursor]'), l = e.target.closest('a,button');
    const big = !!c && !(c.classList.contains('home-hero') && l);
    cursorEl.classList.toggle('big', big); cursorEl.classList.toggle('link', !big && !!l);
    cursorLabel.textContent = big ? c.dataset.cursor : '';
  });
} else if(cursorEl) cursorEl.remove();
// film grain texture
(()=>{ const c = mk(180,180), g = c.getContext('2d'), d = g.createImageData(180,180);
  for(let i=0;i<d.data.length;i+=4){ const v = Math.random()*255; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=255; }
  g.putImageData(d,0,0); document.documentElement.style.setProperty('--noise', `url(${c.toDataURL()})`); })();

/* ================= thumbnails rendered from each 3D scene ================= */
const THUMBS = {}; let thumbQueue = [], thumbTick = 0;
PROJECTS.forEach(p=>{ THUMBS[p.slug] = `img/sm/${p.cover}.jpg`; });
function queueThumbs(){ if(!renderer) return; thumbQueue = PROJECTS.filter(p=>!THUMBS[p.slug]); }
function makeThumb(p){
  const tw = 300, th = 375, pr = renderer.getPixelRatio();
  if(canvas.width < tw*pr || canvas.height < th*pr) return;
  const F = {t:3, dt:.02, mx:0, my:0, sx:0, sy:0, speed:0, scrollY:0, vw:tw, vh:th, wide:false, docH:3000};
  let sc; try{ sc = SCENES[p.scene](F, p); }catch(e){ return; }
  try{
    sc.camera.aspect = tw/th; sc.camera.updateProjectionMatrix();
    for(let i=0;i<70;i++){ F.t += .02; sc.update(F); }
    renderer.setRenderTarget(null);
    renderer.setViewport(0,0,tw,th); renderer.setScissor(0,0,tw,th); renderer.setScissorTest(true);
    renderer.render(sc.scene, sc.camera);
    const c = mk(Math.round(tw*pr), Math.round(th*pr));
    c.getContext('2d').drawImage(canvas, 0, canvas.height-c.height, c.width, c.height, 0, 0, c.width, c.height);
    THUMBS[p.slug] = c.toDataURL('image/jpeg', .82);
  } finally {
    renderer.setScissorTest(false); renderer.setViewport(0,0,S.vw,S.vh);
    sc.dispose && sc.dispose(); disposeScene(sc.scene);
  }
  $$(`img[data-thumb="${p.slug}"]`).forEach(img=>{ img.src = THUMBS[p.slug]; img.onload = ()=>img.classList.add('ready'); });
}

/* ================= views ================= */
const view = $('#view');
const CIRCLE = '<svg class="mark" viewBox="0 0 180 140" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M24,62 C20,24 82,6 116,12 C156,19 176,52 162,90 C150,122 88,134 50,118 C20,105 12,78 34,58"/></svg>';
let curP = null;
const IMG = (w, im, sizes='(max-width:760px) 100vw, 50vw') => `<img class="wimg" src="img/${im[0]}.jpg" srcset="img/sm/${im[0]}.jpg 640w, img/${im[0]}.jpg ${im[1]}w" sizes="${sizes}" width="${im[1]}" height="${im[2]}" alt="${esc(w.title)}" loading="lazy" decoding="async" data-lb="${im[0]}" data-cursor="Open">`;
const fig = (w, im, cls='', sizes) => `<figure class="${cls}"><div class="mwrap">${IMG(w, im, sizes)}</div><figcaption class="fc"><b>${esc(w.title)}</b>${w.meta?`<span>${esc(w.meta)}</span>`:''}</figcaption></figure>`;
const grid = (w, ims, sizes='(max-width:760px) 50vw, 25vw') => ims.length ? `<div class="mgrid">${ims.map(im=>`<div class="tile"><div class="mwrap">${IMG(w, im, sizes)}</div></div>`).join('')}</div>` : '';
const sub = (t, m) => `<h3 class="sub">${esc(t)}${m?`<span>${esc(m)}</span>`:''}</h3>`;
const LAYOUTS = {
  campaign: p => { const [po, ca] = p.works; return `<div class="lay-campaign">${po.imgs.map(im=>fig(po, im, '', '(max-width:760px) 100vw, 45vw')).join('')}<div class="c-note"><p>${p.note}</p></div></div>${sub(ca.title, ca.meta)}${grid(ca, ca.imgs)}`; },
  shelf: p => `<div class="lay-shelf">${p.works.map(w=>fig(w, w.imgs[0], '', '(max-width:760px) 50vw, 20vw')).join('')}</div>${sub('More views')}<div class="mgrid">${p.works.flatMap(w=>w.imgs.slice(1).map(im=>`<div class="tile"><div class="mwrap">${IMG(w, im, '(max-width:760px) 50vw, 25vw')}</div><p class="tcap">${esc(w.title)}</p></div>`)).join('')}</div>`,
  split: p => p.works.map(w=>`<section class="pub"><div class="pub-head"><h3>${esc(w.title)}</h3><p>${esc(w.meta)}</p>${w.credit?`<p class="credit">${esc(w.credit)}</p>`:''}</div><div class="pub-body">${fig(w, w.imgs[0], 'pub-main', '(max-width:760px) 100vw, 60vw')}${grid(w, w.imgs.slice(1), '(max-width:760px) 50vw, 30vw')}</div></section>`).join(''),
  single: p => { const w = p.works[0]; return `<div class="lay-single">${fig(w, w.imgs[0], '', '(max-width:760px) 100vw, 60vw')}<dl class="specs">${p.specs.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>${grid(w, w.imgs.slice(1), '(max-width:760px) 50vw, 33vw')}`; },
  lookbook: p => `<div class="lay-look">${allImgs(p).map(({w,im},i)=>`<figure><span class="num">${String(i+1).padStart(2,'0')}</span><div class="mwrap">${IMG(w, im, '(max-width:760px) 100vw, 50vw')}</div><figcaption class="fc"><b>${esc(w.title)}</b><span>${esc(w.meta)}</span></figcaption></figure>`).join('')}</div>`,
  sheet: p => `<div class="lay-sheet"><div class="sheet">${allImgs(p).map(({w,im},i)=>`<div class="frame"><div class="mwrap">${IMG(w, im, '(max-width:760px) 50vw, 33vw')}</div><div class="edge"><span>${11+i*2}</span><span>${11+i*2}A</span></div>${i===4?CIRCLE:''}</div>`).join('')}</div></div>`,
  strip: p => p.works.map(w=>`${sub(w.title, w.meta)}<div class="strip" tabindex="0" data-lenis-prevent aria-label="${esc(w.title)}, scroll sideways">${w.imgs.map(im=>`<figure><div class="mwrap">${IMG(w, im, '(max-width:760px) 85vw, 45vw')}</div></figure>`).join('')}</div><div class="strip-ctl"><button class="btn" data-dir="-1">Previous</button><button class="btn" data-dir="1">Next</button></div>`).join('<div class="gap"></div>'),
  wall: p => `<div class="lay-wall">${p.works.map(w=>`<figure class="work"><div class="fr"><div class="mwrap">${IMG(w, w.imgs[0], '(max-width:760px) 100vw, 45vw')}</div></div><figcaption class="label"><b>${esc(w.title)}</b>${esc(w.meta)}${w.imgs.length>1?`, ${w.imgs.length} views`:''}</figcaption></figure>`).join('')}</div>`,
  stagger: p => `<div class="lay-stagger">${p.works.map(w=>fig(w, w.imgs[0], '', '(max-width:760px) 100vw, 45vw')).join('')}</div>`,
  salon: p => `<div class="lay-salon">${p.works.map((w,i)=>fig(w, w.imgs[0], 's'+(i+1), '(max-width:760px) 100vw, 45vw')).join('')}</div>`,
};
const footer = () => `<footer class="footer"><span>© 2026 Dina Tajić</span><nav aria-label="Instagram">${Object.values(IG).map(h=>`<a href="https://instagram.com/${h}" target="_blank" rel="noopener">@${h}</a>`).join('')}</nav></footer>`;
const badge = id => `<a class="badge" data-hire data-cursor="WhatsApp" aria-label="Hire me on WhatsApp"><svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="${id}" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs><text><textPath href="#${id}" textLength="500" lengthAdjust="spacing">hire me ✶ write on whatsapp ✶ hire me ✶ write on whatsapp ✶</textPath></text></svg>${ICON.replace('<svg','<svg class="core"')}</a>`;
const thumbImg = slug => `<img data-thumb="${slug}" alt="" src="${THUMBS[slug]}" loading="lazy" onload="this.classList.add('ready')">`;

function homeHTML(){
  const name = ['Dina','Tajić'].map(w=>`<span class="ln">${[...w].map(ch=>`<span class="ch">${ch}</span>`).join('')}</span>`).join('');
  const rows = PROJECTS.map(p=>`<li data-disc="${p.disc}"><a href="#${p.slug}" data-disc="${p.disc}" data-slug="${p.slug}" data-cursor="View"><span class="th">${thumbImg(p.slug)}</span><span class="t">${esc(p.title)}</span><span class="d">${esc(p.kind)}</span><span class="y">${p.disc}</span></a></li>`).join('');
  const mqOne = ['Photography','Art','Graphic design','Photography','Art','Graphic design'].map(w=>`<span>${w}</span><b>✶</b>`).join('');
  const panels = [
    ['photo','#1E1819','#F3EEEA','#FFC64A','Weddings, couples, lookbooks and editorials.'],
    ['design','#3442D6','#F3EEEA','#FFC64A','Campaigns, book covers, editorial design and packaging. Bachelor of Graphic Design.'],
    ['art','#C8445A','#1E1819','#F3EEEA','Landscapes, abstraction, still life and drawing. Academic painter.'],
  ].map(([k,bg,fg,ac,txt])=>{ const ps = PROJECTS.filter(p=>p.disc===k);
    return `<article class="panel" style="--pbg:${bg};--pfg:${fg};--pac:${ac}"><div class="pl"><h3>${k}</h3><div class="pc"><p>${txt}</p><p class="pn">${ps.length} projects</p><a class="textlink" href="https://instagram.com/${IG[k]}" target="_blank" rel="noopener">@${IG[k]}</a>${hire(`Hire me for ${k}`,`data-disc="${k}" data-cursor="WhatsApp"`)}</div></div><div class="collage">${ps.map(p=>`<a class="cimg" href="#${p.slug}" data-cursor="View" aria-label="${esc(p.title)}">${thumbImg(p.slug)}</a>`).join('')}</div></article>`; }).join('');
  return `
  <section class="home-hero" id="home" aria-label="Intro" data-cursor="Paint">
    <div class="tagline"><p>Photography<i>|</i>Art<i>|</i>Graphic design</p><p>Available for commissions</p></div>
    <h1 class="name" aria-label="Dina Tajić">${name}</h1>
    <div class="hero-foot">
      <div><p class="lede">Academic painter, graphic designer and photographer. Paintings, covers, campaigns, lookbooks and weddings, made to order.</p><p class="paint-hint">${FINE ? 'Move the cursor, the paint follows you.' : 'Drag sideways across the screen to paint.'}</p></div>
      ${badge('bp1')}
    </div>
  </section>
  <section class="marquee" aria-hidden="true"><div class="mq-inner"><div class="mq-track">${mqOne}${mqOne}</div></div></section>
  <section class="index" id="work" aria-labelledby="work-h"><div class="col">
    <div class="index-head"><h2 class="h2" id="work-h">Work</h2>
      <div class="filters" role="group" aria-label="Filter by practice">
        <button aria-pressed="true" data-f="all">All</button><button aria-pressed="false" data-f="photo">Photo</button><button aria-pressed="false" data-f="design">Design</button><button aria-pressed="false" data-f="art">Art</button>
      </div></div>
    <ul class="rows">${rows}</ul>
  </div></section>
  <div class="follower" aria-hidden="true"><img alt=""></div>
  <section class="prac-wrap" aria-label="Practices"><div class="prac-track">${panels}</div></section>
  <section class="about" id="about"><div class="col">
    <h2 class="h2">About</h2>
    <p class="scrub">I’m Dina Tajić, an academic painter with a bachelor’s degree in graphic design, and I work behind the camera too. I take commissions in all three: paintings, design for print and screen, and photography for people and brands.</p>
    <a class="textlink" href="https://instagram.com/${IG.main}" target="_blank" rel="noopener">@${IG.main} on Instagram</a>
  </div></section>
  <section class="contact" id="contact">
    <a class="big-hire" data-hire data-cursor="WhatsApp">Hire me</a>
    <div class="row"><div><p>Opens WhatsApp with a message already started. Add your idea and press send.</p><p class="num">+381 60 358 8080</p></div>${badge('bp2')}</div>
  </section>
  ${footer()}`;
}

function projectHTML(p){
  const n = PROJECTS[(PROJECTS.indexOf(p)+1)%PROJECTS.length];
  return `
  <section class="p-hero ${p.tall?'tall':''}"><div class="stick"><div class="hz ${p.hero}">
    <h1 class="pt ${p.tf}">${esc(p.title)}</h1>
    <p class="pk">${esc(p.kind)}</p>
    ${p.cue?`<p class="cue">${p.cue}</p>`:''}
  </div></div></section>
  <div class="p-body">
    <section class="p-intro">
      <p class="p-lede">${esc(p.lede)}</p>
      <div class="p-facts">
        <p><span>Practice</span>${DISC[p.disc]}</p>
        <p><span>Images</span>${allImgs(p).length}</p>
        ${p.client?`<p><span>Client</span>${esc(p.client)}</p>`:''}
        <p><a class="textlink" href="https://instagram.com/${IG[p.disc]}" target="_blank" rel="noopener">More on @${IG[p.disc]}</a></p>
        <p>${hire('Hire me','data-cursor="WhatsApp"')}</p>
      </div>
    </section>
    <section class="p-gallery" aria-label="Works">${LAYOUTS[p.layout](p)}</section>
    <section class="p-end">
      <h2>Want something like ${esc(p.title)}?</h2>
      ${hire('Hire me','data-cursor="WhatsApp"','hire-lg')}
      <p class="note">WhatsApp opens with a message about this project already written.</p>
      <a class="next" href="#${n.slug}" data-cursor="Next"><span>Next project</span><strong>${esc(n.title)}</strong></a>
      <a class="textlink" href="#work">All work</a>
    </section>
    ${footer()}
  </div>`;
}

function kineticName(el){
  const chs = $$('.ch', el), w = chs.map(()=>400); let mx = -1e4, my = -1e4, raf, on = true;
  const mv = e=>{ mx = e.clientX; my = e.clientY; };
  addEventListener('pointermove', mv, {passive:true});
  const tick = ()=>{
    raf = requestAnimationFrame(tick);
    if(S.scrollY > S.vh*1.1) return;
    const t = performance.now()/1000, rects = chs.map(c=>c.getBoundingClientRect()), R = Math.max(240, innerWidth*.24);
    chs.forEach((c,i)=>{
      const r = rects[i]; let k;
      if(FINE){ const d = Math.hypot(mx-(r.left+r.width/2), my-(r.top+r.height/2)); k = Math.max(0, 1-d/R); k = k*k*(3-2*k); }
      else k = .5+.5*Math.sin(t*1.5-i*.7);
      const target = 400 + 500*k; w[i] += (target-w[i])*.1;
      c.style.fontVariationSettings = `"wght" ${w[i].toFixed(0)}, "opsz" 96`;
    });
  };
  if(!reduced) tick();
  onCleanup(()=>{ cancelAnimationFrame(raf); removeEventListener('pointermove', mv); });
}

function enterHome(root){
  $$('.hire,.badge',root).forEach(el=>magnet(el)); magnet($('.big-hire',root), .14);
  kineticName($('.name',root));
  if(!HAS_GSAP) return;
  const chs = $$('.name .ch',root);
  gsap.from(chs,{yPercent:120, rotate:12, opacity:0, duration:1.5, ease:'expo.out', stagger:.06, delay:.35});
  gsap.from($$('.tagline p, .lede, .paint-hint',root),{opacity:0, y:26, duration:1.1, ease:'expo.out', stagger:.1, delay:.9});
  gsap.from($$('.home-hero .badge',root),{scale:0, rotate:-160, duration:1.4, ease:'back.out(1.7)', delay:1.15});
  gsap.to($('.name',root),{yPercent:-35, ease:'none', scrollTrigger:{trigger:$('.home-hero',root), start:'top top', end:'bottom top', scrub:true}});
  gsap.to($$('.hero-foot, .tagline',root),{opacity:0, y:-40, ease:'none', scrollTrigger:{trigger:$('.home-hero',root), start:'30% top', end:'bottom top', scrub:true}});
  // marquee reacts to scroll speed
  const track = $('.mq-track',root), anim = track.getAnimations ? track.getAnimations()[0] : null;
  skewOnScroll([$('.mq-inner',root)], 'skewX', 16, 160, v=>{ if(anim) anim.playbackRate = 1 + Math.abs(v)*.35; });
  // work heading and rows
  const wh = split($('#work-h',root),'chars');
  if(wh) gsap.from(wh.chars,{yPercent:110, opacity:0, rotate:8, duration:1, ease:'expo.out', stagger:.04, scrollTrigger:{trigger:'#work', start:'top 80%'}});
  gsap.from($$('.rows li',root),{y:70, opacity:0, duration:1.1, ease:'expo.out', stagger:.06, scrollTrigger:{trigger:$('.rows',root), start:'top 88%'}});
  skewOnScroll($$('.rows .t',root), 'skewX', 7, 260);
  // practices: pinned horizontal scroll on desktop
  const mm = gsap.matchMedia(); onCleanup(()=>mm.revert());
  mm.add('(min-width:900px) and (hover:hover)', ()=>{
    const trackEl = $('.prac-track',root), dist = ()=>trackEl.scrollWidth-innerWidth;
    const tw = gsap.to(trackEl,{x:()=>-dist(), ease:'none', scrollTrigger:{trigger:$('.prac-wrap',root), pin:true, scrub:.7, end:()=>'+='+dist(), invalidateOnRefresh:true}});
    $$('.panel',root).forEach((pn,i)=>{
      const h = $('h3',pn);
      if(i>0) gsap.from(h,{xPercent:45, opacity:.2, ease:'none', scrollTrigger:{trigger:pn, containerAnimation:tw, start:'left right', end:'left 30%', scrub:true}});
      $$('.cimg',pn).forEach((c,j)=>gsap.fromTo(c,{y:(j%2?1:-1)*120},{y:(j%2?-1:1)*120, ease:'none', scrollTrigger:{trigger:pn, containerAnimation:tw, start:'left right', end:'right left', scrub:true}}));
    });
  });
  mm.add('(max-width:899px), (hover:none)', ()=>{
    $$('.panel',root).forEach(pn=>{
      gsap.from($('h3',pn),{yPercent:60, opacity:0, duration:1.2, ease:'expo.out', scrollTrigger:{trigger:pn, start:'top 75%'}});
      gsap.from($$('.cimg',pn),{y:80, opacity:0, rotate:0, duration:1.2, ease:'expo.out', stagger:.1, scrollTrigger:{trigger:$('.collage',pn), start:'top 85%'}});
    });
  });
  // about: words light up as you read
  const sc = split($('.scrub',root),'words');
  if(sc) gsap.fromTo(sc.words,{opacity:.14},{opacity:1, ease:'none', stagger:.08, scrollTrigger:{trigger:$('.scrub',root), start:'top 80%', end:'bottom 45%', scrub:true}});
  const ah = split($('.about .h2',root),'chars');
  if(ah) gsap.from(ah.chars,{yPercent:110, opacity:0, duration:1, ease:'expo.out', stagger:.04, scrollTrigger:{trigger:'.about', start:'top 80%'}});
  // contact
  const bh = split($('.big-hire',root),'chars');
  if(bh) gsap.from(bh.chars,{yPercent:()=>gsap.utils.random(-160,160), xPercent:()=>gsap.utils.random(-60,60), rotate:()=>gsap.utils.random(-60,60), opacity:0, duration:1.4, ease:'expo.out', stagger:.04, scrollTrigger:{trigger:'.contact', start:'top 70%'}});
}

function enterProject(root){
  $$('.hire',root).forEach(el=>magnet(el));
  if(!HAS_GSAP) return;
  const ts = split($('.pt',root),'chars');
  if(ts) gsap.from(ts.chars,{yPercent:115, rotate:8, opacity:0, duration:1.2, ease:'expo.out', stagger:.035, delay:.45});
  gsap.from($$('.pk,.cue',root),{opacity:0, y:22, duration:1, ease:'expo.out', delay:.8, stagger:.1});
  gsap.to($('.hz',root),{yPercent:-22, opacity:0, ease:'none', scrollTrigger:{trigger:$('.p-hero',root), start:'top top', end:'bottom top', scrub:true}});
  const ls = split($('.p-lede',root),'lines',{mask:'lines'});
  if(ls) gsap.from(ls.lines,{yPercent:105, duration:1.1, ease:'expo.out', stagger:.08, scrollTrigger:{trigger:$('.p-lede',root), start:'top 85%'}});
  gsap.from($$('.p-facts > p',root),{opacity:0, y:18, duration:.8, ease:'expo.out', stagger:.07, scrollTrigger:{trigger:$('.p-facts',root), start:'top 88%'}});
  $$('.mwrap',root).forEach(w=>{
    const host = w.closest('figure,.frame') || w;
    gsap.fromTo(w,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)', duration:1.4, ease:'expo.inOut', scrollTrigger:{trigger:host, start:'top 90%'}, onComplete:()=>{ w.style.clipPath='none'; }});
    gsap.fromTo(w.firstElementChild,{scale:1.3},{scale:1, duration:1.8, ease:'expo.out', scrollTrigger:{trigger:host, start:'top 90%'}});
  });
  gsap.from($$('.fc,.label,.edge',root),{opacity:0, y:12, duration:.8, ease:'expo.out', scrollTrigger:{trigger:$('.p-gallery',root), start:'top 80%'}, stagger:.05});
  skewOnScroll($$('.p-gallery figure, .p-gallery .frame, .p-gallery .tile',root), 'skewY', 4, 420);
  const eh = split($('.p-end h2',root),'words,chars');
  if(eh) gsap.from(eh.chars,{yPercent:100, opacity:0, duration:.9, ease:'expo.out', stagger:.018, scrollTrigger:{trigger:$('.p-end',root), start:'top 80%'}});
}

function renderHome(){
  view.innerHTML = homeHTML(); delete view.dataset.p; curP = null;
  document.title = 'Dina Tajić | Painter, designer, photographer';
  setScene('fluid');
  wireHire(view, {});
  const lis = $$('.rows li',view), btns = $$('.filters button',view);
  const setFilter = f => { btns.forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.f===f))); lis.forEach(li=>li.hidden = f!=='all' && li.dataset.disc!==f); HAS_GSAP && ScrollTrigger.refresh(); };
  btns.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.f)));
  // floating preview that follows the cursor over the list
  const fol = $('.follower',view), fimg = $('img',fol);
  if(FINE){
    let fx = innerWidth/2, fy = innerHeight/2, tx = fx, ty = fy, raf;
    const mv = e=>{ tx = e.clientX; ty = e.clientY; };
    addEventListener('pointermove', mv, {passive:true});
    const tick = ()=>{ raf = requestAnimationFrame(tick); const px = fx; fx += (tx-fx)*.13; fy += (ty-fy)*.13; const r = fol.getBoundingClientRect();
      fol.style.transform = `translate(${fx+70}px,${fy-r.height/2}px) rotate(${Math.max(-14,Math.min(14,(fx-px)*.5))}deg)`; };
    tick(); onCleanup(()=>{ cancelAnimationFrame(raf); removeEventListener('pointermove', mv); });
    $$('.rows a',view).forEach(a=>a.addEventListener('pointerenter',()=>{
      const p = PROJECTS.find(x=>x.slug===a.dataset.slug); fol.style.background = p.theme.bg;
      fimg.classList.remove('ready'); if(THUMBS[p.slug]){ fimg.src = THUMBS[p.slug]; requestAnimationFrame(()=>fimg.classList.add('ready')); } else fimg.removeAttribute('src');
      fol.classList.add('on');
    }));
    $('.rows',view).addEventListener('pointerleave',()=>fol.classList.remove('on'));
  }
  enterHome(view);
  queueThumbs();
}
function renderProject(p){
  curP = p;
  view.innerHTML = projectHTML(p); view.dataset.p = p.slug;
  document.title = `${p.title} | Dina Tajić`;
  setScene(p.scene, p);
  wireHire(view, {project:p.title});
  const sheet = $('.sheet', view);
  if(sheet){ const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ sheet.classList.add('in'); io.disconnect(); } }),{threshold:.3}); io.observe(sheet); onCleanup(()=>io.disconnect()); }
  const strip = $('.strip', view);
  $$('.strip-ctl', view).forEach(ctl=>{ const st = ctl.previousElementSibling; $$('.btn',ctl).forEach(b=>b.addEventListener('click',()=>st.scrollBy({left:+b.dataset.dir*st.clientWidth*.8, behavior:reduced?'auto':'smooth'}))); });
  enterProject(view);
}
const lb = $('#lb'), lbImg = $('img',lb), lbCap = $('.lb-cap',lb); let lbList = [], lbI = 0;
function lbShow(i){ lbI = (i+lbList.length)%lbList.length; const {w,im} = lbList[lbI]; lbImg.src = `img/${im[0]}.jpg`; lbImg.alt = w.title;
  lbCap.textContent = `${w.title}${w.meta?', '+w.meta:''}  ${lbI+1} / ${lbList.length}`;
  if(HAS_GSAP) gsap.fromTo(lbImg,{opacity:0, scale:.965},{opacity:1, scale:1, duration:.55, ease:'expo.out'}); }
function lbOpen(name){ if(!curP) return; lbList = allImgs(curP); const i = lbList.findIndex(x=>x.im[0]===name); if(i<0) return; lb.hidden = false; lenis && lenis.stop(); lbShow(i); $('.lb-x',lb).focus({preventScroll:true}); }
function lbClose(){ if(lb.hidden) return; lb.hidden = true; lenis && lenis.start(); }
document.addEventListener('click', e=>{ const im = e.target.closest('img[data-lb]'); if(im && view.contains(im)){ e.preventDefault(); lbOpen(im.dataset.lb); } });
$('.lb-x',lb).addEventListener('click', lbClose); $('.lb-p',lb).addEventListener('click', ()=>lbShow(lbI-1)); $('.lb-n',lb).addEventListener('click', ()=>lbShow(lbI+1));
lb.addEventListener('click', e=>{ if(e.target===lb) lbClose(); });
addEventListener('keydown', e=>{ if(lb.hidden) return; if(e.key==='Escape') lbClose(); if(e.key==='ArrowLeft') lbShow(lbI-1); if(e.key==='ArrowRight') lbShow(lbI+1); });
let lbx = 0; lb.addEventListener('touchstart', e=>{ lbx = e.touches[0].clientX; }, {passive:true});
lb.addEventListener('touchend', e=>{ const dx = e.changedTouches[0].clientX-lbx; if(Math.abs(dx)>50) lbShow(lbI+(dx<0?1:-1)); });
onCleanup(()=>{}); 
function updateGlobalHire(ctx){ [$('.hire-nav'), $('.hire-float')].forEach(a=>{ a.href = waLink(ctx); a.target='_blank'; a.rel='noopener'; }); }
magnet($('.hire-float'), .25); magnet($('.hire-nav'), .25);

/* ================= router ================= */
const wipe = $('#wipe');
let mode = null, first = true, lastX = innerWidth/2, lastY = innerHeight/2, busy = false;
addEventListener('pointerdown', e=>{ lastX = e.clientX; lastY = e.clientY; }, {capture:true, passive:true});
function applyTheme(t){
  const s = document.documentElement.style;
  ['bg','fg','muted','line','accent','ink'].forEach(k=>s.setProperty('--'+k, t[k]));
  $('meta[name=theme-color]').setAttribute('content', t.bg);
}
function jumpTop(){ if(lenis) lenis.scrollTo(0,{immediate:true, force:true}); scrollTo(0,0); S.scrollY = 0; }
function scrollToId(id, smooth){
  const el = id && id!=='home' ? document.getElementById(id) : null;
  if(!el){ if(smooth){ lenis ? lenis.scrollTo(0) : scrollTo({top:0, behavior:'smooth'}); } return; }
  if(lenis) lenis.scrollTo(el, {immediate:!smooth, offset:0}); else el.scrollIntoView({behavior: smooth && !reduced ? 'smooth' : 'auto'});
}
async function playTransition(theme, title, swap){
  const tr = $('#tr'), ls = $$('.ly',tr), tt = $('.tt',tr);
  const R = Math.hypot(Math.max(lastX, innerWidth-lastX), Math.max(lastY, innerHeight-lastY)) + 30;
  ls[0].style.background = theme.accent; ls[1].style.background = theme.fg; ls[2].style.background = theme.bg;
  tt.style.color = theme.fg; tt.innerHTML = `<span class="tti">${esc(title)}</span>`;
  const sp = split($('.tti',tt),'chars'), chars = sp ? sp.chars : [tt];
  gsap.set(ls,{clipPath:`circle(0px at ${lastX}px ${lastY}px)`, yPercent:0});
  gsap.set(chars,{yPercent:120, opacity:0}); gsap.set(tt,{opacity:1});
  tr.style.visibility = 'visible';
  await gsap.timeline()
    .to(ls,{clipPath:`circle(${R}px at ${lastX}px ${lastY}px)`, duration:.85, ease:'expo.inOut', stagger:.1})
    .to(chars,{yPercent:0, opacity:1, duration:.7, ease:'expo.out', stagger:.03}, '-=.4');
  swap();
  await wait(140);
  await gsap.timeline()
    .to(chars,{yPercent:-120, opacity:0, duration:.5, ease:'expo.in', stagger:.015})
    .to([ls[2],ls[1],ls[0]],{yPercent:-100, duration:.85, ease:'expo.inOut', stagger:.07}, '-=.15');
  tr.style.visibility = 'hidden'; gsap.set(ls,{yPercent:0}); sp && sp.revert();
}
async function route(){
  const id = decodeURIComponent(location.hash.slice(1));
  const p = PROJECTS.find(x=>x.slug===id) || null;
  const next = p ? 'p:'+p.slug : 'home';
  if(next===mode){ if(!p) scrollToId(id, true); return; }
  if(busy) return; busy = true;
  const theme = p ? p.theme : HOME_THEME;
  const swap = ()=>{
    cleanupView();
    mode = next; applyTheme(theme);
    jumpTop();
    if(p) renderProject(p); else renderHome();
    updateGlobalHire(p ? {project:p.title} : {});
    S.docH = document.documentElement.scrollHeight;
    $('.nav').classList.remove('scrolled');
    if(HAS_GSAP) ScrollTrigger.refresh();
    if(!p) scrollToId(id, false);
  };
  try{
    if(first || reduced || !HAS_GSAP){
      if(!first && !reduced){
        wipe.style.setProperty('--x', lastX+'px'); wipe.style.setProperty('--y', lastY+'px'); wipe.style.setProperty('--wipe', theme.bg);
        wipe.className=''; void wipe.offsetWidth; wipe.classList.add('in'); await wait(620); swap(); await wait(80);
        wipe.classList.remove('in'); wipe.classList.add('out'); await wait(520); wipe.className='';
      } else swap();
      first = false;
    } else await playTransition(theme, p ? p.title : 'Dina Tajić', swap);
  } finally { busy = false; }
  const now = decodeURIComponent(location.hash.slice(1));
  if(now !== id) route();
}
document.addEventListener('click', e=>{
  const a = e.target.closest('a[href^="#"]'); if(!a) return;
  const h = a.getAttribute('href');
  if(h===location.hash || (h==='#home' && !location.hash)){ e.preventDefault(); route(); }
});

async function start(){
  onResize();
  try{ await Promise.race([Promise.all(['italic 400 100px "Bodoni Moda"','400 40px "Bodoni Moda"','800 100px Archivo','400 16px Archivo','900 100px Archivo'].map(f=>document.fonts.load(f))).then(()=>document.fonts.ready), wait(3000)]); }catch(_){}
  addEventListener('hashchange', ()=>route());
  await route(); loop();
}
start();
