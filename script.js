var textarea = document.getElementById('destination');
var search = document.getElementById('destSearch')
let myCond =''
let otherCondArray = ["Thunderstorm", "fa-bolt", "Drizzle", "fa-cloud-showers-heavy", "Rain", "fa-cloud-rain", "Snow", "fa-snowflake", "Atmosphere", "fa-exclamation-triangle", "Clouds", "fa-cloud","Clear", "fa-sun"]

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
                myCond = data.current.weather[0].main
                var h = document.createElement('p')
                h.id = 'tempText'
                h.innerText = myTemp + "\xB0F"
                var i = document.createElement('i')
                i.classList.add("fas", otherCondArray[otherCondArray.indexOf(myCond) + 1])
                document.querySelector('#localTemp').appendChild(h)
                document.querySelector('#localTemp').appendChild(i)
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

//Get destination weather and displays it
function destinationWeather() {
    var result = textarea.value;
    if (result == '') {
        return
    } else {
    //API url to get destination weather

        let destinationWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + result + '&units=imperial' + '&appid=ef63013691934073952193cd8112b3f3'
        
        //API call to get destination weather
        fetch(destinationWeather) 
            .then(function (response) {
                return response.json();
            })

            //Return destination temps and add it to the DOM
            .then(function (data){
                var myDestTemp = data.main.temp.toFixed(0)
                var myDestHighTemp = data.main.temp_max.toFixed(0)
                var myDestLowTemp = data.main.temp_min.toFixed(0) 
                var myDestCond = data.weather[0].main       
                const destArray = [{classes: ["title", "is-4", "has-text-weight-bold", "m-5", "destConditions"], inText: 'Current Temp'}, {inText: myDestTemp + "\xB0F"}, {inText: 'High'}, {inText: myDestHighTemp + "\xB0F"}, {inText: 'Low'}, {inText: myDestLowTemp + "\xB0F"}]  
                document.querySelectorAll('.destConditions').forEach(e => e.remove());
                for (var i = 0; i < destArray.length; i++) {
                    var elem = document.createElement('p')
                    elem.classList.add(...destArray[0].classes)
                    elem.innerText = destArray[i].inText
                    document.querySelector('#myDestinationsWeather').appendChild(elem)
                }
                var i = document.createElement('i')
                //i.id = "condImg"
                i.style.fontSize = "80px"
                i.classList.add("destConditions","fas", otherCondArray[otherCondArray.indexOf(myDestCond) + 1])
                document.querySelector('#myDestinationsWeather').appendChild(i)
            })
    }            
}

//Store recent destination searches to local storage
function recentDestinations() {
    var result = textarea.value
    if (result == '') {
        return
    } else {
    localStorage.setItem('thirdDest', localStorage.getItem('secondDest'))
    localStorage.setItem('secondDest',localStorage.getItem('firstDest'))
    localStorage.setItem('firstDest', result)
    showRecentDestination()
    }
}

//Display the most recent destination searches
function showRecentDestination() {
    if (localStorage.getItem('firstDest') == null) {
        localStorage.setItem('firstDest', " ")
        if (localStorage.getItem('secondDest') == null) {
            localStorage.setItem('secondDest', " ")
            if (localStorage.getItem('thirdDest') == null) {
                localStorage.setItem('thirdDest', " ")
            }
        }
        showRecentDestination()
    } else 
        document.getElementById('firstDest').innerText = localStorage.getItem('firstDest')
        document.getElementById('secondDest').innerText = localStorage.getItem('secondDest')
        document.getElementById('thirdDest').innerText = localStorage.getItem('thirdDest')
}

//Event listener for searching destination
search.addEventListener('click', destinationWeather)
search.addEventListener('click', recentDestinations);
textarea.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      search.click();
    }
  });
textarea.addEventListener("click", function() {
    document.getElementById("destination").value = ""
})

getMyTemp()
showRecentDestination()

//#region variables
var covid_api = "https://covid-19-statistics.p.rapidapi.com/reports?";
    // List of States and abbreviations
var states = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
];
    // Country For Covid API Documentation
var iso = "USA";
    // Lenguage For SkyScanner API Documentation
var locale = "en-US";
    // Currency For SkyScanner API Documentation
var currency ="USD"
    // Country For SkyScanner API Documentaion
var country = "US"
    // Origin ID For SkyScanner API Documentaion
var origin = ""
    // Destination ID for SkyScanner API Documentation
var destination =""
    // Flight Date For SkyScanner Documentation 
flight_date =""
    // Flight Return Date For SkyScanner Documentation
flight_return_date="anytime"
    // Api Key For Fetch
var api_key = "2e661642c3mshcd9c007bfe4c8aep1e4335jsnf17ec73a7ae9"
//#endregion
 
//#region Function Calls
document.getElementById("destSearch").addEventListener("click", function(){
    id_identifier(document.getElementById("destination").value, "arriving_dpdn")
    fetch_covid_data(covid_api, iso, state_abb(document.getElementById("destination").value, 0, 0))
})
document.getElementById("originSearch").addEventListener("click", function(){
    id_identifier(document.getElementById("depart_input").value, "depart_dpdn")
})
 
