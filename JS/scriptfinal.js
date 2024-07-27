//El html
const TemperaturaActual = document.getElementById("TemperaturaActual");
const NombreDeLaLocalidad = document.getElementById("NombreDeLaLocalidad");
const iconoAnimado = document.getElementById("iconoAnimado");
const Hora = document.getElementById("Hora");
const Dia = document.getElementById("Dia");
const DescripcionDelDia = document.getElementById("DescripcionDelDia");
const LogoDescripciónDelDia = document.getElementById("LogoDescripciónDelDia");
const ProbabilidadDeLluvia = document.getElementById("ProbabilidadDeLluvia");
const ActivarJs = document.getElementById("ACTIVARJS");
const VelocidadDelViento = document.getElementById("VelocidadViento");
const DireccionDelViento = document.getElementById("DireccionViento");
const PuntosDireccionViento = document.getElementById("PuntosDireccionViento");
const HoraSalidaSol = document.getElementById("HoraSalidaSol")
const HoraPuestaSol = document.getElementById("HoraPuestaSol")
const Humedad = document.getElementById("Humedad");
const Visibilidad = document.getElementById("Visibilidad");
const QualidadAire = document.getElementById("QualidadAire");
//Las API KEY
const API_KEY_METEOSOURCE = "q41ainn7spc5llgmwmt4p4rrlgbbujx5bckb49td";
const Api_Key_openweathermap = "0f33901d085922ce186457a1a8080b62";

//Dia de ahora
const ahora = new Date();
const hora = ahora.getHours() + ":" + ahora.getMinutes();

