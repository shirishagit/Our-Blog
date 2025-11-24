import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext.jsx';

const Login = () => {


     const {navigate , axios , setToken} = useAppContext();

      const [email,setEmail] = useState('')
      const [password, setPassword] = useState('')

      const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/admin/login',{email, password});
            if(data.success){
                setToken(data.token);
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                navigate('/admin');
            }
            else{
                alert("Login failed: " + data.message);
            }
        }
        catch (error) {
            alert("An error occurred during login: " + error.message);
        }
        
      }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max:md:m-6 border border-gray-300 shadow-xl shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
           <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'> <span className='text-blue-900'>Admin</span> Login</h1>
            <p className='font-light'>Enter your credenials to access admin Panel</p>
           </div>
           <form onSubmit={handleSubmit}>
            <div >
                <label>Email :</label>
                <input  onChange={e=>setEmail(e.target.value)} value={email}
                 type="text" name="email" id="email" required placeholder='Enter your Email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>
             <div >
                <label>PassWord :</label>
                <input onChange={e=>setPassword(e.target.value)} value={password}
                type="password" name="passsword" id="password" required placeholder='Enter Your Passwoed' className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>
            <button type="submit" className='w-full py-3 font-medium bg-blue-900  rounded cursor-pointer hover:bg-white hover:text-black text-white transition-all'>Login</button>
           </form>
        </div>
      </div>
    </div>
  )
}

export default Login
