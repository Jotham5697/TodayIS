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
  console.log("Server is running on 5000");
})

const userSchema = {
  username: String,
  password: String,
  fname: String,
  lname: String,

  class1: String,
  HL1: Boolean,
  lunch1: Number,

  class2: String,
  HL2: Boolean,
  lunch2: Number,

  class3: String,
  HL3: Boolean,
  lunch3: Number,

  class4: String,
  HL4: Boolean,
  lunch4: Number,

  class5: String,
  HL5: Boolean,
  lunch5: Number,

  class6: String,
  HL6: Boolean,
  lunch6: Number,

  class7: String,
  HL7: Boolean,
  lunch7: Number,

  class8: String,
  HL8: Boolean,
  lunch8: Number,
}

const User = mongoose.model("User", userSchema);

app.get('/signUp.html', function (req, res) {
  res.sendFile(__dirname + '/templates/signUp.html');
  console.log("Succesfully entered Signup Page");});

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

app.post("/login.html", async function (req, res) {
  usernameInput = String(req.body.userNameInput);
 
  const userUse = await User.find({username: usernameInput}, "-_id").exec();
  //UserUse = User.find();
  //console.log(usernameInput);
  //console.log(typeof(usernameInput));
  //console.log(UserUse.username);

  console.log(userUse);
  console.log(String(userUse));
  res.sendFile(__dirname + "/templates/index.html");
})



app.post("/signUp.html", function (req, res) {
  if (req.body.password === req.body.cpassword) {

      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,

        class1: req.body.class1,
        HL1: isHL(req.body.hl1),
        lunch1: req.body.lunch1,

        class2: req.body.class2,
        HL2: isHL(req.body.hl2),
        lunch2: req.body.lunch2,

        class3: req.body.class3,
        HL3: isHL(req.body.hl3),
        lunch3: req.body.lunch3,

        class4: req.body.class4,
        HL4: isHL(req.body.hl4),
        lunch4: req.body.lunch4,

        class5: req.body.class5,
        HL5: isHL(req.body.hl5),
        lunch5: req.body.lunch5,

        class6: req.body.class6,
        HL6: isHL(req.body.hl6),
        lunch6: req.body.lunch6,

        class7: req.body.class7,
        HL7: isHL(req.body.hl7),
        lunch7: req.body.lunch7,

        class8: req.body.class8,
        HL8: isHL(req.body.hl8),
        lunch8: req.body.lunch8
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
