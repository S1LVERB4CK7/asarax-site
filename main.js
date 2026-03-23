/* ============================
   ASARAX — CORE SCRIPT FINAL
   ============================ */

/* ============================
   CONFIG
============================ */
const ASARAX_CONFIG = {
  enableCTAIntelligence: true,
  enableAttentionMessage: true,
  attentionDelay: 20000 // 20s
};

/* ============================
   HEADER SCROLL
============================ */
const hdr = document.getElementById('hdr');
if (hdr) {
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', scrollY > 60);
  }, { passive: true });
}

/* ============================
   REVEAL ON SCROLL
============================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================
   COUNTER ANIMATION
============================ */
function count(el, target, suffix = '', dur = 1800) {
  const start = performance.now();

  const tick = now => {
    const progress = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.round(ease * target) + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => {
        count(el, +el.dataset.target, el.dataset.suffix || '');
      });

      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

/* ============================
   SMOOTH SCROLL
============================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================
   CTA INTELIGENTE (OURO)
============================ */
if (ASARAX_CONFIG.enableCTAIntelligence) {
  const ctas = document.querySelectorAll('.btn.primary');

  ctas.forEach(btn => {
    const original = btn.textContent;

    btn.addEventListener('mouseenter', () => {
      btn.textContent = 'Analyzing availability...';
    });

    btn.addEventListener('mouseleave', () => {
      btn.textContent = original;
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
   MENSAGEM DE ATENÇÃO (OURO)
============================ */
if (ASARAX_CONFIG.enableAttentionMessage) {
  let shown = false;

  setTimeout(() => {
    if (shown) return;

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
      msg.style.transform = 'translateY(10px)');
      setTimeout(() => msg.remove(), 600);
    }, 8000);

    shown = true;
  }, ASARAX_CONFIG.attentionDelay);
}

/* ============================
   PHONE MASK
============================ */
const inputTel = document.getElementById('inputTel');

if (inputTel) {
  inputTel.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);

    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (v.length > 0) {
      v = v.replace(/^(\d*)$/, '($1');
    }

    this.value = v;
  });
}

/* ============================
   VALIDATION
============================ */
function setError(fieldId, hasError) {
  const f = document.getElementById(fieldId);
  if (!f) return;

  if (hasError) f.classList.add('has-error');
  else f.classList.remove('has-error');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone) {
  return phone.replace(/\D/g, '').length >= 10;
}

/* ============================
   FORM SUBMIT
============================ */
function handleSubmit() {
  const nome  = document.getElementById('inputNome').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const tel   = document.getElementById('inputTel').value.trim();

  let valid = true;

  if (!nome) { setError('fieldNome', true); valid = false; } else setError('fieldNome', false);
  if (!validateEmail(email)) { setError('fieldEmail', true); valid = false; } else setError('fieldEmail', false);
  if (!validatePhone(tel)) { setError('fieldTel', true); valid = false; } else setError('fieldTel', false);

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  const msg = encodeURIComponent(
`Olá, me chamo ${nome}.
Tenho interesse nos serviços da ASARAX.

Email: ${email}
Telefone: ${tel}`
  );

  const wppURL = `https://wa.me/5514991081875?text=${msg}`;

  setTimeout(() => {
    btn.classList.remove('loading');

    document.querySelector('.form-tag')?.style.display = 'none';
    document.querySelector('.form-title')?.style.display = 'none';
    document.querySelector('.form-desc')?.style.display = 'none';
    document.querySelector('.field-group')?.style.display = 'none';
    btn.style.display = 'none';
    document.querySelector('.form-note')?.style.display = 'none';

    const successEl = document.getElementById('formSuccess');
    document.getElementById('successWppLink').href = wppURL;

    if (successEl) successEl.style.display = 'flex';

  }, 900);
}

/* ============================
   ENTER KEY SUBMIT
============================ */
document.querySelectorAll('#formWrap input').forEach(inp => {
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSubmit();
  });
});

/* ============================
   DEBUG
============================ */
console.log('ASARAX FULL SCRIPT READY 🚀');
