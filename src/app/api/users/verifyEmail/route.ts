import {connect} from "@/dbConnect/dbConfig"
import User from "@/app/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import {emailSend} from "@/helpers/mailer"

connect()

export async function POST(request:NextRequest){
    try {
        const reqbody= await request.json()
        const {token}= reqbody;
        console.log(token)
        
        const user=await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}})
        if (!user) {
            return NextResponse.json({error:"User is not Invaild in verification"},{status:400})
        }
        console.log(user);
        user.isVerfied=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;

        await user.save()
        return NextResponse.json({message:"user verified", success:true},{status:500})

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}