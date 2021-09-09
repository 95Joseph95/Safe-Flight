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
            
            var hText = document.createElement('p')
            hText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            hText.innerText = 'Current Temp'
            document.querySelector('#myDestinationsWeather').appendChild(hText)
                        
            var h = document.createElement('p')
            h.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            h.innerText = myDestTemp + "\xB0F"
            document.querySelector('#myDestinationsWeather').appendChild(h)

            var iText = document.createElement('p')
            iText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            iText.innerText = 'High'
            document.querySelector('#myDestinationsWeather').appendChild(iText)

            var i = document.createElement('p')
            i.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            i.innerText = myDestHighTemp + "\xB0F"
            document.querySelector('#myDestinationsWeather').appendChild(i)

            var jText = document.createElement('p')
            jText.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            jText.innerText = 'Low'
            document.querySelector('#myDestinationsWeather').appendChild(jText)

            var j = document.createElement('p')
            j.classList.add('title', 'is-4', 'has-text-weight-bold', 'm-5')
            j.innerText = myDestLowTemp + "\xB0F"
            document.querySelector('#myDestinationsWeather').appendChild(j)
        })
}

//Event listener for searching destination
search.addEventListener('click', destinationWeather);

getMyTemp()

//Use below to run the updatefunction without having to type a city name every time
//updateResult('detroit')