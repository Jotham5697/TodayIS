// const { get } = require("mongoose");

// const { disabled } = require("../server");

// const { get } = require("mongoose");

// //Just to temp see cookies 
// setCookie("hasNeccesaryData", false);

// let classesCookie = decodeURIComponent(document.cookie);
// console.log("classes: " + getCookie("theclasses"));
// console.log("This is working from script.js");
// document.getElementById("output").innerHTML = classesCookie;


//Pulling all neccesary inital Data from Cookies---------------------------------------------------------------------------------------------------------------------------------

let tri1StartDate = convertStringDateToJSDate(getCookie("Tri1StartDate"));
let tri1EndDate = convertStringDateToJSDate(getCookie("Tri1EndDate"));
let tri1StartDateBlock = +getCookie("Tri1StartDateBlock");
console.log("tri1start: " + tri1StartDate);


let userLoggedIn = getCookie("loggedIn");
console.log("logged in: " + userLoggedIn);
console.log("has cookies: " + getCookie("hasNeccesaryData"));
console.log("dates off : " + getCookie("datesOffAndReasons"));



// let datesOffAndReasons = getCookie("dateOffAndReason");
// datesOffAndReasons = JSON.parse(datesOffAndReasons);

// for (let i = 0; i < datesOffAndReasons.length; i++) {
//     datesOffAndReasons[i][0] = convertStringDateToJSDate(datesOffAndReasons[i][0])
// };
let datesOff = JSON.parse(getCookie("datesOff"));

let reasons = JSON.parse(getCookie("reasons"));

let datesOffAndReasons = new Array()

console.log(datesOff)
console.log(datesOff.length)
console.log(reasons)
console.log(reasons.length)

for (let i = 0; i < datesOff.length; i++) {
    let data = [convertStringDateToJSDate(datesOff[i]), reasons[i]]
    datesOffAndReasons[i] = data;
}




//deletes any duplicate Days off (starts from the back and moves to the front of the array)

for (let i = 0; i < datesOffAndReasons.length; i++) {
    for (let j = datesOffAndReasons.length - 1; j > i; j--) {
        if (compareDates(datesOffAndReasons[i][0], datesOffAndReasons[j][0]) === 0) {
            datesOffAndReasons.splice(j, 1);
            // console.log("found duplicate @ index" + j)
        }
    }
}


//insertion sort array of dates off by date in ascending order;
for (let i = 1; i < datesOffAndReasons.length; i++) { //starts at secone item in array and increments up 
    let j = 0;
    while (j < i) { //checks for every element in array before current one
        if (compareDates(datesOffAndReasons[i][0], datesOffAndReasons[j][0]) < 0) { //if the date we are looking at is less than any date before it 
            datesOffAndReasons.splice(j, 0, datesOffAndReasons[i]); //add that in to the index of where the later date was found
            datesOffAndReasons.splice(i + 1, 1); //delete the date we are looking at from its inital point 
        }
        j++;
    }
}


console.log("sorted array length: " + datesOffAndReasons.length);

console.log("sorted array: " + datesOffAndReasons);


console.log(datesOffAndReasons);
console.log(datesOffAndReasons.length);

console.log("updated double array length" + datesOffAndReasons.length);



let tri2StartDate = convertStringDateToJSDate(getCookie("Tri2StartDate"));
let tri2EndDate = convertStringDateToJSDate(getCookie("Tri2EndDate"));
let tri2StartDateBlock = +getCookie("Tri2StartDateBlock");

let tri3StartDate = convertStringDateToJSDate(getCookie("Tri3StartDate"));
let tri3EndDate = convertStringDateToJSDate(getCookie("Tri3EndDate"));
let tri3StartDateBlock = +getCookie("Tri3StartDateBlock");



//pull user info 


