import { useLayoutEffect ,useState} from "react";

import { Button, Checkbox, Input, Col, Row } from "antd";
import {
    useSelector,
    useDispatch
} from 'react-redux';
import { addTask, removeTask, updateTask } from '../../features/todoState/list';
import './index.css'

const ToDoList: React.FC = () => {
    const list = useSelector((state: any) => state.todos);
    const dispatch = useDispatch();
    const [itemTxt,setItemTxt] = useState('')


    const handleChangeTaskStatus = (item: ToDoListType.ITodo) => {
        console.log(item);
        let newObj = { ...item, done: !item.done };
        dispatch(updateTask(newObj as any))

    }

    const addNewTask = () => {
        dispatch(addTask({ title:itemTxt || 'new task', done: false } as any))
        setItemTxt('')
    }

    const handleChangeTxt = () => {
        return (e: any) => {
            setItemTxt(e.target.value)
        }
    }


    useLayoutEffect(() => {
        console.log(list);
    }, [list])
    return (
        <Row className="wrap">
            <Col span={12}>
                <ul className="left">
                    {list.map((item: any, index: number) => {
                        return <li key={index}>
                            <span className="item_txt">{item.title}</span>
                            <span ><Checkbox checked={item.done} onChange={() => { handleChangeTaskStatus(item) }} /> </span>
                            <span><Button type="link" onClick={() => { dispatch(removeTask(item)) }}>remove</Button></span>
                        </li>
                    })}
                </ul>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={20}>
                        <Input value={itemTxt} placeholder="input task" onChange={  handleChangeTxt() } />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={addNewTask} >addTask</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ToDoList