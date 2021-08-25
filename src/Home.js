import React,{useState,useEffect} from 'react'
import firebase from './firbaseconfigure'
import Logo from './Img/Emoji.png'
const Home = () => {

    const [Key, setKey] = useState("")
    const [Enterkey, setEnterkey] = useState("")
    const [RoomName, setRoomName] = useState("")
    const [Arrayy, setArrayy] = useState([])
    const [HomePage, setHomePage] = useState(true)
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
        

                <div className="home-page-content">

                    <div className="row app-name">
                        <div className="col-md-auto offset-md-1" style={{padding:"0"}}>
                            <img src={Logo}></img>
                        </div>
                        <div className="col-md-3">
                            <h3>Codersroom</h3>
                        </div>
                    </div>
                    <div className="home-history-button" >
                            <button className={HomePage?"active" : ""} onClick={()=>setHomePage(true)}><i class="fa fa-home" style={{fontSize:"30px"}} ></i></button>
                            <button className={!HomePage?"active" : ""} onClick={()=>setHomePage(false)}><i class="fa fa-history"  style={{fontSize:"30px"}} ></i></button>
                    </div>
                    <div className="row app-details">
                        {HomePage?<>
                            <div className=" discription" >
                      
                            <h2>Welcome to Codersroom</h2>
                            <p>Hello, Now there is no need to share your screen and talk on discord to code together .
                             Here you can code with your friend and have fun on audio channel </p>
                        </div>
                        <div className="room-details">
                            
                            <input  type="text" value={RoomName} placeholder="Enter Room Name" onChange={handlechange2} />
                            <button className="btn btn-primary room-creation" onClick={CreateRoom}>Create room</button>
                            <h2 >OR</h2>
                            <input type="text" name="key" placeholder="Enter Room Link" value={Enterkey} onChange={handlechange} />
                            <button onClick={EnterRoom} className="btn btn-primary" >Enter room </button>
                        </div>
                        </> : <>
                            <div className="history">
                                <h2>Your History</h2>
                                <table >
                                    <tr>
                                        <th>Room Key</th>
                                        <th>Room Name</th>
                                    </tr>
                                    {Arrayy?.map((item)=>(
                                       
                                       
                                        <tr>
                                     
                                            <td onClick={()=>EnterThis(item)}>{item.roomKey}</td>
                                            <td>{item.roomname}</td>
                                   
                                        </tr>
                                      
                                    ))}
                                   
                                </table>
                            </div>
                        </> }
                        
                    </div>

                </div>
                
 
    </>
    )
}

export default Home;
