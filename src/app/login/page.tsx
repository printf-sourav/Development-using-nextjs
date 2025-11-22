"use client";


import Link from "next/link";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { error } from "console";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user,setuser] = React.useState({
        email:"",
        password:""
    });
    const [buttonDisabled,setButtonDisabled] = React.useState(false);

    const[loading,setLoading] = React.useState(false)
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>6){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    })
    const onLogin = async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("login success",response.data);
            toast.success("LOgin success");
            router.push("/profile");

        }
        catch(err:any){
            console.log("login failed",err.message);
            toast.error(err.message)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"process":"login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input type="text"
                    id="email"
                    value={user.email}
                    onChange={(e)=>setuser({...user,email:e.target.value})}
                    placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input type="text"
                    id="password"
                    value={user.password}
                    onChange={(e)=>setuser({...user,password:e.target.value})}
                    placeholder="password"
            />
            <button onClick={onLogin} className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none">Login here</button>
            <Link href="/signup">Signup here</Link>
        </div>
    );
}