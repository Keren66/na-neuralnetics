(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var IMG='assets/img/';
/* ---------- i18n ---------- */
var LANGS={English:'en','Español':'es',Deutsch:'de','Français':'fr','日本語':'ja'};
var LNAME={en:'English',es:'Español',de:'Deutsch',fr:'Français',ja:'日本語'};
var EXTRA={es:{'STEP':'PASO','/mo':'/mes'},de:{'STEP':'SCHRITT','/mo':'/Mon.'},fr:{'STEP':'ÉTAPE','/mo':'/mois'},ja:{'STEP':'ステップ','/mo':'/月'}};
window.NN_I18N=window.NN_I18N||{};
var LANG='en';
function t(s){if(LANG==='en')return s;var d=window.NN_I18N[LANG];return (d&&d[s])||(EXTRA[LANG]&&EXTRA[LANG][s])||s}
function tr_(el,orig){}
function walk(root){
 var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
  var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName))return NodeFilter.FILTER_REJECT;
  if(p.closest&&p.closest('[data-dyn]'))return NodeFilter.FILTER_REJECT;
  return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
 var n,list=[];while((n=w.nextNode()))list.push(n);return list;
}
function applyLang(code){
 LANG=code;
 try{localStorage.setItem('nn_lang',code)}catch(e){}
 document.documentElement.lang=code;
 walk(document.body).forEach(function(n){
  if(n.__en===undefined)n.__en=n.nodeValue;
  var o=n.__en,k=o.trim();
  var v=code==='en'?k:t(k);
  var m=o.match(/^(\s*)[\s\S]*?(\s*)$/);
  n.nodeValue=m[1]+v+m[2];
 });
 $$('[placeholder],[aria-label]').forEach(function(e){
  ['placeholder','aria-label'].forEach(function(a){
   if(!e.hasAttribute(a))return;var k='_en_'+a;
   if(e[k]===undefined)e[k]=e.getAttribute(a);
   e.setAttribute(a,code==='en'?e[k]:t(e[k]));
  });
 });
 if(document.__t0===undefined)document.__t0=document.title.replace(/^\uD83D\uDC34\s*/,'');document.title=code==='en'?document.__t0:t(document.__t0.replace(/^\uD83D\uDC34\s*/,''));
 var lb=$('#lang>button>span');if(lb)lb.textContent=LNAME[code];
 $$('#lang li button').forEach(function(b){b.classList.toggle('cur',b.dataset.lang===LNAME[code])});
 var tb=$('#trp [data-l="'+code+'"]');if(tb)tb.click();
 document.dispatchEvent(new CustomEvent('nn:lang',{detail:code}));
}
function setLang(code){
 if(code==='en'||window.NN_I18N[code]){applyLang(code);return}
 var s=document.createElement('script');s.src='assets/i18n/'+code+'.js';
 s.onload=function(){applyLang(code)};
 s.onerror=function(){console.warn('i18n load failed',code)};
 document.head.appendChild(s);
}


