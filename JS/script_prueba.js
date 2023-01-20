
let lon;
let lat;
const kelvin = 273.15;


window.addEventListener("load", () => {

    if(navigator.geolocation) {
  
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
          
          });

            //Obtener la hora local en formato de 24h 
            function ObtenerHora() {
  
              let currentTime = new Date();
              var hours = currentTime.getHours();
              var minutes = currentTime.getMinutes();
  
              var time_act =  hours + ":" + minutes;
  
             
            if (hours >= 6 && hours < 18) {
              // Day time
              $('.lua').remove();
  
             
           function ActSol(){
           

            var times = SunCalc.getTimes(new Date(), lat, lon);
              console.log(times);
           
           }
              
              ActSol();
              setInterval(() => {
                ActSol();
              }, 6000);
  
            }else {

              $('.sun').remove();
              
  
            
              function ActLuna() {
                       
              }

              ActLuna();
              setInterval(() => {
                ActLuna();
              }, 60000);
            
            
            }
        
  
            }
  
         ObtenerHora();
          
            //Condicional para ir cambiando el diseño en función del estado del clima
           
  
         
  
  
          });
  
      
  
  
    } else {
      alert("No eres compatible con el api de geolocalización");
    }
  
  
  
  });