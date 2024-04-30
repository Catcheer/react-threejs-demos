import { useLayoutEffect, useState } from "react";

import { Button,Checkbox  } from "antd";





const  ToDoList:React.FC=() =>{

    let initList:Array<ToDoList.ITodo> = [
        {
            id:1,
            title:'语文作业',
            done:false
        },
        {    id:2,
            title:'数学作业',
            done:false
        }
    ]

    let  [list,setList] = useState(initList)

    const handleChangeTaskStatus=(item:ToDoList.ITodo)=>{
            console.log(item);
            let newItem = {...item,done:!item.done}
            setList(list.map((item,i)=>{
                if(item.id===newItem.id){
                    return newItem
                }
                return item
            }))
    }

    useLayoutEffect(()=>{
        console.log(list);
    },[list])
    return (
        <div>
            <ul>
                {list.map((item,index)=>{
                    return <li key={index}>
                        <span>{item.title}</span>
                        <span><Checkbox checked={item.done} onChange={()=>{handleChangeTaskStatus(item)}} /> </span>
                    </li>
                })}
            </ul>
            <div></div>
            <Button type="primary">addTask</Button>
        </div>
    )
}

export default ToDoList