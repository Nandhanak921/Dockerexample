import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function BackRegistration() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [add, setAdd] = useState("")
  const [cpass, setCpass] = useState("")
  const [alertmsg, setalertmsg] = useState("")
  const [alerttype, setalerttype] = useState("")
  const serverURL = 'http://localhost:5000'
  const nav = useNavigate()
  const handleReg = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/api/reg/addreuser`, {
        name: name,
        email: email,
        address: add,
        password: pass,
        cpass: cpass
      })

      setalertmsg("registration successful")
      setalerttype("success")
      nav('/log')
    } catch (err) {
      setalertmsg("Registration failed")
      setalerttype("danger")
      console.log("failed");
    }
  }


  return (
    <div>
      {alertmsg && (

        <div
          style={{ width: "40%" }}
          className={`alert alert-${alerttype} alert-dismissible fade show alert-center`} 
          role="alert">
          {alertmsg}

          <button
            type='button'
            className='btn-close'
            aria-label='close'
            onClick={() => setalertmsg('')}>

          </button>
        </div>
      )}

      <form onSubmit={handleReg}>
        <div className='container bg-light text-dark border-2 border-danger'
          style={{ width: "50%", height: "auto" }}>
          <h2>Register</h2>

          <div className='row'>
            <div className='col-4'>
              <label className='form-label' htmlFor="">Name</label>
            </div>
            <div className='col-6'>
              <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} required />
            </div>
          </div><br />

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
            <div className='col-4'>
              <label htmlFor='' className='form-label'>Address</label>
            </div>
            <div className='col-6'>
              <input type="Adress" className='form-control' onChange={(e) => setAdd(e.target.value)} required />
            </div>
          </div><br />

          <div className='row'>
            <div className='col-4'>
              <label htmlFor='' className='form-label'>Confirm password</label>
            </div>
            <div className='col-6'>
              <input type="password" className='form-control' onChange={(e) => setCpass(e.target.value)} required />
            </div>
          </div><br />

          <div className='row'>
            <div className='col-10'>
              <button type='submit' className='btn btn-warning'>Register</button>
            </div>

          </div>
        </div>

      </form>

    </div>
  )
}

export default BackRegistration
