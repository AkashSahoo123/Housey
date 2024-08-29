import React, { useContext, useState } from 'react'
import "./register.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import apiRequest from '../../lib/apiRequest';

function Register() {
  
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    setError("")
    const formData=new FormData(e.target);
    const username=formData.get("username")
    const email=formData.get("email")
    const password=formData.get("password")

    try {
      const res=await apiRequest.post("/auth/register",{
        username,email,password
      })

      // console.log(res);
      toast.success(res.data.message)
      navigate("/login");
    } catch (error) {
      
      toast.error(error.response.data.message);
      setError(error.response.data.message)
      // console.log("my error:",error)
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='registerPage'>
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                <input type="text" name='username' placeholder='Username' />
                <input type="email" name='email' placeholder='Email' />
                <input type="password" name='password' placeholder='Password' />
                <button disabled={isLoading}>Register</button>
                {error && <span>{error}</span>}
                <Link to='/login'>Do you have a account?Login</Link>
            </form>
        </div>
        <div className="imgContainer"> <img src="/bg.png" alt="" /></div>
    </div>
  )
}

export default Register
