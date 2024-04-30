import { useLayoutEffect } from "react";

import { Button,Checkbox  } from "antd";
import { useSelector, 
    useDispatch 
} from 'react-redux';
import { addTask, removeTask } from '../../features/todoState/list';





const  ToDoList:React.FC=() =>{
  const list = useSelector((state:any) => state.todos.value);
  const dispatch = useDispatch();

    

    const handleChangeTaskStatus=(item:ToDoList.ITodo)=>{
            console.log(item);
            // let newItem = {...item,done:!item.done}
           
    }

    const addNewTask =()=>{
        dispatch(addTask({
           
        }))
    }
   

    useLayoutEffect(()=>{
        console.log(list);
    },[list])
    return (
        <div>
          
            <ul>
                {list.map((item:any,index:number)=>{
                    return <li key={index}>
                        <span>{item.title}</span>
                        <span><Checkbox checked={item.done} onChange={()=>{handleChangeTaskStatus(item)}} /> </span>
                    </li>
                })}
            </ul>
            <div></div>
            <Button type="primary" onClick={addNewTask}>addTask</Button>
           
        </div>
    )
}

export default ToDoList