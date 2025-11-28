import React, { useState } from 'react'
import axios from 'axios'

function Helloapi() {
  const [input,setinput]=useState('')
  const [response,setresponse]=useState('')

  const sendmessage=()=>{
    axios.post('http://localhost:5000/api/message',{message:input})
    .then(res=>setresponse(res.data.reply))
    .catch((err)=>console.error('axios post error',err))

  }
  return (
    <div>
      <h2>Frontend backend connection</h2>
      <input type='text' value={input} onChange={(e)=>setinput(e.target.value)}></input>
      
      <button onClick={sendmessage}>send</button><br/>
      {response}
      
    </div>
  )
}

export default Helloapi
