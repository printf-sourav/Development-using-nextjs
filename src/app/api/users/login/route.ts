import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function  POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }

        const vaildPassword = await bcryptjs.compare(password,user.password);
        if(!vaildPassword){
            return NextResponse.json({message:"wrong password"},{status:400})
        }
        
        const tokenData = {
            id: user._id,
            username:user.username,
            email:user.email

        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn: "1h"});

        const response =NextResponse.json({
            message:"Login success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;
         
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
    
}