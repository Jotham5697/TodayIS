let classesCookie = decodeURIComponent(document.cookie);
console.log("classes: " + getCookie("theclasses"));
//console.log(classesCookie); 
console.log("This is working from script.js");
document.getElementById("output").innerHTML = classesCookie;




function generateIndexPage() {
    //function Displays the useDate on the DatePicker defaults as todays date unless otherwise specified
    //function also creatse useDate variable for logic in rest of file

    if (sessionStorage.getItem("stringUseDate") === null) { //if use date is not determined by user and put in session storage, default to today's date
        var formattedDate = convertJSDateToString(new Date); //get current date using JS Date then comvert to format for date input
        var useDate = new Date;
    } else {
        var formattedDate = sessionStorage.getItem("stringUseDate"); //else use desired date from session Storage
        var useDate = new Date(sessionStorage.getItem("stringUseDate"));
    }
    document.getElementById('stringUseDate').value = formattedDate;
    console.log(useDate.getDay())

    var mondayUseDate = useDate;
    
    if(useDate.getDay() ===  0) {mondayUseDate.setDate(mondayUseDate.getDate()+1);}
    else if(useDate.getDay() ===  2) {mondayUseDate.setDate(mondayUseDate.getDate()-1);}
    else if(useDate.getDay() ===  3) {mondayUseDate.setDate(mondayUseDate.getDate()-2);}
    else if(useDate.getDay() ===  4) {mondayUseDate.setDate(mondayUseDate.getDate()-3);}
    else if(useDate.getDay() ===  5) {mondayUseDate.setDate(mondayUseDate.getDate()-4);}
    else {mondayUseDate.setDate(mondayUseDate.getDate()-5);}
    document.getElementById("mondayDate").innerHTML = mondayUseDate;

    
}
// Call the function when the page is loaded
window.onload = generateIndexPage;

//used to put useDate in session Storage
//called when user picks date on index.html
function setUseDate() {
    var stringUseDate = document.getElementById("stringUseDate").value;
    sessionStorage.setItem("stringUseDate", stringUseDate);
    window.location.reload(); //reloads page to apply changes made by user
}

let useDate = sessionStorage.getItem("useDate");
console.log("newUseDate: " + sessionStorage.getItem("useDate"));
document.getElementById("mondayDate").innerHTML = useDate;

//Pulling all neccesary inital Data from Cookies
let userLoggedIn = getCookie("loggedIn");
console.log("logged in: " + userLoggedIn);

let allDatesOff = getCookie("allDatesOff");
allDatesOff = JSON.parse(allDatesOff); //converts cookie data back into usable JS Objects
for (let i = 0;  i < allDatesOff.length; i++) {
    allDatesOff[i] = new Date(allDatesOff[i])
};
console.log(allDatesOff);
console.log(typeof(allDatesOff));










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

// //Function to turn a date in string format yyyy-mm-dd to JS Date
// function convertDateToJSDate(dateStr) {
//     let year = parseInt(dateStr.substr(0, 4), 10);
//     let month = parseInt(dateStr.substr(5, 2), 10) - 1; //-1 Since January is 0!
//     let day = parseInt(dateStr.substr(8, 2), 10);
//     var newDate = new Date(year, month, day);
//     return newDate;
// }

//Function to turn JS Date into string of format yyyy-mm-dd
function convertJSDateToString(jsDate) {
    var year = jsDate.getFullYear();
    var month = ('0' + (jsDate.getMonth() + 1)).slice(-2);
    var day = ('0' + jsDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
}