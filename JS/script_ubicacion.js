
let lon;
let lat;
let temp = document.querySelector(".temperatura");
let loc = document.querySelector(".location");
let summary = document.querySelector(".summary");
let icon = document.querySelector(".icon");
const kelvin = 273.15;
let percentage = document.querySelector(".percentage");
let feelslike = document.querySelector(".feels-like");

window.addEventListener("load", () => {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      //console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      // ID de la API de OpenWeatherMap
      const api = "e8095df1859e031be279cec6914b6971";
      // url base de la API
      const url_base = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + api;

      fetch(url_base)
        .then((response) => {

          //console.log("Respuesta json para leer su data");
          return response.json();

        })
        .then((data) => {

          //console.log("Test imprimir data");
          console.log(data);

          //Convertir de Kelvin a Celsius y mostrarlo en HTML
          temp.textContent = Math.floor(data.main.temp - kelvin) + "°C";

          //Funcion que recibe una frase y coloca cada inical en Mayuscúla
          function PonerEnMayuscula(frase) {

            let palabra = frase.split(' ');
            return palabra.map(p => p[0].toUpperCase() + p.slice(1)).join(' ');

          };

          // API de traducción (MyMemoryAPI)
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'd7ebfcf18amshada391b1c858a58p1d27e9jsn54d10dac762b',
              'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
            }
          };

          // Usando fetch se obtiene la respuesta en JSON para acceder a este
          fetch('https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en-US%7Ces-ES&q=' + PonerEnMayuscula(data.weather[0].description) + '&onlyprivate=0&de=a%40b.c', options)
            .then((response_translate) => {
              //console.log("Respuesta json para leer su data");
              return response_translate.json();

            })
            .then((data_translate) => {

              console.log(data_translate);

              summary.textContent = PonerEnMayuscula(data_translate.matches[0].translation);

            });



          //Obtener la hora local en formato de 24h 
          function ObtenerHora() {

            let currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();

            var time_act =  hours + ":" + minutes;

           
          if (hours >= 6 && hours < 18) {
            // Day time

            console.log(hours);
            document.body.style.background = '#2EB5E5';
            
            function ActSol() {
              const date_sun = new Date();
              const sun = document.querySelector('.sun');
              sun.style.width = '140px';
              sun.style.height = '140px';
              const sunPosition = SunCalc.getPosition(date_sun, lat, lon);
              sun.style.transform = 'rotate('+sunPosition.azimuth+'rad)';
              sun.style.left = Math.pow(sunPosition.azimuth,15)+'vh';

              
            }
            ActSol();

          } else {
            // Night time
            console.log(hours);
            document.body.style.backgroundImage = 'linear-gradient(to bottom, #030420, #000000 70%)';
            
          
            function ActLuna() {
              const date_moon = new Date();
              const moonPosition = SunCalc.getMoonPosition(date_moon, lat, lon);
              var illumination = SunCalc.getMoonIllumination(date_moon);
          
              const moon = document.querySelector('.sun');
          
              moon.style.transform = 'rotate('+moonPosition.azimuth+'rad)';
              moon.style.left = Math.pow(moonPosition.azimuth,15)+'vh';
              moon.style.opacity = illumination.fraction;
              console.log(moonPosition);
            }
            ActLuna();
            setInterval(() => {
              ActLuna();
            }, 60000);
          

          }


          }

       ObtenerHora();
        
          //Condicional para ir cambiando el diseño en función del estado del clima
          let weatherId = data.weather[0].id;
          switch (true) {
            case (weatherId >= 200 && weatherId < 299):
              // Thunderstorm
              document.body.style.backgroundImage = "url('thunderstorm.jpg')";
              break;
            case (weatherId >= 300 && weatherId < 400):
              // Drizzle
              document.body.style.backgroundImage = "url('drizzle.jpg')";
              break;
            case (weatherId >= 500 && weatherId < 599):
              // Rain
              let script_lluvia = document.createElement("script");
              script_lluvia.setAttribute("src", "JS/script_lluvia.js");
              document.body.appendChild(script_lluvia);

              let css_rain = document.createElement("link");
              css_rain.setAttribute("rel", "stylesheet");
              css_rain.setAttribute("type", "text/css");
              css_rain.setAttribute("href", "CSS/rain.css");
              document.head.appendChild(css_rain);

              break;
            case (weatherId >= 600 && weatherId < 699):
              // Snow
              document.body.style.backgroundImage = "url('snow.jpg')";
              break;
            case (weatherId >= 700 && weatherId < 799):
              // Atmosphere
              document.body.style.backgroundImage = "url('atmosphere.jpg')";
              break;
            case (weatherId === 800):
              // Clear
              document.body.style.backgroundImage = "url('clear-sky.jpg')";
              break;
            case (weatherId > 800 && weatherId < 900):
              // Clouds
              //document.body.style.backgroundImage = "url('clouds.jpg')";
              

              break;
            default:
              // Default
              // document.body.style.backgroundImage = "url('default.jpg')";
              break;
          }

          
          // Otros detalles del JSON de la API del clima, se accede al JSON y a se le pone el valor a la etiqueta HTML
          loc.textContent = data.name + ", " + data.sys.country;
          percentage.textContent = "%" + data.main.humidity;
          feelslike.textContent = Math.floor(data.main.feels_like - kelvin) + "°C";


          //Interval de cada 30 minutos para actualizar  la página
          setTimeout(function () {
            location.reload();
          }, 30 * 60 * 1000);



        });

    });


  } else {
    alert("Tu navegador no es compatible con el api de geolocalización");
  }



});