import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Data from '../../Utils/Data'
import axios from 'axios'
import "./User.css"
import { useNavigate } from 'react-router-dom'
export default function UserMessage() {
    const navigate = useNavigate()
    const [userPost, setUserPost] = useState([])
    const [user ,setuser] = useState([])
    const [loading, setLoading] = useState(true);
    const params = useParams()
    const run = () =>{
        Data.GetById(params.id)
        .then(res =>{
            setUserPost(res)
        })
    }
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res =>{
            res.data.map(i =>{
                if(i.id === userPost.userId){
                    setuser(i)
                }
            })
        })
    },[])
    useEffect(()=>{
        run()
    },[])
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    
      }, []);
      console.log(user);
    return (
        <div>
            <div className={`user-card ${loading ? 'skeleton' : ''} user-card `}>
                <div className="user-details">
                <div className="user-name hide-text">User: {user.name}</div>
                <div className="user-name hide-text">User Email: {user.email}</div>
                <div className="user-name hide-text">User Name: {user.username}</div>
                <div className="user-name hide-text">Web Site: {user.website}</div>
                <div className="user-name hide-text">Title: {userPost.title}</div>
                <div className="user-email hide-text">Body: {userPost.body}</div>
                </div>
                <div className='user-btn'>
                    <button onClick={()=> navigate("/createpost")}>Создать новый</button>
                    <button>Редактировать</button>
                </div>
            </div>
        </div>
    )
}
