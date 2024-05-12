import {connect} from "@/dbConnect/dbConfig"
import User from "@/app/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import {emailSend} from "@/helpers/mailer"

connect()

export async function POST(response:NextResponse){
    try {
        const reqbody=  await response.json()
        const{userName, email, password}=reqbody
        console.log(reqbody);
        
        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({
                error:"User already exist"
            },{status:400})
        }

         const salt= await bcryptjs.genSalt(10)
         const hashedPassword= await bcryptjs.hash(password, salt)

        const newUser=new User(
            {
                userName,
                email,
                password:hashedPassword
            }
         )
        const saveUser= await newUser.save()
        console.log(saveUser);
        

        // email verification email
        await emailSend({email,emailType:"VERIFY", userId:saveUser._id})
        return NextResponse.json({
            message:"User registere successfuly",
            success:true,
            saveUser
        })

    } catch (error:any) {
        return  NextResponse.json({error:error.message},
            {status:500},

        )
    }
}