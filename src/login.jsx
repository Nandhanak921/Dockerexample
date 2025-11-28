import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  
      const [email,setEmail] = useState("");
      const [password,setPasssword] = useState("");
      const [response,setResponse] = useState('');
      const nav=useNavigate()
      const handleLogin  = async () => {
        try{
            const res = await axios.post("http://localhost:5000/api/login",{
                
                email,
                password,
            });
            setResponse(res.data.message);
           

        }catch (err) {
            setResponse(err.response?.data?.message || "login error ");
        }
    };
  return (
    
      
   
   <div>
        <h2>login Now...!</h2>
        
         <input
         type="email"
         placeholder='enter email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}/><br />

         <input
         type="password"
         placeholder='enter password'
         value={password}
         onChange={(e) => setPasssword(e.target.value)}/><br />

         <button onClick={handleLogin}>Login</button>
         <p>{response}</p>
         </div>
  );
}

export default Login
