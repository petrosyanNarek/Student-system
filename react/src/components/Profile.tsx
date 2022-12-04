import { RetingBook } from "../components/RetingBook"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { getStudent, Student } from "../features/students/studentSlice"
import { useNavigate } from "react-router-dom"
import { getUser, logOut } from "../features/user/userSlice"
import { getGroups } from "../features/teacher/teacherSlice"
import { Digit } from "../features/reting/retingSlice"

export const Profile = () => {

    const user = useAppSelector(state => state.userDate.user);
    const [logOutBool, setLogOut] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const reting = useAppSelector(state => state.studentsDate.students)
    const [student, setStudent] = useState<Student>()
    useEffect(() => {
        dispatch(getUser(user))
        const us = reting.find(e => e.id === user.id)
        setStudent(us)
        if (!user.verify) {
            dispatch(getStudent(user.groupId))
            console.log(user);
        } else {
            dispatch(getGroups(user.id))
        }
        console.log(us);
    }, [dispatch])

    return (
        <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
            <section className="w-80 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">2d ago</span>
                    <div className="grid grid-flow-row">
                        <span className="text-emerald-400">
                            <button
                                type="button"
                                onClick={() => setLogOut(!logOutBool)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>
                        </span>
                        {logOutBool && <span className="text-emerald-400">
                            <button type="button"
                                onClick={async () => {
                                    const us = await dispatch(logOut()).unwrap()
                                    if (us.status === "OK") {
                                        navigate('/')
                                    }
                                }}
                            >Log Out</button>
                        </span>}
                    </div>

                </div>
                <div className="mt-6 w-fit mx-auto">
                    <img src={user.verify === 1 ? "https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png" : "https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png"} className="rounded-full w-28 " alt="profile picture" />
                </div>
                <div className="mt-8 ">
                    <h2 className="text-white font-bold text-2xl tracking-wide">{user.name} <br /> {user.surname}</h2>
                </div>
                {
                    !user.verify &&
                    <>
                        <div className="h-1 w-full bg-black mt-8 rounded-full">
                            <div className="h-1 rounded-full w-1/2 bg-yellow-500 "></div>
                        </div>
                        <div className="mt-3 text-white text-sm">
                            <span className="text-gray-400 font-semibold">Reting:</span>
                            <span>40%</span>
                        </div>
                    </>
                }

            </section>
        </section>
    )
}