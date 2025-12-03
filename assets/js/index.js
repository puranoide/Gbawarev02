 // Función para el menú responsive (hamburguesa)
        document.getElementById('menuToggle').onclick = function() {
            const nav = document.getElementById('nav-container');
            const navLinks = document.getElementById('navLinks');
            nav.classList.toggle('nav-active');
            navLinks.style.display = nav.classList.contains('nav-active') ? "flex" : "none";
        }

        // Función para el contador de estadísticas
        function animateCounter(element, target) {
            let start = 0;
            const duration = 2000;
            const step = Math.ceil(target / (duration / 16));
            
            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                element.innerText = start.toLocaleString();
            }, 16);
        }

        // Función para la animación de fade-in al hacer scroll
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Inicia 50px antes de llegar al borde inferior
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.style.opacity = '1';
                    
                    // Si es un contador, lo animamos
                    if (entry.target.classList.contains('stat-item')) {
                        const counterElement = entry.target.querySelector('.counter');
                        const targetValue = parseInt(counterElement.getAttribute('data-target'));
                        animateCounter(counterElement, targetValue);
                    }
                    
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
        
        // Función para el acordeón de productos
        function toggleProduct(header) {
            const item = header.closest('.product-item');
            const content = item.querySelector('.product-content');

            // Cierra todos los demás
            document.querySelectorAll('.product-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.product-content').style.maxHeight = 0;
                }
            });

            // Abre o cierra el actual
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        }
        
        // Lógica del Popup
        const popupOverlay = document.getElementById('popupOverlay');
        const closePopupBtn = document.getElementById('closePopupBtn');

        // Mostrar el popup después de 2 segundos (o la lógica deseada)
        window.addEventListener('load', () => {
             setTimeout(() => {
                // Verificar si ya se mostró (podrías usar localStorage)
                popupOverlay.classList.add('active');
            }, 2000);
        });

        // Cerrar el popup al hacer clic en el botón de cierre
        closePopupBtn.onclick = () => {
            popupOverlay.classList.remove('active');
        };

        // Cerrar el popup al hacer clic fuera
        popupOverlay.onclick = (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        };
