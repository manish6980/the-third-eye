import { useState } from "react";
import {loginContext} from "./loginContext";
import axios from "axios";

function UserLoginStore({children}){
    let[user, setUser]=useState({})
    let [loginErr,setLoginErr]=useState("")
    let [userLoginStatus,setUserLoginStatus]=useState(false)

    const loginUser=(userCredObj)=>{
        axios.post("http://localhost:3500/user-api/user-login",userCredObj)
        .then((response)=>{
            if(response.data.message==="Success"){
                //save token to local storage
                localStorage.setItem("token",response.data.token)
                setUser({...response.data.user})
                setLoginErr("")
                setUserLoginStatus(true)
            }
            else{
                console.log("user login failed",loginErr);
                setLoginErr(response.data.message)
            }
        })
        .catch(err=>{
            console.log(err);
            setLoginErr(err.message)
        })
    }

    const logoutUser=()=>{
        localStorage.clear()
        setUserLoginStatus(false)
    }

    return(
        <loginContext.Provider value={[user,loginErr,userLoginStatus,loginUser,logoutUser]}>
            {children}
        </loginContext.Provider>
    )
}

export default UserLoginStore