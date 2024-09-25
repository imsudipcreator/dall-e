import mongoose from "mongoose";



const connectDb = (url)=>{
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(()=>console.log("mongodb connected successfully"))
    .catch((err)=>console.log("Error while connecting mongodb",err))
}

export default connectDb