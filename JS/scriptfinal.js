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
const Dia1 = document.getElementById("Dia1");
const Dia2 = document.getElementById("Dia2");
const Dia3 = document.getElementById("Dia3");
const Dia4 = document.getElementById("Dia4");
const Dia5 = document.getElementById("Dia5");
const Dia6 = document.getElementById("Dia6");
const Dia7 = document.getElementById("Dia7");
const API_KEY_PROBABILIDAD_LLUVIA =
      "q41ainn7spc5llgmwmt4p4rrlgbbujx5bckb49td";

//Dia de ahora
const ahora = new Date();
const hora = ahora.getHours() + ":" + ahora.getMinutes();

ActivarJs.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((posicion) => {
    longitude = posicion.coords.longitude;
    latitude = posicion.coords.latitude;
    const fecha = new Date();
    const urlGeolocalización = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f33901d085922ce186457a1a8080b62&units=metric&lang=es`;
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

        let prob = data.hourly;
        console.log(prob);

        if (ahora.getMinutes() < 9) {
          console.log(ahora.getHours() + ":" + "0" + ahora.getMinutes());
          Hora.textContent = ahora.getHours() + ":" + "0" + ahora.getMinutes();
        } else {
          console.log(ahora.getHours() + ":" + ahora.getMinutes());
          Hora.textContent = ahora.getHours() + ":" + ahora.getMinutes();
        }

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
            iconoAnimado.src = "animated/thunder.svg";
            console.log("TORMENTA");
            break;
          case "Drizzle":
            iconoAnimado.src = "animated/rainy-2.svg";
            console.log("LLOVIZNA");
            break;
          case "Rain":
            iconoAnimado.src = "animated/rainy-7.svg";
            console.log("LLUVIA");
            break;
          case "Snow":
            iconoAnimado.src = "animated/snowy-6.svg";
            console.log("NIEVE");
            break;
          case "Clear":
            iconoAnimado.src = "animated/day.svg";
            console.log("LIMPIO");
            break;
          case "Atmosphere":
            iconoAnimado.src = "animated/weather.svg";
            console.log("ATMOSFERA");
            break;
          case "Clouds":
            iconoAnimado.src = "animated/cloudy-day-1.svg";
            console.log("NUBES");
            break;
          default:
            iconoAnimado.src = "animated/cloudy-day-1.svg";
            console.log("por defecto");
        }
      });
         //API para conseguir la probabilidad de lluvia
    // const API_PROBABILIDAD_LLUVIA = `https://www.meteosource.com/api/v1/free/point?lat=${latitude}&lon=${longitude}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY_PROBABILIDAD_LLUVIA}`;
    // fetch(API_PROBABILIDAD_LLUVIA)
    //   .then((respuesta) => {
    //     return respuesta.json();
    //   })
    //   .then((data) => {
    //     const ProbDeLluvia = data.current.precipitation.total + "%";
    //     ProbabilidadDeLluvia.textContent = ProbDeLluvia;
    //   })
    //   .catch((error) => {
    //     console.log(error);
      });
      const Ciudad = "Madrid";
      const API_7_DIAS = `https://www.meteosource.com/api/v1/free/point?place_id=Madrid&sections=daily&timezone=UTC&language=en&units=metric&key=${API_KEY_PROBABILIDAD_LLUVIA}`;
    
      fetch(API_7_DIAS)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
    
          //Dias:
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
                case "Thunderstorm":
                  document.getElementById(`Icono7Dias${i}`).src = "animated/thunder.svg";
                  console.log("TORMENTA");
            
                  break;
                case "Drizzle":
                  document.getElementById(`Icono7Dias${i}`).src = "animated/rainy-2.svg";
                  console.log("LLOVIZNA");
                  break;
                case "Rain":
                    document.getElementById(`Icono7Dias${i}`).src = "animated/rainy-7.svg";
                  console.log("LLUVIA");
                 
                  break;
                case "Snow":
                    document.getElementById(`Icono7Dias${i}`).src = "animated/snowy-6.svg";
                  console.log("NIEVE");
               
                  break;
                case "Clear":
                    document.getElementById(`Icono7Dias${i}`).src = "animated/day.svg";
                    console.log("LIMPIO")
                    
                  break;
                case "Atmosphere":
                    document.getElementById(`Icono7Dias${i}`).src = "animated/weather.svg";
                  console.log("ATMOSFERA");
                 
                  break;
                case "Clouds":
                    document.getElementById(`Icono7Dias${i}`).src = "animated/cloudy-day-1.svg";
                  console.log("NUBES");
    
                  break;
                default:
                    document.getElementById(`Icono7Dias${i}`).src = "animated/cloudy-day-1.svg";
                  console.log("por defecto");
          }      
        }})
        .catch((error) => {
          console.log(error);
        });
    // });
  });

 
