// get local storage info
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
//  display current day 
$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
    
        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // col 1
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');

        // col 2
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
       
        // col 3
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        
        // append the columns to the row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // add rows to the container
        $(".container").append(row);

        getLocalStorage(i);
    }

    // set the time in hours
    function formatAMPM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();

// change colors to indicate past/present/future
function updateColors(){
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) { 
    console.log(currentTime, $(`#${i}`).data("time"));
     if ($(`#${i}`).data("time") == currentTime){
        $(`#text${i}`).addClass( "present");
    } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass( "future");
    }
}
}

setInterval(function() {
updateColors();
}, 1000);

// save input in local storage
var saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
let eventId = $(this).attr('id');
let eventText = $(this).parent().siblings().children('.description').val();
localStorage.setItem(eventId, eventText);
});});