import React, { useEffect, useState} from 'react'
import './Chatcontent.css'
import axios from 'axios'


function Chatcontent({ currentId, channel }) {

    const [conversation,setConversation] = useState([])
    const [id, setId] = useState('')

    useEffect(() => {
        const getConversation = () => {
            axios.get('http://localhost:9000/room/1e597cdc3a8c4d86aa7c21f892ab7fd0', headers)
            .then(res => {
                setId(currentId)
                const convo = res.data.conversation
                setConversation(convo)
            }).catch(error => {
                console.log(error)
            })
        }        
        getConversation();
        channel.bind('inserted', function(data) {
            getConversation()
            setConversation([...conversation, data] )
        });
        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    },[])

    const headers = {
        headers: {
            'authorization': localStorage.getItem('authorization')
        }
    }

    return (
        <div className='chatcontent' id='chatCon'>
            {conversation.slice(0).reverse().map((item) =>
            <p className={`${id.toString() == item.postedByUser._id ? 'chat-msg chat-recv' : 'chat-msg'}`}>
                <span className='chat-name'>{item.postedByUser.firstName}</span>
                    {item.message.messageText}
                <span className='chat-time'>{item.createdAt.slice(11,16)}</span>
            </p>
                )} 
        </div>
        
    )
}

export default Chatcontent
