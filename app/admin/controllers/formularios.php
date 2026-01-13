<?php
function listconsultas($conexion)
{
    $query = "SELECT * FROM consultas order by fechaderecepcion ASC";
    $result = mysqli_query($conexion, $query);
    if (mysqli_num_rows($result) > 0) {
        $registros = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $registros[] = $row;
        }
        return $registros;
    } else {
        return [];
    }
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
        case 'insert':
            if (!$conexion) {
                echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
                exit;
            }

            // Resto del código...
            try {
                $response = createRegister($conexion, $data['data']);
                if ($response) {
                    echo json_encode(['success' => true, 'message' => 'insert exitoso']);
                } else {
                    echo json_encode(['error' => 'insert fallido']);
                }
            } catch (Exception $e) {
                echo json_encode(['error' => $e->getMessage()]);
            }
            break;
        case 'list':
            if (!$conexion) {
                echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
                exit;
            }
            $response = listconsultas($conexion);
            if ($response) {
                echo json_encode(['success' => true, 'data' => $response]);
            } else {
                echo json_encode(['error' => 'list fallido']);
            }
            break;
        case 'update':
            if (!$conexion) {
                echo json_encode(['error' => 'No se pudo conectar a la base de datos']);
                exit;
            }
            try {
                $response = updateRegister($conexion, $data['datos'], $data['id']);
                if ($response) {
                    echo json_encode(['success' => true, 'message' => 'update exitoso']);
                } else {
                    echo json_encode(['error' => 'update fallido']);
                }
            } catch (Exception $e) {
                echo json_encode(['error' => $e->getMessage()]);
            }
            break;
        default:
            echo json_encode(['success' => false]);
            break;
    }
}













?>