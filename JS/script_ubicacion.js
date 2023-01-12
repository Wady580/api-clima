let lon;
let lat;
let temp = document.querySelector(".temp");
let loc = document.querySelector(".location");
let summary = document.querySelector(".summary");
let icon = document.querySelector(".icon");

// ID de la API
const api ="e8095df1859e031be279cec6914b6971";


window.addEventListener("load", () => {
     
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position) => {

             console.log(position);
             lon = position.coords.lon;
             lat = position.coords.lat;


        })
    }
   






}) 