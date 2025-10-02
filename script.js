// Dark mode toggle (persisted)
(function(){
  var btn=document.getElementById('dark-toggle');
  if(!btn)return;
  var root=document.documentElement;
  function setDark(dark){
    if(dark){root.classList.add('dark');localStorage.setItem('theme','dark');}
    else{root.classList.remove('dark');localStorage.setItem('theme','light');}
  }
  btn.addEventListener('click',function(){
    setDark(!root.classList.contains('dark'));
  });
  var theme=localStorage.getItem('theme');
  if(theme==='dark'||(!theme&&window.matchMedia('(prefers-color-scheme: dark)').matches))setDark(true);
})();

// Sticky header shrink on scroll
(function(){
  var header=document.getElementById('site-header');
  var inner=document.getElementById('header-inner');
  if(!header||!inner)return;
  var last=window.scrollY;
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y>10){
      header.classList.add('shadow-lg');
      inner.classList.add('py-2','md:py-2','lg:py-3');
      inner.classList.remove('py-3','md:py-4','lg:py-5');
    }else{
      header.classList.remove('shadow-lg');
      inner.classList.remove('py-2','md:py-2','lg:py-3');
      inner.classList.add('py-3','md:py-4','lg:py-5');
    }
    last=y;
  });
})();

// Back to top button
(function(){
  var btn=document.getElementById('backToTop');
  if(!btn)return;
  function toggle(){
    if(window.scrollY>200){btn.classList.remove('opacity-0','pointer-events-none');btn.classList.add('opacity-100');btn.style.pointerEvents='auto';}
    else{btn.classList.add('opacity-0');btn.classList.remove('opacity-100');btn.style.pointerEvents='none';}
  }
  window.addEventListener('scroll',toggle);
  btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  toggle();
})();

// FAQ accordion (ARIA-friendly)
(function(){
  var faqs=document.querySelectorAll('[data-faq-accordion]');
  if(!faqs.length)return;
  faqs.forEach(function(faq){
    var btn=faq.querySelector('button');
    var panel=faq.querySelector('[data-faq-panel]');
    if(!btn||!panel)return;
    btn.addEventListener('click',function(){
      var expanded=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',!expanded);
      panel.hidden=expanded;
    });
    btn.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();btn.click();}
    });
  });
})();

// Testimonials carousel (auto-advance, pause on hover)
(function(){
  var carousel=document.querySelector('[data-carousel]');
  if(!carousel)return;
  var slides=carousel.querySelectorAll('[data-carousel-slide]');
  var dots=carousel.querySelectorAll('[data-carousel-dot]');
  var idx=0,timer=null,paused=false;
  function show(i){
    slides.forEach(function(s,j){s.classList.toggle('hidden',j!==i);});
    dots.forEach(function(d,j){d.classList.toggle('bg-blue-600',j===i);d.classList.toggle('bg-gray-300',j!==i);});
    idx=i;
  }
  function next(){show((idx+1)%slides.length);}
  function start(){if(timer)clearInterval(timer);timer=setInterval(function(){if(!paused)next();},4000);}
  dots.forEach(function(dot,i){dot.addEventListener('click',function(){show(i);});});
  carousel.addEventListener('mouseenter',function(){paused=true;});
  carousel.addEventListener('mouseleave',function(){paused=false;});
  show(0);start();
})();

// Menu/product filter/tabs
(function(){
  var tablist=document.querySelector('[data-tabs]');
  if(!tablist)return;
  var tabs=tablist.querySelectorAll('[role=tab]');
  var panels=document.querySelectorAll('[data-tab-panel]');
  function activate(i){
    tabs.forEach(function(t,j){t.setAttribute('aria-selected',i===j);t.classList.toggle('border-blue-600',i===j);t.classList.toggle('text-blue-600',i===j);});
    panels.forEach(function(p,j){p.hidden=i!==j;});
  }
  tabs.forEach(function(tab,i){
    tab.addEventListener('click',function(){activate(i);});
    tab.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight')activate((i+1)%tabs.length);
      if(e.key==='ArrowLeft')activate((i-1+tabs.length)%tabs.length);
    });
  });
  activate(0);
})();
