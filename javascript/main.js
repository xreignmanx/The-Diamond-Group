function updateTime(){
    $(".current-time").html(moment().format('MMMM Do YYYY, h:mm:ss a')); 
}

$(document).ready(function(){
    setInterval(updateTime, 1000);
    
})