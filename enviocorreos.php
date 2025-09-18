<?php
$to = "acostasanchezangelgabriel@gmail.com";
$subject = "Correo con archivo adjunto";
$message = "Hola,\n\nTe envío un archivo adjunto.";

// Ruta del archivo que quieres adjuntar
$file = "documentodeprueba.pdf";
$file_size = filesize($file);
$handle = fopen($file, "r");
$content = fread($handle, $file_size);
fclose($handle);

// Codificamos el archivo en base64
$content = chunk_split(base64_encode($content));

// Generamos un boundary (separador de partes del correo)
$separator = md5(time());

// Encabezados
$headers = "From: prueba@gabware.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"";

// Cuerpo del mensaje (texto + adjunto)
$body = "--" . $separator . "\r\n";
$body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $message . "\r\n";

// Adjuntar archivo
$body .= "--" . $separator . "\r\n";
$body .= "Content-Type: application/octet-stream; name=\"" . basename($file) . "\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"" . basename($file) . "\"\r\n\r\n";
$body .= $content . "\r\n";
$body .= "--" . $separator . "--";

// Enviar correo
if (mail($to, $subject, $body, $headers)) {
    echo "Correo enviado con éxito.";
} else {
    echo "Error al enviar el correo.";
}
