

var loginButton = document.getElementById("login");
var usuario = document.getElementById("usuario");
var contrasena = document.getElementById("contrasena");
var message = document.getElementById("message");
//un lenguaje de eventos
loginButton.addEventListener("click", function () {
    //login(email.value, password.value);
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional
    console.log("login");
    console.log(usuario.value);
    console.log(contrasena.value);
    login(usuario.value, contrasena.value);
});

function login(usuario, contrasena) {

    fetch("controllers/auth.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'login',
            usuario: usuario,
            contrasena: contrasena
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            message.textContent = "ingresando...";
            if (data.success) {
                console.log("Login exitoso");
                message.textContent = "¡Bienvenido de nuevo!";
                message.classList.remove('hidden', 'text-red-500');
                message.classList.add('text-green-500');                
                window.location.href = "general.php";

            } else {
                console.log("Error al iniciar sesión");
                message.textContent = "Credenciales incorrectas. Intenta de nuevo.";
                message.classList.remove('hidden', 'text-green-500');
                message.classList.add('text-red-500');
            }
        })
        .catch(error => {
            console.log(error);
        });

}