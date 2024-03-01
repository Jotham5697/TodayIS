// watch this video 
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
//watch this video to connect to render
//https://www.youtube.com/watch?v=vkCgvEVTIgw&ab_channel=NHNTV

//const popup = require('node-popup');
//import {alert} from 'node-popup';

//Neccesary Packages and Tools
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Int32 } = require("mongodb");
// const { MongoClient } = require('mongodb');
// const cors = require('cors');
// app.use(cors());
//var localStorage = require('localStorage');
//Neccesary Packages and Tools

const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(bodyParser.urlencoded({ extended: true }));


const { createHash } = require('node:crypto');
const { userInfo } = require("node:os");

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
};

//mongoose.connect("mongodb+srv://JothamK06:Pazzword12345697@todayis.hbmzteg.mongodb.net/UserInfo");
mongoose.connect("mongodb+srv://JothamK2006:Pazzword5697@todayis.upznmwp.mongodb.net/TodayIsUse")

const db = mongoose.connection; //used specifically for index get request to access all dayOff collections

//const client = new MongoClient(uri);

strictQuery = false;

//var path = require('path');
app.use(express.static(__dirname + '/public/style.css'));
app.use(express.static(__dirname + '/public')); //for server.js

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public/script.js'));





app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000/ ");
})

const userSchema = {
  username: String,
  password: String,
  name: String,
  isHS: Boolean,

  classes: Array,
  isHL: Array,
  lunches: Array
}

const User = mongoose.model("User", userSchema);


app.get('/signUp.html', function (req, res) {
  res.sendFile(__dirname + '/signUp.html');
  console.log("Succesfully entered Signup Page");
});




// let dateOffAndReason = new Array(); //creates empty array to hold day off info (dateoff, reason)
let dateOff = new Array();
let reason = new Array();

