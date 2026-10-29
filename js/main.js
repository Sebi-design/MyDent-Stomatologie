/**
 * MYDENT STOMATOLOGIE ORADEA — MAIN CLIENT LOGIC
 * High-performance Vanilla JavaScript for GitHub Pages & Local file browsing
 *
 * Global helper for service selection & in-page scrolling
 */
window.selectService = function(serviceName) {
  const messageInput = document.getElementById('message');
  if (messageInput) {
    messageInput.value = `Doresc o programare pentru serviciul: ${serviceName}.\n`;
  }
  const target = document.getElementById('programare');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect & Scroll Progress Bar
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scrollProgressBar');

  if (header || progressBar) {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Header blur styling
          if (header) {
            if (scrollY > 20) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
          }

          // Progress bar
          if (progressBar) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
            progressBar.style.transform = `scaleX(${progress})`;
          }

          // Back to Top button
          const backToTopBtn = document.getElementById('backToTopBtn');
          if (backToTopBtn) {
            if (scrollY > 380) {
              backToTopBtn.classList.add('visible');
            } else {
              backToTopBtn.classList.remove('visible');
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Smart Clinic Real-Time Open/Closed Status
  const statusBadges = document.querySelectorAll('.clinic-live-status');
  if (statusBadges.length > 0) {
    const updateLiveStatus = () => {
      try {
        const now = new Date();
        const roTimeStr = now.toLocaleString('en-US', { timeZone: 'Europe/Bucharest' });
        const roDate = new Date(roTimeStr);
        const day = roDate.getDay(); // 0: Sun, 1: Mon, ... 5: Fri, 6: Sat
        const hour = roDate.getHours();

        const isOpenDay = day >= 1 && day <= 5;
        const isOpenHour = hour >= 10 && hour < 19;
        const isOpen = isOpenDay && isOpenHour;

        statusBadges.forEach((badge) => {
          const textSpan = badge.querySelector('.status-text');
          if (!textSpan) return;

          if (isOpen) {
            badge.classList.remove('closed');
            textSpan.textContent = 'Deschis acum · Până la 19:00';
            badge.title = 'Clinica este deschisă acum. Vă așteptăm cu drag!';
          } else {
            badge.classList.add('closed');
            if (isOpenDay && hour < 10) {
              textSpan.textContent = 'Închis acum · Se deschide la 10:00';
            } else if (day === 5 && hour >= 19) {
              textSpan.textContent = 'Închis · Se deschide Luni la 10:00';
            } else if (day === 6 || day === 0) {
              textSpan.textContent = 'Închis în weekend · Se deschide Luni la 10:00';
            } else {
              textSpan.textContent = 'Recepție închisă · Se deschide mâine la 10:00';
            }
            badge.title = 'Program recepție MyDent: Luni – Vineri, 10:00 – 19:00';
          }
        });
      } catch (err) {
        // Fallback gracefully
        statusBadges.forEach((badge) => {
          const textSpan = badge.querySelector('.status-text');
          if (textSpan) textSpan.textContent = 'Luni – Vineri: 10:00 – 19:00';
        });
      }
    };

    updateLiveStatus();
    setInterval(updateLiveStatus, 60000);
  }

  // 3. Mobile Navigation Drawer
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggleBtn && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Update menu icon
      const iconMenu = mobileToggleBtn.querySelector('.icon-menu');
      const iconClose = mobileToggleBtn.querySelector('.icon-close');
      if (iconMenu && iconClose) {
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    };

    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link inside drawer (with smooth in-page scrolling)
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        toggleMenu(false);
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            setTimeout(() => {
              target.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          }
        }
      });
    });

    // Close when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Active Navigation Spy on Scroll (for single-page navigation)
  const navSections = [
    { id: 'top', linkHref: '#top' },
    { id: 'concept', linkHref: '#concept' },
    { id: 'servicii', linkHref: '#servicii' },
    { id: 'galerie', linkHref: '#concept' },
    { id: 'recenzii', linkHref: '#recenzii' },
    { id: 'faq', linkHref: '#faq' },
    { id: 'contact', linkHref: '#contact' },
    { id: 'programare', linkHref: '#contact' }
  ];

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    let currentHref = '#top';

    for (let i = navSections.length - 1; i >= 0; i--) {
      const section = document.getElementById(navSections[i].id);
      if (section && section.offsetTop <= scrollPos) {
        currentHref = navSections[i].linkHref;
        break;
      }
    }

    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-drawer a');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        if (href === currentHref) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  };

  if (document.querySelector('.desktop-nav a[href^="#"]')) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // 4. Smart Reveal-On-Scroll (Hardware-Accelerated, Zero-Reflow)
  const revealElements = document.querySelectorAll('.reveal-init');
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('revealed'));
    }
  }

  // 5. Smart Animated Stat Counters
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (counterElements.length > 0) {
    const animateCounter = (el) => {
      const targetStr = el.getAttribute('data-counter-target');
      const isDecimal = targetStr.includes('.');
      const target = parseFloat(targetStr);
      const duration = 1500;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeProgress;

        if (isDecimal) {
          el.textContent = currentVal.toFixed(1);
        } else {
          el.textContent = Math.floor(currentVal).toLocaleString('ro-RO');
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('ro-RO');
        }
      };

      requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      counterElements.forEach((el) => counterObserver.observe(el));
    } else {
      counterElements.forEach((el) => {
        el.textContent = el.getAttribute('data-counter-target');
      });
    }
  }

  // 6. Floating Back to Top Button Click
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (faqItems.length > 0) {
    faqItems.forEach((item, index) => {
      const btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // 4. Gallery Lightbox Modal
  const GALLERY_DATA = [
    { src: 'images/clinic/reception.jpg', alt: 'Recepția reală a clinicii MyDent Stomatologie Oradea cu sigla 3D aurie și candelabru sculptural' },
    { src: 'images/clinic/treatment_pendant.jpg', alt: 'Cabinetul real de tratament MyDent cu scaun ergonomic albastru, lustre cilindrice și iMac' },
    { src: 'images/clinic/treatment_art.jpg', alt: 'Cabinet stomatologic MyDent cu tablou pop-art și echipament dentar modern' },
    { src: 'images/clinic/reception_desk.jpg', alt: 'Perspectivă detaliată asupra recepției MyDent și a zonei de sterilizare' },
    { src: 'images/clinic/treatment_unit.jpg', alt: 'Unitate dentară cu monitor digital și instrumente profesionale la MyDent' },
    { src: 'images/clinic/treatment_wide.jpg', alt: 'Cabinetul spațios MyDent cu tavane înalte și mobilier medical integrat' }
  ];

  const galleryCards = document.querySelectorAll('.gallery-editorial-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  if (lightboxModal && lightboxImg && galleryCards.length > 0) {
    let activeIdx = 0;

    const showImage = (index) => {
      activeIdx = (index + GALLERY_DATA.length) % GALLERY_DATA.length;
      lightboxImg.src = GALLERY_DATA[activeIdx].src;
      lightboxImg.alt = GALLERY_DATA[activeIdx].alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = `${activeIdx + 1} / ${GALLERY_DATA.length}`;
      }
    };

    const openLightbox = (index) => {
      showImage(index);
      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    galleryCards.forEach((card, idx) => {
      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => showImage(activeIdx - 1));
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => showImage(activeIdx + 1));

    // Close on backdrop click
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop-target')) {
        closeLightbox();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showImage(activeIdx + 1);
      if (e.key === 'ArrowLeft') showImage(activeIdx - 1);
    });
  }

  // 5. Appointment Booking Form Validation & Submission
  const appointmentForm = document.getElementById('appointmentForm');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const formResetBtn = document.getElementById('formResetBtn');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const privacyConsent = document.getElementById('privacyConsent');

      let isValid = true;

      // Helper for errors
      const setError = (input, errorId, message) => {
        const errEl = document.getElementById(errorId);
        if (errEl) {
          errEl.textContent = message;
          errEl.style.display = message ? 'block' : 'none';
        }
        if (input) {
          input.setAttribute('aria-invalid', message ? 'true' : 'false');
          if (message) isValid = false;
        }
      };

      // Full Name
      if (!fullName.value.trim()) {
        setError(fullName, 'fullNameError', 'Introduceți numele și prenumele.');
      } else if (fullName.value.trim().length < 3) {
        setError(fullName, 'fullNameError', 'Numele necesită cel puțin 3 caractere.');
      } else {
        setError(fullName, 'fullNameError', '');
      }

      // Phone
      const phoneClean = phone.value.replace(/[\s.-]/g, '');
      const phoneRegex = /^(\+40|0)[237][0-9]{8}$/;
      if (!phone.value.trim()) {
        setError(phone, 'phoneError', 'Numărul de telefon este obligatoriu.');
      } else if (!phoneRegex.test(phoneClean)) {
        setError(phone, 'phoneError', 'Introduceți un număr valid (ex: 0740 000 000 sau 0359 000 000).');
      } else {
        setError(phone, 'phoneError', '');
      }

      // Email (optional)
      if (email && email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          setError(email, 'emailError', 'Formatul adresei de e-mail este invalid.');
        } else {
          setError(email, 'emailError', '');
        }
      }

      // Privacy Consent
      if (privacyConsent && !privacyConsent.checked) {
        setError(privacyConsent, 'privacyConsentError', 'Acordul pentru prelucrarea datelor este necesar.');
      } else {
        setError(privacyConsent, 'privacyConsentError', '');
      }

      if (isValid) {
        const submitBtn = document.getElementById('appointmentSubmitBtn') || appointmentForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Se transmite solicitarea...</span>';
        }

        const messageEl = document.getElementById('message');
        const payload = {
          _subject: `Programare nouă MyDent: ${fullName.value.trim()} (${phone.value.trim()})`,
          _template: 'table',
          _captcha: 'false',
          Nume_Pacient: fullName.value.trim(),
          Telefon: phone.value.trim(),
          Email: (email && email.value.trim()) ? email.value.trim() : 'Nespecificat',
          Mesaj_Probleme: (messageEl && messageEl.value.trim()) ? messageEl.value.trim() : 'Fără mențiuni',
          _replyto: (email && email.value.trim()) ? email.value.trim() : 'contact@mydent.ro'
        };

        fetch('https://formsubmit.co/ajax/sebisebi954@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(() => {
          appointmentForm.style.display = 'none';
          if (formSuccessBox) {
            formSuccessBox.style.display = 'block';
            formSuccessBox.scrollIntoView({ behavior: 'smooth' });
          }
        })
        .catch(() => {
          appointmentForm.style.display = 'none';
          if (formSuccessBox) {
            formSuccessBox.style.display = 'block';
            formSuccessBox.scrollIntoView({ behavior: 'smooth' });
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Solicita o programare »</span>';
          }
        });
      }
    });

    // Real-Time Form Field Validation Feedback
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('preferredDate');

    if (fullNameInput) {
      const parent = fullNameInput.closest('.form-input-wrapper');
      fullNameInput.addEventListener('input', () => {
        if (parent) {
          if (fullNameInput.value.trim().length >= 3) {
            parent.classList.add('is-valid');
          } else {
            parent.classList.remove('is-valid');
          }
        }
      });
    }

    if (phoneInput) {
      const parent = phoneInput.closest('.form-input-wrapper');
      const phoneRegex = /^(\+40|0)[237][0-9]{8}$/;
      phoneInput.addEventListener('input', () => {
        const phoneClean = phoneInput.value.replace(/[\s.-]/g, '');
        if (parent) {
          if (phoneRegex.test(phoneClean)) {
            parent.classList.add('is-valid');
          } else {
            parent.classList.remove('is-valid');
          }
        }
      });
    }

    if (dateInput) {
      try {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
      } catch (e) {}
    }

    if (formResetBtn) {
      formResetBtn.addEventListener('click', () => {
        appointmentForm.reset();
        document.querySelectorAll('.form-input-wrapper').forEach((w) => w.classList.remove('is-valid'));
        appointmentForm.style.display = 'block';
        if (formSuccessBox) formSuccessBox.style.display = 'none';
      });
    }
  }

  // 6. Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const btnAcceptAll = document.getElementById('cookieAcceptAll');
  const btnAcceptEssential = document.getElementById('cookieAcceptEssential');
  const btnResetConsent = document.getElementById('btnResetConsent');
  const consentStateLabel = document.getElementById('consentStateLabel');
  const resetSuccessMsg = document.getElementById('resetSuccessMsg');

  const updateConsentUI = () => {
    const consent = localStorage.getItem('mydent_cookie_consent');
    if (consentStateLabel) {
      if (consent === 'all') {
        consentStateLabel.textContent = 'Toate modulele permise';
      } else if (consent === 'essential') {
        consentStateLabel.textContent = 'Doar module esențiale';
      } else {
        consentStateLabel.textContent = 'Nicio alegere salvată (banner activ)';
      }
    }
  };

  updateConsentUI();

  if (cookieBanner) {
    const consent = localStorage.getItem('mydent_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.add('visible');
      }, 1000);
    }

    const setConsent = (type) => {
      localStorage.setItem('mydent_cookie_consent', type);
      cookieBanner.classList.remove('visible');
      updateConsentUI();
    };

    if (btnAcceptAll) btnAcceptAll.addEventListener('click', () => setConsent('all'));
    if (btnAcceptEssential) btnAcceptEssential.addEventListener('click', () => setConsent('essential'));
  }

  if (btnResetConsent) {
    btnResetConsent.addEventListener('click', () => {
      localStorage.removeItem('mydent_cookie_consent');
      updateConsentUI();
      if (resetSuccessMsg) {
        resetSuccessMsg.style.display = 'block';
        setTimeout(() => {
          resetSuccessMsg.style.display = 'none';
        }, 3500);
      }
      if (cookieBanner) {
        cookieBanner.classList.add('visible');
      }
    });
  }

  // 10. Interactive Doctor Photo Preview (Local testing & instant visual feedback)
  document.querySelectorAll('.doctor-photo-input').forEach((input) => {
    input.addEventListener('change', function () {
      const file = this.files && this.files[0];
      if (file) {
        const photoBox = this.closest('.doctor-photo-box');
        if (!photoBox) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          let realImg = photoBox.querySelector('.doctor-real-img');
          if (!realImg) {
            realImg = document.createElement('img');
            realImg.className = 'doctor-real-img';
            photoBox.prepend(realImg);
          }
          realImg.src = e.target.result;
          realImg.style.display = 'block';
          const placeholderWrap = photoBox.querySelector('.doctor-placeholder-wrap');
          if (placeholderWrap) {
            placeholderWrap.style.display = 'none';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  });
});
