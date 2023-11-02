import React,{useEffect} from 'react';

function Home(){
    useEffect(()=>{
        console.log('home')
    },[])
    return <div>home</div>
}

export default Home