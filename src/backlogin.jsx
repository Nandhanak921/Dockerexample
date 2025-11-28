import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function BackLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [alertmsg, setalertmsg] = useState("")
    const [alerttype, setalerttype] = useState("")
    const serverURL = 'http://localhost:5000'
    const nav = useNavigate()
   

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${serverURL}/api/reg/addlgn`, {
                email: email,
                password: pass
            })

            const { authtoken, userId, user } = resp.data;

            localStorage.setItem("authtoken", authtoken);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userEmail", user.email);

            setalertmsg("login successful")
            setalerttype("success")
            // nav('/hello')

        } catch (err) {

            console.log("login ERROR", err);
            setalertmsg(err.response?.data?.error || "Login failed")
            setalerttype("danger")
        }
    }



    return (
        <div>
            {alertmsg && (

                <div style={{ width: "40%" }} className={`alert alert-${alerttype} alert-dismissible fade show alert-center`} role="alert">
                    {alertmsg}
                    <button type="button" className='btn-close' aria-label='close' onClick={() => setalertmsg('')}>
                    </button>
                </div>
            )}



            <form onSubmit={handlelogin}>
                <div className='container bg-light text-dark border-2 border-danger'
                    style={{ width: "50%", height: "auto" }}>
                    <h2>Login</h2>

                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor='' className='form-label'>Email</label>
                        </div>
                        <div className='col-6'>
                            <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div><br />

                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor='' className='form-label'>password</label>
                        </div>
                        <div className='col-6'>
                            <input type="password" className='form-control' onChange={(e) => setPass(e.target.value)} required />
                        </div>
                    </div><br />

                    <div className='row'>
                        <div className='col-10'>
                            <button type='submit' className='btn btn-warning'>LOGIN</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BackLogin