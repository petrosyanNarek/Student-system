import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { group } from "console";
import { Student } from "../students/studentSlice";

const Axios = axios.create({
    withCredentials: true
})


export interface Group {
    id: number
    name: string
    maxCount: number,
    students: Student[]

}


export interface GroupSlice {
    groups: Group[],
    groupStudents: Group[]
}
export const getGroups = createAsyncThunk<Group[], number, { rejectValue: string }>(
    'group/getGroups',
    async function (id, { rejectWithValue }) {
        const response = await Axios.post("http://localhost:5000/getGroups", { id });
        const data = await response.data
        return data
    }
)

const initialState: GroupSlice = {
    groups: [],
    groupStudents: []
}

const studentSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        getGroupStudents: (state, action) => {
            state.groupStudents = state.groups.filter(group => group.id === action.payload)
        }
    },
    extraReducers: (build) => {
        build
            .addCase(getGroups.fulfilled, (state, action) => {
                // console.log(action.payload);

                state.groups = action.payload
            })

    }
})

export const { getGroupStudents } = studentSlice.actions
export default studentSlice.reducer