/**
 * OVA Grupo G4 - Electiva Profesional I
 * JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const isOpen = mobileMenu.classList.contains('active');
            menuToggle.innerHTML = isOpen 
                ? '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
                : '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
            });
        });
    }
    
    // ========================================
    // TYPING EFFECT
    // ========================================
    const words = [
        'MADUREZ DIGITAL',
        'PROCESOS EMPRESARIALES',
        'BPM Y BPMN',
        'OPORTUNIDADES DE CAMBIO',
        'TECNOLOGÍAS HABILITADORAS'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');
    
    // El texto completo se reserva siempre en pantalla (parte escrita visible + resto invisible),
    // así las líneas no cambian de lugar mientras se escribe.
    let typedSpan = null;
    let restSpan = null;
    if (typingElement) {
        typingElement.textContent = '';
        typedSpan = document.createElement('span');
        typedSpan.className = 'tt-typed';
        restSpan = document.createElement('span');
        restSpan.className = 'tt-rest';
        typingElement.appendChild(typedSpan);
        typingElement.appendChild(restSpan);
    }

    function setTyping(word, count) {
        typedSpan.textContent = word.substring(0, count);
        restSpan.textContent = word.substring(count);
    }

    function typeEffect() {
        const currentWord = words[wordIndex];
        const typeSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTyping(currentWord, charIndex);
            setTimeout(typeEffect, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTyping(currentWord, charIndex);
            setTimeout(typeEffect, typeSpeed);
        } else if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTyping(words[wordIndex], 0);
            setTimeout(typeEffect, 500);
        }
    }
    
    // Reserva el alto máximo del título para que la página no se mueva mientras se escribe
    function reserveHeroHeight() {
        if (!typingElement) return;
        const h1 = typingElement.closest('h1');
        if (!h1) return;
        h1.style.minHeight = '';
        let max = 0;
        words.forEach(w => {
            setTyping(w, 0);
            max = Math.max(max, h1.offsetHeight);
        });
        setTyping(words[wordIndex], charIndex);
        h1.style.minHeight = max + 'px';
    }

    if (typingElement) {
        setTyping(words[0], 0);
        reserveHeroHeight();
        window.addEventListener('resize', reserveHeroHeight);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(reserveHeroHeight);
        }
        typeEffect();
    }
    
    // ========================================
    // CODE TABS
    // ========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codePanels = document.querySelectorAll('.code-panel');
    const tabLabel = document.querySelector('.tab-label');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update panels
            codePanels.forEach(p => p.classList.remove('active'));
            document.getElementById('code' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
            
            // Update label
            if (tabLabel) {
                tabLabel.textContent = tab.toUpperCase();
            }
        });
    });
    
    // ========================================
    // COPY CODE BUTTON
    // ========================================
    const copyBtn = document.getElementById('copyBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const activePanel = document.querySelector('.code-panel.active');
            if (activePanel) {
                navigator.clipboard.writeText(activePanel.textContent).then(() => {
                    // Show check icon temporarily
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" fill="none" stroke="#4ade80" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqButtons = document.querySelectorAll('.faq-btn');
    const answerContent = document.getElementById('answerContent');
    
    const faqAnswers = [
        { title: '¿Para qué sirve un diagnóstico de madurez digital?', content: 'Sirve para conocer el punto de partida de una organización, detectar brechas y priorizar inversiones.\n\nSin un diagnóstico es fácil comprar tecnología que no resuelve el problema real. Además, deja una línea base para medir los avances en el tiempo.' },
        { title: '¿Qué diferencia hay entre proceso y procedimiento?', content: 'El proceso es el conjunto de actividades relacionadas que convierte entradas en un resultado para un cliente.\n\nEl procedimiento es la forma documentada de llevar a cabo una actividad o un proceso: describe cómo se hace paso a paso.' },
        { title: '¿BPMN es solo para el área de sistemas?', content: 'No. BPMN se creó para que el área de negocio y el área de TI compartan un mismo lenguaje.\n\nLos diagramas pueden ser entendidos por quienes operan el proceso y también por quienes lo implementan en un sistema.' },
        { title: '¿Se puede automatizar un proceso sin modelarlo antes?', content: 'Se puede, pero no es recomendable. Automatizar un proceso mal diseñado solo hace que sus fallas ocurran más rápido.\n\nLo ideal es modelarlo, mejorarlo y después automatizarlo.' },
        { title: '¿Toda empresa necesita IA, IoT y Big Data?', content: 'No. La tecnología se elige según el problema, los datos disponibles y los recursos de la organización.\n\nUna empresa pequeña puede lograr mucho con servicios en la nube y automatización básica de tareas.' },
        { title: '¿Por dónde empezar una transformación?', content: 'Un camino frecuente es:\n\n1. Diagnosticar la madurez digital.\n2. Modelar los procesos clave.\n3. Identificar oportunidades con la matriz impacto/esfuerzo.\n4. Probar con un piloto pequeño y medir resultados.' }
    ];
    
    function showAnswer(index) {
        const answer = faqAnswers[index];
        if (answerContent && answer) {
            answerContent.innerHTML = `<h4 style="color: #fff; font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem;">${answer.title}</h4><div style="white-space: pre-line;">${answer.content}</div>`;
        }
    }
    
    // Show first answer by default
    showAnswer(0);
    
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            
            // Update active state
            faqButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show answer
            showAnswer(index);
        });
    });
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            if (targetId === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // MENÚ: RAYITA ACTIVA SEGÚN LA SECCIÓN
    // ========================================
    const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]'));
    // Secciones en el mismo orden en que aparecen en la página (se toman del propio menú)
    const navTargets = [...new Set(navAnchors.map(a => a.getAttribute('href')))].filter(h => h.length > 1);
    let navLockUntil = 0;

    function setActiveNav(href) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
    }

    function updateActiveNav() {
        if (Date.now() < navLockUntil) return;
        const y = window.scrollY + 140;
        let current = '#inicio';
        navTargets.forEach(id => {
            const el = document.querySelector(id);
            if (el && el.getBoundingClientRect().top + window.scrollY <= y) current = id;
        });
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) current = '#contacto';
        setActiveNav(current);
    }

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function() {
            const href = this.getAttribute('href');
            setActiveNav(href);
            navLockUntil = Date.now() + 900;
            if (href === '#inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setTimeout(updateActiveNav, 950);
        });
    });

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();

    // ========================================
    // BOTÓN FLOTANTE DE DOCUMENTACIÓN
    // Oculto al cargar; aparece cuando se empieza a bajar
    // ========================================
    const docFloat = document.getElementById('docFloat');
    const DOC_FLOAT_SHOW_AFTER = 80; // px de scroll antes de mostrarlo

    function updateDocFloat() {
        if (!docFloat) return;
        const show = window.pageYOffset > DOC_FLOAT_SHOW_AFTER;
        docFloat.classList.toggle('visible', show);
        docFloat.setAttribute('aria-hidden', show ? 'false' : 'true');
        docFloat.tabIndex = show ? 0 : -1;
    }

    window.addEventListener('scroll', updateDocFloat, { passive: true });
    updateDocFloat();

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    let lastScroll = 0;
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        mainNav.classList.toggle('scrolled', currentScroll > 10);
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // TESTIMONIALS HORIZONTAL SCROLL
    // ========================================
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    
    if (testimonialsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsCarousel.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsCarousel.offsetLeft;
            scrollLeft = testimonialsCarousel.scrollLeft;
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });
        
        testimonialsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });
        
        testimonialsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsCarousel.scrollLeft = scrollLeft - walk;
        });
        
        testimonialsCarousel.style.cursor = 'grab';
    }
    
    
    // ========================================
    // OVA G4: PESTAÑAS, AUTODIAGNÓSTICO Y RETO
    // ========================================
    const $ = q => document.querySelector(q), $$ = q => [...document.querySelectorAll(q)];
    function tabs(boxId, panelId, items, render, fn) {
        const box = $(boxId), pan = $(panelId);
        if (!box || !pan) return;
        box.innerHTML = items.map(it => `<button type="button">${it.t}</button>`).join('');
        const sel = i => {
            [...box.children].forEach((b, j) => b.classList.toggle('on', i === j));
            pan.style.animation = 'none'; pan.offsetWidth; pan.style.animation = '';
            pan.innerHTML = render(items[i], i);
            if (fn) fn(i);
        };
        [...box.children].forEach((b, i) => b.onclick = () => sel(i));
        sel(0);
    }
    tabs('#lvTabs', '#lvPanel', [
        { t: '1 · Inicial', d: 'Herramientas aisladas, procesos manuales y decisiones tomadas por intuición.', s: 'Registrar cómo se trabaja hoy y qué datos existen.' },
        { t: '2 · Emergente', d: 'Hay iniciativas digitales por área, pero sin coordinación y con datos dispersos.', s: 'Definir una visión digital común.' },
        { t: '3 · Definido', d: 'Existe una estrategia digital formal y los procesos clave están documentados.', s: 'Integrar sistemas y definir indicadores.' },
        { t: '4 · Gestionado', d: 'Los procesos se miden y automatizan; las decisiones se apoyan en datos.', s: 'Escalar lo que funciona y fortalecer el talento digital.' },
        { t: '5 · Optimizado', d: 'Mejora continua, innovación constante y cultura digital consolidada.', s: 'Explorar nuevos servicios y modelos de negocio.' }],
        (it, i) => `<h4>Nivel ${i + 1}: ${it.t.slice(4)}</h4><p>${it.d}</p><p style="margin-top:10px"><b>Siguiente paso →</b> ${it.s}</p>`,
        i => { $('#meterFill').style.width = (i + 1) * 20 + '%'; });
    tabs('#bpmTabs', '#bpmPanel', [
        { t: '🔍 Identificar', d: 'Se reconocen los procesos clave y quién los realiza.' },
        { t: '✏️ Modelar', d: 'Se dibuja el proceso actual y el deseado con BPMN.' },
        { t: '▶️ Ejecutar', d: 'El proceso se pone en marcha, con apoyo de software o automatización.' },
        { t: '📈 Monitorear', d: 'Se miden tiempos, costos y calidad con indicadores.' },
        { t: '🔧 Optimizar', d: 'Se corrigen cuellos de botella y el ciclo vuelve a empezar.' }],
        (it, i) => `<h4>Fase ${i + 1}: ${it.t.slice(3)}</h4><p>${it.d}</p>`);
    tabs('#elTabs', '#elPanel', [
        { t: '⭕ Eventos', d: 'Algo que ocurre durante el proceso. Inicio (círculo delgado), intermedio (círculo doble) y fin (círculo grueso).', e: '“Llega un pedido”, “Se vence un plazo”.' },
        { t: '▭ Actividades', d: 'Trabajo que se realiza: una tarea (una acción) o un subproceso (agrupa varias tareas).', e: '“Validar pago”, “Preparar pedido”.' },
        { t: '◇ Compuertas', d: 'Controlan cómo se divide o se une el flujo: exclusiva (un solo camino), paralela (todos a la vez) e inclusiva (uno o varios).', e: '“¿Hay stock?”.' },
        { t: '➜ Flujos', d: 'La flecha continua indica la secuencia de actividades; la línea discontinua representa mensajes entre participantes.', e: 'Del pedido recibido a la validación.' },
        { t: '🏊 Participantes', d: 'Los pools representan organizaciones o participantes; los carriles (lanes) los dividen por roles o áreas.', e: 'Carriles: Ventas, Bodega, Finanzas.' },
        { t: '📎 Artefactos', d: 'Objetos de datos, anotaciones y grupos que añaden información sin cambiar el flujo.', e: 'Una nota: “Pedidos de más de $1 000 000 requieren aprobación”.' }],
        it => `<h4>${it.t.slice(3)}</h4><p>${it.d}</p><p style="margin-top:8px"><b>Ejemplo:</b> ${it.e}</p>`);
    tabs('#techTabs', '#techPanel', [
        { t: '🧠 IA', n: 'Inteligencia Artificial', d: 'Sistemas que aprenden de los datos para predecir, clasificar o generar contenido.', e: 'Asistentes virtuales de atención, detección de fraude, pronóstico de demanda.', b: 'Decisiones más rápidas y servicios personalizados.', r: 'Calidad de los datos, sesgos y uso ético.' },
        { t: '☁️ Cloud', n: 'Computación en la nube', d: 'Servicios de cómputo, almacenamiento y software ofrecidos por internet según la demanda.', e: 'ERP en la nube, copias de seguridad remotas, trabajo colaborativo.', b: 'Escalabilidad, acceso remoto y menor inversión inicial.', r: 'Seguridad, costos variables y dependencia del proveedor.' },
        { t: '📊 Big Data', n: 'Big Data', d: 'Análisis de grandes volúmenes de datos, de variadas fuentes y generados con rapidez (volumen, velocidad y variedad).', e: 'Estudiar hábitos de compra para planear inventarios o campañas.', b: 'Decisiones basadas en evidencia.', r: 'Privacidad, calidad de la información y talento analítico.' },
        { t: '📡 IoT', n: 'Internet de las Cosas', d: 'Objetos con sensores conectados a internet que envían datos de forma continua.', e: 'Sensores de temperatura en la cadena de frío, medidores inteligentes, seguimiento de flotas.', b: 'Monitoreo en tiempo real y mantenimiento anticipado.', r: 'Seguridad de los dispositivos y conectividad estable.' },
        { t: '⚙️ Automatización', n: 'Automatización', d: 'Software que ejecuta tareas repetitivas siguiendo reglas definidas, como RPA y flujos de trabajo.', e: 'Conciliación de facturas, aprobaciones automáticas, envío de notificaciones.', b: 'Menos errores y más tiempo para tareas de valor.', r: 'Rediseñar el proceso antes de automatizarlo.' }],
        it => `<div class="ic">${it.t.split(' ')[0]}</div><h4>${it.n}</h4><p>${it.d}</p><ul><li><b>Ejemplos:</b> ${it.e}</li><li><b>Aporta:</b> ${it.b}</li><li><b>Reto:</b> ${it.r}</li></ul>`);
    $$('.flip').forEach(f => f.onclick = () => f.classList.toggle('open'));

    // Autodiagnóstico
    const ST = ['Tenemos una visión digital definida y respaldada por la dirección.', 'Los procesos clave están documentados y se miden.', 'El personal recibe formación y se abre a nuevas herramientas.', 'Los sistemas están integrados y protegidos.', 'Las decisiones se apoyan en datos confiables.', 'Los clientes pueden atender sus trámites por canales digitales.'],
        NV = ['Inicial', 'Emergente', 'Definido', 'Gestionado', 'Optimizado'],
        AD = ['Empieza registrando cómo se trabaja hoy y qué datos existen.', 'Define una visión digital común y elige un proceso piloto.', 'Integra sistemas y define indicadores para medir.', 'Escala lo que funciona y fortalece el talento digital.', 'Explora nuevos servicios y modelos de negocio.'];
    const stBox = $('#selfTest');
    if (stBox) {
        stBox.innerHTML = ST.map((t, i) => `<label class="o-chk"><input type="checkbox"> ${t}</label>`).join('') + '<div id="stRes"></div>';
        const calc = () => {
            const n = $$('#selfTest input:checked').length, l = n <= 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : n < 6 ? 3 : 4;
            $('#stRes').innerHTML = `<p class="o-score">Nivel ${l + 1}: ${NV[l]}</p><p><b>Siguiente paso →</b> ${AD[l]}</p>`;
        };
        stBox.onchange = calc; calc();
    }

    // Reto final
    const Q = [
        { q: 'Una empresa tiene iniciativas digitales aisladas y sin coordinación. ¿Qué nivel de madurez describe?', o: ['Inicial', 'Emergente', 'Optimizado'], a: 1, f: 'Hay avances, pero cada área trabaja por su cuenta.' },
        { q: '¿Qué es BPMN?', o: ['Un software de contabilidad', 'Una notación gráfica estándar para modelar procesos', 'Un tipo de base de datos'], a: 1, f: 'BPM es la disciplina; BPMN es el lenguaje para dibujar los procesos.' },
        { q: 'Una tarea manual, repetitiva y basada en reglas es buena candidata a…', o: ['Automatización', 'Más reuniones', 'Eliminar el indicador'], a: 0, f: 'Las tareas repetitivas con reglas claras son ideales para automatizar.' },
        { q: '¿Qué tecnología capta datos mediante sensores conectados a internet?', o: ['Cloud', 'IoT', 'Modelado BPMN'], a: 1, f: 'IoT conecta objetos físicos y envía sus datos de forma continua.' }];
    let qi = 0, pts = 0, answered = false;
    const qBox = $('#quizBox');
    function showQ() {
        if (!qBox) return;
        const q = Q[qi]; answered = false;
        qBox.style.animation = 'none'; qBox.offsetWidth; qBox.style.animation = '';
        qBox.innerHTML = `<small>Pregunta ${qi + 1} de ${Q.length}</small><p class="o-q">${q.q}</p>` + q.o.map((t, i) => `<button type="button" class="o-opt" data-i="${i}">${t}</button>`).join('') + '<div class="o-fb"></div>';
        $$('.o-opt').forEach(b => b.onclick = () => {
            if (answered) return; answered = true;
            const i = +b.dataset.i; $$('.o-opt')[q.a].classList.add('ok');
            if (i === q.a) pts++; else b.classList.add('no');
            qBox.querySelector('.o-fb').innerHTML = q.f + '<br><button type="button" class="o-next">' + (qi < Q.length - 1 ? 'Siguiente →' : 'Ver resultado') + '</button>';
            qBox.querySelector('.o-next').onclick = () => { qi++; qi < Q.length ? showQ() : endQ(); };
        });
    }
    function endQ() {
        qBox.innerHTML = `<p class="o-score">${pts}/${Q.length}</p><p>${pts >= 3 ? '¡Excelente! Dominas los temas del grupo G4.' : 'Repasa los temas y vuelve a intentarlo.'}</p><button type="button" class="o-next" id="again">Reintentar</button>`;
        $('#again').onclick = () => { qi = 0; pts = 0; showQ(); };
    }
    showQ();
    
    console.log('OVA G4 cargado correctamente');
});

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    // Seleccionar todos los elementos a revelar
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // AÑADIR CLASES REVEAL A ELEMENTOS
    // ========================================
    function addRevealClasses() {
        // Section headers
        document.querySelectorAll('.section-header').forEach((el, i) => {
            el.classList.add('reveal');
        });

        // Service cards con delay escalonado
        document.querySelectorAll('.service-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Benefit items con delay y dirección alternada
        document.querySelectorAll('.benefit-item').forEach((el, i) => {
            el.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Stats / numbers
        document.querySelectorAll('.stat-item, .counter-item').forEach((el, i) => {
            el.classList.add('reveal', 'reveal-scale', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Code blocks
        document.querySelectorAll('.code-grid, .headers-table, .code-block').forEach(el => {
            el.classList.add('reveal');
        });

        // Steps
        document.querySelectorAll('.step-item, .step-card, .how-step, .hiw-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // Testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
        });

        // Tarjetas de integración
        document.querySelectorAll('.int-card').forEach((el, i) => {
            el.classList.add('reveal', 'reveal-scale', `reveal-delay-${Math.min(i + 1, 6)}`);
        });

        // FAQ elements
        document.querySelectorAll('.faq-btn').forEach((el, i) => {
            el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 6)}`);
        });
        document.querySelectorAll('.faq-answer').forEach(el => {
            el.classList.add('reveal', 'reveal-right');
        });

        // CTA / WhatsApp blocks
        document.querySelectorAll('.whatsapp-cta').forEach(el => {
            el.classList.add('reveal');
        });

        // Re-observar los nuevos elementos
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }

    addRevealClasses();

    console.log('✨ Animaciones scroll-reveal activadas!');

// ========================================
// ANIMACIÓN DE ENTRADA — TARJETAS DE ACCESO RÁPIDO
// ========================================
(function () {
    const section = document.querySelector('.quick-cards');
    if (!section) return;

    section.querySelectorAll('.quick-card').forEach((card, i) => card.style.setProperty('--i', i));
    section.classList.add('qc-js');

    const play = () => {
        if (section.classList.contains('qc-in')) return;
        section.classList.add('qc-in');
        // Cuando termina la entrada, se fija el estado final para que no se repita
        const lastIcon = section.querySelector('.quick-card:last-child .quick-card-icon');
        const finish = () => section.classList.add('qc-done');
        if (lastIcon) lastIcon.addEventListener('animationend', finish, { once: true });
        setTimeout(finish, 3500);
    };

    if (!('IntersectionObserver' in window)) { play(); return; }

    const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) { play(); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(section);

    // Respaldo: si por algún motivo no se dispara, se muestran igual
    setTimeout(play, 4000);
})();

