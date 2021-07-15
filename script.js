let openWeatherKey = '';
chrome.storage.local.get(['weatherApiKey'], function(result) {
    openWeatherKey = result.weatherApiKey;
    console.log('Value currently is ' + result.weatherApiKey);
    updateScreen();
});

function updateScreen() {
    if( openWeatherKey != '' ) {
        document.getElementById('infoPanel').style.display = "block";
        document.getElementById('configPanel').style.display = "none";
    
        var date = new Date();
        document.getElementById('todaysDate').innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const url='https://api.openweathermap.org/data/2.5/weather?id=3439389&appid=' + openWeatherKey + '&units=metric';
        httpGet(url);
    } else {
        document.getElementById('infoPanel').style.display = "none";
        document.getElementById('configPanel').style.display = "block";
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let weatherResponse = JSON.parse(xmlHttp.responseText);
            document.getElementById('temp').innerHTML = weatherResponse.main.temp + "°C";
            document.getElementById('pressure').innerHTML = weatherResponse.main.pressure + " hPa";
            document.getElementById('humidity').innerHTML = weatherResponse.main.humidity + " %";
            document.getElementById('loadingSpinner').style.display = "none";
            document.getElementById('resultList').style.display = "block";
        } else if (xmlHttp.readyState == 2 && xmlHttp.status == 401) {
            document.getElementById('loadingSpinner').style.display = "none";
            document.getElementById('errorMessage').style.display = "block";
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function saveApiKey(){
    let value = document.getElementById('apiKey').value;
    
    if(document.getElementById('rememberMe').checked == true || value === ""){
        chrome.storage.local.set({weatherApiKey: value}, function() {    
            document.getElementById('loadingSpinner').style.display = "block";
            document.getElementById('resultList').style.display = "none";
            console.log('Value is set to ' + value);
        });
    }
    openWeatherKey = value;
    updateScreen();
}

function removeApiKey(){
    document.getElementById('errorMessage').style.display = "none";
    document.getElementById('apiKey').value = '';
    saveApiKey();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sbmt').addEventListener('click', saveApiKey);
    document.getElementById('logout').addEventListener('click', removeApiKey);
});
