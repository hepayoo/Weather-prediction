const temp = document.getElementById('temp'),
date = document.getElementById('date-time'),
currentLocation = document.getElementById('location'),
rain = document.getElementById('rain'),
mainIcon = document.getElementById('icon'),
uvIndex = document.querySelector(".uv-index"),
uvText = document.querySelector(".uv-text"),
windSpeed = document.querySelector(".wind-speed"),
SunRise = document.querySelector(".sunrise"),
SunSet = document.querySelector(".sunset"),
humidity = document.querySelector(".humidity"),
visibility = document.querySelector(".visibility"),
humidityStatus = document.querySelector(".humidity-status"),
airQuality = document.querySelector(".air-quality"),
airQualityStatus = document.querySelector(".air-quality-status"),
visibilityStatus = document.querySelector(".visibility-status"),
weatherCards = document.querySelector('#weather-cards'),
hourlyBtn = document.querySelector(".hourly"),
weekBtn = document.querySelector(".week"),
searchForm = document.querySelector('#search');



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
  
  
  fetch("https://ipinfo.io/json", { method: "GET", })
  .then((response) => response.json())
  .then((data) => {
    
    currentCity = data.city;
    
    
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
  console.log(data);

  
  currentLocation.innerText=data.timezone; 
  condition.innerText = today.conditions;
  rain.innerText= "perc -" +today.precip + "%";
  uvIndex.innerText = today.uvindex;
  windSpeed.innerText = today.windspeed;
  humidity.innerText = today.humidity + "%";
  visibility.innerText = today.visibility ;
  airQuality.innerText = today.winddir;

  measureUvIndex(today.uvindex);
  updateHumidityStatus(today.humidity);
  updateVisibilityStatus(today.visibility);
  updateAirQualityStatus(today.widdir);
  changeBackground(today.icon);

  SunRise.innerText = today.sunrise +  "am";
  SunSet.innerText = today.sunset +  "pm";
  mainIcon.src =  getIcon(today.icon);
  





  if (hourlyorWeek==="hourly"){
    updateForecast(data.days[0].hours , unit , "day");
  }else{
    updateForecast(data.days,unit , "week");
  }

})

.catch((err)=>{
  alert("City not found :( try again ");
})
}


// function to get uv "status"
function measureUvIndex(uvIndex){
  if(uvIndex<=2){
    uvText.innerText = "low :)";
  }
  else if(uvIndex<=5){
    uvText.innerText = "Medium";

  }
  else if(uvIndex<=7){
    uvText.innerText = "high";

  }
  else if(uvIndex<=10){
    uvText.innerText = "very high";

  }
  else{
    uvText.innerText = "Danger :(";
  }
}

// function to get humidity "status"
function updateHumidityStatus(humidity){
  if(humidity<=30){
    humidityStatus.innerText="low";
  }
  else if(humidity<=60){
    humidityStatus.innerText="Moderate";
  }
  else{
    humidityStatus.innerText="high";
  }
}

// function to get visibility "status"

function updateVisibilityStatus(visibility){
  if(visibility<=0.3){
    visibilityStatusStatus.innerText="Dense Fog";
  }
  else if(visibility<=0.16){
    humidityStatus.innerText="Moderate Fog";
  }
  else if(visibility<=0.35){
    humidityStatus.innerText="Light Fog";
  }
  else if(visibility<=2.16){
    humidityStatus.innerText="Light Mist";
  }
  else if(visibility<=5.4){
    humidityStatus.innerText="CLEAR AIR :)";
  }
  else{
    humidityStatus.innerText="VERY CLEAR :)";
  }
}


