var API_KEY = "5592ab14c73d2e3c1705ad47c200a44e";

var today = $("#current-conditions")[0];
var forecast = $("#forecast")
var cards = $("#cards")[0]
var forecastBox = forecast[0];
var citySearch = $("#city-search")[0];
var pastSearches = $("#past-searches")[0];
console.log(citySearch)
console.log(forecastBox)

console.log(today)

citySearch.addEventListener("submit", displayWeather)

function displayWeather(event) {
    event.preventDefault();
    while (today.hasChildNodes()) {
        today.removeChild(today.firstChild);
    }
    var city = $('#city')[0].value
    localStorage.setItem(city, city)
    console.log(city)
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+API_KEY;

    fetch(geoCode)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        var lat = data[0].lat
        var lon = data[0].lon
        var current = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid="+API_KEY
        var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid="+API_KEY
        fetch(current)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var icon = data.weather[0].icon
            var iconPic = "http://openweathermap.org/img/w/"+icon+".png"
            console.log(data)
            console.log(dayjs.unix(data.dt).format('M/D/YYYY'))

            var locDate = document.createElement("h2");
            locDate.innerHTML = city+ " ("+dayjs().format('M/D/YYYY')+")";
            var iconEl = document.createElement("img");
            iconEl.setAttribute("src", iconPic)
            locDate.appendChild(iconEl);

            today.appendChild(locDate)

            var temp = document.createElement("p");
            temp.innerHTML = "Temp: " + data.main.temp + "°F";
            today.appendChild(temp);

            var wind = document.createElement("p");
            wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
            today.appendChild(wind);

            var humidity = document.createElement("p");
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
            today.appendChild(humidity)
        })
        fetch(fiveDay)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.list);
            var forecast = [];
            for (var i = 6; i < data.list.length; i += 8) {
                forecast.push(data.list[i])
            }
            console.log(forecast);

            while (cards.hasChildNodes()) {
                cards.removeChild(cards.firstChild);
            }

            for (let i = 0; i < forecast.length; i++) {
                var dayCard = document.createElement("div");
                dayCard.setAttribute("class", "day-card");
                var date = document.createElement("h4");
                date.setAttribute("class", "d-block");
                date.innerHTML = dayjs.unix(forecast[i].dt).format('M/D/YYYY')
                
                dayCard.appendChild(date);

                var icon = forecast[i].weather[0].icon;
                var iconPic = "http://openweathermap.org/img/w/"+icon+".png";
                
                var iconEl = document.createElement('img');
                iconEl.setAttribute('src', iconPic);
                dayCard.appendChild(iconEl);

                var temp = document.createElement("p");
                temp.innerHTML = "Temp: " + forecast[i].main.temp + "°F";
                dayCard.appendChild(temp);

                var wind = document.createElement("p");
                wind.innerHTML = "Wind: " + forecast[i].wind.speed + " MPH";
                dayCard.appendChild(wind);

                var humidity = document.createElement("p");
                humidity.innerHTML = "Humidity: " + forecast[i].main.humidity + "%";
                dayCard.appendChild(humidity)
                
                cards.appendChild(dayCard);
            }

        })
    })
}

function init() {
    if (localStorage.length > 0) {
        for (var city in localStorage) {
            if (localStorage.getItem(city)) {
                var prevCity = document.createElement("button");
                prevCity.setAttribute('type', 'button');
                prevCity.style.marginBottom = "15px";
                prevCity.innerHTML = localStorage.getItem(city);
                pastSearches.appendChild(prevCity);
            }
        };
    };
}
init();
