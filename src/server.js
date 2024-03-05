// watch this video 
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
//watch this video to connect to render
//https://www.youtube.com/watch?v=vkCgvEVTIgw&ab_channel=NHNTV

//const popup = require('node-popup');
//import {alert} from 'node-popup';

// vercel add ons


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
  let hasData = req.cookies.hasNeccesaryData; //checks if data is already in cookies
  if (hasData !== "true") { //if not
    const allDaysOff = await dayOff.find({ dateOff: { $regex: "20" } }, "reason dateOff -_id").exec(); //pull all day off data
    allDaysOff.forEach((dayoff) => {
      dateOff.push(dayoff.dateOff); //create array of all days off
      reason.push(dayoff.reason); //create array for reasons for all days off
    });
    res.cookie("hasNeccesaryData", "true"); //set  cookie so we know there's data now
    res.cookie("datesOff", JSON.stringify(dateOff), { maxAge: 30 * 24 * 60 * 60 * 1000 }); //send strigified array to persistent cookies for 30 days
    res.cookie("reasons", JSON.stringify(reason), { maxAge: 30 * 24 * 60 * 60 * 1000 }); //send strigified array 
    const importantTrimesterInfo = await trimesterInfo.find({ trimester: { $lt: 4 } }, "-_id").exec(); //pull all trimester info
    importantTrimesterInfo.forEach((trimesterInfo) => { //send all trimester info as persistent 30 day cookie
      res.cookie("Tri" + trimesterInfo.trimester + "StartDate", trimesterInfo.startDate, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("Tri" + trimesterInfo.trimester + "EndDate", trimesterInfo.endDate, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("Tri" + trimesterInfo.trimester + "StartDateBlock", trimesterInfo.startDateBlock, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    })
  }
  res.sendFile(__dirname + '/index.html'); //redirect back to index page
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
  else if (req.body.username === "" || req.body.password === "" || req.body.name === "" || req.body.class1 === "" || req.body.class2 === "" || 
  req.body.class3 === "" || req.body.class4 === "" || req.body.class5 === "" || req.body.class6 === "" || req.body.class7 === "" || req.body.class8 === "") {
    res.send(" <script> alert('Make Sure All Required Fields Are Filled Out'); window.location.href = '/signUp.html'</script>")
  }
  else {
    const userUsing = await User.findOne({ username: req.body.username }).exec();
    if (userUsing !== null) { //checks if user with same username already exists 
      res.send(" <script> alert('Username Already Taken'); window.location.href = '/signUp.html' </script>");
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
      res.cookie("username", JSON.stringify(req.body.username), { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("clientClasses", JSON.stringify(Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8)), { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("clientHls", JSON.stringify(Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8))), { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("clientLunch", JSON.stringify(Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)), { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("clientName", JSON.stringify(req.body.name, { maxAge: 30 * 24 * 60 * 60 * 1000 }));
      res.cookie("clientIsHS", JSON.stringify(req.body.isHS), { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.cookie("loggedIn", "true", { maxAge: 30 * 24 * 60 * 60 * 1000 });


      res.send(" <script> alert('User Successfully Created!'); window.location.href = '/'</script>");
    }

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
    res.cookie("username", JSON.stringify(userUsing.username), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("clientClasses", JSON.stringify(userUsing.classes), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("clientHls", JSON.stringify(userUsing.isHL), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("clientLunch", JSON.stringify(userUsing.lunches), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("clientName", JSON.stringify(userUsing.name), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("clientIsHS", JSON.stringify(userUsing.isHS), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("loggedIn", "true", { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.sendFile(__dirname + '/index.html');
  }
})

const dayOffSchema = {
  dateOff: String,
  reason: String,
}

const dayOff = mongoose.model("dayOff", dayOffSchema);

app.post("/dayOff", async function (req, res) {
  let DateOff = req.body.addDateOff; //request date for new date off from form submission
  let reason = req.body.reasonDayOff; //request reason for new date off from form submission
  let newDateOff = new dayOff({  //creates new collection of day off from form submission 
    dateOff: req.body.addDateOff,
    reason: req.body.reasonDayOff
  });
  newDateOff.save(); //saves new collection to db

  //requests all days off from db 
  const allDaysOff = await dayOff.find({ dateOff: { $regex: "20" } }, "reason dateOff -_id").exec();

  const dateOff = new Array();
  const reasons = new Array();
//put all the previous days off from db into an array
  allDaysOff.forEach((dayoff) => {
    dateOff.push(dayoff.dateOff);
    reasons.push(dayoff.reason);

  });
//adds to array the new days off added by adin
  dateOff.push(DateOff);
  reasons.push(reason);
  
  //saves updated arrays of all days off to cookies
  res.cookie("datesOff", JSON.stringify(dateOff), { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.cookie("reasons", JSON.stringify(reasons), { maxAge: 30 * 24 * 60 * 60 * 1000 });

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
  //pull user username from cookies
  let username = (JSON.parse(req.cookies.username));
  //request new info from update info form sumbission
  let newName = req.body.name;
  let newIsHS = isHS(req.body.isHS);
  let newClasses = Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8);
  let newHLs = Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8));
  let newLunches = Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8);

  //update collection in db wth new info
  let update = await User.findOneAndUpdate({ username: username }, { $set: { name: newName, isHS: newIsHS, classes: newClasses, isHL: newHLs, lunches: newLunches } });
  
  //also update cookies with new info
  res.cookie("clientClasses", JSON.stringify(Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8)));
  res.cookie("clientHls", JSON.stringify(Array(isHL(req.body.hl1), isHL(req.body.hl2), isHL(req.body.hl3), isHL(req.body.hl4), isHL(req.body.hl5), isHL(req.body.hl6), isHL(req.body.hl7), isHL(req.body.hl8))));
  res.cookie("clientLunch", JSON.stringify(Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)));
  res.cookie("clientName", JSON.stringify(req.body.name));
  res.cookie("clientIsHS", JSON.stringify(isHS(req.body.isHS)));

  //redirect back to profile page
  res.sendFile(__dirname + '/profile.html');
})



// /deleteDayOff/${dateOff}

app.delete('/deleteDayOff/:dateOff', async (req, res) => {
  const dayOffToBeDeleted = req.params.dateOff; //date to be deleted packages in url 
  try {
    let deleting = await dayOff.deleteOne({ dateOff: dayOffToBeDeleted }); //deletes Day based on day off in URL 

    //then updates day off info in cookies
    const allDaysOff = await dayOff.find({ dateOff: { $regex: "20" } }, "reason dateOff -_id").exec();

    const dateOff = new Array();
    const reasons = new Array();

    //creates new array  of dates without the one that needs to be deleted
    allDaysOff.forEach((dayoff) => {
      dateOff.push(dayoff.dateOff);
      reasons.push(dayoff.reason);
    });
    //sends new arrays to cookies 
    res.cookie("datesOff", JSON.stringify(dateOff), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie("reasons", JSON.stringify(reasons), { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.send(" <script> alert('Day Off Deleted!'); window.location.href = '/admin.html'</script>")

    //if an error comes up send that error to the client side
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;