import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "the name is required"]
    },
    mail:{
        type: String,
        required: [true, "the mail is required"]
    },
    password:{
        type: String,
        required: [true, "the password is required"]
    },
    role:{
        type: String,
        default: "ADMIN_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('User', userSchema);