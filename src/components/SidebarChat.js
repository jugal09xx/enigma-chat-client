import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import axios from "axios";
import Avatar from '../assets/jugal.jpg'
//import axios from 'axios'

function SidebarChat(props) {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversation = () => {
      axios
        .get(
          "https://enigma-api.herokuapp.com/room/1e597cdc3a8c4d86aa7c21f892ab7fd0",
          headers
        )
        .then((res) => {
          const convo = res.data.users;
          setConversation(convo);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getConversation();
    console.log(conversation)
  },[]);

  const [chatroomId, setChatroomId] = useState("");

  const options = {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  };

  const headers = {
    headers: {
      authorization: localStorage.getItem("authorization"),
    },
  };

  const data = {
    userIds: [
      "6288b117f20c495e987067f6ba1e19e5",
      "a6e0043c97384e5ca271acce64bd29bc",
      "1bea0afa06a1417199ceee1ddead0bbe",
    ],
    type: "consumer-to-consumer",
  };

  /* async function createChatRoom() {
       await axios.post('http://localhost:9000/room/initiate', data, options
        ).then(res => {
            console.log(res.data)
            setChatroomId(res.data.chatRoom.chatRoomId)
        }).catch(error => {
            console.log(error)
        })
    } */

  const currentUser = props.currentUser;
  return (
    <div className="Chat">
      <div className='Chat-img'>
                <img src={Avatar} alt='avatar'></img>
            </div> 
      <div className="Chat-info" onClick={() => console.log(conversation[0].firstName)}>
        <h2>SEPM Project</h2>
        <p className='subtext'>
        {conversation.map((item) => 
        <>
            {item.firstName + ", "}
            </>
        )}
        </p>
    </div>
      {/* <div className='Chat-info'>
                <p>{chatroomId}</p>
            </div> */}
    </div>
  );
}

export default SidebarChat;