/* ---------- data ---------- */
var TOOLS=[
 ['Virtual Try-On','Showcase apparel on AI fashion models','fashion','f1','',1],
 ['Fashion Reels','AI model outfit videos & shorts maker','fashion','f2','NEW'],
 ['AI Model Swap','Match models to any region or audience','fashion','f4'],
 ['Virtual Try-On Shoes','Display shoes on-foot, effortlessly','fashion','p-sandals'],
 ['Try-On Accessories','Bags, watches and jewellery on models','fashion','p-bag'],
 ['AI Templates','Proven e-commerce layouts in one click','image','s-spring'],
 ['AI Backgrounds','Studio and lifestyle scenes for any product','image','t-bg'],
 ['AI Shadows','Add natural shadows to any object','image','p-watch'],
 ['Style Clone','Clone the background style of any image','image','p-skincare'],
 ['Background Remover','Remove image backgrounds, free','image','p-sneaker'],
 ['Image Translator','Accurately translate text inside images','image','t-translate'],
 ['Image Enhancer','Sharpen, denoise and re-light photos','adv','p-headphones'],
 ['Image Upscaler','Upscale up to 4× without losing detail','adv','s-black'],
 ['Watermark Remover','Clean watermarks and overlays cleanly','adv','f3'],
 ['AI Avatars','Talking presenters for product videos','video','av3'],
 ['Product Avatars','Bring your product to life with a presenter','video','f5'],
 ['Product AnyShoot','Any product, any scene, any angle','video','f6']
];
var OCC=[
 {img:'s-spring',h:'Spring refresh',p:'Soft florals, fresh greens and pastel scenes that make seasonal launches feel alive.',l:['Seasonal banner packs','Instagram & Pinterest sizes','Auto colour matching to your product']},
 {img:'s-valentine',h:"Valentine's Day",p:'Gift-ready scenes with romantic palettes, ribbons and flowers — built for gifting spikes.',l:['Gift-guide collage layouts','Limited-time offer badges','Story & Reel formats']},
 {img:'s-black',h:'Black Friday',p:'High-contrast, high-urgency promo visuals engineered to stop the scroll on the biggest sales weekend.',l:['Countdown and discount overlays','Marketplace-compliant listing images','Bulk generation for whole catalogues']},
 {img:'s-xmas',h:'Christmas',p:'Warm lights, pine and candles — cosy festive scenes that lift click-through during peak season.',l:['Festive scene library','Gift bundle layouts','Multi-language greeting overlays']},
 {img:'s-newyear',h:'New Year',p:'Celebration-ready visuals with metallic accents and confetti for year-start campaigns.',l:['Launch & resolution campaigns','Square, vertical and wide exports','One-click brand kit styling']}
];
var VID=[
 ['0:24','Marcelo Design X','Save time with this powerful AI tool for effortless product backgrounds','f1'],
 ['0:29','Studio Motions','Transform your product photos like never before','p-skincare'],
 ['0:45','Dufte Studio','Wear any dress with AI: a tool that will change fashion online','f5'],
 ['0:28','Rourke Heath','A banging new AI photo editor for sellers','p-sneaker'],
 ['0:36','Setups AI','Never hire models for clothing shoots again','f3'],
 ['2:17','Financial Wolf','I generated ad images and it worked great — simple and highly clickable','s-black'],
 ['8:10','SaaS Master','Boost sales with AI-powered product image enhancements','p-headphones'],
 ['12:19','Zain Shah','Make your product images look professional with AI — eBay, Amazon, Shopify','p-bag'],
 ['9:01','Bryan Guerra','AI fashion models just changed e-commerce forever','f6'],
 ['13:52','Louis ST','The best product visuals for your Shopify store, thanks to AI','p-watch']
];
var FAQ=[
 ['What is Neuralnetics?','Neuralnetics is an AI content platform for e-commerce sellers. It turns a product photo into model photos, lifestyle scenes, short videos and social posts — sized for the marketplaces and channels where your buyers shop.'],
 ['Do I need design skills?','No. Start from a proven template, upload your product photo, and the AI handles models, backgrounds, layout and copy. Most posts are ready to publish in minutes.'],
 ['Can I use the generated content commercially?','Yes. Paid plans include a commercial licence, so you can use outputs on your store, marketplace listings, ads and social channels.'],
 ['Which platforms are the outputs formatted for?','Instagram, TikTok, Amazon, Shopify, Etsy and Pinterest — plus standard marketplace listing sizes. You can also export custom dimensions.'],
 ['How do credits work?','Each generation uses AI credits depending on the tool. Credits renew monthly on every plan, and you can top up at any time.'],
 ['Is there a free plan?','Yes. The Starter plan is free forever and includes monthly credits so you can try the core tools without a credit card.'],
 ['How do I contact the team?','Use the contact form on this page. Neuralnetics is operated by NEURALNETICS PTE. LTD. and we reply within one business day.']
];
var TR={en:['Morning Brew Set','Free shipping on orders over $49','20% OFF'],es:['Set Café de Mañana','Envío gratis en pedidos de más de 49 $','20% DTO'],de:['Morgen-Kaffee-Set','Kostenloser Versand ab 49 $','20% RABATT'],fr:['Set Café du Matin','Livraison offerte dès 49 $ d’achat','−20 %'],ja:['モーニングブリューセット','49ドル以上で送料無料','20%オフ']};
var BRANDS=['Instagram','TikTok','Amazon','Shopify','Etsy','Pinterest','eBay','Walmart','Lazada','Shopee','WooCommerce','Temu'];

