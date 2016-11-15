'use strict';
var hello = function(message) {
    console.log(message);
};


function whatsUp(test) {
    $('h1').text(test);
}

// whatsUp('Rob!');

if(!Modernizr.touchevents) {
    console.log("No touch!");
}







