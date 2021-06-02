import React, { useEffect, useState } from 'react'
import './Info.css'
import jugal from '../assets/jugal.jpg';
import {MdAccessTime} from 'react-icons/md';
import axios from 'axios';

function Info(props) {

    const [activeUser,setActiveUser] = useState(null)
    const [name,setName] = useState(null)
    const [id,setId] = useState(null)

    const url = 'http://localhost:9000'

    useEffect(() => {
        setActiveUser(props.currentId)
        const getCurrentUser = () => {
            axios.get(`${url}/users/` + activeUser)
            .then(res => {
              const name = res.data.user.firstName
              setId(res.data.user._id.slice(0,6).toUpperCase())
              setName(name)
              console.log(name)
            }).catch(error => {
              console.log(error)
            })
          }
          getCurrentUser();
    },[props.currentId])

    return (
    <div>
        <div className='info-img'>
            <img src={jugal} alt='user-img'></img>
        </div>
        <div className='info-header'>
            <h2>{name}</h2>
        </div>
        <div className='info-details'>
            <p>
                <span>Enigma ID</span>   {id}
            </p>
        </div>
    </div>
    )
}

export default Info
