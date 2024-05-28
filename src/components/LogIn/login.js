import React,{useState,useContext,useEffect} from 'react'
import './login.css'
import { useForm } from "react-hook-form";
import { loginContext } from '../../contexts/loginContext';
import { useNavigate } from "react-router-dom";

function Login() {

  let [user,loginErr,userLoginStatus,loginUser]=useContext(loginContext)

  let {register,handleSubmit,formState:{errors}}=useForm();

  let Submit=(userCredObj)=>{
    loginUser(userCredObj)
  }

  let navigate=useNavigate()

  useEffect(()=>{
    if(userLoginStatus===true){
      navigate("/user-profile")
    }
  },[userLoginStatus])

  return (
    <div className='container add-user'>
      <p className="display-3 text-center mt-5 text-light">Login</p>
      {/* Login error */}
      {loginErr.length!=0 && (<p className="display-3 text-danger text-center">{loginErr}</p> )}
      {/* responsive form */}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(Submit)}>
            {/* Username */}
            <div className=" form-floating mb-3">
              <input type="text" id="username" placeholder="Username" className='form-control' {...register("username",{required:true})}/>
              <label htmlFor="username">Username</label>
              {/* validation */}
              <div className="valid">
                {errors.username?.type==="required" && <p className="text-danger fs-5">*Username is required</p> }
              </div>
            </div>
            {/* Password */}
            <div className=" form-floating mb-3">
              <input type="password" id="password" placeholder="Password" className='form-control' {...register("password",{required:true})}/>
              <label htmlFor="password">Password</label>
              {/* validation */}
              <div className="valid">
                {errors.password?.type==="required" && <p className="text-danger fs-5">*Password is required</p> }
              </div>
            </div>
            {/* submit button */}
              <button type="submit" className="btn register-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login