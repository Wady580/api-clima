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

               }
               summary.textContent = PonerEnMayuscula(data.weather[0].description);
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