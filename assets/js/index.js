const popup = document.getElementById('offer-popup');
const content = document.getElementById('popup-content');

// Función para mostrar el popup
function showPopup() {
    popup.classList.remove('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-90');
    content.classList.add('scale-100');
}

// Función para cerrar el popup
function closePopup() {
    popup.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    content.classList.add('scale-90');
}

// Temporizador de 3 segundos (3000ms)
window.addEventListener('load', () => {
    //setTimeout(showPopup, 2000);
});

// Cerrar al hacer clic fuera del contenido blanco
popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
});

