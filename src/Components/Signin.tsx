import React from 'react'
import img from '../assets/sigin.png'
import google from '../assets/Googlelogo.png'
import phone from '../assets/phone.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';


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
            <input type="email" className='bg-slate-200 rounded-xl pl-10 py-2 mt-3 outline-none'  placeholder='Email' /><FontAwesomeIcon icon={faEnvelope} className='relative bottom-7 right-[120px]'/> <br />
            <input type="password" className='bg-slate-200 rounded-xl pl-10 py-2 outline-none' placeholder='password' /><FontAwesomeIcon icon={faKey} className='relative bottom-6 right-[120px]'/>
             <div className='flex justify-between mt-3'>
             <p className='text-xs'><input type="checkbox" />Remember me</p>
            <p className='text-xs hover:underline'>Forgot Password?</p>
            </div>
            <button className='bg-blue-300 mt-3 p-2 rounded-xl text-xl text-white hover:text-black'>Sign in</button>
             <p className='text-sm m-2 justify-content ml-10'>Don't have an Account?Sign Up</p>
         </div>
        </div>

    </div>
  )
}

export default Signin