// api key 0218f2702681a533f2e51a253c19faab
$(document).ready(function() {
  
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

    $('#cityBtnsDiv').on('click',"button", function(){
        var url = 'http://api.openweathermap.org/data/2.5/weather?q='
        var city = $(this).attr('data-name');
        console.log(city);
        var apiKey = '&units=imperial&appid=0218f2702681a533f2e51a253c19faab'
        $.ajax({
            method: 'GET',
            url: url + city + apiKey
        }).then(function(response){
            console.log(response);
            console.log(response.main.temp)
        });
    });





    
        getCities();
    })