// function to get Air-Quality "status"
function updateAirQualityStatus(airQuality){
  if(airQuality<=50){
  airQualityStatus.innerText = "Good :)";
  }
  else if(airQuality<=100){
    airQualityStatus.innerText = "Moderate";
    }
    else if(airQuality<=150){
      airQualityStatus.innerText = "Unhealthy for sensitive groups :(";
      }
      else if(airQuality<=200){
        airQualityStatus.innerText = "Unhealthy :(";
        }
        else if(airQuality<=150){
          airQualityStatus.innerText = " Very Unhealthy :(";
          }
          else{
            airQualityStatus.innerText = " HAZARDOUS "; 
          }
}
// function to get icon "status"
function getIcon(condition){
  console.log(condition);
  if(condition=== "partly-cloudy-night" || condition==="overcast-night" ){
    return "pics/overcastnight-removebg-preview.png";
  }

  else if (condition==="partly-cloudy-day" || condition==="overcast-day"){
    return "pics/overcast-removebg-preview (1).png";

  }
  else if (condition==="rain-night" ){
    return "pics/night-rain-removebg-preview.png";

  }
  else if (condition==="rain-day" ){
    return "pics/sun-removebg-preview.png";

  }
  else if (condition==="clear-day" ){
    return "pics/sunny-removebg-preview.png";

  }
  else if (condition==="clear-night" ){
    return "pics/moon-removebg-preview.png";

  }
  else{
    return  "pics/Premium_Vector___3d_vector_realistic_render_white_fluffy_cloud_illustration_design-removebg-preview.png";
  }


}

function getDayName(date){
  let day = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",

  ];
  return days[day.getDay()];

}
function getHour(time){
  let hour = time.split(":")[0];
  let min =  time.split(":")[1];
  return ` ${hour}:${min}`;

}


// update cards
function updateForecast(data,unit,type){
weatherCards.innerHTML = "";
let day=0;
let numCards = 0;
if(type==="day"){
  numCards=24;
}else{
  numCards = 7;
}
for(let i=0;i<numCards;i++){
  let card = document.createElement("div");
  card.classList.add("card");
  let dayName = getHour(data[day].datetime);
  if(type==="week"){
    dayName=getDayName(data[day].datetime);

  }
  let dayTemp= data[day].temp;
  let iconCondition = data[day].icon;
  let iconSrc =getIcon(iconCondition) ;
  
card.innerHTML = ` 


<h2 class="day-name">${dayName}</h2>
<div class="card-icon">
    <img src="${iconSrc}" alt="">
</div>
<div class="day-temp">
  <h2 class="temp">${dayTemp}</h2>
  <span class="temp-unit">°C</span>
</div>
`;
weatherCards.appendChild(card);
day++;
}
}

// function to change background
function changeBackground(condition){
  const body =document.querySelector("body");
  let bg = "";
  if(condition=== "partly-cloudy-night" || condition==="overcast-night" ){
    bg = "pics/Cloudy Night Sky Background.jpeg";
  }

  else if (condition==="partly-cloudy-day" || condition==="overcast-day"){
    bg =  "pics/téléchargement (3).jpeg";

  }
  else if (condition==="rain-night" ){
    bg = "pics/tumblr_mtu9dvbri41s19pnbo1_500_gif (500×281).gif";

  }
  else if (condition==="rain-day" ){
    bg = "pics/🍄 - @el1zab3th_.gif";

  }
  else if (condition==="clear-day" ){
    bg = "pics/Herfølge.jpeg";

  }
  else if (condition==="clear-night" ){
    bg = "pics/Oil Palm Tree Plantation Against Full Stock Footage Video (100% Royalty-free) 16408564 _ Shutterstock.jpeg";

  }
  else{
    bg =  "pics/Daytime Miving GIF - Daytime Miving Clouds - Discover & Share GIFs.gif";
  }

   body.style.backgroundImage =` linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${bg})`;
}


// weekly and everyday
hourlyBtn.addEventListener("click", () => {
 
   changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});

function changeTimeSpan (unit){
  if(hourlyorWeek !== unit){
    hourlyorWeek = unit;
    if(unit ==="hourly"){
      hourlyBtn.classList.add("active");
      weekBtn.classList.remove("active");
    }else{
      hourlyBtn.classList.remove("active");
      weekBtn.classList.add("active");
    }

    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}

searchForm.addEventListener("submit" , (e) => {
  e.preventDefault();
  
  let location = searchForm.querySelector('#query').value;
  console.log(location);
  if (location){
    currentCity = location;

    

    console.log(currentCity);
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
    
  }
})







  