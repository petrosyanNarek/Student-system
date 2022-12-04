import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "../features/registration/registrationSlice";
import studentSlice from "../features/students/studentSlice";
import teacherSlice from "../features/teacher/teacherSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        studentsDate: studentSlice,
        userDate: userSlice,
        registration: registrationSlice,
        groupDate: teacherSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;