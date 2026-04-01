(function(){
'use strict';

/* ── Banner ken-burns ── */
var banner = document.getElementById('banner');
if(banner) setTimeout(function(){ banner.classList.add('loaded'); }, 100);

/* ── Nav scroll ── */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive:true});

/* ── Hamburger ── */
var ham = document.getElementById('ham');
var mob = document.getElementById('mob-menu');
if(ham && mob){
    ham.addEventListener('click', function(){
        var o = mob.classList.toggle('open');
        ham.classList.toggle('open', o);
        ham.setAttribute('aria-expanded', o);
    });
    
    window.mClose = function(){
        mob.classList.remove('open');
        ham.classList.remove('open');
        ham.setAttribute('aria-expanded', false);
    };
    
    document.addEventListener('click', function(e){
        if(!mob.contains(e.target) && !ham.contains(e.target)) mClose();
    });
}

/* ── Scroll reveal ── */
var rvs = document.querySelectorAll('.rv');
var ro = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
        if(e.isIntersecting){ 
            e.target.classList.add('on'); 
            ro.unobserve(e.target); 
        }
    });
}, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
rvs.forEach(function(el){ ro.observe(el); });

/* ── Abas ── */
window.tab = function(btn, id){
    document.querySelectorAll('.tab-btn').forEach(function(b){ 
        b.classList.remove('active'); 
        b.setAttribute('aria-selected','false'); 
    });
    document.querySelectorAll('.tab-panel').forEach(function(p){ 
        p.classList.remove('active'); 
    });
    btn.classList.add('active'); 
    btn.setAttribute('aria-selected','true');
    document.getElementById(id).classList.add('active');
};

/* ── Depoimentos ── */
var d = [
    {t:'O acabamento ficou perfeito! Pintaram toda a casa em 3 dias sem deixar nenhuma sujeira. Recomendo demais.', a:'Ana C.'},
    {t:'Profissionalismo do início ao fim. Orçamento claro, prazo cumprido e resultado que superou expectativas.', a:'Roberto M.'},
    {t:'Textura na sala ficou incrível. Já indiquei para dois vizinhos e todos adoraram o trabalho.', a:'Fernanda L.'},
    {t:'Fiz a fachada da minha casa e ficou nova! Atendimento excelente e preço justo. Vou chamar novamente.', a:'Carlos H.'},
    {t:'Resolveram um problema de umidade que tinha há anos. Serviço caprichado e equipe muito educada.', a:'Marcia S.'},
    {t:'Pontualidade e organização impecáveis. Protegeram todos os móveis e deixaram tudo limpo.', a:'Paulo R.'},
];
var tr = document.getElementById('ttrack');
if(tr){
    d.concat(d).forEach(function(x){
        var c = document.createElement('div');
        c.className = 't-card';
        c.innerHTML = '<div class="t-stars">★★★★★</div><div class="t-txt">"' + x.t + '"</div><div class="t-auth">' + x.a + '</div>';
        tr.appendChild(c);
    });
}

/* ── Máscara tel ── */
var ti = document.getElementById('ft');
if(ti) ti.addEventListener('input', function(){
    var v = this.value.replace(/\D/g,'').slice(0,11);
    if(v.length>=2) v='('+v.slice(0,2)+') '+v.slice(2);
    if(v.length>=10) v=v.slice(0,10)+'-'+v.slice(10);
    this.value = v;
});

/* Cards de Selecao */
var serviceCards = document.querySelectorAll('.service-card');
var sizeCards = document.querySelectorAll('.size-card');
serviceCards.forEach(function(card){
    card.addEventListener('click', function(){
        serviceCards.forEach(function(c){ c.classList.remove('active'); });
        this.classList.add('active');
        document.getElementById('fs').value = this.getAttribute('data-service');
    });
});
sizeCards.forEach(function(card){
    card.addEventListener('click', function(){
        sizeCards.forEach(function(c){ c.classList.remove('active'); });
        this.classList.add('active');
        document.getElementById('fsize').value = this.getAttribute('data-size');
    });
});

/* Enviar via WhatsApp */
window.enviarWhatsApp = function(){
    var n=(document.getElementById('fn')||{}).value||'';
    var t=(document.getElementById('ft')||{}).value||'';
    var e=(document.getElementById('fe')||{}).value||'';
    var s=(document.getElementById('fs')||{}).value||'';
    var sz=(document.getElementById('fsize')||{}).value||'Nao informado';
    var d=(document.getElementById('fd')||{}).value||'';
    
    if(!n.trim()||!t.trim()||!e.trim()||!s){
        var b = document.querySelector('.btn-sub');
        var orig = b.textContent;
        b.style.background='#c41e3a';
        b.textContent='Preencha os campos obrigatorios';
        setTimeout(function(){ b.style.background=''; b.textContent=orig; }, 2600);
        return;
    }

    var msg = 'Ola! Gostaria de solicitar um orcamento.%0A%0A';
    msg += '*DADOS DO CLIENTE*%0A';
    msg += 'Nome: ' + n + '%0A';
    msg += 'WhatsApp: ' + t + '%0A';
    msg += 'Endereco: ' + e + '%0A%0A';
    msg += '*SERVICO SOLICITADO*%0A';
    msg += 'Tipo: ' + s + '%0A';
    msg += 'Tamanho Estimado: ' + sz + '%0A';
    if(d.trim()){
        msg += '%0A*DETALHES*%0A' + d;
    }

    var whatsappUrl = 'https://wa.me/5519998060453?text=' + msg;
    window.open(whatsappUrl, '_blank');

    var fc=document.getElementById('fc');
    fc.style.opacity='0'; fc.style.transition='opacity .4s';
    setTimeout(function(){ fc.style.display='none'; document.getElementById('fok').classList.add('on'); }, 380);
};

/* ── FAQ Toggle ── */
window.toggleFaq = function(btn){
    var ans = btn.nextElementSibling;
    var isActive = ans.classList.toggle('active');
    btn.classList.toggle('active', isActive);
};

/* ── Scroll-to-Top ── */
var scrollTop = document.createElement('div');
scrollTop.id = 'scrollTop';
scrollTop.innerHTML = '↑';
scrollTop.onclick = function(){ window.scrollTo({top:0,behavior:'smooth'}); };
document.body.appendChild(scrollTop);
window.addEventListener('scroll', function(){
    scrollTop.classList.toggle('show', window.scrollY > 300);
}, {passive:true});

/* ── Lazy Loading de Imagens ── */
if('IntersectionObserver' in window){
    var imgObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            if(e.isIntersecting){
                var img = e.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imgObserver.unobserve(img);
            }
        });
    }, {rootMargin:'50px'});
    document.querySelectorAll('img[loading="lazy"]').forEach(function(img){ imgObserver.observe(img); });
}

/* ── Nav link ativo ── */
var secs = document.querySelectorAll('section[id],footer[id]');
var nls  = document.querySelectorAll('.nav-links a');
var nio  = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
        if(e.isIntersecting){
            nls.forEach(function(a){ a.classList.remove('active'); });
            var al = document.querySelector('.nav-links a[href="#'+e.target.id+'"]');
            if(al) al.classList.add('active');
        }
    });
}, {threshold:.4});
secs.forEach(function(s){ nio.observe(s); });

}());
