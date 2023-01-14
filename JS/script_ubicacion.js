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
     
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position) => {

             console.log(position);
             lon = position.coords.longitude;
             lat = position.coords.latitude;
            
             // ID de la API
             const api ="e8095df1859e031be279cec6914b6971";
             // url base de la API
             const url_base = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+api;

             fetch(url_base)
             .then((response) => {

                console.log("Respuesta json para leer su data");
                
                return response.json();

             })
             .then((data) => {

               console.log("Test imprimir data");
               console.log(data);

               temp.textContent = Math.floor(data.main.temp - kelvin) + "°C";
               function PonerEnMayuscula(frase){

                let palabra = frase.split(' ');
                return palabra.map(p => p[0].toUpperCase() + p.slice(1)).join(' ');

               };

               const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd7ebfcf18amshada391b1c858a58p1d27e9jsn54d10dac762b',
                    'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
                }
            };
            
            fetch('https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Ces&q='+ PonerEnMayuscula(data.weather[0].description) +'&mt=1&onlyprivate=0&de=a%40b.c', options)
                .then(response => response.json())
                .then(response => summary.textContent = response.responseData.translatedText)
                .catch(err => console.error(err));

                let weatherId = data.weather[0].id;
                switch(true) {
                  case (weatherId >= 200 && weatherId < 300):
                    // Thunderstorm
                    document.body.style.backgroundImage = "url('thunderstorm.jpg')";
                    break;
                  case (weatherId >= 300 && weatherId < 400):
                    // Drizzle
                    document.body.style.backgroundImage = "url('drizzle.jpg')";
                    break;
                  case (weatherId >= 500 && weatherId < 600):
                    // Rain
                    document.body.style.backgroundImage = "url('IMG/clear-sky.jpg')";
                    break;
                  case (weatherId >= 600 && weatherId < 700):
                    // Snow
                    document.body.style.backgroundImage = "url('snow.jpg')";
                    break;
                  case (weatherId >= 700 && weatherId < 800):
                    // Atmosphere
                    document.body.style.backgroundImage = "url('atmosphere.jpg')";
                    break;
                  case (weatherId === 800):
                    // Clear
                    document.body.style.backgroundImage = "url('clear-sky.jpg')";
                    break;
                  case (weatherId > 800 && weatherId < 900):
                    // Clouds
                    document.body.style.backgroundImage = "url('clouds.jpg')";
                    break;
                  default:
                    // Default
                    document.body.style.backgroundImage = "url('default.jpg')";
                    break;
                }
               
             

               
               loc.textContent = data.name + ", " + data.sys.country;
               percentage.textContent = "%" + data.main.humidity;
               feelslike.textContent = Math.floor(data.main.feels_like - kelvin) + "°C";
               var offset = data.timezone;
               var d = new Date();
               var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
               var nd = new Date(utc + (1000 * offset));

               var hour = nd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true, minute12: true});

               console.log(hour);

               

             });
        
        });
    }else{
        alert("Tu navegador no es compatible con el api de geolocalización");
    }
   
    
    
});