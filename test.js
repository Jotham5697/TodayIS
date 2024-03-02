// fetch('/login.html')
//     .then(response => {
// //         // You can handle the response here if needed
// //         // Once the request is complete, you can access the cookie
// //         const cookies = document.cookie;
// //         console.log(cookies); // Output: "username=john; <other cookies>"
// //     })
// //     .catch(error => {
// //         console.error('Error:', error);
// //     });


// let currentDate = new Date().toDateString();
// // let month = currentDate.getMonth(); 
// console.log(currentDate)
// // console.log(month)


const {createHash} = require('node:crypto'); 
const { type } = require('node:os');

function hash(string){
    return createHash('sha256').update(string).digest('hex');
}; 


let x = "treees"; 
let y = "treees"; 

console.log(hash(x)!==hash(y));

let today = new Date("2024-03-19");

let today1 = new Date("2024-05-19").getTime();
console.log("today" + today)
console.log(today1)

// let difference = (today-today1) / (1000*60*60*24)

// console.log(difference);

console.log("inequality: " + today < today1); 

console.log(+ today);

function getDayName(jsDate) {
    if (jsDate.getDay() === 0) return 'sunday';
    else if (jsDate.getDay() === 1) return 'monday';
    else if (jsDate.getDay() === 2) return 'tuesday';
    else if (jsDate.getDay() === 3) return 'wednesday';
    else if (jsDate.getDay() === 4) return 'thursday';
    else if (jsDate.getDay() === 5) return 'friday';
    else return 'saturday';
}

function getMonthName(jsDate) {
    console.log(jsDate.getMonth());
    if (jsDate.getMonth() === 0) return 'January';
    else if (jsDate.getMonth() === 1) return 'February';
    else if (jsDate.getMonth() === 2) return 'March';
    else if (jsDate.getMonth() === 3) return 'April';
    else if (jsDate.getMonth() === 4) return 'May';
    else if (jsDate.getMonth() === 5) return 'June';
    else if (jsDate.getMonth() === 6) return 'July';
    else if (jsDate.getMonth() === 7) return 'August';
    else if (jsDate.getMonth() === 8) return 'September';
    else if (jsDate.getMonth() === 9) return 'October';
    else if (jsDate.getMonth() === 10) return 'November';
    else return 'December';
}

let today2 = new Date("2024-03-02");
console.log(today2)
console.log(typeof(today2))



function getDateWrittenOut(dateInput) {
    console.log(dateInput);
    let year = dateInput.getFullYear();
    let month = getMonthName(dateInput);
    let day = getDayName(dateInput);

    day =  day.charAt(0).toUpperCase() + day.slice(1);
    let date = dateInput.getDate();
    return (day +" " +  month +" " + date +", "  + year)

}

console.log(getDateWrittenOut(today2));



function getMonthName(jsDate) {
    if (jsDate.getMonth() === 0) return 'Jan';
    else if (jsDate.getMonth() === 1) return 'Feb';
    else if (jsDate.getMonth() === 2) return 'Mar';
    else if (jsDate.getMonth() === 3) return 'Apr';
    else if (jsDate.getMonth() === 4) return 'May';
    else if (jsDate.getMonth() === 5) return 'Jun';
    else if (jsDate.getMonth() === 6) return 'Jul';
    else if (jsDate.getMonth() === 7) return 'Aug';
    else if (jsDate.getMonth() === 8) return 'Sep';
    else if (jsDate.getMonth() === 9) return 'Oct';
    else if (jsDate.getMonth() === 10) return 'Novr';
    else return 'December';
}
