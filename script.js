const openWeatherKey = '';
const url='https://api.openweathermap.org/data/2.5/weather?id=3439389&appid=' + openWeatherKey + '&units=metric';

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let weatherResponse = JSON.parse(xmlHttp.responseText);
            document.getElementById('temp').innerHTML = weatherResponse.main.temp + "°C";
            document.getElementById('pressure').innerHTML = weatherResponse.main.pressure + " hPa";
            document.getElementById('humidity').innerHTML = weatherResponse.main.humidity + " %";        
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

httpGet(url);
var date = new Date();
document.getElementById('todaysDate').innerHTML = date.toLocaleDateString();