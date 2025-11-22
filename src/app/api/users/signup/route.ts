import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password}= reqBody;

        

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User alreadt exisit"},{status:200})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User ({
            username,email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        return NextResponse.json({message:"User created",success:true,savedUser})
    
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:400})
    }
}