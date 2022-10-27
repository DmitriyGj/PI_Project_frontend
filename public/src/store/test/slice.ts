import {createSlice} from "@reduxjs/toolkit";
import {authUser} from "@store/test/thunk";

const initialState = {counter: 0,
    toDoList: [
        {id: 1, text: "Почистить аквариум"},
        {id: 2, text: "Сделать дз"},
        {id: 3, text: "Изучить реакт"},
        {id: 4, text: "Изучить редакс"}
    ]
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setValue(state, action) {
            state.counter = action.payload
        },
        incValue(state) {
            state.counter += 1;
        },
        decValue(state) {
            state.counter -= 1;
        },
        addToDo(state, action) {
            const lastId= state.toDoList[state.toDoList.length-1].id;
            if(action.payload !== ''){
                state.toDoList.push({id:lastId+1, text: action.payload});
            }

        },
        removeToDo(state, action) {
            state.toDoList = state.toDoList.filter(toDo => toDo.id !== action.payload);
        },
    },
    extraReducers: {
        [authUser.pending]: (state)=>{ },

    }

})

export const {setValue, incValue, decValue, addToDo, removeToDo} = testSlice.actions
export default testSlice.reducer

