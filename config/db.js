const mongoose=require("mongoose")
const config=require("config")
const dbURL=config.get("mongoURI")

async function connectDB(){
    try{
        await mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
        console.log("Mongo DB Connected")
    }
    catch(err){
        console.log("Mangodb connection failed")
        process.exit(1);
    }
}


module.exports=connectDB;