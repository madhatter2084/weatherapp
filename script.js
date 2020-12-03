$(document).ready(function(){
    var longitude;
    var latitude;
    $(document).ready(function() {
        var interval = setInterval(function(){
            var momentNow = moment();
            $("#date").html(momentNow.format("dddd").substring(0,8).toUpperCase() + "  " + momentNow.format("MMMM DD YYYY"));
            $("#time").html(momentNow.format("hh:mm"));
        }, 100);
    });
    function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
        showPosition();
    }
    function showPosition(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log(longitude);
        console.log(latitude);
        renderWeather()
    }
    function renderWeather(){
        var apiKey = "37d198b6a9dd6e25b1cb3dcdfedb4eb1"
        var GoogleAPIKey = "AIzaSyCnlH4DL3Nulo9wAc_EUZKTzHZKA7B2KPI"
        var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + GoogleAPIKey;
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude +  "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#currentWeather").empty();
            var tempDiv = $("<p id='temp' class='card-text'>");
            var humidDiv = $("<p id='humid' class='card-text'>");
            var windDiv = $("<p id='wind' class='card-text'>");
            var uvidDiv = $("<p id='uvid' class='card-text'>");
            var weatherData = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png";
            var tempData = response.current.temp;
            var humidData = response.current.humidity;
            var windData = response.current.wind_speed;
            var uvidData = response.current.uvi;
            var weatherIcon = $("<img>").attr("src", weatherData);
            weatherIcon.empty();
            $("#currentWeather").prepend(weatherIcon);
            tempDiv.text("Temperature: " + tempData + String.fromCharCode(176) + "F");
            humidDiv.text("Humidity: " + humidData + "%");
            windDiv.text("Wind Speed: " + windData + "Mph");
            uvidDiv.text("UV Index: " + uvidData);
            $("#currentWeather").append(tempDiv);
            $("#currentWeather").append(humidDiv);
            $("#currentWeather").append(windDiv);
            $("#currentWeather").append(uvidDiv);
            if (uvidData < 8){
                uvidDiv.removeClass("high");
                uvidDiv.addClass("low");
            }
            else {
                uvidDiv.removeClass("low");
                uvidDiv.addClass("high");
            }
            $("#forecastBody").html("");
            for (i =1; i < 6; i++){
                var forecastDate = moment().add(i, 'days').format('L');  
                var forecastCol = $("<div class='col-sm'>");
                var forecastCard = $("<div class='card forecast'>");
                var forecastHeader = $("<div class='card-header'>");
                var forecastDateP = $("<p>").text(forecastDateP);
                $("#forecastBody").append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastHeader);
                forecastHeader.append(forecastDate);
                var forecastWeatherData = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";
                var forecastTempData = response.daily[i].temp.day;
                var forecastHumidData = response.daily[i].humidity;
                var forecastData = $("<div class='card-body'>");
                var forecastWeatherIcon = $("<img>").attr("src", forecastWeatherData);
                var forecastTempDiv = $("<p>").text("Temperature: " + forecastTempData + String.fromCharCode(176) + "F");
                var forecastHumidDiv = $("<p>").text("Humidity: " + forecastHumidData + "%");
                forecastCard.append(forecastData);
                forecastData.append(forecastWeatherIcon, forecastTempDiv, forecastHumidDiv);
            }
        });
        $.ajax({
            url: googleURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var forecastDate = moment().format('L');
            var cityDiv = $("#cityName");
            var cityData = response.results[6].formatted_address;
            cityDiv.html("");
            var cityDisplay = $("<h3 class='display-4'>").text(cityData);
            var dateDisplay = $("<h3 class='display-4'>").text(forecastDate);
            cityDiv.append(cityDisplay, dateDisplay);
        });
    }
    var clickCity;
    function citybutton(){
        var OpenCageAPIKey = "018eae80efa940958a187269d38fdc75"
        var opencageURL = "https://api.opencagedata.com/geocode/v1/json?q=" + clickCity + "&key=" + OpenCageAPIKey;
        $.ajax({
            url: opencageURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            latitude = response.results[0].geometry.lat
            longitude = response.results[0].geometry.lng
            renderWeather();
        })
    }
    var cityHistory = ["New York", "Houston", "Los Angeles", "Memphis", "Green Bay"];
    function StorageCheck() {
        var storedCity = JSON.parse(localStorage.getItem("searchHistory"));
        if (storedCity !== null) {
          cityHistory = storedCity;
        }
        renderButtons();
    }
    function renderButtons() {
        $("#CityButton").html("");
        for (var i = 0; i < cityHistory.length; i++) {
            var city = cityHistory[i];
            var newButton = $("<button>");
            newButton.addClass("btn btn-success searchResult display-4");
            newButton.attr("data-name", city);
            newButton.attr("id", "cityButton");
            newButton.text(city);
            $("#CityButton").prepend(newButton);
        }        
    }
    $("#CityButton").on("click","button", function(event) {
        event.preventDefault();
        clickCity = $(this).attr("data-name");
        console.log(clickCity);
        citybutton();
    })
    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        var searchValue = ($("#searchBar").val().toUpperCase());
        if (searchValue === "") {
            return;
        }
        cityHistory.push(searchValue);
        localStorage.setItem("searchHistory", JSON.stringify(cityHistory));
        $("#searchBar").val("");
        renderButtons();
    })
    $("#clearButton").on("click", function(event) {
        event.preventDefault();
        $("#searchBar").val("");
        localStorage.clear();
        cityHistory = ["New York", "Houston", "Los Angeles", "Memphis", "Green Bay"];
        $("#CityButton").html("");
        renderButtons();
    })
    StorageCheck();
    getLocation();
});