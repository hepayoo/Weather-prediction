const temp = document.getElementById('temp'),
date = document.getElementById('date-time');


let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";



function getDateTime(){

  let now = new Date(),
  hour = now.getHours(),
  minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",

  ];

  if(minute < 10){
    minute = "0" + minute 
   }
   let dayString = days[now.getDay()];
   return `${dayString}, ${hour}:${minute}`;
   
}
Date.innerText = getDateTime();

setInterval(() => {
 date.innerText = getDateTime();
}, 1000);




function getPublicIp(){
  fetch("https://geolocation-db.com/json/", { method: "GET", })
  .then((response) => response.json())
  .then((data) => {
    
    currentCity = data.currentCity;
    
    
    getWeatherData(data.city, currentUnit, hourlyorWeek);
  })

  
}
getPublicIp();


function getWeatherData(city, unit ,hourlyorWeek){
  const apiKey ="CHWCSHZLU388Q6PF5KXCXVSCP";
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
{
  method: "GET",
}
)
.then((response)=> response.json())
.then((data)=>{
  let today = data.currentConditions;
  if(unit=== "c"){
    temp.innerText = today.temp
  }
 

});
}

  