document.getElementById("depart_dpdn").addEventListener("change", function(){
    origin= this.value
})
document.getElementById("arriving_dpdn").addEventListener("change", function(){
    destination= this.value
    fetch_flight_data(country, currency, locale, destination, origin ,flight_date,flight_return_date);
})
document.getElementById("dateSearch").addEventListener("click", function(){
    flight_date = document.getElementById("date_input").value
    console.log(flight_date)
    
})
//#endregion
 
//#region Function Definitions 
function fetch_covid_data(url, iso, province){
    fetch(url+ "date="+current_date()+"&iso="+iso +"&region_province="+province, {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
        "x-rapidapi-key": api_key
    }
    })
    .then(response => {
    return response.json()
    })
    .then(response=>{
        var new_li_array = [state = "State: "+response.data[0].region.province, confirmed = "Confiremed Casses: "+response.data[0].confirmed, deaths ="Deaths: "+response.data[0].deaths, last_upd = "Last Updated On: "+response.data[0].last_update]
        new_li(new_li_array);
    })
    .catch(err => {
    console.error(err);
});
}
 
function id_identifier(input, id){
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + input, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "2e661642c3mshcd9c007bfe4c8aep1e4335jsnf17ec73a7ae9"
    }
    })
    .then(response => {
        return response.json()
    })
    .then(response =>{
        
        places_sorter(response.Places, state_abb(input, 0, 1), id)
        
    })
    .catch(err => {
        console.error(err);
    });
}
 
function places_sorter(a, b, c){
    var select = document.getElementById(c);
    
    if(select.children.length > 0){
       while(select.firstChild){
           select.removeChild(select.firstChild)
       } 
    }
    for (var i = 0; i < a.length; i++) {
        if(a[i].RegionId == b){
            var place = a[i].PlaceName
            var option = document.createElement("option");
            option.text=place;
            option.value=a[i].PlaceId
            select.appendChild(option);
        }
        
    }
}
 
function new_li(a){
    var ul = document.getElementById("covid_cnt");
    
    if(ul.children.length > 0){
        while(ul.firstChild){
            ul.removeChild(ul.firstChild)
        }
    }
    for (var i = 0; i < a.length; i++) {
        var li = document.createElement("li")
        if(i==0){
            li.appendChild(document.createTextNode(a[0]))
            ul.appendChild(li);
        }
        else if(i == 1){
            li.appendChild(document.createTextNode(a[1]))
            ul.appendChild(li);
        }
        else if(i == 2){
            li.appendChild(document.createTextNode(a[2]))
            ul.appendChild(li);
        }
        else if(i == 3){
            li.appendChild(document.createTextNode(a[3]))
            ul.appendChild(li);
        }
   }
}
 
function current_date(){
    var today =new Date();
    var dd = String(today.getDate()-1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy +"-"+mm+"-"+dd
    return today
}
 
function fetch_flight_data(a, b, c, d, e, f, g){
    
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/"+a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f+"?inboundpartialdate="+g, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
    }
    })
    .then(response => {
        return response.json();
    })
    .then(response=>{
        var found = true
        if(response.Quotes.length!=0&&response.Quotes){
            for (var i = 0; i < response.Quotes.length; i++) {
                found=true
                if(response.Quotes[i].Direct==true){
                    var direct_flight=[carrier_name = Carrier_ids(response, i)+" Flight Info: ", direct_confirmation="Flight is direct: "+response.Quotes[i].Direct, flight_price="Price: $"+response.Quotes[i].MinPrice]
                    
                }else if(response.Quotes[i].Direct==false){
                    var not_direct_flight =[carrier_name = Carrier_ids(response, i)+" Flight Info: ", direct_confirmation="Flight is direct: "+response.Quotes[i].Direct, flight_price="Price: $"+response.Quotes[i].MinPrice]
                }
            }
            append_flight_data(direct_flight,not_direct_flight, found)
        }else{
            found = false

            append_flight_data(direct_flight,not_direct_flight, found)
        }
    })
    .catch(err => {
        console.error(err);
    });
}
 
function state_abb(a, b, c){
    for (let i = 0; i < states.length; i++) {
        if(states[i][b] ==a){
            return states[i][c]
        }
    }
}
 
function Carrier_ids(a, b){
    for (var i = 0; i < a.Carriers.length; i++) {
        if(a.Quotes[b].OutboundLeg.CarrierIds[0] == a.Carriers[i].CarrierId){
            return a.Carriers[i].Name;
        } 
    }
}
 
function append_flight_data(a, b, c){
    var ul= document.getElementById("flight_info_cnt");
    if(ul.hasChildNodes){
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
    }
    if(c == true){
        
        for (var i = 0; i < a.length; i++) {
            var li= document.createElement("li");
            li.appendChild(document.createTextNode(a[i]));
            ul.appendChild(li);
        }
        for (var e = 0; e < b.length; e++) {
            var li= document.createElement("li");
            li.appendChild(document.createTextNode(b[e]));
            ul.appendChild(li);
        }
    }else if(c == false){
        var li= document.createElement("li");
        li.appendChild(document.createTextNode("No Flights Were Found"));
        ul.appendChild(li);
    }
}
//#endregion



