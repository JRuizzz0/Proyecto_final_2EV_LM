// Creo las variables
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

// Leo el archivo XML y saco los datos para crear las tarjetas iniciales
fetch("data/data.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const elementos = xml.getElementsByTagName("elemento");

    // Hago un bucle para sacar el título, descripción e imagen de cada anime
    for (let elemento of elementos) {
      const titulo = elemento.getElementsByTagName("titulo")[0].textContent;
      const descripcion = elemento.getElementsByTagName("descripcion")[0].textContent;
      const imagen = elemento.getElementsByTagName("imagen")[0].textContent;
      
      // Añado la tarjeta al contenedor del HTML
      contTarjetas.innerHTML += `
        <div class="tarjeta">
          <img src="${imagen}" alt="${titulo}" class="imagen-anime">
          <h2 class="titulo">${titulo}</h2>
          <p class="descripcion">${descripcion}</p>
        </div>
      `;
    }
  });

// Buscador: comprueba lo que he escrito y filtra las tarjetas
btnBusqueda.addEventListener("click", () => {
    const textoBuscado = inputBusqueda.value.toLowerCase();
    const tarjetasCargadas = document.querySelectorAll(".tarjeta");

    tarjetasCargadas.forEach(tarjeta => {
        const tituloTarjeta = tarjeta.querySelector(".titulo").textContent.toLowerCase();

        // Si el título tiene el texto que se busca, se muestra, si no se oculta
        if (tituloTarjeta.includes(textoBuscado)) {
            tarjeta.style.display = "flex";
        } else {
            tarjeta.style.display = "none";
        }
    });
});

// Selector para cambiar entre modo claro, oscuro o abrir el modal de colores
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

// Cierro el menú de temas y vuelvo a dejar el selector como estaba
btnCerrarTema.addEventListener("click", () => {
    modalTema.style.display = "none";
    selectorTema.selectedIndex = 0;
});

// Aplico los colores que elijo en el modal a cada parte de la página
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

// Función para quitar los colores personalizados si vuelvo al modo claro/oscuro
function limpiarColoresCustom() {
    header.style.backgroundColor = "";
    main.style.backgroundColor = "";
    footer.style.backgroundColor = "";
}

// Abro la ventana para añadir un anime/tarjeta nuevo
btnTarjeta.addEventListener("click", () => {
    modalTarjeta.style.display = "flex";
});

// Cierro la ventana de añadir y vacío los campos por si había escrito algo
cerrarTarjeta.addEventListener("click", () =>{
    modalTarjeta.style.display = "none";
    document.getElementById("nombreTarjeta").value = "";    
    document.getElementById("descTarjeta").value = "";
    document.getElementById("fileTarjeta").value = ""; 
});

// Guardo la nueva tarjeta viendo si están todos los campos llenos
guardarTarjeta.addEventListener("click", () => {
    let tituloTarjeta = document.getElementById("nombreTarjeta").value;
    let descripcionTarjeta = document.getElementById("descTarjeta").value;
    let inputImagen = document.getElementById("fileTarjeta");

    if (tituloTarjeta !== "" && descripcionTarjeta !== "" && inputImagen.files.length > 0){
        
        let archivo = inputImagen.files[0];
        let reader = new FileReader(); // leer la foto del ordenador
        
        reader.onload = function(element){
            let imagenSrc = element.target.result;
            let nuevaTarjeta = `
            <div class="tarjeta"> 
                <img src="${imagenSrc}" class="imagen-anime">
                <h2 class="titulo">${tituloTarjeta}</h2>
                <p class="descripcion">${descripcionTarjeta}</p>
            </div>`;

            // Añado la tarjeta nueva junto a las demás
            document.getElementById("tarjetas").innerHTML += nuevaTarjeta;
            
            // Limpio el modal y lo cierro
            document.getElementById("nombreTarjeta").value = "";
            document.getElementById("descTarjeta").value = "";
            inputImagen.value = "";
            
            modalTarjeta.style.display = "none";
        };
        
        reader.readAsDataURL(archivo); //procesa el archivo q se sube
    }
});