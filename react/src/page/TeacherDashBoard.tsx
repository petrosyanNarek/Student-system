import { useEffect, useState } from "react"
import { Profile } from "../components/Profile"
import { RetingBook } from "../components/RetingBook"
import { getGroups, getGroupStudents } from "../features/teacher/teacherSlice"
import { getUser } from "../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../store/hook"

export const TeacherDashBoard = () => {
    const user = useAppSelector(state => state.userDate.user);
    const groups = useAppSelector(state => state.groupDate.groups);
    const groupStudents = useAppSelector(state => state.groupDate.groupStudents)
    const [groupStudentsId, setGroupStudentsId] = useState(0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser(user))
        dispatch(getGroups(user.id))
    }, [dispatch])


    return (
        <div>
            <Profile />
            <div className="my-10">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Select Group</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        if (e.target.value) {
                            setGroupStudentsId(+e.target.value)
                            dispatch(getGroupStudents(+e.target.value))
                        }
                    }}
                >
                    <option value={0}>Choose a Groop</option>
                    {
                        groups.map(group => {
                            return (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            )
                        })
                    }
                </select>

            </div>
            {
                groupStudents?.length ?
                    <RetingBook user={user} groupStudentsId={groupStudentsId} />
                    :
                    ""
            }
        </div>
    )
}