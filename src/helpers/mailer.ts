import bcryptjs from "bcryptjs"
import { Verify } from "crypto";
import nodemailer from "nodemailer"
import User from "@/app/models/userModel";

export const emailSend= async({email, emailType, userId}:any)=>{
    // any used for typescript

    const hashedToken= await bcryptjs.hash(userId.toString(), 10)

    if (emailType==="VERIFY") {
        await User.findOneAndUpdate(userId,{$set:{
          verifyToken:hashedToken,
          verifyTokenExpiry:Date.now()+ 3600000
        }})
    } else if(emailType==="RESET"){
      await User.findOneAndUpdate(userId,{$set:{
        forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now()+ 3600000
      }})
    }


    try {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "84fc57b1ba62cd", // testing .env file
          pass: "694562d0c1a7f6" // testing .env file
        }
      });

        const mailOption={
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: emailType==="Verify"? "Verify your passward" :"Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` // html body
          };
          const mailRespond = await transport.sendMail(mailOption);
          return mailRespond;
    } 
    
    
    catch (error:any ) {
        throw new Error(error.message)
    }
}