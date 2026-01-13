

const container = document.getElementById('message-container');
const modal = document.getElementById('messageModal');
var Registros = [];
function listarRegistros() {
    fetch("controllers/formularios.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            action: "list"
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            Registros = result.data
            console.log(Registros);

            renderMessages(Registros);
        })
        .catch((error) => {
            console.error("Error al listar registros:", error);
        });
}


function renderMessages(messages) {
    container.innerHTML = '';
    messages.forEach(msg => {

        // Creamos la fila como un elemento clickable
        const row = document.createElement('tr');
        row.className = "hover:bg-indigo-50 cursor-pointer transition-colors group";
        row.onclick = () => openModal(msg);

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${msg.nombre}</td>
                    <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        ${msg.mensaje}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">${msg.fechaderecepcion}</td>
                `;
        container.appendChild(row);
    });
}

// Lógica del Modal
function openModal(msg) {
    document.getElementById('modalName').textContent = msg.nombre;
    document.getElementById('modalDate').textContent = `Recibido el: ${msg.fechaderecepcion}`;
    document.getElementById('modalBody').textContent = msg.mensaje;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target == modal) closeModal();
}

// Filtrado (reutilizado)
function filterMessages(tipo) {
    const filtered = tipo === 'todos' ? Registros : Registros.filter(m => m.tipoform === tipo);
    renderMessages(filtered);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.replace('text-indigo-600', 'text-gray-500');
        btn.classList.remove('border-b-2', 'border-indigo-600');
    });
    const active = document.getElementById(`tab-${tipo}`);
    active.classList.replace('text-gray-500', 'text-indigo-600');
    active.classList.add('border-b-2', 'border-indigo-600');
}

listarRegistros();