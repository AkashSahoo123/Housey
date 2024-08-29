import React, { useContext, useState } from 'react'
import "./profileUpdatePage.scss";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';
function ProfileUpdatePage() {
    const navigate =useNavigate();
    const [error,setError]=useState("");
    const {currentUser,updateUser}=useContext(AuthContext)
    const [avatar,setAvatar]=useState([]);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const {username,email,password}=Object.fromEntries(formData);

        try {
            
            const res=await apiRequest.put(`/users/${currentUser.id}`,{
                username,
                email,
                password,
                avatar:avatar[0]
            })
            updateUser(res.data);
            toast.success(res.data.message);
            // console.log(res.data);
            navigate("/profile")
        } catch (error) {
            // console.log(error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setError(errorMessage);
            toast.error(errorMessage)
        }
    }

  return (
    <div className='profileUpdatePage'>
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <h1>Update Profile</h1>
                <div className="item">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' defaultValue={currentUser.username}/>
                </div>
                <div className="item">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' defaultValue={currentUser.email}/>
                </div>
                <div className="item">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' />
                </div>
                <button>Update</button>
                {error && <span>{error}</span>}
            </form>
        </div>
        <div className="sideContainer">
            <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt=""  className='avatar'/>
            <UploadWidget 
                uwConfig={{
                    cloudName:"darj2y313",
                    uploadPreset:"akash_estate",
                    multiple:false,
                    maxImageFileSize:2000000,
                    folder:"avatars"
                }}
                setState={setAvatar}
            />
        </div>
    </div>
  )
}

export default ProfileUpdatePage
