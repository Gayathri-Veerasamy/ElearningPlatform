import React,{ useEffect, useState } from "react";

function Counter() {

    const[count,setCount]=useState(0);
    const[text,setText]=useState("");
    const[posts,setPosts]=useState([]);

    const increment=()=>{
       if(count<10)
        return count+1;
        else{
            
            return count;
        }
    }
    const decrement=()=>{
        // setMessage("");
        if(count>0)
            return count-1;
        else {
            return count;
        }
    }

    
    // useEffect(()=>{ 
    //     const interval=setInterval(()=>{
    //         setCount(count+1);
    //     },1000);
    //     console.log(`useEffect counter called ${count}`);
    //     }
    // ,[count]);

    useEffect(()=>{
     fetch("https://www.geeksforgeeks.org/java/")
     .then((response)=>response.json())
     .then((response)=>{
        setPosts(response);
    })
    .catch((error)=>{
        console.log(`error occurs ${error}`)
});
},[]);
    return(
        
        <div>

          <h1>Counter</h1>
          <h2>{count}</h2>
          <button onClick={()=>setCount(increment)}>+</button>
          <button onClick={()=>setCount(decrement)}>-</button>
          <button onClick={()=>setCount(0)}>Reset</button>
          <h1>Finding String Size</h1>
          <input type="text" onChange={ (e) => setText(((e.target.value)))} placeholder="Enter your text"/>
          <h2>String size:</h2>
          <h2>{text.length}</h2>
          <h2>{posts}</h2>
        
        </div>
    )
}
export default Counter;