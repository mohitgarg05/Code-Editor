import React,{useState,useEffect} from 'react'
import firebase from './firbaseconfigure'

const Home = () => {

    const [Key, setKey] = useState("")
    const [Enterkey, setEnterkey] = useState("")
    const [RoomName, setRoomName] = useState("")
    const [Arrayy, setArrayy] = useState([])
    const CreateRoom =()=>{
     
        let Roomref = firebase.database().ref().child('rooms').push();
        var key = Roomref.key;
        setKey(key)
         
      
        const data ={
           
            roomname : RoomName,
            roomKey : key
        }
        if(localStorage.getItem('prevRooms') == null){
            var myArray = []
        }
        else{
            myArray = JSON.parse(localStorage.getItem('prevRooms'))
        }

        myArray.push(data)
        localStorage.setItem('prevRooms', JSON.stringify(myArray));
        localStorage.setItem("Roomkey",key)
        localStorage.setItem("RoomName",RoomName)
          window.location.href='/editor'
        
    }
  


    const handlechange=(e)=>{
        setEnterkey(e.target.value);
    }
    const handlechange2=(e)=>{
        setRoomName(e.target.value);
    }
    const EnterRoom=()=>{
        console.log(Enterkey.split('/')[0]);
        const data ={
           
            roomname : Enterkey.split('/')[1],
            roomKey : Enterkey.split('/')[0]
        }
        if(localStorage.getItem('prevRooms') == null){
            var myArray = []
        }
        else{
            myArray = JSON.parse(localStorage.getItem('prevRooms'))
        }
        myArray.push(data)
        localStorage.setItem('prevRooms', JSON.stringify(myArray));
        localStorage.setItem("Roomkey",Enterkey.split('/')[0]);
        localStorage.setItem("RoomName",Enterkey.split('/')[1])
         window.location.href='/editor'
    }

    useEffect(()=>{
           setArrayy(JSON.parse(localStorage.getItem('prevRooms')));
           console.log(Arrayy);
    },[])
    const EnterThis =(item)=>{
        localStorage.setItem("Roomkey",item.roomKey)
        localStorage.setItem("RoomName",item.roomname)
        window.location.href='/editor'
    }
   
     
    return (
        <>
        <div>
                <input  type="text" value={RoomName} onChange={handlechange2} />
                <button onClick={CreateRoom}>Create room</button>
                <input type="text" name="key" value={Enterkey} onChange={handlechange} />
                <button onClick={EnterRoom}>Enter room Key</button>
                <h1>Your history</h1>
                {Arrayy?.map((item)=>(
                    <div style={{border:"solid"}} onClick={()=>EnterThis(item)}>
                        <a>{item.roomKey}</a><br></br>
                        <a>{item.roomname}</a>
                    </div>
                ))}
                
               
        </div>
  
    </>
    )
}

export default Home;
