import mongoose  from "mongoose"

async function connectToDB(params) {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    }catch(err){
        console.log(err)
    }
}

export default connectToDB