import {connect} from "@/dbConnect/dbConfig"
import User from "@/app/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect()

export async function POST(request:NextRequest){

    const userId=await getDataFromToken(request)
    const user=await User.findOne({_id:userId}).select("-password")

    // if (!user) {
    //     throw new Error("User not found")
    // }
     return NextResponse.json({
        message:"user found",
        data:user
     })
}