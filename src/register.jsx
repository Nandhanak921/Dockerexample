import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email,setEmail] = useState("");
    const [password,setPasssword] = useState("");
    const [response,setResponse] = useState('');
    const nav=useNavigate()

    const handleRegister = async () => {
        try{
            const res = await axios.post("http://localhost:5000/api/register",{
                name,
                email,
                password,
            });
            setResponse(res.data.message);
             nav('/login')

        }catch (err) {
            setResponse(err.response?.data?.message || "Register error");
        }
    };
  return (
    <div>
        <h2>Register Now...!</h2>
        <input
         type="text"
         placeholder='enter name'
         value={name}
         onChange={(e) => setName(e.target.value)}/><br />

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

         <button onClick={handleRegister}>Register</button>
         <p>{response}</p>
         </div>
  );
}

export default Register;