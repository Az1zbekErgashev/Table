import React, { useState } from 'react'
import "./Create.css"
import { useNavigate } from 'react-router-dom'
import Data from '../../Utils/Data'
export default function CreatePost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [comment, setComment] = useState('')
    const [validateTitle, setValidateTitle] = useState(false)
    const [validateBody, setValidateBody] = useState(false)
    const [validateComm, setValidateComm] = useState(false)
    const createpost = async(evt)=>{
        evt.preventDefault() 

        if(title.length > 0 && body.length > 0 && comment.length > 0){
            const data = {
                userId: 1,
                title: title,
                body: body,
            }
            Data.CreatePost(data)
            .then(res =>{
                console.log(res);
                navigate("/")
            })
        }
    }
    function handleInput(){
        if(title.length > 0) setValidateTitle(false)
        else setValidateTitle(true)
        if(body.length > 0 ) setValidateBody(false)
        else setValidateBody(true)
        if(comment.length > 0 ) setValidateComm(false)
        else setValidateComm(true)
    }
    function validateInput(){
        if(title.length === 0 ) setValidateTitle(true) 
        else setValidateTitle(false)
        if(body.length === 0 ) setValidateBody(true)
        else setValidateBody(false)
        if(comment.length === 0 ) setValidateComm(true)
        else setValidateComm(false)
        
    }
    return (
        <div className='create'>
            <div className='create-container'>
                <form onSubmit={createpost}>
                    <div>
                        <label className={`${validateTitle ? "validate" : ""}`} htmlFor="">Title</label>
                        <input value={title} onChange={(i) => {setTitle(i.target.value); handleInput()}} type="text" name="" id="" />
                    </div>

                    <div>
                        <label  className={`${validateBody ? "validate" : ""}`}  htmlFor="">Body</label>
                        <input value={body} onChange={(i) => {setBody(i.target.value); handleInput()}} type="text" name="" id="" />
                    </div>

                    <div>
                        <label  className={`${validateComm ? "validate" : ""}`}  htmlFor="">Comments</label>
                        <input value={comment} onChange={(i) => {setComment(i.target.value); handleInput()}} type="text" name="" id="" />
                    </div>


                    <div>
                        <button onClick={() => navigate("/")}>Вернутся в таблицу</button>
                        <button type='submit' onClick={validateInput}>Создать пост</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
