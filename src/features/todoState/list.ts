import { createSlice } from '@reduxjs/toolkit';


const  getNextId=(state:Array<ToDoListType.ITodo>)=>{
    if(!state || state.length<1){
        return 1
    }
    return state[state.length-1].id+1
}


export const ToDoList = createSlice({
  name: 'todotask',
  initialState: [
      {
          id:1,
          title:'吃饭',
          done:false
      }
  ] ,
  reducers: {
    removeTask: (state:Array<ToDoListType.ITodo>, action:any):Array<ToDoListType.ITodo> => {
      return state.filter(item=> item.id!==action.payload.id)
    },
    updateTask: (state:Array<ToDoListType.ITodo>, action:any):Array<ToDoListType.ITodo> => {
        return state.map(item=>{
            if(item.id===action.payload.id){
                return action.payload
            }
            return item
        })
    },
    addTask: (state:Array<ToDoListType.ITodo>, action:any) :Array<ToDoListType.ITodo>=> {
      return [...state,{...action.payload,id:getNextId(state)}]
      
    },
  },
});

export const {  addTask, removeTask ,updateTask} = ToDoList.actions;

export default ToDoList.reducer;