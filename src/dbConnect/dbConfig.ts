import { error } from "console";
import mongoose from "mongoose";

export async function connect(){
    try {
        const dbConnection=await mongoose.connect(process.env.MANGO_URI!) // ! used for typescript to ensure that it is a string which is not empty.

        const connection=mongoose.connection // this is mongoose connection for the connection.
        connection.on('connection',()=>{ //on is connection event 
            console.log("MongoDB connection is completed ");
            
        })
        connection.on('error', (error)=>{
            console.log("MongoDB connection error", error)
            //this is exist from application
            process.exit()
        })




    } catch (error) {
        console.log("Database Connect is incomplete", error);
        
    }
}