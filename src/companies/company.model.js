import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    impactLevel: {
        type: Number,
        required: [true, 'Impact level is required'],
    },
    yearsTrayectory:{
        type: Number,
        required: [true, 'years of trayectory is required']
    },
    category:{
        type: String,
        required: [true, 'caegory is required']
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Company', companySchema)