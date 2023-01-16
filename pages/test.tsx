import { useDispatch, useSelector } from 'react-redux';
import { addToDo, decValue, incValue, removeToDo } from '@store/test/slice';
// import {authUser} from "@store/test/thunk";
import SideBar from '@components/sideBar';
import { useState } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import UserForm from '@components/userForm/UserForm';

const Test = () =>{
    const [ val, setVal ] = useState('');
    const counter = useSelector(state => state.testSlice.counter);
    const toDoList = useSelector(state => state.testSlice.toDoList);
    const dispatch = useDispatch();

    const changeVal = (e) => {
        setVal(e.target.value);
    };

    return (
        <>
            <div >
                {counter}
                <div>

                </div>
                {toDoList.map((todo) => (<div key={todo.id} style={{ 'display': 'flex' }}><div>{todo.text}</div>
                    <button onClick={() => {dispatch(removeToDo(todo.id));}}>delete</button></div>))}

                <input type='text' onChange={changeVal} value={val} name={'addToDo'} placeholder={'ToDo'}/>
                <button onClick={()=> {
                    dispatch(addToDo(val)); setVal('');
                }}>Добавить</button>

                <button onClick={()=>dispatch(incValue())}>Увеличить</button>
                <button onClick={()=>dispatch(decValue())}>Уменьшить</button>
                <button onClick={()=>dispatch(authUser())}>Получить данные с сервера</button>
                
                <SideBar buttonText={'+'} title={'Добавить пользователя'} content={<UserForm/>}/>
            </div>
        </>
       
    );
};


const authUser = createAsyncThunk('users/authUser',
    async (value: number, { getState, dispatch, rejectWithValue }) => {

        // try {
        //     const res = axios('https://jsonplaceholder.ttypicode.com/users?_limit=10')
        //         .catch(() => {
        //            throw new Error("Ошибка");
        //         });
        // } catch (error){
        //     return rejectWithValue(error.message);
        // }

        const res = axios('https://jsonplaceholder.typicode.com/users?_limit=10')
            .then(response =>  response.data)
            .catch((error) => {
                return rejectWithValue(error.message);
            });
        return res;
    }
);

export default Test;
