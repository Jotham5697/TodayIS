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

function hash(string){
    return createHash('sha256').update(string).digest('hex');
}; 

console.log(hash("hello"));

let x = "treees"; 
let y = "treees"; 

console.log(hash(x)!==hash(y));