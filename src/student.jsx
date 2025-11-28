import React, { useState } from 'react'
import axios from 'axios'

function Student() {
  const [name,setname]=useState('')
  const [branch,setbranch]=useState('')
  const [email,setemail]=useState('')
  const [msg,setmsg]=useState('')
  const [students,setstudents]=useState([])

  const handlesubmit=async(e)=>{
    e.preventDefault();

    try{
      await axios.post('http://localhost:5000/api/stud/addstudent',{
        name,
        branch,
        email,
      })
      setmsg('student added succesfully')
      setname('')
      setbranch('')
      setemail('')

      getstudents()
    }catch(err){
      setmsg('error addeding student');

    }
  }

  const getstudents=async()=>{
    try{
      const res=await axios.get('http://localhost:5000/api/stud/getstudent')
    setstudents(res.data) }
    catch(err){
      console.log("error fetching students")
    }
  }
  return (
    <div style={{width:'500px',margin:'auto',marginTop:'50px'}}>
      <h1>Student Management </h1>

      <div style={{padding:'20px',border:'1px solid grey',marginBottom:'20px'}}>
      <h2> Add student</h2>
      <form onSubmit={handlesubmit}>

      <input type='text' placeholder='enter name' value={name} onChange={(e)=>setname(e.target.value)}/><br/>
     
      
    <input type='text' placeholder='enter Branch' value={branch} onChange={(e)=>setbranch(e.target.value)}/><br/>
      <input type='email' placeholder='enter email' value={email} onChange={(e)=>setemail(e.target.value)}/><br/>
      <button type='submit'>Add Student</button><br/>
     </form>
     <p>{msg}</p>
      </div>
    
      <div style={{padding:'20px',border:'1px solid grey'}}>
        <h2>student list</h2>

        <table border='1' cellPadding='10' width='450px'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Email</th>
            </tr>
          </thead>
          <br/>
          <br/>
          <tbody>

            {students.map((stud)=>(
              <tr key={students._id}>
                <td>{stud.name}</td>
                <td>{stud.branch}</td>
                <td>{stud.email}</td>
                </tr>
            ))}

           <br/><br/>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
