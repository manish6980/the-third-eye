import React, { useState } from 'react'
import './register.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  
  let {register,handleSubmit,formState:{errors}}=useForm();
  let [err,setError]=useState("")
  let [file,setFile]=useState(null)
  
  const navigate=useNavigate()

  let Submit=(newUser)=>{

    let fd=new FormData()
    fd.append("user",JSON.stringify(newUser))
    fd.append("photo",file)

    //console.log(newUser)
    axios.post("http://localhost:3500/user-api/user-signup",fd)
    .then((response)=>{
      if(response.status===201){
        //navigate to login
        navigate("/login")
      }
      else{
        setError(response.data.message)
      }
    })
    .catch((err) => {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response received from the server');
      } else {
        setError('Error in making the request: ' + err.message);
      }
    });
  }

  //executes on file select
  const onFileSelect=(e)=>{
    setFile(e.target.files[0]);
  }

  return (
    <div className='container add-user'>
      <p className="display-3 text-center mt-5 text-light">Register</p>
      {/* Error message */}
      {err && typeof err === 'string' && err.length !== 0 && (
        <p className="display-4 text-center text-danger">{err}</p>
      )}
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
            {/* email */}
            <div className=" form-floating mb-3">
              <input type="email" id="email" placeholder="Email" className='form-control' {...register("email",{required:true})}/>
              <label htmlFor="email">Email</label>
              {/* validation */}
              <div className="valid">
                {errors.email?.type==="required" && <p className="text-danger fs-5">*Email is required</p> }
              </div>
            </div>
            {/* dob */}
            <div className=" form-floating mb-3">
              <input type="date" id="dob" placeholder="Date Of Birth" className='form-control' {...register("dob",{required:true})}/>
              <label htmlFor="dob">Date Of Birth</label>
              {/* validation */}
              <div className="valid">
                {errors.dob?.type==="required" && <p className="text-danger fs-5">*DOB is required</p> }
              </div>
            </div>
            {/* image url */}
             <div className=" form-floating mb-3">
              <input type="file" onInput={onFileSelect} id="image" placeholder="Image Url" className='form-control' {...register("image")}/>
              <label htmlFor="image">Select Profile Pic</label>
            </div> 
            {/* submit button */}
              <button type="submit" className="btn register-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
