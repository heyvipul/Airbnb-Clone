import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import axios from "axios"
import { UserContext } from '../UserContext'

const LoginPage = () => {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const navigate = useNavigate();

  const {setUser} =  useContext(UserContext)

  async function handleLogin(e){
   e.preventDefault();
   try {
    const response = await axios.post('/login', { email, password },{ withCredentials: true });

    if (response.data.data === 'password match') {
      setUser(response.data.userDoc)
      // console.log(response.data.userDoc);
      // console.log(response.data.data);
      alert('Login successful!');
      navigate("/")

    } else {
      alert('Wrong Credentials');
    }
    
    } catch (error) {
      alert('User not found or login failed');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-64'>
        <h1 className='text-4xl text-center font-semibold mb-4'>Login</h1>

        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
            <input type="email" placeholder='email@gmail.com' 
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
            <input type="password" placeholder='enter password' 
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
            <button className='login'>Login</button>
            <div className='text-center py-2 text-gray-500'>
                Don't have an account yet? <Link className='underline text-black' to={"/register"}>Register now</Link>
            </div>
        </form>

    </div>
   
    </div>
  )
}

export default LoginPage