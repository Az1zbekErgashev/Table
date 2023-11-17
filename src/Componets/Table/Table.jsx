import React, { useEffect, useState } from 'react'
import "./Table.css"
import Data from '../../Utils/Data'
import { useNavigate } from 'react-router-dom'
export default function Table() {
    const navigate = useNavigate()
    const [postsArray, setPostsArray] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [postId, setPostId] = useState('')
    const [postIndex, setPostIndex] = useState('')
    const [seach, setseach] = useState('')
    const GetPost =async()=>{
        await Data.GetPosts()
        .then(res =>{
            setPostsArray(res)
        })
    }
    const openModal =(id, index)=>{
        setDeleteModal(true)
        setPostId(id)
        setPostIndex(index)
     
    }
    const deletePost = async(id) =>{ 
        openModal(true)
       await Data.DeletePosts(postId)
       .then(res =>{
        let cur = [...postsArray]
        cur.splice(postIndex, 1)
        setPostsArray(cur)
        setDeleteModal(false)
       })
        
    }
    const seacrhArray = postsArray.filter(i =>{
        return i.title.toLowerCase().includes(seach.toLowerCase())
     })
    const closeModal =()=>{
        setDeleteModal(false)
    }
    useEffect(()=>{
        GetPost()
    },[])

    const Modal = (
        <div className={`${deleteModal ? "openModal" : "closeModal"} modal`}>
            <div className='modal-title'>
                <h1>Delete posts</h1>
                <button onClick={closeModal}>X</button>
            </div>
            <div><p>Вы действительно хотите удалить этот пост?</p></div>
            <button onClick={deletePost}>Удалить</button>
        </div>
    )
    const AddPost = (
        <div className='addModal container'>
            <button onClick={() => navigate("/createpost")} className='addPost'>Add Post</button>
            <input onChange={(i)=>setseach(i.target.value)}  placeholder='Search...' type="search"  />
            <h1>Азизбек</h1>
        </div>
    )
    return (
        <div>
            {AddPost}
            <div className={`${deleteModal ? "bacdrop" : ""}`}></div>
            {Modal}
            <table className="container-fluid">
                <thead>
                    <tr>
                        <th>
                            <h1>Id</h1>
                        </th>
                        <th>
                            <h1>User Id</h1>
                        </th>
                        <th>
                            <h1>Title</h1>
                        </th>
                        <th>
                            <h1>Body</h1>
                        </th>
                        <th>
                            <h1>Action</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {seacrhArray?.length > 0 && seacrhArray?.map((item, index) =>{
                        return(
                            <tr key={index}>
                                <td className='tableId'>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td><button onClick={() => openModal(item.id, index)}>Delete Posts</button> <button>Update Posts</button><button onClick={()=>navigate(`/user/posts/${item.id}`)}>Показать</button></td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

