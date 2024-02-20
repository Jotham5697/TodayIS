//Just to temp see cookies 
let classesCookie = decodeURIComponent(document.cookie);
console.log("classes: " + getCookie("theclasses"));
console.log("This is working from script.js");
document.getElementById("output").innerHTML = classesCookie;


//Pulling all neccesary inital Data from Cookies---------------------------------------------------------------------------------------------------------------------------------
let userLoggedIn = getCookie("loggedIn");
console.log("logged in: " + userLoggedIn);

let allDatesOff = getCookie("allDatesOff");
allDatesOff = JSON.parse(allDatesOff); //converts cookie data back into usable JS Objects
for (let i = 0; i < allDatesOff.length; i++) {
    allDatesOff[i] = convertStringDateToJSDate(allDatesOff[i])
};
console.log(allDatesOff);

let reasonsAllDatesOff = getCookie("reasonsAllDatesOff");
reasonsAllDatesOff = JSON.parse(reasonsAllDatesOff);
console.log("reasons " + reasonsAllDatesOff.length);

//deletes any duplicate Days off (starts from the back and moves to the front of the array)
for (let i = 0; i < allDatesOff.length; i++) {
    for (let j = allDatesOff.length-1; j > i; j--) {
        if (compareDates(allDatesOff[i], allDatesOff[j]) === 0) {
            allDatesOff.splice(j, 1);
            reasonsAllDatesOff.splice(j, 1);
            console.log("found duplicate @ index" + j)
        }
    }
}


let tri1StartDate = convertStringDateToJSDate(getCookie("Tri1StartDate"));
let tri1EndDate = convertStringDateToJSDate(getCookie("Tri1EndDate"));
let tri1StartDateBlock = +getCookie("Tri1StartDateBlock");
console.log("tri1start: " + tri1StartDate);

let tri2StartDate = convertStringDateToJSDate(getCookie("Tri2StartDate"));
let tri2EndDate = convertStringDateToJSDate(getCookie("Tri2EndDate"));
let tri2StartDateBlock = +getCookie("Tri2StartDateBlock");

let tri3StartDate = convertStringDateToJSDate(getCookie("Tri3StartDate"));
let tri3EndDate = convertStringDateToJSDate(getCookie("Tri3EndDate"));
let tri3StartDateBlock = +getCookie("Tri3StartDateBlock");

//note to self pull user info 



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Sets Upper and Lower Bounds for the Date picker on Home Page Based On Cookies
document.getElementById("stringUseDate").min = getCookie("Tri1StartDate");
document.getElementById("stringUseDate").max = getCookie("Tri3EndDate");

