const API_KEY="46827d13947d66162653902f0a808074";
document.addEventListener("DOMContentLoaded",function(){
    const button=
    document.getElementById("searchBtn");
    const input=
    document.getElementById("cityInput");
    const output=
    document.getElementById("output");
    button.addEventListener("click",function(){
    getWeather();
    });
function getWeather(){
        const city=input.value;
        if(city.trim()===""){
            output.innerHTML="Please enter a city name";
            return;
        }
        output.textContent="Fetching weather for "+ city+"...";
        const url=
        "https://api.openweathermap.org/data/2.5/weather?q="+
        city+
        "&appid="+
        API_KEY+
       "&units=metric";
    output.innerHTML="Fetching weather.....";
fetch(url)
.then((Response)=>{
    if(!Response.ok){
        if(Response.status===404){
            throw new Error("city not found, please check the spelling.");
        }else if(Response.status===401){
            throw new Error("invalid API key");
        }else{
            throw new Error("something went wrong. Try again.");
        }
        }
    return Response.json();
    })
.then((data)=>{
    displayWeather(data);
})
.catch((error)=>
    { output.innerHTML= error.message})
}
function displayWeather(data){
    const temp=data.main.temp||"N/A";
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const feelsLike=data.main.feels_like;
    const sunrise = new Date(data.sys.sunrise*1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset*1000).toLocaleTimeString();
    const desc=
data.weather[0].description;
const humidity=data.main.humidity;
const pressure= data.main.pressure;
const windSpeed= data.wind.speed;
const windDeg = data.wind.deg;
const windDir = getWindDirection(data.wind.Deg);
 const icon = data. weather[0].icon; 
 const iconUrl = "https://openweathermap.org/img/wn/"+ icon + ".png";
output.innerHTML = 
"<img src='"+ iconUrl+ "'><br>" + 
"Temperature: "+ temp +"\u00B0C<br>" +
"FeelsLike: "+ feelsLike + "\u00B0C<br>"  + desc + "<br>" + 
"Min: "+ minTemp +"\u00B0C<br>"+
"Max: "+ maxTemp + "\u00B0C<br>"+
"Humidity: "+ humidity + "%<br>" + 
 "Pressure: "+ pressure + " hpa<br>" + 
 "Sunrise: "+ sunrise + "<br>" +
 "Sunset: " + sunset + "<br>" +                                                              
 "Wind: "+ windSpeed + "m/s (" + windDir +")"
    }
  function getWindDirection(deg) {
            if (deg === undefined) return "N/A";
                if ( deg >= 337.5 || deg < 22.5 )
                    return "N";
            if (deg >= 22.5 && deg < 67.5 ) return
            "NE";
                    if ( deg >= 67.5 && deg < 112.5 ) return
            "E";
            if ( deg >= 112.5 && deg < 157.5 ) return
            "SE";
            if ( deg >= 157.5 && deg < 202.5 ) return
            "S";
            if ( deg >= 202.5 && deg < 247.5 ) return
            "SW"
            if ( deg >= 247.5 && deg < 292.5 ) return
            "W";
            if ( deg >= 292.5 && deg < 337.5 ) return
            "NW";
}
})