import React from 'react'

const Signup:React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-100'>
      <h1 className='font-bold text-2xl'>Create an account</h1>
      <div className='flex justify-center'>
      <table>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            </tr>
           
        </thead>
        <tbody>
            <tr>
                <td><input type="text" className='border-2 py-2 px-2'  placeholder='john' /></td>
            
          <td><input type="text" className='border-2 py-2 px-2' placeholder='smith'/></td></tr>
          <tr>
            <th>Email</th>
            </tr>
            <tr>
          <td><input type="email" className='border-2 py-2 px-2'placeholder='johnsmith@gmail.com' /></td></tr>
          <tr>
            <th>Phone number</th>
            </tr>
            <tr>
          <td><input type="number" className='border-2 py-2 px-2' placeholder='1234456788' /></td></tr>
          
        </tbody>
      </table>
      
      </div>
      <div>
        <p><input type="checkbox" />I agree to the Terms of Services and Privacy Policy</p>
      </div>
      <button className='bg-blue-300 min-w-[400px] m-5 p-3 rounded-lg'>Create account</button>
      <p className='m-0 text-xs font-semibold'>Already have an account? Sign in</p>
    </div>
  )
}

export default Signup