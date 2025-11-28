import axios from 'axios';
import React, { useState } from 'react'

function Fileupload() {
  const [file,setfile]=useState(null)
  const [message,setmessage]=useState('')

  const handlefilechange=(e)=>{
    setfile(e.target.files[0]);
  }

  const handleupload=async()=>{
    if(!file) {
      setmessage("please select a file first")
      return;
    }
    const formdata =new FormData();
    formdata.append("image",file);

    try{
      const res=await axios.post(
        "http://localhost:5000/api/file/upload",
        formdata,
        {headers:{"Content-Type":"multipart/form-data"}}
      )
      setmessage(res.data?.message|| "upload successful")
     
    }catch(err)
    {
      console.error("upload error:",err);
      setmessage("upload failed ")
    }
  };
  return (
    <div>
      <input type='file' onChange={handlefilechange}/>
      <button onClick={handleupload}>upload</button>
      <p>{message}</p>
      
    </div>
  )
}

export default Fileupload