app.get('/', async function (req, res) {
  let hasData = req.cookies.hasNeccesaryData;
  console.log("hasNeccesaryData: " + hasData)
  if (hasData !== "true") {
    const allDaysOff = await dayOff.find({ dateOff: { $regex: "20" } }, "reason dateOff -_id").exec();

    allDaysOff.forEach((dayoff) => {
      // let info = [dayoff.dateOff, dayoff.reason];
      // dateOffAndReason.push(info);
      dateOff.push(dayoff.dateOff);
      reason.push(dayoff.reason);

    });
    res.cookie("hasNeccesaryData", "true");
    res.cookie("datesOff", JSON.stringify(dateOff), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("reasons", JSON.stringify(reason), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    // res.cookie("dateOffAndReason", (JSON.stringify(dateOffAndReason)), { httpOnly: false, maxAge: 30 *24 * 60 *60 * 1000 });
    const importantTrimesterInfo = await trimesterInfo.find({ trimester: { $lt: 4 } }, "-_id").exec();
    importantTrimesterInfo.forEach((trimesterInfo) => {
      res.cookie("Tri" + trimesterInfo.trimester + "StartDate", trimesterInfo.startDate, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("Tri" + trimesterInfo.trimester + "EndDate", trimesterInfo.endDate, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("Tri" + trimesterInfo.trimester + "StartDateBlock", trimesterInfo.startDateBlock, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    })
    console.log("Request sent to server for day off info");
  }
  res.sendFile(__dirname + '/index.html');
  console.log("Succesfully entered Home Page");
});

app.get('/login.html', function (req, res) {
  res.sendFile(__dirname + '/login.html');
  console.log("Succesfully entered Login Page");
});

app.get('/admin.html', function (req, res) {
  console.log(req.cookies.adminLoggedIn);
  if (req.cookies.adminLoggedIn === "true") {
    res.sendFile(__dirname + '/admin.html')
  } else {
    res.sendFile(__dirname + '/adminLogin.html');
    console.log("Succesfully entered Admin Page");
  }
});

app.get('/profile.html', function (req, res) {
  if (req.cookies.loggedIn === "true") {
    res.sendFile(__dirname + '/profile.html');
    console.log("Succesfully entered Profile Page");
  } else {
    res.sendFile(__dirname + '/login.html');
  }

});



app.post("/adminLogin.html", async function (req, res) {
  let username = req.body.adminUsernameInput;
  let password = req.body.adminPasswordInput;
  adminUser = await User.findOne({ username: "admin" }).exec();
  console.log(hash(password));
  console.log(adminUser.password);
  if (hash(password) === adminUser.password) {
    console.log("Passwords Match");
    res.cookie('adminLoggedIn', true, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.sendFile(__dirname + '/admin.html');
  } else {
    console.log("Passwords do not match");
    res.sendFile(__dirname + '/adminLogin.html');
    res.send(" <script> alert('Incorrect Password or Username'); window.location.href = '/'</script>");
  }
})



function isHL(ishl) {
  if (ishl === "HL") {
    return true;
  } else {
    return false;
  }
}

function isHS(ishs) {
  if (ishs === "1") {
    return true;
  } else {
    return false;
  }
}

app.post("/signUp.html", async function (req, res) {
  if (req.body.password !== req.body.cpassword) (res.send(" <script> alert('Passwords Do Not Match'); window.location.href = '/signUp.html'</script>"));
  else if (req.body.username === "" || req.body.password === "" || req.body.name === "" || req.body.class1 === "" || req.body.class2 === "" || req.body.class3 === "" || req.body.class4 === "" || req.body.class5 === "" || req.body.class6 === "" || req.body.class7 === "" || req.body.class8 === "") {
    res.send(" <script> alert('Make Sure All Required Fields Are Filled Out'); window.location.href = '/signUp.html'</script>")
  } else {

    let newUser = new User({
      username: req.body.username,
      password: hash(req.body.password),
      name: req.body.name,
      isHS: isHS(req.body.isHS),

      classes: Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8),
      isHL: Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8)),
      lunches: Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)
    });
    console.log("User Successfully added!");
    newUser.save();
    res.cookie("username", JSON.stringify(req.body.username));
    res.cookie("clientClasses", JSON.stringify(Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8)));
    res.cookie("clientHls", JSON.stringify(Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8))));
    res.cookie("clientLunch", JSON.stringify(Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)));
    res.cookie("clientName", JSON.stringify(req.body.name));
    res.cookie("clientIsHS", JSON.stringify(req.body.isHS));
    res.cookie("loggedIn", "true", { maxAge: 30 * 24 * 60 * 60 * 1000 });


    res.send(" <script> alert('User Successfully Created!'); window.location.href = '/'</script>");
    //res.write("<script>alert('User Successfully Created!')</script>");

  }
})

let classes = new Array(); //creates empty array for user's class info to be stored in


