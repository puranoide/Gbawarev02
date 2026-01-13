<?php

session_start();
print_r($_SESSION);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Mensajes - Detalle</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-4 md:p-8">

    <div class="max-w-6xl mx-auto">
        <header class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Mensajes Recibidos</h1>
            <p class="text-gray-600">Haz clic en cualquier fila para leer el mensaje completo.</p>
        </header>

        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remitente</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje (Resumen)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        </tr>
                    </thead>
                    <tbody id="message-container" class="divide-y divide-gray-200">
                        </tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="messageModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 id="modalName" class="text-xl font-bold text-gray-900 italic">Nombre del Remitente</h3>
                </div>
                <hr class="mb-4">
                <div class="text-gray-700 leading-relaxed mb-6">
                    <p class="text-xs text-gray-400 uppercase font-semibold mb-1">Mensaje:</p>
                    <p id="modalBody" class="whitespace-pre-wrap text-lg text-gray-600"></p>
                </div>
                <div class="flex justify-between items-center mt-6">
                    <span id="modalDate" class="text-sm text-gray-400"></span>
                    <button onclick="closeModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/consultas.js"></script>
</body>
</html>