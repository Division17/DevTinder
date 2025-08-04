import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password:""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
        [name] : value
    }))
 }

  const handleLogin = async() => {
   try {
     const resp = await axios.post("http://localhost:8000/login", formData, {withCredentials:true});
     console.log(resp)
     
   } catch (error) {
    console.log(error)
   } 
  }
  
  
  return (
    <div className="w-screen flex items-center justify-center p-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex justify-center items-center gap-4">
          <h2 className="card-title">Login Page</h2>
          <div className='flex flex-col gap-4'>
            <label htmlFor="emailId">Email: </label>
            <input name="emailId" type="text" placeholder="abc@gmail.com" className="input" value={formData.emailId} onChange={handleChange}/>

            <label htmlFor="password">Password: </label>
            <input  name="password" type="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange}/>
          </div>
          <div className="card-actions flex justify-center items-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login