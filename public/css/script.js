

let classesCookie = decodeURIComponent (document.cookie);  

console.log("classes: " + getCookie("theclasses"));

console.log(classesCookie); 

// function deleteCookie(name) {
//     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     window.location= "/" ;
// }





console.log("This is working from script.js");

// var display = "displaying";

document.getElementById("output").innerHTML = classesCookie; 




// Function to set a cookie
function setCookie(cookieName, cookieValue, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    window.location = "/";
}

// Function to get the value of a cookie by name
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Function to replace the value of a cookie
function replaceCookie(cookieName, newValue, expirationDays) {
    // Check if the cookie exists
    if (getCookie(cookieName)) {
        // Set the new value for the cookie
        setCookie(cookieName, newValue, expirationDays);
        console.log("Cookie " + cookieName + " has been replaced with value: " + newValue);
    } else {
        console.log("Cookie " + cookieName + " does not exist.");
    }
}