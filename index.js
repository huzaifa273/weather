require("dotenv").config()              // to import our jsonwebtoken key from .env file
const express = require("express")      // Import the express dependencyr
const collection = require("./mongo")   
const app = express();                  // Instantiate an express app, the main work horse of this server
const port = 8000                       // Save the port number where your server will be listening
const cors = require("cors");
app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const path = require("path")

// Signup Code
app.post("/signup", async(req, res)=>{
    const{name, email, password, cPassword} = req.body

    const data = {
        name: name,
        email:email,
        password:password,
        cPassword: cPassword
    }

    try{
        const check = await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(e){
        res.json("notexist")
    }
})


// Login code
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        const check = await collection.findOne({email:email, password: password});
        if(check){
            // res.json("exist");
            const name = check.name;
            console.log(name);
            const accessToken = jwt.sign({
                user: {
                    email: email,
                    password: password
                }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
            res.json({accessToken, email, name})
        }else{
            res.json("notexist");
        }
    } catch (error) {
        res.json("notexist")
        console.log(error);
    }

})

// A protected route which is accessible to only authurized users
app.post("/post", authenticateToken, (req, res)=>{
    res.json("I'm finally working")
})

// jsonwebtoken(jwt) user authentication
function authenticateToken(req, res, next) {
    const {email, password} = req.body;
    // So the format of header is 1st Bearear and then Token
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    
    // if userhaven;t send us the token
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // if the token is invalid or expired
        if(err) return res.sendStatus(403)
        req.user = {
            user: {
                email: email,
                password: password
            }
        }
        next()
    })
}

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(process.env.PORT || port, () => {
    console.log(`Now listening on port ${port}`);
})
