import React, { useState } from "react";
import Info from "./Info.js";
import Chatcontent from "./Chatcontent.js"
import {MdInsertEmoticon,MdPhoto,MdSend} from 'react-icons/md'
import axios from 'axios'
import "./chatbox.css";

function Chatbox({ channel, currentId }) {

  //console.log('from chatbox ' + currentId)

  const [currentUser,setCurrentUser] = useState('')
  const [message,setMessage] = useState('')


  const options = {
    headers: {
      'authorization': localStorage.getItem('authorization')
    }
  }

  const data = {
    'messageText': message
  }

  async function postMessage(){
    await axios.post('https://enigma-api.herokuapp.com/room/1e597cdc3a8c4d86aa7c21f892ab7fd0/message',data,options)
    .then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postMessage()
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
  }

  function scrollBottom(e){
    var chatContainer = document.getElementsByClassName('chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }



  return (
    <div className="chatbox">
    
      <div className='chat-container'>
        <Chatcontent currentId={currentId} channel={channel}/>
        <div className="chat-send">
            <MdInsertEmoticon className='chat-send-icon1'/>
          <form onSubmit={handleSubmit}>
            <input value={message} placeholder="type a message" type="text" onChange={handleInput}></input>
            <button className='send-btn' type="submit"><MdSend className='send-btn-icon'/></button>
          </form>
          <MdPhoto className='chat-send-icon2'/>
        </div>
      </div>
      <div className="chatbox-info">
        <Info currentId={currentId}/>
      </div>
    </div>
  );
}

export default Chatbox;
