//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = 5000;
require("dotenv").config();

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose connection
// connecting to mongodb
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
  console.log("Connected to db");
})

// mongoose.connect('mongodb://127.0.0.1:27017/sellerSquare', { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(() => {
//         console.log("Connected to db");
//     })

// orderSchema
const orderSchema = {
    name : String,
    country : String,
    ethnicity : String,
    age : Number,
    gender : String,
    size : Number
}

// creating Order collection
const Order = mongoose.model("Order" , orderSchema);


app.get('/', (req, res) => {
    res.render("home");
})

app.get("/save" , (req , res)=>{
    Order.find().then(order =>{
        res.render("save" , {
            orderRender : order,
        });
    }).catch(err =>{
        console.log(err);
        res.send("ERROR \n" + err);
    })
})

app.post('/', (req, res) => {
    let od = new Order({
        name : req.body.name,
        country : req.body.country,
        ethnicity : req.body.ethnicity,
        age : req.body.age,
        gender : req.body.gender,
        size : req.body.size
    });
    od.save();
    res.redirect("/save");
})

app.post("/save" , (req , res)=>{
    res.redirect("/");
})

app.listen(port, () => {
    console.log("server started on : " + port);
})