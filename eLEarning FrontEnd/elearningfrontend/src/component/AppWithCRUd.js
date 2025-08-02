import { useState } from "react";

const AppWithCRUd=()=>{
    const[posts,setPosts]=useState([]);
const url='http://localhost:8080/login';
//axios.post/put/delete(url,newPost,{header})
const token=localStorage.getItem('token');
const createPost=async(e)=>{
e.preventDefault();
try{
    const newPost={title,body};
    const headers={
        'Content-Type':'application/json',
       'Authorisation':token,
    };
    await axios.post(url,newPost,{headers});
    fetchPost();
    setTitle('');
    setBody('');
}catch(error){
    console.log(`error occurs ${error}`);
}

// const fetchPost=async () => {
//     try{
//         const response
//     }
};

    return (
        <>
        
        </>
    )
}
export default AppWithCRUd;