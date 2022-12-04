import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

const Axios = axios.create({
    withCredentials: true
})

export interface Registration {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initialState = {
    registrValid: true
}

export const registration = createAsyncThunk<boolean, Registration, { rejectValue: string }>(
    'user/registration',
    async function (us, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/addUser", { ...us });
        const data = await response.data
        return data
    }
)


const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build
            .addCase(registration.fulfilled, (state, action) => {
                state.registrValid = action.payload
            })
    }
})


export default registrationSlice.reducer
