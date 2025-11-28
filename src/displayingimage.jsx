import React, { useEffect, useState } from 'react'

const Displayingimage=()=> {

  const[imageurls,setimageurls]=useState([])

  useEffect(()=>{
    fetch("http://localhost:5000/api/file/image")
    .then((response)=>response.json())
    .then((data)=>{
      console.log("img data",data.imagefilename)
      setimageurls(data.imagefilename)
    })
    .catch((err)=>console.error("error fetching images",err))
  },[])

  const baseurl='http://localhost:5000/uploads'
  
  return (
   <div style={{ width: "50%", display: "block" }}>
            <h1>Images</h1>
            {imageurls.map((image) => (
                <div style={{ marginBottom: "20px" }} key={image}>
                  
                    <img
                        style={{ width: "50%", border: "1px solid black", borderRadius: "10px" }}
                        src={`${baseurl}/${image}`} alt={`Uploaded ${image}`} 
                    />
                </div>
            ))}
        </div>
    )
}

export default Displayingimage
