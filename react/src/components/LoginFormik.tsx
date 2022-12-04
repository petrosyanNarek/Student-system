import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { loginSchema } from "../validation/loginValidation";
import { loginUser } from "../features/user/userSlice";
import { useAppDispatch } from "../store/hook";

export const LoginFormik = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [error, setError] = useState(false)
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={async (values, { resetForm }) => {


                const data = await dispatch(loginUser(values)).unwrap()
                console.log(data);
                if (data.verify) {
                    data.user.verify === 1 ? navigate("/teacher") : navigate('/student');

                } else {
                    setError(true)
                }


                resetForm({
                    values: {
                        email: '',
                        password: ''
                    }
                })

            }}
        >

            {({ errors, touched }) => (
                <Form className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <Field
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            name="email"
                        />
                        {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <Field
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="password" />
                        {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
                        {error && <div className="text-red-500">Acount Not found</div>}
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                </Form>
            )}
        </Formik>
    )
}