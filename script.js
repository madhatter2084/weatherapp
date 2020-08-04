// api key 0218f2702681a533f2e51a253c19faab
$(document).ready(function () {
    var city = "memphis"
        
        $.ajax({
            method: "GET",
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=0218f2702681a533f2e51a253c19faab',
        }).then(function(response){
            console.log(response);
            console.log(response.list[0].main.temp);


        });
    

        $.ajax({
            method: "GET",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=0218f2702681a533f2e51a253c19faab'

        }).then(function(response){
            console.log(response);
            console.log(response.main.temp);
        });
});