

let classesCookie = decodeURIComponent (document.cookie);  

console.log(classesCookie); 


console.log("This is working from script.js");

// var display = "displaying";

document.getElementById("output").innerHTML = classesCookie; 