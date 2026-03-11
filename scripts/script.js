const contTarjetas = document.getElementById("tarjetas");

fetch("data/data.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const elementos = xml.getElementsByTagName("elemento");

    for (let elemento of elementos) {
      const nombre = elemento.getElementsByTagName("nombre")[0].textContent;
      const descripcion = elemento.getElementsByTagName("descripcion")[0].textContent
      const imagen = elemento.getElementsByTagName("imagen")[0].textContent;
      contTarjetas.innerHTML += `
        <div>
        <p class="imagen">${imagen}</p>
          <p class="nombre">${nombre}</p>
          <p class="descripcion">${descripcion}</p>
        </div>
      `;
    }
  });
