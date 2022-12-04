import { RetingBook } from "../components/RetingBook"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { getStudent } from "../features/students/studentSlice"
import { useNavigate } from "react-router-dom"
import { getUser, logOut } from "../features/user/userSlice"
import { Profile } from "../components/Profile"
export const StudentDashBoard = () => {
    const user = useAppSelector(state => state.userDate.user);
    const [logOutBool, setLogOut] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const students = useAppSelector()
    useEffect(() => {
        dispatch(getUser(user))
        dispatch(getStudent(user.groupId))
    }, [dispatch])
    return (
        <>
            <Profile />
            {
                user.groupId ?
                    <RetingBook user={user} groupStudentsId={0} />
                    :
                    <h2>Your Ask in </h2>
            }
        </>
    )
}