app.post("/login.html", async function (req, res) {
  usernameInput = String(req.body.userNameInput);
  const userUsing = await User.findOne({ username: usernameInput }).exec();
  if (userUsing === null) {
    res.send(" <script> alert('User Not Found'); window.location.href = '/login.html'</script>");
  }
  else if (userUsing.password !== hash(req.body.passwordInput)) {
    res.send(" <script> alert('Incorrect Password, Try Again'); window.location.href = '/login.html'</script>");
  }
  else {
    res.cookie("username", JSON.stringify(userUsing.username));
    res.cookie("clientClasses", JSON.stringify(userUsing.classes));
    res.cookie("clientHls", JSON.stringify(userUsing.isHL));
    res.cookie("clientLunch", JSON.stringify(userUsing.lunches));
    res.cookie("clientName", JSON.stringify(userUsing.name));
    res.cookie("clientIsHS", JSON.stringify(userUsing.isHS));
    res.cookie("loggedIn", "true", { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.sendFile(__dirname + '/index.html');
  }
})

const dayOffSchema = {
  dateOff: String,
  reason: String,
}

const dayOff = mongoose.model("dayOff", dayOffSchema);

app.post("/dayOff", function (req, res) {
  let DateOff = req.body.addDateOff;
  let reason = req.body.reasonDayOff;
  let newDateOff = new dayOff({
    dateOff: req.body.addDateOff,
    reason: req.body.reasonDayOff
  });
  newDateOff.save();
  console.log(DateOff);
  console.log(reason);
  console.log(typeof (DateOff));
  res.send(" <script> alert('New Day Off Added!'); window.location.href = '/admin.html'</script>");
})

const trimesterInfoSchema = {
  trimester: Number,
  startDate: String,
  endDate: String,
  startDateBlock: Number
}

const trimesterInfo = mongoose.model("trimesterInfo", trimesterInfoSchema);

app.post("/updateTrimesterInfo", async function (req, res) {
  //pull hidden input that recognizes which trimester is being edited
  let trimester = req.body.trimesterNumber;
  console.log(trimester);

  if (trimester === "1") {
    var startDate = req.body.trimester1StartingDate; //pull start date from date picker 
    var endDate = req.body.trimester1EndingDate; //pull end date from date picker
    var startDateBlock = req.body.trimester1StartingDayBlock; //pull the starting block from the date picker
    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) { //is the start date is equal to or greater then end date then send message
      res.send(" <script> alert('Trimester Start Date Cannot be the Same Day or After the Trimester End Date'); window.location.href = '/admin.html'</script>")
    } else { //if start date is less then end date update respective trimester data
      let update = await trimesterInfo.findOneAndUpdate({ trimester: 1 }, { $set: { startDate: startDate, endDate: endDate, startDateBlock: startDateBlock } });

      //then pull new updated data from db and send a cookie to update value on client side 
      const importantTrimesterInfo = await trimesterInfo.find({ trimester: { $lt: 4 } }, "-_id").exec();
      importantTrimesterInfo.forEach((trimesterInfo) => {
        res.cookie("Tri" + trimesterInfo.trimester + "StartDate", trimesterInfo.startDate);
        res.cookie("Tri" + trimesterInfo.trimester + "EndDate", trimesterInfo.endDate);
        res.cookie("Tri" + trimesterInfo.trimester + "StartDateBlock", trimesterInfo.startDateBlock);
      })
    }
  } else if (trimester === "2") {

    var startDate = req.body.trimester2StartingDate;
    var endDate = req.body.trimester2EndingDate;
    var startDateBlock = req.body.trimester2StartingDayBlock;
    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      res.send(" <script> alert('Trimester Start Date Cannot be the Same Day or After the Trimester End Date'); window.location.href = '/admin.html'</script>")
    } else {
      let update = await trimesterInfo.findOneAndUpdate({ trimester: 2 }, { $set: { startDate: startDate, endDate: endDate, startDateBlock: startDateBlock } });

      const importantTrimesterInfo = await trimesterInfo.find({ trimester: { $lt: 4 } }, "-_id").exec();
      importantTrimesterInfo.forEach((trimesterInfo) => {
        res.cookie("Tri" + trimesterInfo.trimester + "StartDate", trimesterInfo.startDate);
        res.cookie("Tri" + trimesterInfo.trimester + "EndDate", trimesterInfo.endDate);
        res.cookie("Tri" + trimesterInfo.trimester + "StartDateBlock", trimesterInfo.startDateBlock);
      })
    }
  } else {
    var startDate = req.body.trimester3StartingDate;
    var endDate = req.body.trimester3EndingDate;
    var startDateBlock = req.body.trimester3StartingDayBlock;
    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      res.send(" <script> alert('Trimester Start Date Cannot be the Same Day or After the Trimester End Date'); window.location.href = '/admin.html'</script>")
    } else {
      let update = await trimesterInfo.findOneAndUpdate({ trimester: 3 }, { $set: { startDate: startDate, endDate: endDate, startDateBlock: startDateBlock } });

      const importantTrimesterInfo = await trimesterInfo.find({ trimester: { $lt: 4 } }, "-_id").exec();
      importantTrimesterInfo.forEach((trimesterInfo) => {
        res.cookie("Tri" + trimesterInfo.trimester + "StartDate", trimesterInfo.startDate);
        res.cookie("Tri" + trimesterInfo.trimester + "EndDate", trimesterInfo.endDate);
        res.cookie("Tri" + trimesterInfo.trimester + "StartDateBlock", trimesterInfo.startDateBlock);
      })
    }
  }

  //after update go back to admin page 
  res.sendFile(__dirname + '/admin.html');

});

