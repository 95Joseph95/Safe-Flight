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

getMyTemp()


var result = ""
var textarea = document.getElementById('destination');
var search = document.getElementById('destSearch')


function updateResult(city) {
    result = textarea.value;
    console.log(result)

    //API url to get local weather
    let destinationWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'
    
    // 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,daily,alerts' + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'

    //API call to get local weather
    fetch(destinationWeather) 
        .then(function (response) {
            return response.json();
        })
        //Return local temp and add it to the DOM
        .then(function (data){
            myDestCondition = data.weather[0].main
            myDestTemp = data.main.temp
            myDestLowTemp = data.main.temp_min
            myDestHighTemp = data.main.temp_max
            console.log(myDestCondition, myDestTemp, myDestLowTemp, myDestHighTemp)
            var h = document.createElement('p')
            h.classList.add('title', 'is-5')
            h.innerText = myDestTemp + "\xB0F"
            document.querySelector('#myDestinationsWeather').appendChild(h)
        })
        
}





updateResult('detroit')
//search.addEventListener('click', updateResult);


