import axios from "axios";
import { Posts, PostsDelete, GetByIdPost } from "./Axios";


class Data  {
    async GetPosts(){
        const data = axios.get(Posts)
        .then(res =>{
            return res.data
        })
        .catch(e =>{
            console.error(e)
        })
        return data
    }
    async DeletePosts(id){
        const data = axios.delete(`${PostsDelete}${id}`)
        .then(res =>{
            console.log(res);
            return res.data
        })
        .catch(e =>{
            console.error(e)
        })
        return data
    }
    async CreatePost(postdata){
        const data = axios.post(`${Posts}`, postdata)
        .then(res =>{
            console.log(res);
            return res.data
        })
        .catch(e =>{
            console.error(e)
        })
        return data
    }
    async GetById(id){
        const data = axios.get(`${GetByIdPost}${id}`)
        .then(res =>{
            console.log(res);
            return res.data
        })
        .catch(e =>{
            console.error(e)
        })
        return data
    }
    
}

export default new Data()
