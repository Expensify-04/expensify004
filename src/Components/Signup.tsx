import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup:React.FC = () => {
  const navigate=useNavigate()

  const [firstname,setFirstname]=useState<string>("")
  const[Lastname,setLastname]=useState<string>("")
  const [email,setEmail]=useState<string>("")
  const[password,setPassword]=useState<string>("")
  const[confirmpassword,setConfirmPassword]=useState<string>("")
  const[error,setError]=useState<string>("")
const validation=(email:string)=>{
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}


  const handleSignup=(e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault()
   
       if(!validation(email)){
        setError("Invalid email format")
        return;
      }
      else{
        setError(" ")
      }
      if(password!==confirmpassword){
         toast.error("Invalid password")
         return;
       }

        localStorage.setItem("firstname",firstname)
      localStorage.setItem("lastname",Lastname) 
    localStorage.setItem("email",email)
    localStorage.setItem("password",password) 

    toast.success("Account created successfully")
    navigate('/signin')
     

  }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-100'>
      <h1 className='font-bold text-2xl'>Create an account</h1>
      <form onSubmit={handleSignup}>
      <div className='align-middle text-center  '>
       <div className='m-3'>
         <input type="text" placeholder='First Name' value={firstname } onChange={(e)=>setFirstname(e.target.value)} required className='border-2 border-blue-400 py-2 px-2  w-[350px] rounded-xl outline-none' />
         </div>
         <div className='m-3'>
         <input type="text" placeholder='Last Name' required value={Lastname} onChange={(e)=>setLastname(e.target.value)} className='border-2 border-blue-400 py-2 px-2  w-[350px] rounded-xl outline-none '/>
       </div>
        <div className='m-3'>
          <input type="email" placeholder='Enter mail id' required value={email} onChange={(e)=>setEmail(e.target.value)} className='border-2 border-blue-400 py-2 px-2  w-[350px] rounded-xl outline-none' />{error && <p style={{color:'red'}}>{error}</p>}
        </div>
        <div className='m-3'>
          <input type="password" placeholder='Enter password' required value={password} onChange={(e)=>setPassword(e.target.value)} className='border-2 border-blue-400 py-2 px-2  w-[350px] rounded-xl outline-none' />
        </div>
        <div className='m-3'>
          <input type="password" placeholder='confirmpassword' required value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='border-2 border-blue-400 py-2 px-2 w-[350px] rounded-xl outline-none' name="" id="" />
        </div>
      </div>
      <div className='align-middle text-center'>
        <p><input type="checkbox" className='m-3' />I agree to the Terms of Services and Privacy Policy</p>
      </div>
      <button className='bg-blue-300 min-w-[400px] m-5 p-3 rounded-lg' type='submit'>Create account</button>
      </form>

      <p className='m-0 text-xs font-semibold'>Already have an account? <Link to='/signin' className='text-blue-400 font-semibold'>Sign in</Link> </p>
    </div>
  )
}

export default Signup