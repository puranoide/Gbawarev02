const formcontact = document.getElementById('formcontact');
const btnformcontact = document.getElementById('btnformcontact');

formcontact.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("submit");
  const formData = new FormData(this);
  objetoRegistro = {};
  const inputs = document.querySelectorAll(
    "#formcontact input, #formcontact textarea, #formfrances formcontact"
  );
  inputs.forEach((input) => {
    console.log(input.name, input.value);
    objetoRegistro[input.name] = input.value;
  });
  console.log(objetoRegistro);
  btnformcontact.disabled = true;
  btnformcontact.textContent = "Enviando...";
  btnformcontact.style.cursor = "not-allowed";
  btnformcontact.style.backgroundColor = "gray";


  registrarconsulta(objetoRegistro);

});

function registrarconsulta(consutaObj, linkimgurl) {
  const dataconsulta = {
    action: "register",
    ...consutaObj,
  };
  console.log(dataconsulta);
  fetch("controllers/consulta.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataconsulta),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      if (data.success) {
        console.log("respuesta :", data);
          btnformcontact.textContent = data.message;
          btnformcontact.style.cursor = "pointer";
          btnformcontact.style.backgroundColor = "green";

        setTimeout(() => {
          btnformcontact.disabled = false;
          btnformcontact.textContent = "Enviar";
          btnformcontact.style.cursor = "pointer";
          btnformcontact.style.backgroundColor = "#155DFC";
        }, 5000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}