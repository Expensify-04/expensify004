import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import img1 from '../assets/slide1 (1).png'
import img2 from '../assets/slide2.png'
import img3 from '../assets/slide3.png'


const images =[
  img1,img2,img3
]

const Signup:React.FC = () => {
  const [currentIndex,setCurrentIndex]=useState<number>(0)
  const navigate=useNavigate()
  const [firstname,setFirstname]=useState<string>("")
  const[Lastname,setLastname]=useState<string>("")
  const [email,setEmail]=useState<string>("")
  const [phonenumber,setPhoneNumber]=useState<string>("")
  const[password,setPassword]=useState<string>("")
  const[confirmpassword,setConfirmPassword]=useState<string>("")
  const[error,setError]=useState<string>("")
const validation=(email:string)=>{
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


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
    localStorage.setItem("phonenumber",phonenumber)
    localStorage.setItem("password",password) 

    toast.success("Account created successfully")
    navigate('/signin')
     

  }
  return (
    <>
    <div className='flex bg-slate-100'>
       <div className="relative">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          className="w-[700px] h-[640px] "
        />

        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={prevImage}
        >
          &#10094;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={nextImage}
        >
          &#10095;
        </button>
      </div>

      <div className="mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`btn btn-xs mx-1 ${currentIndex === index ? 'bg-cyan-500' : 'bg-gray-300'}`}
          >
          </button>
        ))}
      </div>
      <div className='text-center mt-[60px] relative p-5 left-[60px]'>
      <h1 className='font-bold text-2xl'>Create an account</h1>
      <form onSubmit={handleSignup}>
      <div className='align-middle text-center  '>
       <div className='m-3'>
         <input type="text" placeholder='First Name' value={firstname } onChange={(e)=>setFirstname(e.target.value)} required className='border-2 border-cyan-500 py-2 px-2  w-[350px] rounded-xl outline-none' />
         </div>
         <div className='m-3'>
         <input type="text" placeholder='Last Name' required value={Lastname} onChange={(e)=>setLastname(e.target.value)} className='border-2 border-cyan-500 py-2 px-2  w-[350px] rounded-xl outline-none '/>
       </div>
        <div className='m-3'>
          <input type="email" placeholder='Enter mail id' required value={email} onChange={(e)=>setEmail(e.target.value)} className='border-2 border-cyan-500 py-2 px-2  w-[350px] rounded-xl outline-none' />{error && <p style={{color:'red'}}>{error}</p>}
        </div>
        <div className='m-3'>
          <input type="number" placeholder='Enter phone number' required value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)} className='border-2 border-cyan-500 py-2 px-2  w-[350px] rounded-xl outline-none' />{error && <p style={{color:'red'}}>{error}</p>}
        </div>
        <div className='m-3'>
          <input type="password" placeholder='Enter password' required value={password} onChange={(e)=>setPassword(e.target.value)} className='border-2 border-cyan-500 py-2 px-2  w-[350px] rounded-xl outline-none' />
        </div>
        <div className='m-3'>
          <input type="password" placeholder='Confirmpassword' required value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='border-2 border-cyan-500 py-2 px-2 w-[350px] rounded-xl outline-none' name="" id="" />
        </div>
      </div>
      <div className='align-middle text-center'>
        <p><input type="checkbox" required className='m-3'/>I agree to the Terms of Services and Privacy Policy</p>
      </div>
      <button className='bg-cyan-600 min-w-[400px] m-5 p-3 rounded-lg text-white' type='submit'>Create account</button>
      </form>

      <p className='m-0 text-xs font-semibold'>Already have an account? <Link to='/signin' className='text-cyan-500 text-sm font-semibold hover:underline'>Sign in</Link> </p>
    </div>
    </div>
    </>
  )
}

export default Signup