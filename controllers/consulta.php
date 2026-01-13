<?php

function registroconsulta($con, $nombre, $whatsapp, $mensaje)
{
    $fechaderecepcion = date("Y-m-d H:i:s");

    $sql = "INSERT INTO consultas (nombre, whatsapp, mensaje,fechaderecepcion) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, "ssss", $nombre, $whatsapp, $mensaje, $fechaderecepcion);
    $result = mysqli_stmt_execute($stmt);
    return $result;
}





// Verify if receiving POST request with JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set response header as JSON
    header('Content-Type: application/json');

    // Decode received JSON
    $data = json_decode(file_get_contents("php://input"), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    // Validate received data    

    include_once('db.php');
    switch ($data['action']) {
        case 'register':
            if (!$conexion) {
                if (!$result) {
                    echo json_encode(['success' => false, 'error' => mysqli_stmt_error($stmt)]);
                    exit;
                }
            }
            try {
                $response = registroconsulta($conexion, $data['nombre'], $data['WhatsApp'],$data['mensaje']);

                if ($response) {
                    echo json_encode(['success' => true, 'message' => 'consulta enviada', 'id' => $conexion->insert_id]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'error,intente de nuevo...']);
                }
            } catch (Exception $e) {
                echo json_encode(['error' => $e->getMessage()]);
            }
            break;
            echo json_encode(['success' => false]);
            break;
    }
}










?>