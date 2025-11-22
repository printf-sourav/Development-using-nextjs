import mongoose  from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("Mongo db connected successfully")
        })
        connection.on("error",()=>{
            console.log("Mongo db connection failed")
        })
    }

    catch(err){
        console.log("Something went wrong")
    }
}