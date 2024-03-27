import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
   try{
        const reqBody = await request.json()
        const {email, password} = reqBody
        const user = await User.findOne({email})
        if(!user){
            console.log("User Doesn't exist");
            return NextResponse.json({error: "User Doesn't exist"}, {status: 400})
        }
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            console.log("Invalid credentials");
            return NextResponse.json({error: "Invalid credentials"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            success: true
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })

        const response = NextResponse.json({message: "Login Successful", success: true})

        response.cookies.set("token", token, {httpOnly: true})

        return response
   }catch(err){
       console.log(err)
       return NextResponse.json({error: "Internal Server Error"}, {status: 500})
   }
    
}