/* ---------- announce / year ---------- */
$('#yr').textContent=new Date().getFullYear();

/* ---------- marquee brands ---------- */
(function(){var h='';for(var k=0;k<2;k++)BRANDS.forEach(function(b){h+='<span><svg viewBox="0 0 24 24" fill="#d8ff00" stroke="#1f1f1f" stroke-width="1.6"><circle cx="12" cy="12" r="9"/></svg>'+b+'</span>'});$('#mq1').innerHTML=h})();
(function(){var h='';for(var k=0;k<2;k++)VID.forEach(function(v){h+='<div class="vid"><div class="th"><img loading="lazy" src="'+IMG+v[3]+'.jpg" alt=""><em>'+v[0]+'</em></div><h5>'+v[2]+'</h5><small>'+v[1]+'</small></div>'});$('#mq2').innerHTML=h})();

/* ---------- tools grid ---------- */
(function(){
 var g=$('#tgrid');
 g.innerHTML=TOOLS.map(function(t){return '<a href="#" class="tool" data-c="'+t[2]+'" data-modal="signup">'+(t[4]?'<span class="badge">'+t[4]+'</span>':'')+'<span class="go">↗</span><img loading="lazy" src="'+IMG+t[3]+'.jpg" alt="'+t[0]+'"><div class="tx"><h4>'+t[0]+'</h4><p>'+t[1]+'</p></div></a>'}).join('');
 function filt(f){$$('.tab',$('#tabs')).forEach(function(b){b.classList.toggle('on',b.dataset.f===f)});$$('.tool',g).forEach(function(c){c.classList.toggle('hide',f!=='all'&&c.dataset.c!==f)})}
 $('#tabs').addEventListener('click',function(e){var b=e.target.closest('.tab');if(b)filt(b.dataset.f)});
 $$('[data-tab]').forEach(function(a){a.addEventListener('click',function(){filt(a.dataset.tab)})});
})();

/* ---------- occasions ---------- */
(function(){
 var big=$('#obig'),cur=0;
 big.innerHTML=OCC.map(function(o,i){return '<img src="'+IMG+o.img+'.jpg" alt="'+o.h+'" style="opacity:'+(i?0:1)+'">'}).join('');
 var imgs=$$('img',big);
 function show(i){
  $$('.tab',$('#otabs')).forEach(function(b,j){b.classList.toggle('on',j===i)});
  imgs.forEach(function(m,j){m.style.opacity=j===i?1:0});
  cur=i;var o=OCC[i];$('#oh').textContent=t(o.h);$('#op').textContent=t(o.p);$('#ol').innerHTML=o.l.map(function(x){return '<li>'+t(x)+'</li>'}).join('');
 }
 show(0);
 $('#otabs').addEventListener('click',function(e){var b=e.target.closest('.tab');if(b){show(+b.dataset.o);clearInterval(auto)}});
 var n=0,auto=setInterval(function(){n=(n+1)%OCC.length;show(n)},5000);document.addEventListener('nn:lang',function(){show(cur)});
})();

