let lon;
let lat;
let temp = document.querySelector(".temperatura");
let loc = document.querySelector(".location");
let summary = document.querySelector(".summary");
let icon = document.querySelector(".icon");
const kelvin = 273.15;

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
               summary.textContent = data.weather[0].description;
               loc.textContent = data.name + ", " + data.sys.country;


             });
        
        });
    }
   
});