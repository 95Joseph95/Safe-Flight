// Variables
	// Covid api Url
var covid_api = "https://covid-19-statistics.p.rapidapi.com/reports?";
	// Country Documentation for Covid Api
var iso = "USA";
	// State/Province for Covid Api
var region_province = "Michigan";
	// City Documentation for Covid Api
var city_name = "Luuce";
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

