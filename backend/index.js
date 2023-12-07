const express = require("express")
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(6);
const jwtsecret = "sjkhfycndhskfe5848djhvicghjke"

app.use(express.json());
app.use(cookieParser())

app.use(
    cors({
      origin: "http://localhost:3000", // Replace with your frontend URL
      credentials: true, // Allow cookies and other credentials to be sent
    })
  );

mongoose.connect(process.env.MONGO_URL)

app.get("/test",(req,res)=>{
    res.json("test ok")
})

app.post("/register",async(req,res)=>{
  const {name,email,password} = req.body;
  try {
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt),
      })
      res.json(userDoc)
  } catch (error) {
    console.log({error:"error in registration"});
  }
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    const userDoc = await User.findOne({email})
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtsecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie("token",token).json({userDoc:userDoc,data:"password match"})
                
            })

        }else{
            res.status(422).json("password wrong")
        }
    }else{
        res.json("user not found!")
    }
})

app.get("/profile",  (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,jwtsecret,{},async(err,userData)=>{
           if(err) throw err;
           const {name,email,_id} = await User.findById(userData.id)

           res.json({name,email,_id})
        })
    }else{
        res.json(null);
    }
})

app.listen(4000,()=>{
    console.log("port 4000 running!");
})