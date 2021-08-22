import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import {io} from 'socket.io-client'
import Peer from 'peerjs';
const {v4: uuidV4}  = require('uuid');

const Navbar = (props) => {

    const socket = useRef()

    const [Joined, setJoined] = useState(false)
    const [Id, setId] = useState("")
    const ExitRoom =()=>{
        localStorage.removeItem("Roomkey");
        localStorage.removeItem("RoomName");
        window.location.href='/'
    }
    // const peer = new Peer(undefined,{
    //     host: 'localhost',
    //     port: 9000,
    //     path: '/myapp'
    // }); 
    // const audio = document.createElement('audio');

    useEffect(async()=>{

        
        // const roomkey = localStorage.getItem("Roomkey")
        // socket.current = io("ws://localhost:4000")

        // peer.on('open',id=>{
        //     socket.current.emit('join-room',roomkey , id)
        // })
        
        // socket.current.on('user-connected',userId=>{
        //     console.log('UserConnected : ' + userId );
        // })

    },[])

    const handlejoin = async()=>{
        setJoined(true)
      
    }
  
 
    const handleleave= async()=>{
        setJoined(false)
     
    }



    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
       
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <button class="btn btn-primary" onClick={() => {navigator.clipboard.writeText(props.keys+"/"+props.name)}} style={{marginLeft:"20px"}} >Copy Room Id</button>
      <button class="btn btn-primary" onClick = {ExitRoom} style={{marginLeft:"20px"}}>Exit Room</button>
      <button class="btn btn-primary" style={{marginLeft:"20px"}} onClick={handlejoin}>Join Room</button>
      {Joined? <button class="btn btn-primary" style={{marginLeft:"20px"}} onClick={handleleave}>Leave Room</button>: <></>}
      <audio autoplay="true" style={{display:"none"}}></audio>
      
      
  

  </div>
</nav>
        </div>
    )
}

export default Navbar
