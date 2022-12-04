import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
const Axios = axios.create({
    withCredentials: true
})

export interface Digit {
    id: number,
    comment: string,
    digit: number | string
}

export const updateReting = createAsyncThunk<string, Digit, { rejectValue: string }>(
    "reting/updateReting",
    async function (obj, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/updateReting", { obj });
        const data = await response.data
        console.log(data);

        return data
    }
)