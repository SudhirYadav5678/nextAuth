import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            requied:[true, "please provide unquie username"],
            unique:true
        },
        email:{
            type:String,
            requied:[true, "email is required"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"Passward is required"],

        },
        isVerfied: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    })
    
    const User = mongoose.models.users || mongoose.model("users", userSchema);
    
    export default User;

    // next js for verified hege case is model already exist in database mongoose.models.users