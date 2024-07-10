const temperatura = document.getElementById("temperatura-valor");
const descripción = document.getElementById("temperatura-descripción");
const BotonBuscar = document.getElementById("Buscar");
const Input = document.getElementById("Input");
const Geo = document.getElementById("Geo");
const CiudadGeo = document.getElementById("temperatura-nombre");
const errores = document.getElementById("Error");
const Pregunta = document.getElementById("Pregunta");

BotonBuscar.addEventListener("click", () => {
  const ciudad = Input.value;
  const url_ciudad = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=0f33901d085922ce186457a1a8080b62&units=metric&lang=es`;
  fetch(url_ciudad)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temp = data.main.temp;
      console.log(data.main.temp);
      temperatura.textContent = `${temp} ºC`;

      let desc = data.weather[0].description;
      descripción.textContent = desc;

      let loc = data.name;
      CiudadGeo.textContent = loc;
      errores.textContent = ""

      Pregunta.textContent = ""
    })
    .catch((error) => {
      console.log("Nombre de ciudad equivocado o no encontrado");
      errores.textContent = "Ciudad no encontrada o mal escrita. Revisa antes de enviar crack ;)";
      temperatura.textContent = "";
      descripción.textContent = "";
      CiudadGeo.textContent = "";
      Pregunta.textContent = ""
    });
});

Geo.addEventListener("click", () => {
  if (navigator.geolocation) {
  }
  navigator.geolocation.getCurrentPosition((posicion) => {
    longitude = posicion.coords.longitude;
    latitude = posicion.coords.latitude;

    const urlGeolocalización = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f33901d085922ce186457a1a8080b62&units=metric&lang=es`;
    fetch(urlGeolocalización)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        
        let temp = Math.round(data.main.temp);
        console.log(data.name);
        temperatura.textContent = `${temp} ºC`;

        
        let desc = data.weather[0].description;
        console.log(desc);
        descripción.textContent = desc;

        let loc = data.name;
        CiudadGeo.textContent = loc;
        Pregunta.textContent = ""
      })
      .catch((error) => {
        console.log("Ciudad no encontrada o mal escrita. Revisa antes de enviar crack ;)");
        error.textContent = "GPS desactivado o no encontrado. Intenta estar en un sitio visible para los satelites crack ;)"
        Pregunta.textContent = ""
      });
  });
});
