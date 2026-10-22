/**
 * Checkpoint Auto - Interactive Experience Script
 * Modern, responsive, micro-interactions and WhatsApp direct quoting
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  
  // Quote Simulator Elements
  const clientName = document.getElementById('clientName');
  const carModel = document.getElementById('carModel');
  const serviceType = document.getElementById('serviceType');
  const clientObservation = document.getElementById('clientObservation');
  const summaryPreview = document.getElementById('summaryPreview');
  const btnSendQuote = document.getElementById('btnSendQuote');

  // 1. Header Scroll Shadow & Style
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 4. Interactive Quote Simulator & WhatsApp Formatter
  const updateQuotePreview = () => {
    const name = clientName.value.trim() || 'Cliente';
    const car = carModel.value.trim() || 'Meu veículo';
    const service = serviceType.value;
    const observation = clientObservation.value.trim();

    let message = `Olá! Me chamo ${name}. Gostaria de solicitar um orçamento para o meu ${car}.\n\n`;
    message += `*Serviço:* ${service}\n`;
    if (observation) {
      message += `*Detalhes / Sintomas:* ${observation}\n`;
    }
    message += `\nVim pelo site da Checkpoint Auto e gostaria de agendar uma avaliação.`;

    summaryPreview.textContent = `"${message}"`;
    return message;
  };

  if (clientName && carModel && serviceType && clientObservation) {
    clientName.addEventListener('input', updateQuotePreview);
    carModel.addEventListener('input', updateQuotePreview);
    serviceType.addEventListener('change', updateQuotePreview);
    clientObservation.addEventListener('input', updateQuotePreview);

    // Initial preview setup
    updateQuotePreview();

    // Send quote to WhatsApp
    if (btnSendQuote) {
      btnSendQuote.addEventListener('click', () => {
        const message = updateQuotePreview();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5511959183854?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  // 5. Scroll Reveal Animation for Cards
  const revealElements = document.querySelectorAll('.service-card, .process-step, .testimonial-card, .gallery-item');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      revealObserver.observe(el);
    });
  }
});
