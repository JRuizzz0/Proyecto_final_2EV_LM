const contTarjetas = document.getElementById("tarjetas");
const inputBusqueda = document.getElementById("CampoBusqueda");
const btnBusqueda = document.getElementById("btnBusqueda");
const selectorTema = document.querySelector(".tema");
const modalTema = document.getElementById("modalTema");
const btnGuardarTema = document.getElementById("btnGuardarTema");
const btnCerrarTema = document.getElementById("btnCerrarTema");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.querySelector(".footer");
const body = document.body;


fetch("data/data.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const elementos = xml.getElementsByTagName("elemento");

    for (let elemento of elementos) {
      const titulo = elemento.getElementsByTagName("titulo")[0].textContent;
      const descripcion = elemento.getElementsByTagName("descripcion")[0].textContent;
      const imagen = elemento.getElementsByTagName("imagen")[0].textContent;
      
      
      contTarjetas.innerHTML += `
        <div class="tarjeta">
          <img src="${imagen}" alt="${titulo}" class="imagen-anime">
          <h2 class="titulo">${titulo}</h2>
          <p class="descripcion">${descripcion}</p>
        </div>
      `;
    }
  });


  

btnBusqueda.addEventListener("click", () => {
    const textoBuscado = inputBusqueda.value.toLowerCase();
    const tarjetasCargadas = document.querySelectorAll(".tarjeta");

    tarjetasCargadas.forEach(tarjeta => {
        const tituloTarjeta = tarjeta.querySelector(".titulo").textContent.toLowerCase();

        if (tituloTarjeta.includes(textoBuscado)) {
            tarjeta.style.display = "flex";
        } else {
            tarjeta.style.display = "none";
        }
    });
});


selectorTema.addEventListener("change", (opc) => {
    const opcionElegida = opc.target.value;
    
    if (opcionElegida === "oscuro") {
        body.className = "modo-oscuro";
        limpiarColoresCustom();
    } else if (opcionElegida === "claro") {
        body.className = "";
        limpiarColoresCustom();
    } else if (opcionElegida === "custom") {
        modalTema.style.display = "flex";
    }
});

btnCerrarTema.addEventListener("click", () => {
    modalTema.style.display = "none";
    selectorTema.selectedIndex = 0;
});

btnGuardarTema.addEventListener("click", () => {
    const colorH = document.getElementById("colorHeader").value;
    const colorM = document.getElementById("colorMain").value;
    const colorF = document.getElementById("colorFooter").value;

    header.style.backgroundColor = colorH;
    main.style.backgroundColor = colorM;
    footer.style.backgroundColor = colorF;

    body.className = "";
    modalTema.style.display = "none";
});

function limpiarColoresCustom() {
    header.style.backgroundColor = "";
    main.style.backgroundColor = "";
    footer.style.backgroundColor = "";
}