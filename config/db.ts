import mongoose from "mongoose";
require('dotenv').config();

const dburl:string = process.env.MONGODB_URL || ' ';

const dbConnect = async() =>{
    try {
        await mongoose.connect(dburl).then((data:any) =>{
            console.log(`Db is connected Successfully ${data.connection.host}`)
        }).catch((e) =>{
            console.log("db is not connected")
        })
    } catch (error:any) {
        console.log(error.message);
        setInterval(dbConnect,5000);
    }
}

export default dbConnect;