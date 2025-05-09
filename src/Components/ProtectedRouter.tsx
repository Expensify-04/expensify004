import { type JSX } from 'react'
import { useAuth } from './Authentication'
import { Navigate } from 'react-router-dom'

const ProtectedRouter= ({children}:{children:JSX.Element}) => {
     const {isLoggedIn}=useAuth()
     console.log(isLoggedIn)

     return isLoggedIn?children:<Navigate to="/" replace/>
}

export default ProtectedRouter