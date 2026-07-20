(function(){
  'use strict';

  /* ---------- Loading screen ---------- */
  var _loader=document.getElementById('loader');
  window.addEventListener('load',function(){
    if(_loader){setTimeout(function(){_loader.classList.add('hidden');},900);}
  });
  /* Fallback in case load event stalls (e.g. slow font fetch) */
  setTimeout(function(){if(_loader){_loader.classList.add('hidden');}},3500);

  /* ---------- Floating particles ---------- */
  var pWrap=document.getElementById('particles');
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    var count=window.innerWidth<700?14:26;
    for(var i=0;i<count;i++){
      var p=document.createElement('div');
      p.className='particle';
      var size=Math.random()*5+2;
      p.style.width=size+'px';
      p.style.height=size+'px';
      p.style.left=Math.random()*100+'vw';
      p.style.top=(60+Math.random()*50)+'vh';
      p.style.setProperty('--po',(Math.random()*0.35+0.2).toFixed(2));
      p.style.setProperty('--drift',(Math.random()*80-40).toFixed(0)+'px');
      p.style.animationDuration=(Math.random()*22+16)+'s';
      p.style.animationDelay=(-Math.random()*30)+'s';
      pWrap.appendChild(p);
    }
  }

  /* ---------- Nav: scrolled state ---------- */
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled',window.scrollY>30);
  },{passive:true});

  /* ---------- Mobile menu ---------- */
  var btn=document.getElementById('menuBtn');
  var links=document.getElementById('navLinks');
  btn.addEventListener('click',function(){
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.addEventListener('click',function(e){
    if(e.target.tagName==='A'){
      btn.classList.remove('open');
      links.classList.remove('open');
    }
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){revealObserver.observe(el);});

  /* ---------- Skill bars: animate only when in view ---------- */
  var barObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var fill=entry.target;
        requestAnimationFrame(function(){
          fill.style.width=fill.getAttribute('data-w')+'%';
        });
        barObserver.unobserve(fill);
      }
    });
  },{threshold:0.4});
  document.querySelectorAll('.bar-fill').forEach(function(el){barObserver.observe(el);});

  /* ---------- Smooth scroll with nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        var y=target.getBoundingClientRect().top+window.scrollY-70;
        window.scrollTo({top:y,behavior:reduced?'auto':'smooth'});
      }
    });
  });
})();
