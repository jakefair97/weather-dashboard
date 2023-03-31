var API_KEY = "5592ab14c73d2e3c1705ad47c200a44e";

var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=Austin&limit=1&appid="+API_KEY;

var today = $("#current-conditions")
var forecast = $("#forecast")
var cards = $("#cards")
var forecastBox = forecast[0];
console.log(forecastBox)

var currentBox = today[0];
console.log(today[0])

fetch(geoCode)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    let lat = data[0].lat
    let lon = data[0].lon
    let current = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid="+API_KEY
    let fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid="+API_KEY
    fetch(current)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var icon = data.weather[0].icon
        var iconPic = "http://openweathermap.org/img/w/"+icon+".png"
        console.log(data)
        console.log(dayjs.unix(data.dt).format('M/DD/YYYY'))

        var locDate = document.createElement("h2");
        locDate.innerHTML = "Austin ("+dayjs().format('M/DD/YYYY')+")";
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", iconPic)
        locDate.appendChild(iconEl);

        currentBox.appendChild(locDate)

        var temp = document.createElement("p");
        temp.innerHTML = "Temp: " + data.main.temp + "°F";
        currentBox.appendChild(temp);

        var wind = document.createElement("p");
        wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
        currentBox.appendChild(wind);

        var humidity = document.createElement("p");
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
        currentBox.appendChild(humidity)
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

        var dayCard = document.createElement("div");
        dayCard.setAttribute("class", "day-card");
        var date = document.createElement("div");
        date.setAttribute("class", "d-block");
        date.innerHTML = dayjs.unix(forecast[0].dt).format('M/DD/YYYY')
        
        dayCard.appendChild(date);

        var icon = forecast[0].weather[0].icon;
        var iconPic = "http://openweathermap.org/img/w/"+icon+".png";
        
        var iconEl = document.createElement('img');
        iconEl.setAttribute('src', iconPic);
        dayCard.appendChild(iconEl);

        var temp = document.createElement("p");
        temp.innerHTML = "Temp: " + forecast[0].main.temp + "°F";
        dayCard.appendChild(temp);

        var wind = document.createElement("p");
        wind.innerHTML = "Wind: " + forecast[0].wind.speed + " MPH";
        dayCard.appendChild(wind);

        var humidity = document.createElement("p");
        humidity.innerHTML = "Humidity: " + forecast[0].main.humidity + "%";
        dayCard.appendChild(humidity)
        
        cards[0].appendChild(dayCard);


    })
})

// fetch(fiveDay)
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     console.log(data)
// })


// const CITY = "Austin";
// const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=imperial`;

// fetch(API_URL)
//   .then(response => response.json())
//   .then(data => {
//     const forecast = data.list.slice(0, 5);
//     forecast.forEach(day => {
//       const date = new Date(day.dt * 1000);
//       const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
//       const temperature = Math.round(day.main.temp);
//       const description = day.weather[0].description;
//       console.log(`${dayOfWeek}: ${temperature}°F - ${description}`);
//     });
//   })
//   .catch(error => {
//     console.log("An error occurred while fetching the forecast:", error);
//   });
