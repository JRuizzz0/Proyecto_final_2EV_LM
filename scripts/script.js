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
const btnTarjeta = document.getElementById("addTarjeta");
const modalTarjeta = document.getElementById("modalTarjeta");
const cerrarTarjeta = document.getElementById("btnCerrarTarjeta");
const guardarTarjeta = document.getElementById("btnGuardarTarjeta");

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

btnTarjeta.addEventListener("click", () => {
    modalTarjeta.style.display = "flex";
});

cerrarTarjeta.addEventListener("click", () =>{
    modalTarjeta.style.display = "none";
     document.getElementById("nombreTarjeta").value = "";    
     document.getElementById("descTarjeta").value = "";
     inputImagen.value = "";
});

guardarTarjeta.addEventListener("click", () => {
    let tituloTarjeta = document.getElementById("nombreTarjeta").value;
    let descripcionTarjeta = document.getElementById("descTarjeta").value;
    let inputImagen = document.getElementById("fileTarjeta");

    if (tituloTarjeta !== "" && descripcionTarjeta !== "" && inputImagen.files.length > 0){
        
        let archivo = inputImagen.files[0];
        let reader = new FileReader();
        
        reader.onload = function(element){
            let imagenSrc = element.target.result;
            let nuevaTarjeta = `
            <div class="tarjeta"> 
                <img src="${imagenSrc}" class="imagen-anime">
                <h2 class="titulo">${tituloTarjeta}</h2>
                <p class="descripcion">${descripcionTarjeta}</p>
            </div>`;

            document.getElementById("tarjetas").innerHTML += nuevaTarjeta;
            
            document.getElementById("nombreTarjeta").value = "";
            document.getElementById("descTarjeta").value = "";
            inputImagen.value = "";
            
            modalTarjeta.style.display = "none";
        };
        
        reader.readAsDataURL(archivo);
    }
});