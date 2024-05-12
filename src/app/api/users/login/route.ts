import {connect} from "@/dbConnect/dbConfig"
import User from "@/app/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from 'node:process';

connect()

export async function POST(request:NextRequest){

    try {
        const reqbody= await request.json()
        const{email, password}= reqbody
        const user= await User.findOne(email)
        if (!user) {
            return NextResponse.json({message:"User not found"},{status:400})
        }
        console.log(user);

        const vaildPassword= await bcryptjs.compare(password, user.password)

        if (!vaildPassword) {
            return NextResponse.json({message:"Password not Match"},{status:400})
        }

        const tokenData={
            id:user._id,
            email:user.email
        }

        const token= jwt.sign(tokenData, process.env.TOKEN_SECERT!, {expiresIn:'1h'})

        const responce= NextResponse.json({
            message:"Success full login",
            success:true
        },)

        responce.cookies.set("token",token, {httpOnly:true})

        return responce;
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}