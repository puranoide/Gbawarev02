
// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// Dynamic CTA Button Colors
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        btn.style.color = 'white';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.background = 'var(--white)';
        btn.style.color = 'var(--primary-color)';
    });
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Additional scroll-based animations can go here
    }, 10);
});

// Product Toggle Functionality
function toggleProduct(header) {
    const productItem = header.parentElement;
    const isActive = productItem.classList.contains('active');

    // Close all products
    document.querySelectorAll('.product-item').forEach(item => {
        item.classList.remove('active');
    });

    // If this product wasn't active, open it
    if (!isActive) {
        productItem.classList.add('active');
    }
}

// Auto-expand first product on load
window.addEventListener('load', () => {
    const firstProduct = document.querySelector('.product-item');
    if (firstProduct) {
        firstProduct.classList.add('active');
    }
});


const closeBtn = document.getElementById("closePopupBtn");
const overlay = document.getElementById("popupOverlay");

// Abrir popup
window.addEventListener("load", () => {
  setTimeout(() => {
    overlay.style.display = "flex";
  }, 2000);
})

// Cerrar popup con botón
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Cerrar popup al hacer clic fuera
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});