//used to put useDate in session Storage
//called when user picks date on index.html
function setUseDate() {
    var stringUseDate = document.getElementById("stringUseDate").value; //takes in user selected Date
    sessionStorage.setItem("stringUseDate", stringUseDate); //set that value to session Storage to be used when page is generated
    window.location.reload(); //reloads page to apply changes made by user
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------


function generateIndexPage() {
    //function Displays the useDate on the DatePicker defaults as todays date unless otherwise specified
    //function also creatse useDate variable for logic in rest of file
    console.log("Initial String Use Date " + sessionStorage.getItem("stringUseDate"));
    if (sessionStorage.getItem("stringUseDate") === null) { //if use date is not determined by user and put in session storage, default to today's date
        var formattedDate = convertJSDateToString(new Date()); //get current date using JS Date then convert to format for date input yyyy-mm-dd
        var useDate = convertStringDateToJSDate(convertJSDateToString(new Date())); //set the date used for later logic to todays date

    } else {
        var formattedDate = sessionStorage.getItem("stringUseDate"); //else use desired date from session Storage
        var useDate = convertStringDateToJSDate(sessionStorage.getItem("stringUseDate"));
    }
    document.getElementById('stringUseDate').value = formattedDate;
    console.log("attempted USe Date: " + useDate)

    //based on user date selection or todays date find monday of that week
    var mondayUseDate = useDate;
    if (useDate.getDay() === 0) { mondayUseDate.setDate(mondayUseDate.getDate() + 1); }
    else if (useDate.getDay() === 1) { mondayUseDate.setDate(mondayUseDate.getDate()); }
    else if (useDate.getDay() === 2) { mondayUseDate.setDate(mondayUseDate.getDate() - 1); }
    else if (useDate.getDay() === 3) { mondayUseDate.setDate(mondayUseDate.getDate() - 2); }
    else if (useDate.getDay() === 4) { mondayUseDate.setDate(mondayUseDate.getDate() - 3); }
    else if (useDate.getDay() === 5) { mondayUseDate.setDate(mondayUseDate.getDate() - 4); }
    else { mondayUseDate.setDate(mondayUseDate.getDate() - 5); }
    document.getElementById("mondayDate").innerHTML = getDateInfo(mondayUseDate);

    //Based on Mondays Date set all other Days of the week
    var tuesdayUseDate = new Date(mondayUseDate.getFullYear(), mondayUseDate.getMonth(), mondayUseDate.getDate() + 1);
    document.getElementById("tuesdayDate").innerHTML = getDateInfo(tuesdayUseDate);
    var wednesdayUseDate = new Date(mondayUseDate.getFullYear(), mondayUseDate.getMonth(), mondayUseDate.getDate() + 2);
    document.getElementById("wednesdayDate").innerHTML = getDateInfo(wednesdayUseDate);
    var thursdayUseDate = new Date(mondayUseDate.getFullYear(), mondayUseDate.getMonth(), mondayUseDate.getDate() + 3);
    document.getElementById("thursdayDate").innerHTML = getDateInfo(thursdayUseDate);
    var fridayUseDate = new Date(mondayUseDate.getFullYear(), mondayUseDate.getMonth(), mondayUseDate.getDate() + 4);
    document.getElementById("fridayDate").innerHTML = getDateInfo(fridayUseDate);

    let days = [mondayUseDate, tuesdayUseDate, wednesdayUseDate, thursdayUseDate, fridayUseDate];

    console.log("Monday Use Date: " + mondayUseDate.getTime());
    console.log("Tri1End: " + tri1EndDate.getTime());
    console.log("Tri2Start: " + tri2StartDate.getTime());

    //setting each day Block Date---------------------------------------------------------------------

    let daysLabel = [];// this array will be used to keep track of the label or day Block for each day in the week (ex. [0, 1, 2, 3, Day Off])

    //first if use Date is between end of first trimester and start of second (therefore in winter break)
    if (compareDates(mondayUseDate, tri1EndDate) > 0 && compareDates(mondayUseDate, tri2StartDate) < 0) {
        for (let i = 0; i < days.length; i++){
        document.getElementById(getDayName(days[i])+"BlockDate").innerHTML = "Winter Break!!!";
        daysLabel[i] = "Winter Break!!";
        }
    } //then check if between end of second trimester and start of third (spring break) 
    else if (compareDates(mondayUseDate, tri2EndDate) > 0 && compareDates(mondayUseDate, tri3StartDate) < 0) {
        for (let i = 0; i < days.length; i++){
            document.getElementById(getDayName(days[i])+"BlockDate").innerHTML = "Spring Break!!!";
            daysLabel[i] = "Spring Break!!";
            }
    } //then check if use date is in first trimester
    else if (compareDates(mondayUseDate, tri1StartDate) >= 0 && compareDates(mondayUseDate, tri1EndDate) <= 0)  {
        //first find mondayBlock 
        console.log("This is in first Tri")
        var daysSinceStart = Math.floor(compareDates(mondayUseDate, tri1StartDate)); //this finds the total number of days since the start of the trimester (including weekends & daysoff)
        var weekendsSinceStart = (daysSinceStart / 7) * 2; //this finds the total number of Sats and Suns that have occured since the start of the trimester to be subtracted from total days from the start of the year
        var numericDayBlock; //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )

        for (let i = 0; i < days.length; i++) { //to iterate through array of each day in currently displayed week 
            var dayOff = false //resets dayoff to false after a day off was found 
            var schoolDaysSinceStart = daysSinceStart + i; //since monday is i = 0, each successive day is one day later and one index later
            for (j = 0; j < allDatesOff.length; j++) { //to iterate through array of days off

                if (compareDates(days[i], allDatesOff[j]) === 0 && dayOff === false) { //if current date is equal to a day off 
                    //console.log(getDayName(days[i])); //get the day name of that date (e.i monday, tuesday...)
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = reasonsAllDatesOff[j]; //display the reason for day off (since index of day off in day off array coincides with index or the reason for that day off)
                    dayOff = true; //set dayOff to true to not keep iterating through days off for that specific date
                    daysLabel[i] = reasonsAllDatesOff[j]; //
                }
                else if (compareDates(days[i], allDatesOff[j]) > 0 && dayOff === false) { //checks to see if any days off occured before the desired date
                    schoolDaysSinceStart--; //if so subtract one from the number of school days since the start of the trimester
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri1StartDateBlock) % 8 ); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    } // then check trimester 2 (after tri2 Start date and before tri2 end date)
    else if (compareDates(mondayUseDate, tri2StartDate) >= 0 && compareDates(mondayUseDate, tri2EndDate) <= 0) {
        //first find mondayBlock 
        console.log("This is in second Tri")
        var daysSinceStart = compareDates(mondayUseDate, tri2StartDate);
        var weekendsSinceStart = (daysSinceStart / 7) * 2;

        for (let i = 0; i < days.length; i++) {
            console.log("This is in outer loop")
            var dayOff = false;
            var schoolDaysSinceStart = daysSinceStart + i;
            //while (dayOff = false)
            for (j = 0; j < allDatesOff.length; j++) {

                if (compareDates(days[i], allDatesOff[j]) === 0 && dayOff === false) {
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = reasonsAllDatesOff[j];
                    dayOff = true;
                    daysLabel[i] = reasonsAllDatesOff[j];
                }
                else if (compareDates(days[i], allDatesOff[j]) > 0 && dayOff === false) {
                    if (compareDates(allDatesOff[j], tri2StartDate) >= 0) { schoolDaysSinceStart-- }; //slightly differently then above, this checks if day off is specifically in the second trimester (to not consider days off from the first trimester)
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri2StartDateBlock) % 8); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    }// then check trimester 3 (after tri3 end date)
    else if (compareDates(mondayUseDate, tri3StartDate) >= 0 && compareDates(mondayUseDate, tri3EndDate) <= 0)  {
        //first find mondayBlock 
        console.log("This is in second Tri")
        var daysSinceStart = compareDates(mondayUseDate, tri3StartDate);
        var weekendsSinceStart = (daysSinceStart / 7) * 2;

        for (let i = 0; i < days.length; i++) {
            console.log("This is in outer loop")
            var dayOff = false;
            var schoolDaysSinceStart = daysSinceStart + i;
            //while (dayOff = false)
            for (j = 0; j < allDatesOff.length; j++) {

                if (compareDates(days[i], allDatesOff[j]) === 0 && dayOff === false) {
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = reasonsAllDatesOff[j];
                    dayOff = true;
                    daysLabel[i] = reasonsAllDatesOff[j];
                }
                else if (compareDates(days[i], allDatesOff[j]) > 0 && dayOff === false) {
                    if (compareDates(allDatesOff[j], tri3StartDate) >= 0) { schoolDaysSinceStart-- };
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri3StartDateBlock) % 8 ); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    }

    console.log(daysLabel);
    console.log(userLoggedIn);

    if(userLoggedIn !== "true"){
        console.log("not logged in");
        allClassesArray = generateDefaultPage(daysLabel);
        console.log(generateDefaultPage(daysLabel));
        document.getElementById("mon1stClass").innerHTML = allClassesArray[0][0];
        document.getElementById("mon2ndClass").innerHTML = allClassesArray[0][1];
        document.getElementById("monTop3rdClass").innerHTML = allClassesArray[0][2];
        document.getElementById("mon4thClass").innerHTML = allClassesArray[0][3];

        document.getElementById("tue1stClass").innerHTML = allClassesArray[1][0];
        document.getElementById("tue2ndClass").innerHTML = allClassesArray[1][1];
        document.getElementById("tueTop3rdClass").innerHTML = allClassesArray[1][2];
        document.getElementById("tue4thClass").innerHTML = allClassesArray[1][3];

        
        document.getElementById("wed1stClass").innerHTML = allClassesArray[2][0];
        document.getElementById("wed2ndClass").innerHTML = allClassesArray[2][1];
        document.getElementById("wedTop3rdClass").innerHTML = allClassesArray[2][2];
        document.getElementById("wed4thClass").innerHTML = allClassesArray[2][3];
        
        document.getElementById("thur1stClass").innerHTML = allClassesArray[3][0];
        document.getElementById("thur2ndClass").innerHTML = allClassesArray[3][1];
        document.getElementById("thurTop3rdClass").innerHTML = allClassesArray[3][2];
        document.getElementById("thur4thClass").innerHTML = allClassesArray[3][3];

        document.getElementById("fri1stClass").innerHTML = allClassesArray[4][0];
        document.getElementById("fri2ndClass").innerHTML = allClassesArray[4][1];
        document.getElementById("friTop3rdClass").innerHTML = allClassesArray[4][2];
        document.getElementById("fri4thClass").innerHTML = allClassesArray[4][3];

        document.getElementById("mon1stTime").innerHTML = "8:30-9:50";
        document.getElementById("tue1stTime").innerHTML = "8:30-9:50";
        document.getElementById("wed1stTime").innerHTML = "8:30-9:50";
        document.getElementById("thur1stTime").innerHTML = "8:30-9:50";
        document.getElementById("fri1stTime").innerHTML = "8:30-9:50";

        document.getElementById("mon2ndTime").innerHTML = "10:30-11:50";
        document.getElementById("wed2ndTime").innerHTML = "10:30-11:50";
        document.getElementById("thur2ndTime").innerHTML = "10:30-11:50";
        document.getElementById("tue2ndTime").innerHTML = "10:10-11:30";
        document.getElementById("fri2ndTime").innerHTML = "10:10-11:30";
        
        document.getElementById("mon4thTime").innerHTML = "2:00-3:20";
        document.getElementById("wed4thTime").innerHTML = "2:00-3:20";
        document.getElementById("thur4thTime").innerHTML = "2:00-3:20";
        document.getElementById("tue4thTime").innerHTML = "1:40-3:00";
        document.getElementById("fri4thTime").innerHTML = "1:40-3:00";


    } else{
        console.log("logged in");
    }




}
// Call the function when the page is loaded
window.onload = generateIndexPage;


//Functions Used For Above---------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//Function to turn a date in string format yyyy-mm-dd to JS Date
function convertStringDateToJSDate(dateStr) {
    let year = parseInt(dateStr.substr(0, 4), 10);
    let month = parseInt(dateStr.substr(5, 2), 10) - 1; //-1 Since January is 0
    let day = parseInt(dateStr.substr(8, 2), 10);
    var newDate = new Date(year, month, day);
    return newDate;
}

//Function to turn JS Date into string of format yyyy-mm-dd
function convertJSDateToString(jsDate) {
    var year = jsDate.getFullYear();
    var month = ('0' + (jsDate.getMonth() + 1)).slice(-2); //add one since Janurary is 0 
    var day = ('0' + jsDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
}

function getDateInfo(jsDate) {
    let year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let day = jsDate.getDate();
    return (month + "/" + day + "/" + year);
}

function compareDates(jsDate1, jsDate2) {
    return ((jsDate1.getTime() - jsDate2.getTime()) / (1000 * 60 * 60 * 24));
}

function getDayName(jsDate) {
    if (jsDate.getDay() === 0) return 'sunday';
    else if (jsDate.getDay() === 1) return 'monday';
    else if (jsDate.getDay() === 2) return 'tuesday';
    else if (jsDate.getDay() === 3) return 'wednesday';
    else if (jsDate.getDay() === 4) return 'thursday';
    else if (jsDate.getDay() === 5) return 'friday';
    else return 'saturday';
}

function getDayBlock(number) {
    if (number === 0) return "Day H";
    else if (number === 1) return "Day A";
    else if (number === 2) return "Day B";
    else if (number === 3) return "Day C";
    else if (number === 4) return "Day D";
    else if (number === 5) return "Day E";
    else if (number === 6) return "Day F";
    else if (number === 7) return "Day G";
}

function generateDefaultPage(dayLabels){
var classes = [];
for (let i=0; i<dayLabels.length; i++)
{
    if (dayLabels[i] === 0 ) classes[i] = ["F Block", "G Block", "H Block", "E Block"];
    else if (dayLabels[i] === 1) classes[i] = ["A Block", "B Block", "C Block", "D Block"];
    else if (dayLabels[i] === 2) classes[i] = ["E Block", "F Block", "G Block", "H Block"];
    else if (dayLabels[i] === 3) classes[i] = ["D Block", "A Block", "B Block", "C Block"];
    else if (dayLabels[i] === 4) classes[i] = ["H Block", "E Block", "F Block", "G Block"];
    else if (dayLabels[i] === 5) classes[i] = ["C Block", "D Block", "A Block", "B Block"];
    else if (dayLabels[i] === 6) classes[i] = ["G Block", "H Block", "E Block", "F Block"];
    else if (dayLabels[i] === 7) classes[i] = ["B Block", "C Block", "D Block", "A Block"];
    else classes[i] = [[dayLabels[i]], [dayLabels[i]], [dayLabels[i]], [dayLabels[i]]];
}
return classes;    
}

function generateUserPage(dayLabels){
    var classes = [];
    for (let i=0; i<dayLabels.length; i++)
    {
        if (dayLabels[i] === 0 ) classes[i] = ["F Block", "G Block", "H Block", "E Block"];
        else if (dayLabels[i] === 1) classes[i] = ["A Block", "B Block", "C Block", "D Block"];
        else if (dayLabels[i] === 2) classes[i] = ["E Block", "F Block", "G Block", "H Block"];
        else if (dayLabels[i] === 3) classes[i] = ["D Block", "A Block", "B Block", "C Block"];
        else if (dayLabels[i] === 4) classes[i] = ["H Block", "E Block", "F Block", "G Block"];
        else if (dayLabels[i] === 5) classes[i] = ["C Block", "D Block", "A Block", "B Block"];
        else if (dayLabels[i] === 6) classes[i] = ["G Block", "H Block", "E Block", "F Block"];
        else if (dayLabels[i] === 7) classes[i] = ["B Block", "C Block", "D Block", "A Block"];
        else classes[i] = [[dayLabels[i]], [dayLabels[i]], [dayLabels[i]], [dayLabels[i]]];
    }
    return classes;    
    }