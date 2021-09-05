//Get users local temp
function getMyTemp() {

    // Set variable
    let myTemp = ''
  
   //Run if location coordinates are valid 
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        lat = latitude
        long = longitude
        console.log(latitude, longitude)
  
        //API url to get local weather
        let openWeatherCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,daily,alerts' + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'

        //API call to get local weather
        fetch(openWeatherCall) 
            .then(function (response) {
                return response.json();
            })
            //Return local temp and add it to the DOM
            .then(function (data){
                myTemp = data.current.temp
                var h = document.createElement('h1')
                h.innerText = myTemp
                document.querySelector('#localTemp').appendChild(h)
            })
    }
  //Logic for error detection if no location can be returned
    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

getMyTemp()