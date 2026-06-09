import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true,"token required to be added"] 
    }
},{timestamps : true})

const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)

export default tokenBlacklistModel