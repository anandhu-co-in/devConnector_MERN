const connectDB=require('./config/db')
const express = require("express")
const path=require('path');

const app=express()

//Call the async function which connects to DataBase
connectDB()

// app.use(express.json({extended:false}));



//We have to use these two middle wears when using PUT and POST requests
app.use(express.json()); // express.json() is a built express middleware that convert request body to JSON.
app.use(express.urlencoded({extended:true})); //just like express.json() converts request body to JSON, it also carries out some other functionalities like: converting form-data to JSON etc.

// app.get("/",(req,res)=>{
//     res.send("worked and worked");
// })


//Adding the routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


//Serve static assets in production
if(process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


app.listen(process.env.PORT||3001,()=>console.log("Server started"))


// app.post("/users",(req,res)=>{
//     console.log(req.body);
//     res.send(req.body); //The body passed from Body section of postman
// })