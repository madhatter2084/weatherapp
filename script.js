// api key 0218f2702681a533f2e51a253c19faab
$(document).ready(function() {
    $("#submitSearch").on("click", function(){
        var city = $("#city").val();
        if(city != ""){
            $.ajax({
            method: "GET",
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=0218f2702681a533f2e51a253c19faab', 
            }).then(function(response){
            console.log(response);
            console.log(response.list[0].main.temp);
            });
        };
    });
    function clock() {
        var time = moment().format('h:mm:ss a');
        var date = moment().format('MMMM Do YYYY');
        $('#time').text(time);
        $('#date').text(date);
    }
        setInterval(clock, 1000);
        
       

    

//         $.ajax({
//             method: "GET",
//             url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=0218f2702681a533f2e51a253c19faab'

//         }).then(function(response){
//             console.log(response);
//             console.log(response.main.temp);
//         });
})