ActivarJs.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((posicion) => {
    longitude = posicion.coords.longitude;
    latitude = posicion.coords.latitude;
    const fecha = new Date();
    const urlGeolocalización = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_Key_openweathermap}&units=metric&lang=es`;
    fetch(urlGeolocalización)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        let temp = Math.round(data.main.temp);
        console.log(data.name);
        TemperaturaActual.textContent = `${temp} ºC`;

        let loc = data.name;
        NombreDeLaLocalidad.textContent = loc;

        let desc = data.weather[0].description;
        // console.log(desc);
        DescripcionDelDia.textContent = desc;

        let log = data.weather[0].icon;
        let IconoLog = `https://openweathermap.org/img/wn/${log}@2x.png`;
        LogoDescripciónDelDia.src = IconoLog;

        if (ahora.getMinutes() < 9) {
          console.log(ahora.getHours() + ":" + "0" + ahora.getMinutes());
          Hora.textContent = ahora.getHours() + ":" + "0" + ahora.getMinutes();
        } else {
          console.log(ahora.getHours() + ":" + ahora.getMinutes());
          Hora.textContent = ahora.getHours() + ":" + ahora.getMinutes();
        }

        console.log(data)

        switch (fecha.getDay()) {
          case 1:
            Dia.textContent = "Lunes,";
            break;
          case 2:
            Dia.textContent = "Martes,";
            break;
          case 3:
            Dia.textContent = "Miercoles,";
            break;
          case 4:
            Dia.textContent = "Jueves,";
            break;
          case 5:
            Dia.textContent = "Viernes,";
            break;
          case 6:
            Dia.textContent = "Sábado,";
            break;
          case 7:
            Dia.textContent = "Domingo,";
            break;
        }

        switch (data.weather[0].main) {
          case "Thunderstorm":
            iconoAnimado.src = "Imagenes/animated/thunder.svg";
            console.log("TORMENTA");
            break;
          case "Drizzle":
            iconoAnimado.src = "Imagenes/animated/rainy-2.svg";
            console.log("LLOVIZNA");
            break;
          case "Rain":
            iconoAnimado.src = "Imagenes/animated/rainy-7.svg";
            console.log("LLUVIA");
            break;
          case "Snow":
            iconoAnimado.src = "Imagenes/animated/snowy-6.svg";
            console.log("NIEVE");
            break;
          case "Clear":
            iconoAnimado.src = "Imagenes/animated/day.svg";
            console.log("LIMPIO");
            break;
          case "Atmosphere":
            iconoAnimado.src = "Imagenes/animated/weather.svg";
            console.log("ATMOSFERA");
            break;
          case "Clouds":
            iconoAnimado.src = "Imagenes/animated/cloudy-day-1.svg";
            console.log("NUBES");
            break;
          default:
            iconoAnimado.src = "Imagenes/animated/cloudy-day-1.svg";
            console.log("por defecto");
        }

    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunriseTime = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`;
    const sunsetTime = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`;
    

    HoraSalidaSol.textContent = sunriseTime;
    HoraPuestaSol.textContent = sunsetTime;

    Humedad.textContent = data.main.humidity + " %"
    Visibilidad.textContent = (data.visibility / 1000) + " Km"
        

  });
      
      
    //Probabilidad de lluvia
    const API_PROBABILIDAD_LLUVIA = `https://www.meteosource.com/api/v1/free/point?lat=${latitude}&lon=${longitude}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY_METEOSOURCE}`;
    fetch(API_PROBABILIDAD_LLUVIA)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        const ProbDeLluvia = data.current.precipitation.total + "%";
        ProbabilidadDeLluvia.textContent = ProbDeLluvia;
      })
      .catch((error) => {
        console.log(error);
      });

      //Temperatura de los 7 dias
      const API_7_DIAS = `https://www.meteosource.com/api/v1/free/point?place_id=Madrid&sections=daily&timezone=UTC&language=en&units=metric&key=${API_KEY_METEOSOURCE}`;
    
      fetch(API_7_DIAS)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const diasSemana = [];
          for (let i = 0; i < 8; i++) {
            const fecha = new Date(Date.now() + i * 86400000);
            diasSemana.push(fecha.toLocaleDateString("es-ES", { weekday: "long" }));
          }
          for (let i = 1; i <= 7; i++) {
            document.getElementById(`Dia${i}`).textContent = diasSemana[i].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
          }

          for (let i = 1; i <=7; i++) {
            switch (data.daily.data[i-1].icon) {
                case 2:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/2.png";
                  console.log("Sol");
                break
                case 3:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/3.png";
                  console.log("Sol Nube");
                break
                case 4:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/4.png";
                  console.log("Sol Nube Nube");
                break
                case 5:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/5.png";
                  console.log("Nube Nube Sol");
                break
                case 6:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/6.png";
                  console.log("Nube Nube Nube Nube Sol");
                break
                case 7:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/7.png";
                  console.log("Nube");
                break
                case 8:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/8.png";
                  console.log("Nube Nube Sol Blanco");
                break
                case 9:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/9.png";
                  console.log("No ver");
                break
                case 10:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/10.png";
                  console.log("Luvia");
                break
                case 11:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/11.png";
                  console.log("Mucha lluvia");
                break
                case 12:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/12.png";
                  console.log("Granizo");
                break
                case 13:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/13.png";
                  console.log("Sol y lluvia");
                break
                case 14:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/14.png";
                  console.log("Rayos");
                break
                case 15:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/15.png";
                  console.log("Rayos y sol");
                break
                case 16:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/16.png";
                  console.log("Nevar");
                break
                case 17:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/17.png";
                  console.log("Nevar mucho");
                break
                case 18:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/18.png";
                  console.log("No se lo que es eso");
                break
                case 19:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/19.png";
                  console.log("Granizo con sol");
                break
                case 20:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/20.png";
                  console.log("Granizo extremo");
                break
                case 21:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/21.png";
                  console.log("No se");
                break
                case 22:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/22.png";
                  console.log("Granizo extremo son sol");
                break
                case 23:
                  document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/23.png";
                  console.log("Otra vez lluvia");
                break
                default:
                    document.getElementById(`Icono7Dias${i}`).src = "Imagenes/weather_icons/set02/medium/1.png";
                    console.log("NaN");
          }}

          for(let i = 1; i <= 7; i++) {
            document.getElementById(`TemperaturaMaximaDia${i}`).textContent = Math.trunc(data.daily.data[i-1].all_day.temperature_max) + "º"
            document.getElementById(`TemperaturaMinimaDia${i}`).textContent = Math.trunc(data.daily.data[i-1].all_day.temperature_min) + "º"
          }

          VelocidadDelViento.textContent = data.daily.data[0].all_day.wind.speed + " km/h"

          const direcciones = {
            N: "Imagenes/DireccionesBrújula/N.webp",
            NNE: "Imagenes/DireccionesBrújula/NNE.webp",
            NNE: "Imagenes/DireccionesBrújula/NE.webp",
            ENE: "Imagenes/DireccionesBrújula/ENE.webp",
            E: "Imagenes/DireccionesBrújula/E.webp",
            ESE: "Imagenes/DireccionesBrújula/ESE.webp",
            SE: "Imagenes/DireccionesBrújula/SE.webp",
            SSE: "Imagenes/DireccionesBrújula/SSE.webp",
            S: "Imagenes/DireccionesBrújula/S.webp",
            SSW: "Imagenes/DireccionesBrújula/SSW.webp",
            SW: "Imagenes/DireccionesBrújula/SW.webp",
            WSW: "Imagenes/DireccionesBrújula/WSW.webp",
            W: "Imagenes/DireccionesBrújula/W.webp",
            WNW: "Imagenes/DireccionesBrújula/WNW.webp",
            NW: "Imagenes/DireccionesBrújula/NW.webp",
            NNW: "Imagenes/DireccionesBrújula/NNW.webp",
          }
          
          DireccionDelViento.src = direcciones[data.daily.data[0].all_day.wind.dir]
          PuntosDireccionViento.textContent = data.daily.data[0].all_day.wind.dir


      })
        .catch((error) => {
          console.log(error);
        });
    
      fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${Api_Key_openweathermap}`)
      .then((response) => response.json())
      .then((data) => {

        switch(data.list[0].main.aqi) {
          case 1:
            QualidadAire.textContent = "Bueno"
            break
          case 2:
            QualidadAire.textContent = "Acceptable"
            break
          case 3:
          QualidadAire.textContent = "Moderado"
            break
          case 4:
          QualidadAire.textContent = "Malo"
            break
          case 5:
          QualidadAire.textContent = "Muy Malo"
            break
          default:
            QualidadAire.textContent = "No disponible"
            break
        }
      })
    });
  });

 
