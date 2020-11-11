$(document).ready(function() {
    var apiKey = '&units=imperial&appid=0218f2702681a533f2e51a253c19faab'

    function clock() {
        var time = moment().format('h:mm:ss a');
        var date = moment().format('MMMM Do YYYY');
        $('#time').text(time);
        $('#date').text(date);
    }
        setInterval(clock, 1000);

    var savedCities = ['NEW YORK', 'PARAMUS'];
    function getCities(){
        var storedCity = JSON.parse(localStorage.getItem('searchHistory'));
        if (storedCity !== null){
            savedCities = storedCity;
        }
        addBtn();
    }
    function addBtn(){
        $('#cityBtnsDiv').html('');
        for (var i=0; i < savedCities.length; i++){
            var city = savedCities[i];
            var createBtn = $('<button>');
            createBtn.addClass('btn btn-success btn-outline-dark');
            createBtn.attr('data-name', city);
            createBtn.attr('id', 'cityBtns');
            createBtn.text(city);
            $('#cityBtnsDiv').prepend(createBtn);
        }
    }
    
    $("#submitSearch").on("click", function() {
        var citySearchText = ($("#city").val().toUpperCase());
        if (citySearchText === "") {
            return;
        }
        savedCities.push(citySearchText);
        localStorage.setItem("searchHistory", JSON.stringify(savedCities));
        $("#city").html('');
        addBtn();
    });

    // var selectedCity
    $("#CityBtns").on("click", function() {
        selectedCity = $(this).attr('data-name');
        console.log(selectedCity);
        citybtns();
    });
    function citybtns(){
        var url = 'api.openweathermap.org/data/2.5/weather?lat=';
        console.log(apiKey);
        $.ajax({
            method: 'GET',
            url: url + lat + '&long=' + long + apiKey
        }).then(function(response){
            console.log(response);
            console.log(lat);
            console.log(long)

        })
    }

// var lat
// var long
    $('#cityBtnsDiv').on('click',"button", function(){
        var queryurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        let city = $(this).attr('data-name');
        console.log(city);
        $.ajax({
            method: 'GET',
            url: queryurl + city + apiKey
        }).then(function(response){
            console.log(response);
            lat = response.coord.lat;
            long = response.coord.lon;
            // displayConditions();
        });
        
    });

    

    // function displayConditions(){
    //     var url = 'http://api.openweathermap.org/data/2.5/weather?q='
    //     var city = $('#cityBtnsDiv').attr('data-name');
    //     var apiKey = '&units=imperial&appid=0218f2702681a533f2e51a253c19faab'
        
    //     $.ajax({
    //         method: 'GET',
    //         url: url + city + apiKey
    //     }).then(function(response){
    //         console.log(response)
    //     })
    //     $("#cityWeather").empty();
    //     $("#cityNameHolder").empty();
    //     var nameDiv = $("<h2 id='cityName'>");
    //     var tempDiv = $("<p id='temp' class='card-text'>");
    //     var temp = response.main.temp;
    //     console.log(temp);
    //     var humidDiv = $("<p id='humid' class='card-text'>");
    //     var humid = response.main.humidity;
    //     var windDiv = $("<p id='wind' class='card-text'>");
    //     var wind = response.wind.speed;
    //     var uvDiv = $("<p id='uvid' class='card-text'>");
    //     var uv = response.current.uvi;
    //     nameDiv.text(city);

    //     tempDiv.text("Temperature: " + temp + String.fromCharCode(176) + "F");
    //     $('#cityWeather').append(tempDiv);
    //     humidDiv.text("Humidity: " + humid + "%");
    //     $("#cityWeather").append(humidDiv);
    //     windDiv.text("Wind Speed: " + wind + "Mph");
    //     $("#cityWeather").append(windDiv);
    //     uvDiv.text("UV Index: " + uv);
        
        
        



    //  }




        getCities();
    })