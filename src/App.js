
import './App.css';
import {Route } from 'react-router-dom';
import Home from './Home'
import React,{useEffect,useState} from 'react'
import OnlineEditor from './OnlineEditor'
import { BrowserRouter} from 'react-router-dom'


function App() {
  const [Key, setKey] = useState("")
useEffect(()=>{
  const roomkey = localStorage.getItem("Roomkey")
  console.log(roomkey);
  setKey(roomkey)
},[])
  return (
    <>  
      <BrowserRouter>
        <Route exact path="/">
          {Key ? <OnlineEditor/> :<Home/> }
        </Route>
        <Route exact path="/editor">
          <OnlineEditor />
        </Route>
      </BrowserRouter>


    </>
  );
}

export default App;