/* ---------- FAQ ---------- */
(function(){
 var f=$('#faqs');
 f.innerHTML=FAQ.map(function(q,i){return '<div class="qa'+(i===0?' on':'')+'"><button type="button" aria-expanded="'+(i===0)+'">'+q[0]+'<i>+</i></button><div class="a"><p>'+q[1]+'</p></div></div>'}).join('');
 function fit(d){var a=$('.a',d);a.style.maxHeight=d.classList.contains('on')?a.scrollHeight+'px':0}
 $$('.qa',f).forEach(fit);
 document.addEventListener('nn:lang',function(){$$('.qa.on',f).forEach(fit)});
 f.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var d=b.parentNode;var was=d.classList.contains('on');$$('.qa',f).forEach(function(x){x.classList.remove('on');fit(x)});if(!was){d.classList.add('on')}fit(d);b.setAttribute('aria-expanded',!was)});
})();

/* ---------- pricing toggle ---------- */
var bill_=false;
document.addEventListener('nn:lang',function(){$$('.bl').forEach(function(a){a.textContent=t(bill_?'Billed yearly':'Billed monthly')})});
$('#bill').addEventListener('click',function(e){
 var b=e.target.closest('button');if(!b)return;var y=b.dataset.b==='y';
 $$('button',this).forEach(function(x){x.classList.toggle('on',x===b)});
 $$('.amt').forEach(function(a){a.textContent=a.dataset[y?'y':'m']});
 bill_=y;$$('.bl').forEach(function(a){a.textContent=t(y?'Billed yearly':'Billed monthly')});
});

/* ---------- language dropdown ---------- */
(function(){
 var l=$('#lang');$('button',l).addEventListener('click',function(e){e.stopPropagation();l.classList.toggle('open')});
 l.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(b){l.classList.remove('open');setLang(LANGS[b.dataset.lang]||'en')}});
 document.addEventListener('click',function(){l.classList.remove('open')});
})();

/* ---------- mobile drawer ---------- */
(function(){
 var d=$('#drawer'),b=$('#burger');
 function tog(f){var on=f===undefined?!d.classList.contains('on'):f;d.classList.toggle('on',on);document.body.style.overflow=on?'hidden':''}
 b.addEventListener('click',function(){tog()});
 $$('a',d).forEach(function(a){a.addEventListener('click',function(){tog(false)})});
})();

/* ---------- smooth anchors (hash links only) ---------- */
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href');if(h==='#'){e.preventDefault();return}var t=$(h);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});history.replaceState(null,'',h)}})});

/* ---------- reveal ---------- */
(function(){
 var els=$$('.rv');
 if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
 els.forEach(function(e){io.observe(e)});
})();

/* ---------- counters ---------- */
(function(){
 var els=$$('[data-count]');
 function run(el){var to=+el.dataset.count,dec=+(el.dataset.dec||0),suf=el.dataset.suf||'',t0=null;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target)}})},{threshold:.5});
 els.forEach(function(e){io.observe(e)});
})();

/* ---------- before/after ---------- */
(function(){
 var el=$('#ba1'),drag=false;
 function set(x){var r=el.getBoundingClientRect(),p=Math.max(0,Math.min(100,(x-r.left)/r.width*100));el.style.setProperty('--p',p+'%')}
 el.addEventListener('pointerdown',function(e){drag=true;el.setPointerCapture(e.pointerId);set(e.clientX)});
 el.addEventListener('pointermove',function(e){if(drag)set(e.clientX)});
 el.addEventListener('pointerup',function(){drag=false});
})();

/* ---------- shadow slider ---------- */
$('#sdr').addEventListener('input',function(){$('#sd').style.setProperty('--so',this.value/100);$('#sdv').textContent=this.value+'%'});

/* ---------- translator ---------- */
$('#trp').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',this).forEach(function(x){x.classList.toggle('on',x===b)});var t=TR[b.dataset.l];$('#trh').textContent=t[0];$('#trs').textContent=t[1];$('#trb').textContent=t[2]});

