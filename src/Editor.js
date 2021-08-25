import React from 'react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {Controlled as ControlledEditor} from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import "codemirror/addon/edit/closetag.js"
import "codemirror/addon/edit/closebrackets.js"
const Editor = (props) => {
    const {
        displayname,
        language,value,onChange
    } = props
    function handlechange(editor,data,value){
        onChange(value)
    }
    return (
        <div style={{backgroundColor:"#1d1d1d"}}>
            <div className="row">
               <p style={{color:"white",fontSize:"20px",marginLeft:"10px",marginTop:"5px"}}> {displayname} </p>
            </div>
            <ControlledEditor 
                onBeforeChange={handlechange}
                value={value}
                className="row"
                options={{
                    lineWrapping:true,
                    lint : true,
                    theme : "material",
                    mode : language,
                    lineNumbers:true,
                    autoCloseTags:true,
                    autoCloseBrackets:true
                }}
            />    
        </div>
    )
}

export default Editor
