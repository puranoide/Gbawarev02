<?php
// Lista de números en formato internacional (sin +)
$numeros = [
    "51987654321", // Perú
    "51939152728" // Colombia
];

// URL del PDF que quieres enviar
$pdfUrl = "https://gabware.com/documentodeprueba.pdf";

// API de UltraMsg
$token = "burj8xfiylspnte6";        // Copia el token de tu panel UltraMsg
$instanceId = "instance143337";         // Tu instance ID

foreach ($numeros as $numero) {
    $data = [
        "to" => $numero,
        "document" => $pdfUrl,
        "filename" => "informe.pdf"
    ];

    $url = "https://api.ultramsg.com/$instanceId/messages/document?token=$token";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo "Respuesta para $numero: $response\n";
}
