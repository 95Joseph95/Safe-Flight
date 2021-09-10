var textarea = document.getElementById('destination');
var search = document.getElementById('destSearch')

//Get users local temp
function getMyTemp() {

   //Run if location coordinates are valid 
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        let myTemp = ''
  
        //API url to get local weather
        let openWeatherCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,daily,alerts' + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'

        //API call to get local weather
        fetch(openWeatherCall) 
            .then(function (response) {
                return response.json();
            })
            
            //Return local temp and add it to the DOM
            .then(function (data){
                myTemp = data.current.temp.toFixed(0)
                var h = document.createElement('p')
                h.id = 'tempText'
                h.innerText = myTemp + "\xB0F"
                document.querySelector('#localTemp').appendChild(h)
            })
    }

  //Logic for error detection if no location can be returned
    function error() {
        textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
        textContent = 'Geolocation is not supported by your browser';
    } else {
        textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

//function updateResult(city) {
function destinationWeather() {
    var result = textarea.value;

    // let destinationWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'
    
    //API url to get destination weather
    let destinationWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + result + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'
    
    //API call to get destination weather
    fetch(destinationWeather) 
        .then(function (response) {
            return response.json();
        })

        //Return destination temps and add it to the DOM
        .then(function (data){
            var myDestCondition = data.weather[0].main
            var myDestTemp = data.main.temp.toFixed(0)
            var myDestHighTemp = data.main.temp_max.toFixed(0)
            var myDestLowTemp = data.main.temp_min.toFixed(0)
            
            const destArray = [{classes: ["title", "is-4", "has-text-weight-bold", "m-5"], inText: 'Current Temp'}, {inText: myDestTemp + "\xB0F"}, {inText: 'High'}, {inText: myDestHighTemp + "\xB0F"}, {inText: 'Low'}, {inText: myDestLowTemp + "\xB0F"}]

            for (var i = 0; i < destArray.length; i++) {
                var elem = document.createElement('p')
                elem.classList.add(...destArray[0].classes)
                elem.innerText = destArray[i].inText
                document.querySelector('#myDestinationsWeather').appendChild(elem)
            }
            // var hText = document.createElement('p')
            // hText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            // hText.innerText = 'Current Temp'
            // document.querySelector('#myDestinationsWeather').appendChild(hText)
            
            // var hText = document.createElement('p')
            // hText.classList.add(...destArray[0].classes)
            // hText.innerText = destArray[0].inText
            // document.querySelector('#myDestinationsWeather').appendChild(hText)
                        
            // var h = document.createElement('p')
            // h.classList.add(...destArray[0].classes)
            // h.innerText = destArray[1].inText
            // document.querySelector('#myDestinationsWeather').appendChild(h)

            // var iText = document.createElement('p')
            // iText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            // iText.innerText = 'High'
            // document.querySelector('#myDestinationsWeather').appendChild(iText)

            // var i = document.createElement('p')
            // i.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            // i.innerText = myDestHighTemp + "\xB0F"
            // document.querySelector('#myDestinationsWeather').appendChild(i)

            // var jText = document.createElement('p')
            // jText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            // jText.innerText = 'Low'
            // document.querySelector('#myDestinationsWeather').appendChild(jText)

            // var j = document.createElement('p')
            // j.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            // j.innerText = myDestLowTemp + "\xB0F"
            // document.querySelector('#myDestinationsWeather').appendChild(j)
        })
}

//Event listener for searching destination
search.addEventListener('click', destinationWeather);

//Use below to run the updatefunction without having to type a city name every time
//updateResult('detroit')

getMyTemp()

// Variables
    // Covid api Url
	var covid_api = "https://covid-19-statistics.p.rapidapi.com/reports?";
    // Country Documentation for Covid Api
var iso = "USA";
    // State/Province for Covid Api
var region_province = "Michigan";
    // City Documentation for Covid Api
var city_name = "Luce";
var api_key_covid = keys.covid_key
    //current Date for covid api
var today =new Date();
var dd = String(today.getDate()-1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
 
today = yyyy +"-"+mm+"-"+dd
console.log(today)
 
// Function Calls
 
fetch_covid_data(covid_api)
 
// Function Definitions
 
    // Gets Covid Statistics Based on Date and Location
function fetch_covid_data(url){
        // Gets Data From Covid api Based on Date, Country, and State
    fetch(url+ "date="+today+"&iso="+iso +"&region_province="+region_province, {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": api_key_covid
    }
    })
    .then(response => {
        // Acces JSON type data
    return response.json()
    })
    .then(response=>{
            // Acces Data Based on The City
        console.log(response.data)
        city_sorter(response.data[0].region.cities, response.data[0])
    })
    .catch(err => {
    console.error(err);
});
}
    // Cycles trough The Cities Array in The Covid api to find The info In The City Selected
function city_sorter(a,b){
    var found = false;
    for (var i = 0; i < a.length; i++) {
        if(city_name==a[i].name){
            found=true
            console.log("Here is The Data on: " +a[i].name+".");
            console.log("Confirmed Casses: "+a[i].confirmed);
            console.log("Deaths: "+a[i].deaths);
            console.log("Last Updated on: "+a[i].last_update);
        }else if(a.length-1 == i & found == false){
            console.log("we Couldn`t find any data on: " +city_name+", but here is data on the state of: " + b.region.province)
            console.log("Confirmed Casses: "+b.confirmed)
            console.log("Active Casses: "+b.active);
            console.log("Deaths: "+b.deaths);
        }
    }
}