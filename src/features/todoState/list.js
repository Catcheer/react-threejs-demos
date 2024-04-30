import { createSlice } from '@reduxjs/toolkit';

export const ToDoList = createSlice({
  name: 'todotask',
  initialState: {
    value: [
        {
            id:1,
            title:'语文作业',
            done:false
        },
        {    id:2,
            title:'数学作业',
            done:false
        }
    ] ,
  },
  
  reducers: {
    getNextId:(state)=>{
        if(!state.value || state.value.length<1){
            return 1
        }
        return state.value[state.value.length-1].id+1
    },
   
    removeTask: () => {
        
    },
    addTask: (state, action) => {
      state.value =[...state.value,{...action,id:this.getNextId()}]
    },
  },
});


export const {  addTask, removeTask } = ToDoList.actions;

export default ToDoList.reducer;