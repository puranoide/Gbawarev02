function animationtexting(){
    const brandtext = document.getElementById("brandtext");
    brandtext.innerHTML = "";
    let text = "Gabware_";

    for (let index = 0; index < text.length; index++) {
        setTimeout(() => {
            brandtext.innerHTML += text[index];

            // Cuando termina la animación de escribir, iniciar parpadeo
            if (index === text.length - 1) {
                blinkCursor();
            }

        }, 150 * index);
    }
}

function blinkCursor() {
    const brandtext = document.getElementById("brandtext");
    let visible = true;

    // Cada 500ms alterna si se muestra el "_"
    setInterval(() => {
        const text = brandtext.innerHTML;

        if (visible) {
            brandtext.innerHTML = text.slice(0, -1); // quitar "_"
        } else {
            brandtext.innerHTML = text + "_"; // agregar "_"
        }

        visible = !visible;
    }, 500);
}

animationtexting();
