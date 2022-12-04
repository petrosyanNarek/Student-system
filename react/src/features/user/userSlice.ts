import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const Axios = axios.create({
    withCredentials: true
})
export interface User {
    id: number
    name: string
    surname: string
    email: string
    password: string
    verify: number
    groupId?: number
}
export interface UserSlice {
    user: User
    verify: boolean
}
export interface Login {
    email: string,
    password: string
}
export interface LogOut {
    status: string
}
export const loginUser = createAsyncThunk<UserSlice, Login, { rejectValue: string }>(
    'user/loginUser',
    async function (us, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/login", { ...us });
        const data = await response.data

        return data


    }
)
export const logOut = createAsyncThunk<LogOut, undefined, { rejectValue: string }>(
    'user/logoutUser',
    async function (_, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/logOut");
        const data = await response.data

        return data
    }
)
export const getUser = createAsyncThunk<UserSlice, UserSlice, { rejectValue: string }>(
    'user/getUser',
    async function (user, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/getUser", { ...user });
        const data = await response.data


        return data.user
    }
)

const initialState: { user: any } = {
    user: {}
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.user = {}
            })
    }
})

export default loginSlice.reducer
