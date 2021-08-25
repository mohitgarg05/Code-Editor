import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Navbar from './Navbar'
import firebase from './firbaseconfigure'
import Editor from './Editor'
import {JamProvider, useJam, use} from 'jam-core-react';


function OnlineEditor() {

  const jamConfig = {domain: 'jam.systems'};
  const [html, sethtml] = useState("")
  const [Data, setData] = useState([])
  const [Key, setKey] = useState("")
  const [notDelete, setnotDelete] = useState("")
  const [css, setcss] = useState('')
  const [js, setjs] = useState('')
  const [srcDoc, setsrcDoc] = useState("")
  const [RoomName, setRoomName] = useState("")

  useEffect(()=>{
    const roomkey = localStorage.getItem("Roomkey")
    const roomname = localStorage.getItem("RoomName")

    setKey(roomkey)
    setRoomName(roomname)
    

        if(html || css || js){
            console.log("hello");
            const data = {
              html : html,
              css : css,
              js: js
            }
            firebase.database().ref().child('rooms/'+roomkey).push(data);
          }

      var firebaseRef= firebase.database().ref('rooms/'+roomkey)
      firebaseRef.on('value',function(snapshot){
        var data= snapshot.val();
        
        setData(data);
        if(data){
          const objectVal = Object.values(data);
          const objectKey = Object.keys(data);
         
          const lenth = objectVal.length
   
          setnotDelete(objectKey[lenth-1])
          
          
         
            sethtml(objectVal[lenth-1].html)
            setcss(objectVal[lenth-1].css)
            setjs(objectVal[lenth-1].js)
        
           
        
          
        }
     
      
       
      })
  },[html,css,js])

  useEffect(()=>{
   
    const objectKey = Object.keys(Data);
    

    objectKey.map((item)=>{
      
      if(item !== notDelete){
        
        firebase.database().ref(`rooms/${Key}/${item}`).remove()
      }
     
    })

  },[notDelete])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setsrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    },250)

    return ()=> clearTimeout(timeout)
  },[html,css,js])
 
  return (
    <>
      
    <div  style={{height:"100%",width:"1507px"}}>
      <div className="row">
        <JamProvider options={{jamConfig}}>
          <Navbar keys = {Key} name={RoomName} />
        </JamProvider>
      </div>
      <div className="row" style={{height:"50%",backgroundColor:"#121212"}}>
        <div className="col-md-3" style={{border:"solid",width:"490px"}}>
         <Editor  language="xml" 
                displayname="HTML"
                value={html}
                onChange={sethtml}
                />
        </div>
        <div  style={{border:"solid",marginLeft:"20px",width:"490px"}}>
         <Editor language="css" 
                displayname="CSS"
                value={css}
                onChange={setcss}/>
        </div>
        <div className="col-md-3" style={{border:"solid",marginLeft:"20px",width:"490px"}}>
         <Editor language="js" 
                displayname="JS"
                value={js}
                onChange={setjs}/>
        </div>
       
      </div>
      <div className="row" style={{height:"50%"}}>
        <iframe style={{padding:"0px"}}
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%" />
      </div>
    </div>
    </>
  );
}

export default OnlineEditor;
