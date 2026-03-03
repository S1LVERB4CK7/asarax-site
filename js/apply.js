const form = document.getElementById('applyForm');

if (form) {
  form.addEventListener('submit', function () {
    const name = form.querySelector('[name="name"]').value.trim();
    const company = form.querySelector('[name="company"]').value.trim();

    const message = encodeURIComponent(
  `Olá! Meu nome é ${name}${company ? `, da empresa ${company}` : ''}. Acabei de enviar minha aplicação para uma chamada estratégica na ASARAX.`
);

    const whatsappURL = `https://wa.me/5514991081875?text=${message}`;

    // abre WhatsApp — permitido porque é submit real
    window.open(whatsappURL, '_blank');
  });
}