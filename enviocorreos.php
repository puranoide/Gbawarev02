<?php
// Lista de números en formato internacional (sin espacios, sin símbolos raros)
$numeros = [
    "51902252350", 
    "51987654321", 
    "51939152728"
];

// Token y endpoint
$token = "burj8xfiylspnte6";
$instanceId = "instance143337";

// PDF a enviar (debe ser accesible públicamente por URL)
$pdfUrl = "https://gabware.com/documentodeprueba.pdf";
$nombreArchivo = "documento_prueba.pdf";

foreach ($numeros as $numero) {
    $data = [
        "to" => $numero,
        "document" => $pdfUrl,
        "filename" => $nombreArchivo
    ];

    $url = "https://api.ultramsg.com/$instanceId/messages/document?token=$token";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) {
        echo "Error para $numero: $err\n";
    } else {
        echo "Respuesta para $numero: $response\n";
    }
}
