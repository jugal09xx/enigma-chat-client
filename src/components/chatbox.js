import React, { useState } from "react";
import Info from "./Info.js";
import Chatcontent from "./Chatcontent.js"
import {MdInsertEmoticon,MdPhoto,MdSend} from 'react-icons/md'
import axios from 'axios'
import "./chatbox.css";
import {toast,ToastContainer} from 'react-toastify'

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
    await axios.post('http://localhost:9000/room/1e597cdc3a8c4d86aa7c21f892ab7fd0/message',data,options)
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

  function typing(){
    toast.success("People are typing...", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    typing()
  }

  function scrollBottom(e){
    var chatContainer = document.getElementsByClassName('chat-container')
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }



  return (
    <div className="chatbox">
    
      <div className='chat-container'>
        <Chatcontent currentId={currentId} channel={channel}/>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={!true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          limit={1}
        />
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
