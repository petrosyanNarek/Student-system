import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

export const Teacher = () => {
    const user = useAppSelector(state => state.userDate.user);
    const [response, setResponse] = useState(false)
    const dispatch = useAppDispatch()
    console.log(user);

    useEffect(() => {
        console.log(user);

        dispatch(getUser(user)).unwrap().then(r => {
            setResponse(true)
        })
    }, [dispatch])
    if ('id' in user) {
        return (user.verify == 1) ? <Outlet /> : <Navigate to="/student" replace={true} />
    } else {
        return <>{response && <Navigate to="/" replace={true} />}</>
    }
}