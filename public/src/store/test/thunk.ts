import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentUser } from "./slice";
import { UserDetailInfo, UserInfo } from "./types";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {ref} from "yup";

export const authUser = createAsyncThunk('users/authUser', 
    async (value:number, {getState, dispatch, rejectWithValue}) => {

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
)