/* ---------- modal (login / signup) ---------- */
(function(){
 var m=$('#modal'),mode='signup';
 document.addEventListener('nn:lang',function(){render(mode)});
 var C={
  signup:{t:'Create content that drives traffic.',h:'Create your account',p:'Start creating in under a minute.',b:'Create account',sw:'Already have an account? <a data-sw="login">Log in</a>',name:1},
  login:{t:'Welcome back.',h:'Log in to Neuralnetics',p:'Pick up where you left off.',b:'Log in',sw:'New here? <a data-sw="signup">Create an account</a>',name:0}
 };
 function render(k){mode=k;var c=C[k];$('#mt').textContent=t(c.t);$('#mh').textContent=t(c.h);$('#mp').textContent=t(c.p);$('#abtn').textContent=t(c.b);$('#asw').innerHTML=c.sw.replace(/^([^<]*)<a data-sw="(\w+)">([^<]*)<\/a>/,function(_,a,b,c2){return t(a.trim())+' <a data-sw="'+b+'">'+t(c2)+'</a>'});$('#an').style.display=c.name?'':'none';$('#anote').textContent='';$('#ap').autocomplete=c.name?'new-password':'current-password'}
 function open(k){render(k);m.classList.add('on');document.body.style.overflow='hidden';setTimeout(function(){$(k==='signup'?'#an':'#ae').focus()},60)}
 function close(){m.classList.remove('on');document.body.style.overflow=''}
 document.addEventListener('click',function(e){
  var o=e.target.closest('[data-modal]');if(o){e.preventDefault();open(o.dataset.modal);return}
  if(e.target.closest('[data-close]')||e.target===m){close();return}
  var s=e.target.closest('[data-sw]');if(s)render(s.dataset.sw);
  if(e.target.closest('[data-oauth]'))$('#anote').textContent=t('Single sign-on will be available at launch. Please use email for now.');
 });
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 $('#aform').addEventListener('submit',function(e){
  e.preventDefault();var em=$('#ae').value.trim(),pw=$('#ap').value,n=$('#anote');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){n.textContent=t('Please enter a valid email address.');return}
  if(pw.length<8){n.textContent=t('Password must be at least 8 characters.');return}
  n.textContent=t(mode==='signup'?'✓ Thanks! Check your inbox to confirm your account.':'✓ Signed in. Redirecting to your workspace…');
 });
})();

/* ---------- contact form ---------- */
$('#cform form').addEventListener('submit',function(e){
 e.preventDefault();var n=$('#cn').value.trim(),m=$('#ce').value.trim();
 if(!n||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){$('#cerr').style.display='block';return}
 $('#cerr').style.display='none';
 try{var q=JSON.parse(localStorage.getItem('nn_contacts')||'[]');q.push({n:n,e:m,s:$('#cs').value,m:$('#cm').value,t:Date.now()});localStorage.setItem('nn_contacts',JSON.stringify(q))}catch(x){}
 $('#cform').classList.add('sent');
});

/* ---------- cookie ---------- */
(function(){
 var c=$('#cookie'),k=null;try{k=localStorage.getItem('nn_cookie')}catch(e){}
 if(!k)setTimeout(function(){c.classList.add('on')},1200);
 c.addEventListener('click',function(e){var b=e.target.closest('[data-ck]');if(!b)return;try{localStorage.setItem('nn_cookie',b.dataset.ck)}catch(x){}c.classList.remove('on')});
})();

/* ---------- dynamic nodes & saved language ---------- */
['#oh','#op','#ol','#mt','#mh','#mp','#abtn','#asw','#anote','.bl','#trh','#trs','#trb'].forEach(function(q){$$(q).forEach(function(e){e.setAttribute('data-dyn','')})});
(function(){var c='en';try{c=localStorage.getItem('nn_lang')||'en'}catch(e){}if(!LNAME[c])c='en';
 if(c==='en'){var b=$('#lang li button[data-lang="English"]');if(b)b.classList.add('cur')}else setLang(c)})();
})();
