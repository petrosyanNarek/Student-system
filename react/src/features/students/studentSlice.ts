import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const Axios = axios.create({
    withCredentials: true
})


export interface Student {
    id: number
    name: string
    surname: string
    groupId: number
    email: string
    password: string
    verify: number
    ratings: Array<{ id: number, digit: number, comment: string, studentId: number }>

}

export interface StudentSlice {
    students: Student[]
}

export const getStudent = createAsyncThunk<Student[], number, { rejectValue: string }>(
    'student/getStudent',
    async function (id, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/getStudents", { id });
        const data = await response.data
        return data
    }
)
const initialState: StudentSlice = {
    students: []
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(getStudent.fulfilled, (state, action) => {
                state.students = action.payload
            })
    }
})

export default studentSlice.reducer