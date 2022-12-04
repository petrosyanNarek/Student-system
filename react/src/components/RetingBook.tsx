import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { updateReting } from "../features/reting/retingSlice"
import { getStudent, Student, StudentSlice } from "../features/students/studentSlice"
import { User } from "../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../store/hook"

export const RetingBook = (props: { user: User, groupStudentsId: number }) => {
    const user = props.user
    // const [students,setStudents] = useState(props.students)
    // const students = 
    const students = useAppSelector(state => state.studentsDate.students)
    const [showCom, setShow] = useState(false)
    const [reting, setReting] = useState({ comment: '', def: "-", id: 0 })
    const [input, setInput] = useState(false)
    const [getStud, setGetStud] = useState(false)


    const dispatch = useAppDispatch()
    useEffect(() => {
        setShow(showCom)
    }, [showCom])
    useEffect(() => {
        dispatch(getStudent(props.groupStudentsId))
    }, [dispatch, getStud])
    return (
        <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Name</th>
                                {students[0]?.ratings.map((rat, i) => {
                                    return (
                                        <th className="px-4 py-3" key={rat.id}>Day {i + 1}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                students.map((student) => {
                                    return (
                                        <tr className="text-gray-700" key={student.id}>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src="https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png" alt="" loading="lazy" />
                                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-black">{student.name}</p>
                                                        <p className="text-xs text-gray-600">{student.surname}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            {
                                                student.ratings.map((rating, i) => {
                                                    return (
                                                        <td
                                                            key={rating.id}
                                                            className="px-4 py-3 text-ms font-semibold border cursor-pointer"
                                                            onClick={() => {
                                                                setReting({ comment: rating.comment, def: rating.digit ? rating.digit + "" : "-", id: rating.id })
                                                                setShow(true)
                                                                setInput(false)
                                                            }}
                                                        >
                                                            {rating.digit ? rating.digit : "-"}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        showCom &&
                        <div className="bg-indigo-900 text-center py-4 lg:px-4"
                            onClick={() => {
                                setShow(false)
                            }}
                        >
                            <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex cursor-pointer" role="alert"
                                onClick={() => {
                                    if (user.verify) {
                                        setInput(true)
                                    }
                                }}
                            >
                                <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{reting.def !== "-" ? reting.def : "-"}</span>
                                <span className="font-semibold mr-2 text-left flex-auto">{reting.comment ? reting.comment : "No coment"}</span>
                                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                            </div>
                        </div>
                    }
                    {
                        input &&
                        <Formik
                            initialValues={{
                                comment: '',
                                digit: "",
                            }}
                            onSubmit={(values, { resetForm }) => {
                                // dispatch(getStudent(props.groupStudentsId))
                                setGetStud(!getStud)
                                dispatch(updateReting({ ...values, id: reting.id }))
                                resetForm({
                                    values: {
                                        comment: '',
                                        digit: "",
                                    }
                                })

                            }}
                        >
                            {({ errors, touched }) => (

                                <Form>
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 ">Comment</label>
                                            <Field
                                                type="text"
                                                id="comment"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="its fine"
                                                name="comment"
                                            />
                                            {touched.comment}
                                        </div>

                                        <div>
                                            <label htmlFor="digit" className="block mb-2 text-sm font-medium text-gray-900">Digit</label>
                                            <Field
                                                type="number"
                                                id="digit"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="0-10"
                                                name="digit"
                                            />
                                            {touched.digit}
                                        </div>

                                    </div>
                                    <div className="flex justify-center">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div>
        </section>
    )
}