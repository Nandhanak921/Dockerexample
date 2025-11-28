// import React, {useState,useEffect} from "react";
// import io from "socket.io-client";

// const socket= io.connect('http://localhost:5000');
// function socketchat(){
// const [message,setmessage]=useState('')
// const [chat,setchat]=useState([])

// const sendmessage=()=>{
//   if(message.trim()==="")return;
//   socket.emit("send_message",message)
//   setmessage("")
//   }

//   useEffect(()=>
//   {
//     fetch("http://localhost:5000/api/chats")
//     .then((res)=>res.json)
//   })
// }