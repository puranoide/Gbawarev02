<?php
// Lista de números (con el formato correcto: sin espacios, en internacional con + o 51...)
$numeros = [
    "51902252350", 
    "51987654321", 
    "51939152728"
];

// Token y endpoint
$token = "burj8xfiylspnte6";
$instanceId = "instance143337";

// Mensaje a enviar
$mensaje = "La API de WhatsApp en UltraMsg.com funciona bien";

foreach ($numeros as $numero) {
    $params = [
        'token' => $token,
        'to' => $numero, // puedes usar con +51 o sin +, UltraMsg acepta ambos
        'body' => $mensaje
    ];

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.ultramsg.com/$instanceId/messages/chat",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => http_build_query($params),
        CURLOPT_HTTPHEADER => [
            "content-type: application/x-www-form-urlencoded"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        echo "Error para $numero: $err\n";
    } else {
        echo "Respuesta para $numero: $response\n";
    }
}