if (userLoggedIn === "true") {
    console.log("user Succesfully logged In");
    var isHS = getCookie("clientIsHS");
    var clientName = getCookie("clientName");

    var clientClasses = getCookie("clientClasses");
    clientClasses = JSON.parse(clientClasses);

    var clientHLs = getCookie("clientHls");
    clientHLs = JSON.parse(clientHLs);

    var clientLunches = getCookie("clientLunch");
    clientLunches = JSON.parse(clientLunches);

    // console.log(isHS);
    // console.log(clientName);
    // console.log(clientClasses);
    // console.log(clientHLs);
    // console.log(clientLunches)

    if (isHS === "false") {
        var firstClassTime = "8:35-9:50";

        var mwth2ndClassTime = "10:30-11:45";
        var mwthLunch = "11:50-12:30";
        var mwth3rdClassTime = "12:35-1:20";
        var mwthRecess = "1:20-1:50";
        var mwth4thClassTime = "2:00-3:15";

        var tf2ndClassTime = "10:10-11:25";
        var tfLunch = "11:30-12:10";
        var tf3rdClassTime = "12:15-1:00";
        var tfRecess = "1:00-1:30";
        var tf4thClassTime = "2:40-2:55";

    } else {

        var morningExtension = "8:10-8:30";

        var firstClassTime = "8:30-9:50";

        var mwth2ndClassTime = "10:30-11:50";
        var mwthTop3rdClassTime = "11:50-12:30";
        var mwthMiddle3rdClassTime = "12:35-1:15";
        var mwthBottom3rdClassTime = "1:15-1:55";
        var mwth4thClassTime = "2:00-3:20";

        var tf2ndClassTime = "10:10-11:30";
        var tfTop3rdClassTime = "11:30-12:10";
        var tfMiddle3rdClassTime = "12:15-12:55";
        var tfBottom3rdClassTime = "12:55-1:35";
        var tf4thClassTime = "1:40-3:00";


        var mwthTopMiddle3rdClassTime = "11:50-1:15";
        var mwthMiddleBottom3rdClassTime = "12:35-1:55";

        var tfTopMiddle3rdClassTime = "11:30-12:55";
        var tfMiddleBottom3rdClassTime = "12:15-1:55";

        var mwthAfternoonExtension = "3:20-3:40";
        var tfAfternoonExtension = "3:00-3:20";
    }
}



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
    //console.log("Initial String Use Date " + sessionStorage.getItem("stringUseDate"));
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

    //console.log("Monday Use Date: " + mondayUseDate.getTime());
    // console.log("Tri1End: " + tri1EndDate.getTime());
    // console.log("Tri2Start: " + tri2StartDate.getTime());

    //setting each day Block Date---------------------------------------------------------------------

    let daysLabel = [];// this array will be used to keep track of the label or day Block for each day in the week (ex. [0, 1, 2, 3, Day Off])

    //first if use Date is between end of first trimester and start of second (therefore in winter break)
    if (compareDates(mondayUseDate, tri1EndDate) > 0 && compareDates(mondayUseDate, tri2StartDate) < 0) {
        for (let i = 0; i < days.length; i++) {
            document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = "Winter Break!!!";
            daysLabel[i] = "Winter Break!!";
        }
    } //then check if between end of second trimester and start of third (spring break) 
    else if (compareDates(mondayUseDate, tri2EndDate) > 0 && compareDates(mondayUseDate, tri3StartDate) < 0) {
        for (let i = 0; i < days.length; i++) {
            document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = "Spring Break!!!";
            daysLabel[i] = "Spring Break!!";
        }
    } //then check if use date is in first trimester
    else if (compareDates(mondayUseDate, tri1StartDate) >= 0 && compareDates(mondayUseDate, tri1EndDate) <= 0) {
        //first find mondayBlock 
        console.log("This is in first Tri")
        var daysSinceStart = Math.round(compareDates(mondayUseDate, tri1StartDate)); //this finds the total number of days since the start of the trimester (including weekends & daysoff)
        var weekendsSinceStart = (daysSinceStart / 7) * 2; //this finds the total number of Sats and Suns that have occured since the start of the trimester to be subtracted from total days from the start of the year
        var numericDayBlock; //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )


        for (let i = 0; i < days.length; i++) { //to iterate through array of each day in currently displayed week 
            var dayOff = false //resets dayoff to false after a day off was found 
            var schoolDaysSinceStart = daysSinceStart + i; //since monday is i = 0, each successive day is one day later and one index later
            for (j = 0; j < datesOffAndReasons.length; j++) { //to iterate through array of days off

                if (compareDates(days[i], datesOffAndReasons[j][0]) === 0 && dayOff === false) { //if current date is equal to a day off 
                    //console.log(getDayName(days[i])); //get the day name of that date (e.i monday, tuesday...)
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = datesOffAndReasons[j][1]; //display the reason for day off (since index of day off in day off array coincides with index or the reason for that day off)
                    dayOff = true; //set dayOff to true to not keep iterating through days off for that specific date
                    daysLabel[i] = datesOffAndReasons[j][1]; //
                }
                else if (compareDates(days[i], datesOffAndReasons[j][0]) > 0 && dayOff === false) { //checks to see if any days off occured before the desired date
                    schoolDaysSinceStart--; //if so subtract one from the number of school days since the start of the trimester
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri1StartDateBlock) % 8); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    } // then check trimester 2 (after tri2 Start date and before tri2 end date)
    else if (compareDates(mondayUseDate, tri2StartDate) >= 0 && compareDates(mondayUseDate, tri2EndDate) <= 0) {
        //first find mondayBlock 
        console.log("This is in second Tri")
        var daysSinceStart = Math.round(compareDates(mondayUseDate, tri2StartDate));
        var weekendsSinceStart = (daysSinceStart / 7) * 2;

        console.log("days since start of trimester:" + daysSinceStart);
        console.log("weekends since start:" + weekendsSinceStart);


        for (let i = 0; i < days.length; i++) {
            console.log("This is in outer loop")
            var dayOff = false;
            var schoolDaysSinceStart = daysSinceStart + i;
            //while (dayOff = false)
            for (j = 0; j < datesOffAndReasons.length; j++) {

                if (compareDates(days[i], datesOffAndReasons[j][0]) === 0 && dayOff === false) {
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = datesOffAndReasons[j][1];
                    dayOff = true;
                    daysLabel[i] = datesOffAndReasons[j][1];
                }
                else if (compareDates(days[i], datesOffAndReasons[j][0]) > 0 && dayOff === false) {
                    if (compareDates(datesOffAndReasons[j][0], tri2StartDate) >= 0) { schoolDaysSinceStart-- }; //slightly differently then above, this checks if day off is specifically in the second trimester (to not consider days off from the first trimester)
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri2StartDateBlock) % 8); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    console.log("numeric day block: " + numericDayBlock);
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    }// then check trimester 3 (after tri3 end date)
    else if (compareDates(mondayUseDate, tri3StartDate) >= 0 && compareDates(mondayUseDate, tri3EndDate) <= 0) {
        //first find mondayBlock 
        // console.log("This is in second Tri")
        var daysSinceStart = Math.round(compareDates(mondayUseDate, tri3StartDate));
        var weekendsSinceStart = (daysSinceStart / 7) * 2;

        for (let i = 0; i < days.length; i++) {
            // console.log("This is in outer loop")
            var dayOff = false;
            var schoolDaysSinceStart = daysSinceStart + i;
            //while (dayOff = false)
            for (j = 0; j < datesOffAndReasons.length; j++) {

                if (compareDates(days[i], datesOffAndReasons[j][0]) === 0 && dayOff === false) {
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = datesOffAndReasons[j][1];
                    dayOff = true;
                    daysLabel[i] = datesOffAndReasons[j][1];
                }
                else if (compareDates(days[i], datesOffAndReasons[j][0]) > 0 && dayOff === false) {
                    if (compareDates(datesOffAndReasons[j][0], tri3StartDate) >= 0) { schoolDaysSinceStart-- };
                    numericDayBlock = ((schoolDaysSinceStart - weekendsSinceStart + tri3StartDateBlock) % 8); //keep track of the numeric day block (i.e Day H = 0, Day A = 1, Day B = 2, Day C = 3... )
                    document.getElementById(getDayName(days[i]) + "BlockDate").innerHTML = getDayBlock(numericDayBlock);
                    daysLabel[i] = numericDayBlock;
                }
            }
        }
    }

    // console.log(daysLabel);
    // console.log(userLoggedIn);

    if (userLoggedIn !== "true") {
        console.log("not logged in");
        allClassesArray = generateDefaultPage(daysLabel);
        // console.log(generateDefaultPage(daysLabel));

        console.log("days array:" + days)

        for (let i = 0; i < days.length; i++) {
            // console.log("days [i] " + days[i])
            document.getElementById(getDayName(days[i]) + "1stClass").innerHTML = allClassesArray[i][0];
            document.getElementById(getDayName(days[i]) + "2ndClass").innerHTML = allClassesArray[i][1];
            document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = allClassesArray[i][2];
            document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = "C Lunch";
            document.getElementById(getDayName(days[i]) + "4thClass").innerHTML = allClassesArray[i][3];

            document.getElementById(getDayName(days[i]) + "1stTime").innerHTML = "8:30-9:50";
            if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = "10:10-11:30";
                document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = "11:35-12:55";
                document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = "12:55-1:35";
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = "1:40-3:00";
            } else {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = "10:30-11:55";
                document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = "11:55-1:15";
                document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = "1:15-1:55";
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = "2:00-3:20";
            }
        }

        // document.getElementById("monTopLine").style.borderColor = "blue !important";


    } else if (isHS === "false") {
        allClassesArray = generateUserPage(daysLabel);

        for (let i = 0; i < days.length; i++) {
            //console.log("days [i] " + days[i])
            document.getElementById(getDayName(days[i]) + "1stClass").innerHTML = allClassesArray[i][0];
            document.getElementById(getDayName(days[i]) + "2ndClass").innerHTML = allClassesArray[i][1];
            document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = "A Lunch";
            document.getElementById(getDayName(days[i]) + "Middle3rdClass").innerHTML = allClassesArray[i][2];
            document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = "Recess";
            document.getElementById(getDayName(days[i]) + "4thClass").innerHTML = allClassesArray[i][3];

            document.getElementById(getDayName(days[i]) + "1stTime").innerHTML = firstClassTime;
            if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = tf2ndClassTime;
                document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = tfLunch;
                document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = tf3rdClassTime;
                document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = tfRecess;
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = tf4thClassTime;
            } else {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = mwth2ndClassTime;
                document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = mwthLunch;
                document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = mwth3rdClassTime;
                document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = mwthRecess;
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = mwth4thClassTime;
            }
        }

    } else {
        // console.log(daysLabel);
        allClassesArray = generateUserPage(daysLabel);
        let thirdBlockInfo = generateHSUser3rdBlock(daysLabel);
        let firstBlockInfo = generateHSUser1stBlock(daysLabel);
        let fourthBlockInfo = generateHSUser4thBlock(daysLabel);
        // console.log(thirdBlockInfo);
        for (let i = 0; i < days.length; i++) {
            //console.log("days [i] " + days[i])
            document.getElementById(getDayName(days[i]) + "1stClass").innerHTML = allClassesArray[i][0];
            document.getElementById(getDayName(days[i]) + "2ndClass").innerHTML = allClassesArray[i][1];
            // document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = "A Lunch";
            // document.getElementById(getDayName(days[i]) + "Middle3rdClass").innerHTML = allClassesArray[i][2];
            // document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = "Recess";
            document.getElementById(getDayName(days[i]) + "4thClass").innerHTML = allClassesArray[i][3];

            document.getElementById(getDayName(days[i]) + "1stTime").innerHTML = firstClassTime;
            if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = tf2ndClassTime;
                // document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = tfLunch;
                // document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = tf3rdClassTime;
                // document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = tfRecess;
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = tf4thClassTime;
            } else {
                document.getElementById(getDayName(days[i]) + "2ndTime").innerHTML = mwth2ndClassTime;
                // document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = mwthLunch;
                // document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = mwth3rdClassTime;
                // document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = mwthRecess;
                document.getElementById(getDayName(days[i]) + "4thTime").innerHTML = mwth4thClassTime;
            }

            if (thirdBlockInfo[i] === 1) {
                document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = "A Lunch";
                document.getElementById(getDayName(days[i]) + "Middle3rdClass").innerHTML = allClassesArray[i][2];
                document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = "";

                if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = tfTop3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = tfMiddleBottom3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = "";
                } else {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = mwthTop3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = mwthMiddleBottom3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = "";
                }
            } else if (thirdBlockInfo[i] === 2) {
                document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = allClassesArray[i][2];
                document.getElementById(getDayName(days[i]) + "Middle3rdClass").innerHTML = "B Lunch";
                document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = allClassesArray[i][2];

                if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = tfTop3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = tfMiddle3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = tfBottom3rdClassTime;
                } else {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = mwthTop3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = mwthMiddle3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = mwthBottom3rdClassTime;
                }
            } else {
                document.getElementById(getDayName(days[i]) + "Top3rdClass").innerHTML = allClassesArray[i][2];
                // document.getElementById(getDayName(days[i]) + "Middle3rdClass").innerHTML = "";
                document.getElementById(getDayName(days[i]) + "Bottom3rdClass").innerHTML = "C Lunch";

                if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = tfTopMiddle3rdClassTime;
                    // document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = "";
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = tfBottom3rdClassTime;
                } else {
                    document.getElementById(getDayName(days[i]) + "Top3rdClassTime").innerHTML = mwthTopMiddle3rdClassTime;
                    // document.getElementById(getDayName(days[i]) + "Middle3rdClassTime").innerHTML = mwthMiddle3rdClassTime;
                    document.getElementById(getDayName(days[i]) + "Bottom3rdClassTime").innerHTML = mwthBottom3rdClassTime;
                }
            }

            // console.log(clientHLs);
            // console.log(firstBlockInfo);
            // console.log("4th Block: " + fourthBlockInfo);

            if (firstBlockInfo[i] === true) {
                // console.log(getDayName(days[i]));
                document.getElementById(getDayName(days[i]) + "MorningHL").innerHTML = (allClassesArray[i][0] + " HL Extension");
                document.getElementById(getDayName(days[i]) + "MorningHLTime").innerHTML = morningExtension;
            } else console.log("Not true");

            if (fourthBlockInfo[i] === true) {
                // console.log(fourthBlockInfo[i] === "true");
                if (getDayName(days[i]) === "tuesday" || getDayName(days[i]) === "friday") {
                    document.getElementById(getDayName(days[i]) + "AfternoonHL").innerHTML = allClassesArray[i][3] + " HL Extension";
                    document.getElementById(getDayName(days[i]) + "AfternoonHLTime").innerHTML = tfAfternoonExtension;
                } else {
                    document.getElementById(getDayName(days[i]) + "AfternoonHL").innerHTML = allClassesArray[i][3] + " HL Extension";
                    document.getElementById(getDayName(days[i]) + "AfternoonHLTime").innerHTML = mwthAfternoonExtension;
                }
            }

        }

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
        // console.log("Cookie " + cookieName + " has been replaced with value: " + newValue);
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

