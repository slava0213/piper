const S=window.SITE,$=s=>document.querySelector(s),A='assets/';
const SH=[...Array(10).keys()].map(i=>A+'shell'+i+'.png'),rnd=(a,b)=>a+Math.random()*(b-a);
document.querySelectorAll('[data-k]').forEach(e=>e.textContent=S[e.dataset.k]);
const sh=(el,n,sz=[50,95])=>{for(let i=0;i<n;i++){const im=new Image();im.src=SH[Math.random()*10|0];im.className='sh';const s=rnd(...sz);im.style.cssText=`width:${s}px;${i%2?'bottom':'top'}:${-s*.45}px;${Math.random()<.5?'left':'right'}:${rnd(-4,70)}%;transform:rotate(${rnd(-60,60)}deg)`;el.appendChild(im)}};
const frame=(gif,cap,r)=>{const f=document.createElement('figure');f.className='frame rv';f.style.setProperty('--r',r+'deg');f.innerHTML=`<img class=g src="${A+gif}" alt=""><figcaption>${cap}</figcaption>`;sh(f,3);return f};
$('#introText').innerHTML=S.intro.map(t=>`<p>${t}</p>`).join('');
$('#introFig').outerHTML=frame(S.introGif,S.introCap,-2).outerHTML.replace('<figure','<figure id=introFig');
$('#cast').innerHTML=S.heroes.map(h=>`<div class="card rv"><img class=p src="${A+h.img}" alt=""><div><small>${h.role}</small><h3>${h.name}</h3><p>${h.text}</p></div></div>`).join('');
const acts=$('#acts');S.acts.forEach((a,i)=>{const d=document.createElement('div');d.className='act rv';d.innerHTML=`<div><div class=num>${i+1}</div><h3>${a.title}</h3><p>${a.text}</p></div>`;d.appendChild(frame(a.gif,a.cap,i%2?2:-2));acts.appendChild(d)});
// фрагменты
const hearts=JSON.parse(localStorage.getItem('hearts')||'{}'),VL={like:'Понравилось',mixed:'По-разному',dislike:'Не понравилось'};
const fg=$('#fgrid');S.fragments.forEach((f,i)=>{const d=document.createElement('div');d.className='fc rv';d.dataset.v=f.verdict;d.innerHTML=`<img class=g src="${A+f.gif}" alt=""><span class=ti>⏱ ${f.time}</span><div><button class="hb ${hearts[i]?'on':''}" data-i=${i}>❤️</button><span class="vd ${f.verdict}">${VL[f.verdict]}</span><h3>${f.title}</h3><p>${f.why}</p></div>`;sh(d,2,[40,70]);fg.appendChild(d)});
fg.onclick=e=>{if(e.target.classList.contains('hb')){const i=e.target.dataset.i;hearts[i]=!hearts[i];e.target.classList.toggle('on');localStorage.setItem('hearts',JSON.stringify(hearts))}};
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.fc').forEach(c=>c.style.display=b.dataset.f=='all'||c.dataset.v==b.dataset.f?'':'none')});
$('#op').innerHTML=S.opinion.map(t=>`<p>${t}</p>`).join('');$('#quote').innerHTML='«'+S.quote+'»';
$('#mor').innerHTML=S.moral.map(m=>`<div class="mc rv"><b>${m.icon}</b><h3>${m.title}</h3><p>${m.text}</p></div>`).join('');
// плавающая декорация
document.querySelectorAll('section,.sea,footer').forEach(s=>{for(let i=0;i<4;i++){const im=new Image();im.src=SH[Math.random()*10|0];im.className='fl';const z=rnd(60,130);im.style.cssText=`width:${z}px;top:${rnd(2,88)}%;${i%2?'left':'right'}:${rnd(-1,3)}%;animation-delay:${-rnd(0,6)}s;transform:rotate(${rnd(-40,40)}deg)`;s.appendChild(im)}});
// песчинки и пузырьки
const c=$('#grain'),x=c.getContext('2d'),P=[];const rs=()=>{c.width=innerWidth;c.height=innerHeight};rs();onresize=rs;
for(let i=0;i<80;i++)P.push({x:rnd(0,innerWidth),y:rnd(0,innerHeight),v:rnd(.8,3),s:rnd(.6,2),w:rnd(0,6)});
(function f(){x.clearRect(0,0,c.width,c.height);x.fillStyle='rgba(210,170,100,.7)';for(const p of P){p.x+=p.v;p.y+=Math.sin(p.w+=.03)*.4;if(p.x>c.width){p.x=-5;p.y=rnd(0,c.height)}x.fillRect(p.x,p.y,p.s,p.s)}requestAnimationFrame(f)})();
for(let i=0;i<14;i++){const b=document.createElement('i'),z=rnd(8,26);b.style.cssText=`left:${rnd(0,100)}%;width:${z}px;height:${z}px;animation-duration:${rnd(8,18)}s;animation-delay:${-rnd(0,15)}s`;$('.bub').appendChild(b)}
// прокрутка
onscroll=()=>{$('#tide').style.height=scrollY/(document.body.scrollHeight-innerHeight)*100+'%';$('#up').classList.toggle('show',scrollY>600)};$('#up').onclick=()=>scrollTo({top:0});
const io=new IntersectionObserver(e=>e.forEach(a=>a.isIntersecting&&a.target.classList.add('on')),{threshold:.1});document.querySelectorAll('.rv').forEach(e=>io.observe(e));
// просмотр
document.addEventListener('click',e=>{if(e.target.classList.contains('g')){$('#lb img').src=e.target.src;$('#lb').classList.add('on')}});$('#lb').onclick=()=>$('#lb').classList.remove('on');
// тема и волна
const T=['day','sunset','night'],TI=['☀️','🌅','🌙'];let ti=+localStorage.getItem('theme')||0;const sT=()=>{document.body.dataset.theme=T[ti];$('#th').textContent=TI[ti]};sT();$('#th').onclick=()=>{ti=(ti+1)%3;localStorage.setItem('theme',ti);sT()};
$('#wv').onclick=()=>{$('#surge').classList.add('go');setTimeout(()=>$('#surge').classList.remove('go'),2200)};
// игра
const g=$('#game'),F=['🐚','🦀','🦐','🪸','🐌','⭐'];let n=0;g.insertAdjacentHTML('beforeend','<div class=tidew></div>');
g.onclick=e=>{const r=g.getBoundingClientRect(),X=e.clientX-r.left,Y=e.clientY-r.top,h=document.createElement('div');h.className='hole';h.style.cssText=`left:${X}px;top:${Y}px`;g.appendChild(h);setTimeout(()=>h.remove(),1500);if(Math.random()<.55){const f=document.createElement('div');f.className='food';f.textContent=F[Math.random()*F.length|0];f.style.cssText=`left:${X}px;top:${Y-14}px`;g.appendChild(f);$('#sc').textContent=++n;setTimeout(()=>f.remove(),1500)}};
// книга отзывов
const bl=$('#bl'),B=JSON.parse(localStorage.getItem('book')||'[]');const rb=()=>bl.innerHTML=B.map(b=>`<div class=bk><b></b><p></p></div>`).join('')||'<p>Пока пусто — будь первым.</p>';
const fill=()=>{rb();bl.querySelectorAll('.bk').forEach((e,i)=>{e.children[0].textContent='🐚 '+B[i].n;e.children[1].textContent=B[i].t})};fill();
$('#bf').onsubmit=e=>{e.preventDefault();const t=$('#bt').value.trim();if(!t)return;B.unshift({n:$('#bn').value.trim()||'Аноним',t});localStorage.setItem('book',JSON.stringify(B));$('#bt').value='';fill()};
