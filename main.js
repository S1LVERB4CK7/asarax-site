// espaço para animações, scroll effects e integrações futuras
console.log("ASARAX ready.");    
/* ============================
   ASARAX — MICROINTERAÇÕES IA
   Vanilla JS | Production Ready
============================ */

/* ============================
   CONFIG
============================ */
const ASARAX_CONFIG = {
  enableCTAIntelligence: true,
  enableCardInteraction: true,
  enableAttentionMessage: true,
  attentionDelay: 20000 // 20s
};

/* ============================
   CTA "INTELIGENTE"
============================ */
if (ASARAX_CONFIG.enableCTAIntelligence) {
  const ctaButtons = document.querySelectorAll('.btn.primary');

  ctaButtons.forEach(btn => {
    const originalText = btn.textContent;

    btn.addEventListener('mouseenter', () => {
      btn.textContent = 'Analyzing availability...';
    });

    btn.addEventListener('mouseleave', () => {
      btn.textContent = originalText;
    });

    btn.addEventListener('click', () => {
      btn.textContent = 'Processing request...';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.textContent = 'Redirecting...';
      }, 1200);
    });
  });
}

/* ============================
   CARDS REATIVOS (SISTEMA VIVO)
============================ */
if (ASARAX_CONFIG.enableCardInteraction) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    let rafId = null;

    const onMove = e => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * 8;
        const rotateY = ((x - rect.width / 2) / rect.width) * -8;

        card.style.transform = `
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;

        rafId = null;
      });
    };

    const reset = () => {
      card.style.transform = `
        perspective(800px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
      `;
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  });
}

/* ============================
   MENSAGEM CONTEXTUAL POR ATENÇÃO
============================ */
if (ASARAX_CONFIG.enableAttentionMessage) {
  let messageShown = false;

  setTimeout(() => {
    if (messageShown) return;

    const msg = document.createElement('div');
    msg.textContent = 'High-growth companies usually start here.';

    msg.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: rgba(15,15,15,0.95);
      border: 1px solid #00ffae;
      padding: 14px 20px;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
      color: #ffffff;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.6s ease;
      z-index: 9999;
      max-width: 260px;
    `;

    document.body.appendChild(msg);

    requestAnimationFrame(() => {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transform = 'translateY(10px)';
      setTimeout(() => msg.remove(), 600);
    }, 8000);

    messageShown = true;
  }, ASARAX_CONFIG.attentionDelay);
}

/* ============================
   SCROLL AWARENESS (INTENÇÃO)
============================ */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  observer.observe(section);
});

/* ============================
   DEBUG (REMOVER EM PROD SE QUISER)
============================ */
console.log('ASARAX micro-interactions loaded.');