function generateDefaultPage(dayLabels) {
    var classes = [];
    for (let i = 0; i < dayLabels.length; i++) {
        if (dayLabels[i] === 0) classes[i] = ["F Block", "G Block", "H Block", "E Block"];
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

function generateUserPage(dayLabels) {
    var classes = [];
    for (let i = 0; i < dayLabels.length; i++) {
        if (dayLabels[i] === 0) classes[i] = [clientClasses[5], clientClasses[6], clientClasses[7], clientClasses[4]];
        else if (dayLabels[i] === 1) classes[i] = [clientClasses[0], clientClasses[1], clientClasses[2], clientClasses[3]];
        else if (dayLabels[i] === 2) classes[i] = [clientClasses[4], clientClasses[5], clientClasses[6], clientClasses[7]];
        else if (dayLabels[i] === 3) classes[i] = [clientClasses[3], clientClasses[0], clientClasses[1], clientClasses[2]];
        else if (dayLabels[i] === 4) classes[i] = [clientClasses[7], clientClasses[4], clientClasses[5], clientClasses[6]];
        else if (dayLabels[i] === 5) classes[i] = [clientClasses[2], clientClasses[3], clientClasses[0], clientClasses[1]];
        else if (dayLabels[i] === 6) classes[i] = [clientClasses[6], clientClasses[7], clientClasses[4], clientClasses[5]];
        else if (dayLabels[i] === 7) classes[i] = [clientClasses[1], clientClasses[2], clientClasses[3], clientClasses[0]];
        else classes[i] = [[dayLabels[i]], [dayLabels[i]], [dayLabels[i]], [dayLabels[i]]];
    }
    return classes;
}


function generateHSUser3rdBlock(dayLabels) {
    var thirdBlockInfo = [];
    for (let i = 0; i < dayLabels.length; i++) {
        if (dayLabels[i] === 0) thirdBlockInfo[i] = +clientLunches[7];
        else if (dayLabels[i] === 1) thirdBlockInfo[i] = +clientLunches[2];
        else if (dayLabels[i] === 2) thirdBlockInfo[i] = +clientLunches[6];
        else if (dayLabels[i] === 3) thirdBlockInfo[i] = +clientLunches[1];
        else if (dayLabels[i] === 4) thirdBlockInfo[i] = +clientLunches[5];
        else if (dayLabels[i] === 5) thirdBlockInfo[i] = +clientLunches[0];
        else if (dayLabels[i] === 6) thirdBlockInfo[i] = +clientLunches[4];
        else if (dayLabels[i] === 7) thirdBlockInfo[i] = +clientLunches[3];
        else thirdBlockInfo[i] = dayLabels[i];
    }
    return thirdBlockInfo;
}

function generateHSUser1stBlock(dayLabels) {
    var firstBlockInfo = [];
    for (let i = 0; i < dayLabels.length; i++) {
        if (dayLabels[i] === 0) firstBlockInfo[i] = (clientHLs[5]);
        else if (dayLabels[i] === 1) firstBlockInfo[i] = (clientHLs[0]);
        else if (dayLabels[i] === 2) firstBlockInfo[i] = (clientHLs[4]);
        else if (dayLabels[i] === 3) firstBlockInfo[i] = (clientHLs[3]);
        else if (dayLabels[i] === 4) firstBlockInfo[i] = (clientHLs[7]);
        else if (dayLabels[i] === 5) firstBlockInfo[i] = (clientHLs[2]);
        else if (dayLabels[i] === 6) firstBlockInfo[i] = (clientHLs[6]);
        else if (dayLabels[i] === 7) firstBlockInfo[i] = (clientHLs[1]);
        else firstBlockInfo[i] = dayLabels[i];
    }
    return firstBlockInfo;
}

function generateHSUser4thBlock(dayLabels) {
    var fourthBlockInfo = [];
    for (let i = 0; i < dayLabels.length; i++) {
        if (dayLabels[i] === 0) fourthBlockInfo[i] = (clientHLs[4]);
        else if (dayLabels[i] === 1) fourthBlockInfo[i] = (clientHLs[3]);
        else if (dayLabels[i] === 2) fourthBlockInfo[i] = (clientHLs[7]);
        else if (dayLabels[i] === 3) fourthBlockInfo[i] = (clientHLs[2]);
        else if (dayLabels[i] === 4) fourthBlockInfo[i] = (clientHLs[6]);
        else if (dayLabels[i] === 5) fourthBlockInfo[i] = (clientHLs[1]);
        else if (dayLabels[i] === 6) fourthBlockInfo[i] = (clientHLs[5]);
        else if (dayLabels[i] === 7) fourthBlockInfo[i] = (clientHLs[0]);
        else fourthBlockInfo[i] = dayLabels[i];
    }
    return fourthBlockInfo;
}
