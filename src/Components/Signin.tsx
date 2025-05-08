
import React from 'react'
import img from '../assets/sigin.png'
import google from '../assets/Googlelogo.png'
import phone from '../assets/phone.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';






const Signin: React.FC = () => {
  const[email,setEmail]=useState<string>("")
  const[password,setPassword]=useState<string>("")
  const navigate =useNavigate()

  function handlePhoneNumber(){
    navigate('/phonenumber')
  }
  
 const handleSignin=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
 
  const storedDetailsE=localStorage.getItem("email")
  const storedDetailsP=localStorage.getItem("password")

  if(email===storedDetailsE && password===storedDetailsP){
    toast.success("login successfully")
    navigate('/dashboard')
  }
  else{
    toast.error("Invalid email or password")
  }
 }

  const handleLogin=(response: CredentialResponse)=>{
    console.log("JWT Token",response.credential)
  }

{/* <button  className='bg-slate-200 opacity-75 font-semibold p-2 m-1 rounded-lg flex gap-3 hover:bg-slate-300'><img src={google} alt=""className='w-6' /> */}
  return (
    <div className='flex'>
        <div className='flex justify-center relative top-8 left-10  '>
            <img src={img} alt=""  />
        </div>
        <div className=' float-right p-10 mt-10 relative left-44  '>
            <h1 className='text-4xl font-bold m-3'>Sign in</h1>
            <p className='text-xs mt-4 ml-3'>Sign in with Open account</p>
            <div className='flex mt-3 mb-3 gap-3'>
          <GoogleLogin onSuccess={handleLogin}  /> 
            <button onClick={handlePhoneNumber} className='border-2 border-slate-200 p-2   rounded-lg flex gap-3 hover:bg-slate-100'><img src={phone} alt="" className='w-6' /> Phone Number</button>


const Signin:React.FC = () => {
  

  return (
    <div className='flex'>
        <div className='flex justify-center relative left-16  '>
            <img src={img} alt=""  />
        </div>
        <div className=' float-right p-10 mt-10 relative left-[200px]  '>
            <h1 className='text-4xl font-bold m-3'>Sign in</h1>
            <p className='text-xs mt-4 ml-3'>Sign in with Open account</p>
            <div className='flex mt-3 mb-3'>
            <button className='bg-slate-200 opacity-75 font-semibold p-2 m-1 rounded-lg flex gap-3 hover:bg-slate-300'><img src={google} alt=""className='w-6' />Google</button>
            <button className='bg-slate-200 p-2 m-1 opacity-75 font-semibold rounded-lg flex gap-3 hover:bg-slate-300'><img src={phone} alt="" className='w-6' /> Phone Number</button>
         </div>
         <hr />
         <div className='flex flex-col mt-3'>
            <p>Or continue with email address</p>
            <form onSubmit={handleSignin}>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-slate-200 rounded-xl pl-10 py-2 mt-3 outline-none w-[350px]' required  placeholder='Email' /><FontAwesomeIcon icon={faEnvelope} className='relative top-[-1px] left-[-340px]'/> <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-slate-200 rounded-xl pl-10 py-2 mt-3 w-[350px] outline-none' required placeholder='password' /><FontAwesomeIcon icon={faKey} className='relative top-[-1px] left-[-340px]'/>
             <div className='flex justify-between mt-3 m-2'>
             <p className='text-xs'><input type="checkbox" />Remember me</p>
            <p className='text-xs hover:underline'>Forgot Password?</p>
            </div>
            <button type='submit' className='bg-blue-300 mt-3 p-2 w-[350px] rounded-xl text-xl text-white hover:text-black'>Sign in</button>
            </form>
             <p className='text-sm m-2 justify-content ml-20'>Don't have an Account?<Link to='/signup' className='text-blue-400 font-semibold'>Sign Up</Link> </p>

         </div>
        </div>

    </div>
  )
}

export default Signin