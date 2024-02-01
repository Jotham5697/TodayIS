// watch this video 
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
//watch this video to connect to render
//https://www.youtube.com/watch?v=vkCgvEVTIgw&ab_channel=NHNTV

//const popup = require('node-popup');
//import {alert} from 'node-popup';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Int32 } = require("mongodb");
// const { MongoClient } = require('mongodb');

app.use(bodyParser.urlencoded({ extended: true }));

//mongoose.connect("mongodb+srv://JothamK06:Pazzword12345697@todayis.hbmzteg.mongodb.net/UserInfo");
mongoose.connect("mongodb+srv://JothamK2006:Pazzword5697@todayis.upznmwp.mongodb.net/TodayIsUse")

//const client = new MongoClient(uri);

strictQuery = false;

//var path = require('path');
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000/ ");
})

const userSchema = {
  username: String,
  password: String,
  fname: String,
  lname: String,
  isHS: Boolean,

  classes: Array,
  isHL: Array,
  lunches: Array
}

const User = mongoose.model("User", userSchema);

app.get('/signUp.html', function (req, res) {
  res.sendFile(__dirname + '/templates/signUp.html');
  console.log("Succesfully entered Signup Page");
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
  console.log("Succesfully entered Home Page");
});

app.get('/login.html', function (req, res) {
  res.sendFile(__dirname + '/templates/login.html');
  console.log("Succesfully entered Login Page");
});


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

app.post("/login.html", async function (req, res) {
  usernameInput = String(req.body.userNameInput);

  const userClasses = await User.find({ username: usernameInput }, "classes").exec(); //pulls raw userdata of class names from db 
  const classesString = String(userClasses); //turn raw data into useable string  
  let useString = classesString.substring(classesString.indexOf("[") + 3) //delete uneccesary id and preliminary info from string
  
  
  let classes = new Array(); //creates empty array for user's class info to be stored in
  let start = 0; //create pointer for start of class name 
  let end = 0; //create pointer for end of class name 
  let useClass = "";  //used to store the current class name being parsed from the string
  let useString2 = ""; //initialize second string to aid in parsing process (ie for 'a' creates new string of a' to be able to find closing quote)

  while (useString.indexOf("'") > -1) { //while string still has quotes in it (meaning still has elements)
    start = useString.indexOf("'") + 1; //start parsing string from after the opening ' 
    useString2 = useString.substring(start); //create new string of everything after opening '

    end = start + useString2.indexOf("'"); //find end point of where to parse which is where the closing ' appears
    useClass = useString.substring(start, end);  //grabs Class Name and stores it as UseClass
    classes.push(useClass); //adds class into array

   
    useString = useString.substring(end + 3); //effectively removes the class just looked at from the string to iterate through again 


  }
  

  res.sendFile(__dirname + "/templates/index.html");
})




app.post("/signUp.html", function (req, res) {
  if (req.body.password === req.body.cpassword) {

    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      isHS: isHS(req.body.isHS),

      classes: Array(req.body.class1, req.body.class2, req.body.class3, req.body.class4, req.body.class5, req.body.class6, req.body.class7, req.body.class8),
      isHL: Array(req.body.hl1, req.body.hl2, req.body.hl3, req.body.hl4, req.body.hl5, req.body.hl6, req.body.hl7, req.body.hl8),
      lunches: Array(req.body.lunch1, req.body.lunch2, req.body.lunch3, req.body.lunch4, req.body.lunch5, req.body.lunch6, req.body.lunch7, req.body.lunch8)
    });
    console.log("User Successfully added!");
    newUser.save();
    res.send(" <script> alert('User Successfully Created!'); window.location.href = '/'</script>");


  } else {
    res.send(" <script> alert('Passwords Do Not Match'); window.location.href = 'template/signUp.html'</script>");
  }
})



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
