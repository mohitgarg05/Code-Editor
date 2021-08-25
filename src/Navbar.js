import React,{useEffect,useState,useRef} from 'react'

import {createJam} from 'jam-core';


const Navbar = (props) => {

   
    let jamConfig = {domain: 'jam.systems'};
    const [state, {setProps, enterRoom, createRoom}] = createJam({jamConfig});
    const [Key, setKey] = useState("")
    const [Joined, setJoined] = useState(false)

   
    useEffect(async()=>{

        
         const roomkey = localStorage.getItem("Roomkey")
        setKey(roomkey)
       

    },[])
    
    const ExitRoom =()=>{
        localStorage.removeItem("Roomkey");
        localStorage.removeItem("RoomName");
        window.location.href='/'
    }

    const handlejoin = async()=>{
        setJoined(true)
        let roomId = Key;
        
        createRoom(roomId, {name: Key, stageOnly: true});
        await setProps({roomId,userInteracted: true});
       
        await enterRoom(roomId);
        console.log(state.inRoom);
    }
  
 
    const handleleave= async()=>{
        setJoined(false)
     
    }



    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#121212",width:"1518px"}}>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
       
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <div style={{marginLeft:"auto"}}>
      <button class="btn " onClick={() => {navigator.clipboard.writeText(props.keys+"/"+props.name)}} style={{marginLeft:"20px"}} >Copy Room Id</button>
      <button class="btn " onClick = {ExitRoom} style={{marginLeft:"20px"}}>Exit Room</button>
      <button class="btn " style={{marginLeft:"20px"}} onClick={handlejoin}>Join Room</button>
      {Joined? <button class="btn" style={{marginLeft:"20px",backgroundColor:"rgb(68,72,87)",color:"white",width:"150px"}} onClick={handleleave}>Leave Room</button>: <></>}
      <audio autoplay="true" style={{display:"none"}}></audio>
    </div>
    
      
      
  

  </div>
</nav>
        </div>
    )
}

export default Navbar
