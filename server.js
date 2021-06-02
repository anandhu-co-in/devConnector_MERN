const connectDB=require('./config/db')
const express = require("express")

const app=express()
connectDB()

// app.use(express.json({extended:false}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("API Running.. Worked");
})


//Adding the routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


app.listen(process.env.PORT||3001,()=>console.log("Server started"))


// app.post("/users",(req,res)=>{
//     console.log(req.body);
//     res.send(req.body); //The body passed from Body section of postman
// })