const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const port = process.env.PORT || 3001;

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,() => console.log("Database Connected"))


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.get("/", function (req, res){
    res.send("Working..!");
});

app.post('/signup',function(req,res){
    
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var mobile = req.body.mobile;
    
    const signUpSchema = new mongoose.Schema({
        username:{
            type:String,
            
        },
        email:{
            type:String,
            
        },
        password:{
            type:String,
            
        },
        mobile:{
            type:String,
            
        },
        date:{
            type:Date,
            default:Date.now
        }
    });
    
    const User = mongoose.model('User',signUpSchema, 'users');

    const User1 = new User({ username: username, email: email, password: password, mobile: mobile});

    User1.save(function (err, data){
        if(err){
            res.send({status:0, result:err})
        } else {
            res.send({status:1, result:data})
        }
    });
})

app.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});