/* ============================================================
   SCRIPT — JESSI MADALENA
   GSAP · AOS · Swiper · Counter Animations · Scroll Behavior

   Performance improvements applied:
   - Single, merged scroll handler (was two separate listeners)
   - All scroll/touch listeners use { passive: true }
   - RAF-throttled scroll progress bar (no jank on fast scrolls)
   - prefers-reduced-motion respected for GSAP timelines
   - Tilt effect disabled on touch devices
   - AOS and ScrollTrigger lazy-refresh debounced on resize
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // REDUCED MOTION CHECK
  // Honour OS-level accessibility setting — skip heavy animations
  // ============================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // LANGUAGE SWITCHER & TRANSLATIONS
  // ============================================================
  const translations = {
    pt: {
      nav_sobre: "Sobre",
      nav_projetos: "Projetos",
      nav_gastronomia: "Gastronomia",
      nav_destaques: "Destaques",
      nav_cta: "Trabalhe Comigo",
      hero_tag: "Criadora de Conteúdo · Angola",
      hero_subtitle: "Viagens &nbsp;·&nbsp; Gastronomia &nbsp;·&nbsp; Reviews &nbsp;·&nbsp; Experiências",
      hero_desc: "Explorando Angola através da cultura, da gastronomia e de experiências autênticas.",
      hero_quote: "\"Mostrar ao mundo que Angola é muito mais do que os estereótipos.\"",
      hero_btn_cta: "Trabalhe Comigo",
      hero_btn_projetos: "Explorar Projetos",
      sobre_eyebrow: "A Criadora & Empreendedora",
      sobre_title: "Uma voz que mudou<br /><em>a forma como Angola é vista</em>",
      sobre_text1: "Nascida na Lunda Norte, Jessi Madalena cresceu com a convicção de que Angola merecia ser contada com outras palavras. Licenciada em Gestão de Empresas pelo ISPTEC, começou a criar conteúdo em 2020 e construiu, em poucos anos, a maior conta dedicada ao turismo em Angola — com mais de 1 milhão de seguidores entre Instagram e TikTok.",
      sobre_text2: "O seu trabalho vai além de publicações bonitas. É uma missão documentada, premiada e reconhecida internacionalmente: mostrar a sofisticação, a diversidade cultural e a beleza genuína de um país que o mundo ainda está a descobrir.",
      sobre_pillar1: "Gestão & Estratégia",
      sobre_pillar2: "Storytelling Autêntico",
      sobre_pillar3: "Impacto no Turismo Nacional",
      sobre_btn: "Conhecer Mais",
      ae_eyebrow: "Empreendedorismo",
      ae_title: "Angola<br /><em>Experience</em>",
      ae_text1: "Para além do trabalho como criadora de conteúdo e embaixadora do turismo angolano, Jessi Madalena também desenvolve projectos que promovem o país de forma directa.",
      ae_text2: "Um desses projectos é a <strong>Angola Experience</strong> — uma agência de turismo criada para conectar viajantes às experiências mais autênticas de Angola. Através de roteiros, pacotes e vivências cuidadosamente desenhadas, a Angola Experience convida pessoas de dentro e fora do país a descobrir Angola de forma real, profunda e inesquecível.",
      ae_pillar1: "Destinos Naturais",
      ae_pillar2: "Cultura Local",
      ae_pillar3: "Roteiros Premium",
      ae_btn: "Conhecer a Angola Experience",
      projetos_eyebrow: "Trabalhos & Iniciativas",
      projetos_title: "Projetos &<br /><em>Colaborações</em>",
      projetos_intro: "Ao longo da sua trajetória, Jessi Madalena desenvolveu iniciativas, campanhas e colaborações que promovem a cultura, a gastronomia e o turismo angolano para audiências nacionais e internacionais.",
      projetos_tag_turismo: "Campanha de Turismo",
      projetos_feat_title: "Visit Angola — The Rhythm of Life",
      projetos_feat_desc: "Participação na campanha internacional \"Visit Angola – The Rhythm of Life\", iniciativa que promove Angola como destino turístico global através de experiências culturais, paisagens naturais e conteúdos digitais que apresentam a autenticidade do país.",
      projetos_feat_btn: "Visitar Campanha",
      projetos_tag_comunic: "Comunicação Institucional",
      projetos_card1_title: "Angola Produz",
      projetos_card1_desc: "Colaboração com a iniciativa Angola Produz, projecto que promove a produção nacional e aproxima informação económica e institucional do público.",
      projetos_card1_btn: "Ver Iniciativa",
      projetos_tag_gastro: "Gastronomia",
      projetos_card2_title: "Pequenas Empresas, Grandes Sabores",
      projetos_card2_desc: "Rubrica dedicada a dar visibilidade a pequenos negócios de gastronomia e turismo em Angola, destacando restaurantes locais e experiências autênticas.",
      projetos_card2_btn: "Explorar",
      projetos_tag_viagens: "Viagens & Cultura",
      projetos_card3_title: "Experiências pelo Mundo",
      projetos_card3_desc: "Conteúdos que exploram destinos, sabores e histórias que aproximam diferentes culturas e mostram Angola ao mundo.",
      projetos_card3_btn: "Ver Viagens",
      gastro_eyebrow: "Mesa & Sabor",
      gastro_title: "Gastronomia<br /><em>& Reviews</em>",
      gastro_text1: "A gastronomia é uma das formas através das quais Jessi Madalena partilha Angola com o mundo.",
      gastro_text2: "Entre restaurantes em Luanda e descobertas culinárias durante as suas viagens, Jessi explora sabores, ambientes e experiências que revelam a riqueza e diversidade da cozinha angolana e internacional.",
      gastro_text3: "Este olhar gastronómico também deu origem ao <strong>Menu da Jessi</strong>, uma iniciativa que conecta pessoas a restaurantes cuidadosamente selecionados, promovendo experiências culinárias acessíveis, de qualidade e cheias de sabor.",
      gastro_text4: "Com a Jessi cada prato conta uma história — e ela é a narradora perfeita para ajudar a contá-la.",
      gastro_btn: "Ver Menu da Jessi",
      rec_eyebrow: "Reconhecimento",
      rec_title: "Destaques<br /><em>& Conquistas</em>",
      contato_title: "Vamos trabalhar<br /><em>juntos</em>",
      contato_text: "Se a sua marca, hotel, restaurante ou evento quer ser comunicado com autenticidade e alcançar uma audiência engajada de mais de 1 milhão de pessoas em Angola e na diáspora — este é o lugar certo. Conte-me o seu projecto e construímos juntos uma proposta à medida.",
      contato_btn: "Enviar Proposta de Parceria",
      footer_tagline: "\"Mostrar ao mundo que Angola é muito mais do que os estereótipos.\"",
      footer_copy: "© 2026 Jessi Madalena. Todos os direitos reservados.",
      footer_credit: "Feito por Milton Diogo"
    },
    en: {
      nav_sobre: "About",
      nav_projetos: "Projects",
      nav_gastronomia: "Gastronomy",
      nav_destaques: "Highlights",
      nav_cta: "Work With Me",
      hero_tag: "Content Creator · Angola",
      hero_subtitle: "Travel &nbsp;·&nbsp; Gastronomy &nbsp;·&nbsp; Reviews &nbsp;·&nbsp; Experiences",
      hero_desc: "Exploring Angola through culture, gastronomy, and authentic experiences.",
      hero_quote: "\"Showing the world that Angola is much more than stereotypes.\"",
      hero_btn_cta: "Work With Me",
      hero_btn_projetos: "Explore Projects",
      sobre_eyebrow: "The Creator & Entrepreneur",
      sobre_title: "A voice that changed<br /><em>how Angola is seen</em>",
      sobre_text1: "Born in Lunda Norte, Jessi Madalena grew up with the conviction that Angola deserved to be told in other words. With a degree in Business Management from ISPTEC, she started creating content in 2020 and built, in a few years, the largest tourism-dedicated account in Angola — with over 1 million followers between Instagram and TikTok.",
      sobre_text2: "Her work goes beyond beautiful posts. It's a documented, awarded, and internationally recognized mission: to show the sophistication, cultural diversity, and genuine beauty of a country the world is still discovering.",
      sobre_pillar1: "Management & Strategy",
      sobre_pillar2: "Authentic Storytelling",
      sobre_pillar3: "Impact on National Tourism",
      sobre_btn: "Learn More",
      ae_eyebrow: "Entrepreneurship",
      ae_title: "Angola<br /><em>Experience</em>",
      ae_text1: "Beyond her work as a content creator and ambassador for Angolan tourism, Jessi Madalena also develops projects that directly promote the country.",
      ae_text2: "One of these projects is <strong>Angola Experience</strong> — a tourism agency created to connect travelers to the most authentic experiences in Angola. Through thoughtfully designed itineraries, packages, and experiences, Angola Experience invites people from inside and outside the country to discover Angola in a real, deep, and unforgettable way.",
      ae_pillar1: "Natural Destinations",
      ae_pillar2: "Local Culture",
      ae_pillar3: "Premium Itineraries",
      ae_btn: "Discover Angola Experience",
      projetos_eyebrow: "Work & Initiatives",
      projetos_title: "Projects &<br /><em>Collaborations</em>",
      projetos_intro: "Throughout her journey, Jessi Madalena has developed initiatives, campaigns, and collaborations that promote Angolan culture, gastronomy, and tourism to national and international audiences.",
      projetos_tag_turismo: "Tourism Campaign",
      projetos_feat_title: "Visit Angola — The Rhythm of Life",
      projetos_feat_desc: "Participation in the international campaign \"Visit Angola – The Rhythm of Life\", an initiative that promotes Angola as a global tourist destination through cultural experiences, natural landscapes, and digital content that showcase the country's authenticity.",
      projetos_feat_btn: "Visit Campaign",
      projetos_tag_comunic: "Institutional Communication",
      projetos_card1_title: "Angola Produz",
      projetos_card1_desc: "Collaboration with the Angola Produz initiative, a project that promotes national production and brings economic and institutional information closer to the public.",
      projetos_card1_btn: "View Initiative",
      projetos_tag_gastro: "Gastronomy",
      projetos_card2_title: "Small Businesses, Big Flavors",
      projetos_card2_desc: "A segment dedicated to giving visibility to small gastronomy and tourism businesses in Angola, highlighting local restaurants and authentic experiences.",
      projetos_card2_btn: "Explore",
      projetos_tag_viagens: "Travel & Culture",
      projetos_card3_title: "Experiences Around the World",
      projetos_card3_desc: "Content exploring destinations, flavors, and stories that bridge different cultures and showcase Angola to the world.",
      projetos_card3_btn: "View Travels",
      gastro_eyebrow: "Table & Flavor",
      gastro_title: "Gastronomy<br /><em>& Reviews</em>",
      gastro_text1: "Gastronomy is one of the ways through which Jessi Madalena shares Angola with the world.",
      gastro_text2: "Between restaurants in Luanda and culinary discoveries during her travels, Jessi explores flavors, atmospheres, and experiences that reveal the richness and diversity of Angolan and international cuisine.",
      gastro_text3: "This gastronomic perspective also gave rise to <strong>Menu da Jessi</strong>, an initiative that connects people to carefully selected restaurants, promoting accessible, high-quality, and flavorful culinary experiences.",
      gastro_text4: "With Jessi, every dish tells a story — and she is the perfect narrator to help tell it.",
      gastro_btn: "View Menu da Jessi",
      rec_eyebrow: "Recognition",
      rec_title: "Highlights<br /><em>& Achievements</em>",
      contato_title: "Let's work<br /><em>together</em>",
      contato_text: "If your brand, hotel, restaurant, or event wants to be communicated authentically and reach an engaged audience of over 1 million people in Angola and the diaspora — this is the right place. Tell me about your project and we'll build a custom proposal together.",
      contato_btn: "Send Partnership Proposal",
      footer_tagline: "\"Showing the world that Angola is much more than stereotypes.\"",
      footer_copy: "© 2026 Jessi Madalena. All rights reserved.",
      footer_credit: "Made by Milton Diogo"
    }
  };

  const getSavedLang = () => localStorage.getItem('site_lang') || 'pt';
  const saveLang = (lang) => localStorage.setItem('site_lang', lang);

  const applyTranslations = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update active state of buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const isCurrentLang = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isCurrentLang);
      btn.setAttribute('aria-pressed', String(isCurrentLang));
    });
  };

  // Initialize Language
  applyTranslations(getSavedLang());

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      saveLang(lang);
      applyTranslations(lang);
    });
  });

  // ============================================================
  // GSAP SETUP
  // ============================================================

  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // AOS INIT
  // ============================================================

  AOS.init({
    duration: 900,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    once: true,
    offset: 80,
    // Skip AOS animations when user prefers reduced motion
    disable: prefersReducedMotion,
  });


  // ============================================================
  // NAVBAR — STATE
  // ============================================================

  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Close on backdrop tap
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
  });


  // ============================================================
  // ACTIVE NAV LINK — IntersectionObserver
  // ============================================================

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(s => sectionObserver.observe(s));


  // ============================================================
  // MERGED SCROLL HANDLER
  // Combines: navbar state + progress bar update
  // Uses { passive: true } so the browser never waits for JS
  // before painting scroll frames — key for smooth 60fps.
  // Progress bar update is RAF-throttled to avoid layout thrash
  // on every single scroll event (can fire 100+ times/sec).
  // ============================================================

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(to right, #C9A46C, #E8CFA0);
    z-index: 9999;
    width: 0%;
    will-change: width;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  let rafScheduled = false;

  const onScroll = () => {
    // Navbar — cheap class toggle, runs synchronously
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Progress bar — deferred to next rAF to avoid forced layout
    if (!rafScheduled) {
      rafScheduled = true;
      requestAnimationFrame(() => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.body.scrollHeight - window.innerHeight;
        const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
        rafScheduled = false;
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  // ============================================================
  // HERO — GSAP ENTRANCE ANIMATIONS
  // ============================================================

  if (!prefersReducedMotion) {
    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl
      .to('#heroTag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-title-line', { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
      .to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('#heroDesc',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to('#heroQuote',    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to('#heroButtons',  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('#heroStats',    { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .to('#scrollIndicator', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  } else {
    // Instantly show all hero elements — no animation
    gsap.set(['#heroTag', '.hero-title-line', '#heroSubtitle', '#heroDesc',
              '#heroQuote', '#heroButtons', '#heroStats', '#scrollIndicator'],
      { opacity: 1, y: 0 });
  }


  // ============================================================
  // HERO — PARALLAX ON SCROLL
  // ============================================================

  if (!prefersReducedMotion) {
    gsap.to('.hero-image-placeholder', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        scrub: 1,
        start: 'top top',
        end: 'bottom top',
      },
    });
  }


  // ============================================================
  // BUTTON HOVER — GSAP MICRO-INTERACTIONS
  // Skipped on touch devices (mousemove never fires there)
  // ============================================================

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }


  // ============================================================
  // ANIMATED COUNTER — RECONHECIMENTO SECTION
  // ============================================================

  const counterElements = document.querySelectorAll('.stat-big[data-count]');

  const animateCounter = el => {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = prefersReducedMotion ? 0 : 2000;
    const start    = performance.now();

    const update = currentTime => {
      const elapsed  = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.floor(eased * target);

      el.textContent = target >= 1000
        ? current.toLocaleString('pt-PT')
        : current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target >= 1000
          ? target.toLocaleString('pt-PT')
          : target;
      }
    };

    if (duration === 0) {
      // Instant for reduced-motion users
      el.textContent = target >= 1000
        ? target.toLocaleString('pt-PT')
        : target;
    } else {
      requestAnimationFrame(update);
    }
  };

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterElements.forEach(el => animateCounter(el));
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsBar);
  }


  // ============================================================
  // SWIPER — VIAGENS GALLERY
  // ============================================================

  new Swiper('.viagens-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    centeredSlides: false,
    // Keyboard navigation for accessibility
    keyboard: { enabled: true },
    a11y: { enabled: true },
    pagination: {
      el: '.viagens-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.viagens-prev',
      nextEl: '.viagens-next',
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      540:  { slidesPerView: 1.5, centeredSlides: true },
      768:  { slidesPerView: 2,   spaceBetween: 24, centeredSlides: false },
      1024: { slidesPerView: 3,   spaceBetween: 28, centeredSlides: false },
    },
  });


  // ============================================================
  // GSAP — SOBRE IMAGE REVEAL (clip-path)
  // ============================================================

  if (!prefersReducedMotion) {
    gsap.fromTo('.sobre-image-wrapper',
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.sobre-image-wrapper',
          start: 'top 80%',
        },
      }
    );


    // ============================================================
    // GSAP — GOLD ACCENT LINE ON HERO QUOTE
    // ============================================================

    gsap.fromTo('.hero-quote',
      { borderLeftColor: 'rgba(201, 164, 108, 0)' },
      { borderLeftColor: 'rgba(201, 164, 108, 1)', duration: 1, delay: 1.8, ease: 'power2.out' }
    );


    // ============================================================
    // GSAP — CONTACT SECTION GOLD GLOW
    // ============================================================

    gsap.fromTo('.contato-title em',
      { color: 'rgba(201, 164, 108, 0)', textShadow: '0 0 0px rgba(201, 164, 108, 0)' },
      {
        color: '#C9A46C',
        textShadow: '0 0 30px rgba(201, 164, 108, 0.3)',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#contato', start: 'top 60%' },
      }
    );


    // ============================================================
    // GSAP — FOOTER LOGO REVEAL
    // ============================================================

    gsap.fromTo('.footer-logo',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%' },
      }
    );
  }


  // ============================================================
  // CARD HOVER — 3D TILT EFFECT
  // Only activates on non-touch devices
  // ============================================================

  if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('.ae-card, .rec-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect    = card.getBoundingClientRect();
        const centerX = rect.left + rect.width  / 2;
        const centerY = rect.top  + rect.height / 2;
        const deltaX  = ((e.clientX - centerX) / rect.width)  * 6;
        const deltaY  = ((e.clientY - centerY) / rect.height) * 6;

        gsap.to(card, {
          rotateY: deltaX,
          rotateX: -deltaY,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }


  // ============================================================
  // GASTRO IMAGES — HOVER SHIMMER
  // CSS handles the :hover scale; GSAP adds elastic ease-out
  // ============================================================

  if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('.gastro-mini-img').forEach(img => {
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
      });
    });
  }

  // ============================================================
  // GASTRONOMIA GALLERY INTERACTION
  // ============================================================

  const gastroMainPhoto = document.querySelector('.gastro-main-photo');
  const gastroMiniImgs = document.querySelectorAll('.gastro-mini-img');

  if (gastroMainPhoto && gastroMiniImgs.length > 0) {
    gastroMiniImgs.forEach(miniContainer => {
      miniContainer.addEventListener('click', () => {
        const miniImg = miniContainer.querySelector('img');
        if (!miniImg) return;

        // Skip if already active
        if (miniContainer.classList.contains('active')) return;

        // Smooth transition out
        gastroMainPhoto.classList.add('swapping');

        // Swap after opacity transition finishes
        setTimeout(() => {
          // Backup main src and alt
          const mainSrc = gastroMainPhoto.src;
          const mainAlt = gastroMainPhoto.alt;

          // Swap src and alt
          gastroMainPhoto.src = miniImg.src;
          gastroMainPhoto.alt = miniImg.alt;
          
          miniImg.src = mainSrc;
          miniImg.alt = mainAlt;

          // Update active states purely for visual borders if needed
          gastroMiniImgs.forEach(m => m.classList.remove('active'));
          miniContainer.classList.add('active');

          // Smooth transition in
          gastroMainPhoto.classList.remove('swapping');
        }, 250); // Matches CSS transition duration
      });
    });
  }


  // ============================================================
  // SMOOTH ANCHOR SCROLL — WITH NAVBAR OFFSET
  // ============================================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });


  // ============================================================
  // RESIZE — Debounced AOS & ScrollTrigger refresh
  // Avoids calling refresh dozens of times while the user
  // drags the window edge.
  // ============================================================

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      AOS.refresh();
      ScrollTrigger.refresh();
    }, 200);
  }, { passive: true });

});
