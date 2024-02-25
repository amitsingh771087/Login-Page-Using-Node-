const express = require("express");
const app = express()
const collection = require("./mongodb")
const path = require("path")
const hbs = require("hbs")


const templatepath = path.join(__dirname,'../templeates')
app.use(express.json())
app.set("view engine" , "hbs")
app.set("views", templatepath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        Password: req.body.password
    };
    await collection.insertMany([data]);
    res.render("home");
});
app.post("/login", async (req, res) => {
   
    try{
        const check = await collection.findOne({name:req.body.name})

        if(check.Password === req.body.Password){
            res.render("home");
        }
        else{
            res.send("wrong password")
        }
    
    }
    catch{
        res.send("Wrong Details")
    }
});

app.listen(3000,()=>{
    console.log("port connected")
})