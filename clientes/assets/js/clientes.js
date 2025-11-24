const clients = [
    {
        name: "PropManager",
        industry: "inmobiliaria",
        country: "peru",
        service: "desarrollo",
        description: "Implementamos un sistema integral de gestión inmobiliaria que optimizó los procesos administrativos y mejoró la atención al paciente en un 90%.",
        year: "2025",
        website: "https://gabware.com/PropManager"
    },
    {
        name: "Romath",
        industry: "inmobiliaria",
        country: "peru",
        service: "diseño web",
        description: "Diseñamos y desplegamos una landingpage personalizada para una empresa de inmobiliaria, mejorando la experiencia de los visitantes.",
        year: "2025",
        website: "https://gabware.com/Romath"
    }
];

let activeCard = null;

// Renderizar clientes
function renderClients(filteredClients) {
    const grid = document.getElementById('clientsGrid');
    const noResults = document.getElementById('noResults');

    grid.innerHTML = '';

    if (filteredClients.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    filteredClients.forEach((client, index) => {
        const card = document.createElement('div');
        card.className = 'client-card';
        card.innerHTML = `
                    <div class="client-header">
                        <h3>${client.name}</h3>
                        <span class="client-industry">${client.industry.charAt(0).toUpperCase() + client.industry.slice(1)}</span>
                    </div>
                    <div class="client-body">
                        <div class="client-content">
                            <p class="client-description">${client.description}</p>
                            <div class="client-meta">
                                <span class="meta-item">🌍 ${client.country.charAt(0).toUpperCase() + client.country.slice(1)}</span>
                                <span class="meta-item">📅 ${client.year}</span>
                                <span class="meta-item">⚙️ ${client.service.charAt(0).toUpperCase() + client.service.slice(1)}</span>
                            </div>
                            <a href="${client.website}" target="_blank" class="client-link">Visitar Sitio Web →</a>
                        </div>
                    </div>
                `;

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('client-link')) return;

            const body = card.querySelector('.client-body');

            if (activeCard && activeCard !== body) {
                activeCard.classList.remove('active');
            }

            body.classList.toggle('active');
            activeCard = body.classList.contains('active') ? body : null;
        });

        grid.appendChild(card);
    });
}

// Aplicar filtros
function applyFilters() {
    const industry = document.getElementById('industry').value;
    const country = document.getElementById('country').value;
    const service = document.getElementById('service').value;

    const filtered = clients.filter(client => {
        return (!industry || client.industry === industry) &&
            (!country || client.country === country) &&
            (!service || client.service === service);
    });

    renderClients(filtered);
}

// Reset filtros
function resetFilters() {
    document.getElementById('industry').value = '';
    document.getElementById('country').value = '';
    document.getElementById('service').value = '';
    renderClients(clients);
}

// Event listeners
document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('resetFilters').addEventListener('click', resetFilters);

// Render inicial
renderClients(clients);