app.post("/updateUser", async function (req, res) {
  console.log(req.cookies.username);
  let username = (JSON.parse(req.cookies.username));
  //username = username.slice(0, -1);
  let newName = req.body.name;
  let newIsHS = isHS(req.body.isHS);
  let newClasses = Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8);
  let newHLs = Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8));
  let newLunches = Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8);

  let update = await User.findOneAndUpdate({ username: username }, { $set: { name: newName, isHS: newIsHS, classes: newClasses, isHL: newHLs, lunches: newLunches } });
  res.cookie("clientClasses", JSON.stringify(Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8)));
  res.cookie("clientHls", JSON.stringify(Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8))));
  res.cookie("clientLunch", JSON.stringify(Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)));
  res.cookie("clientName", JSON.stringify(req.body.name));
  res.cookie("clientIsHS", JSON.stringify(isHS(req.body.isHS)));
  res.sendFile(__dirname + '/profile.html');
})



// /deleteDayOff/${dateOff}

app.delete('/deleteDayOff/:dateOff', async (req, res) => {
  // res.write("<confrim>'Are you sure you want to delete ' + dayOffToBeDeleted</confrim>")
  const dayOffToBeDeleted = req.params.dateOff; //date to be deleted packages in url 
  try {

    let deleting = await dayOff.deleteOne({ dateOff: dayOffToBeDeleted }); //deletes Day based on day off in URL 

    //then updates day off info in cookies
    const allDaysOff = await dayOff.find({ dateOff: { $regex: "20" } }, "reason dateOff -_id").exec();

    allDaysOff.forEach((dayoff) => {
      dateOff.push(dayoff.dateOff);
      reason.push(dayoff.reason);

    });
    res.cookie("hasNeccesaryData", "true");
    res.cookie("datesOff", JSON.stringify(dateOff), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("reasons", JSON.stringify(reason), { maxAge: 30 * 24 * 60 * 60 * 1000 });


    res.send("Day Off deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;







// app.post("/", function (req, res) {
// console.log("from home page: " + classes);
// })

// function getlocalstorage(){
//   localStorage.setItem("Test", "testing client or server");
//   console.log(localStorage.getItem("Test"));
// }

// const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://JothamK06:Pazzword12345697@todayis.hbmzteg.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function main() {

//   try {
//     await client.connect();
//     console.log("Connected");
//   } catch (e) {
//     console.log(e);
//   } finally {
//     await client.close();
//     console.log("Disconnected");
//   }

// }
//main().catch(console.error);

// Sign Up Page

// class User {
//   constructor(userName, check1, Alunch) {
//     let username = userName;
//     let aHL = check1;
//     let aLunch = Alunch;
//   }
// }

// function logUserInput() {

//   const username = document.getElementById("userName").value;
//   let check1 = document.getElementById("Ahl");
//   let hlCheck1 = check1.checked;
//   let aLunch = document.getElementById("Alunch").value;
//   alert(username + " " + hlCheck1 + " " + aLunch);
//   console.log("this works");
//   localStorage.setItem("username1", username);
//   console.log(localStorage.getItem("username1"));
//   // const user1 = new User(username, hlCheck1, aLunch);
//   // return user1;
//   // main();
//   localStorage.clear();
//   console.log(localStorage.getItem("username1"));
// }

// console.log(user1);


// Idea: create class that holds info and in logUserInput initialize instance of one
// outside of loguserinput create different method that adds user and then call that method within
// loguserinput and initialize variables based on passed parameters


//console.log(localStorage.getItem("username"));


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
