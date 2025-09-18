<?php
// Lista de números en formato internacional
$numeros = [
    "51987654321", // Perú
    "51939152728" // Colombia
];

// URL del PDF que quieres enviar
$pdfUrl = "https://gabware.com/documentodeprueba.pdf";

// API de UltraMsg (ejemplo, puedes usar Twilio u otra)
$token = "burj8xfiylspnte6";
$instanceId = "instance143337";

foreach ($numeros as $numero) {
    $data = [
        "token" => $token,
        "to" => $numero,
        "document" => $pdfUrl,
        "filename" => "informe.pdf"
    ];

    $ch = curl_init("https://api.ultramsg.com/$instanceId/messages/document");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo "Respuesta para $numero: $response\n";
}
