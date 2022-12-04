import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { registerSchema } from "../validation/registrationSchema";
import { registration } from "../features/registration/registrationSlice";

export const RegistrationFormik = () => {
    const dispatch = useAppDispatch()
    const registred = useAppSelector(state => state.registration.registrValid)

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''

            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { resetForm }) => {
                dispatch(registration(values)).unwrap();
                // if (data.verify) {
                //     //  data.user.verify === 1 ? navigate("/admin") : navigate('/');

                // } else {
                //     setError(true)
                // }


                resetForm({
                    values: {
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }
                })

            }}
        >

            {({ errors, touched }) => (
                <Form className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <Field
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type Your Name"
                            name="name"
                        />
                        {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surname</label>
                        <Field
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type Your Surname"
                            name="surname"
                        />
                        {touched.surname && errors.surname && <div className="text-red-500">{errors.surname}</div>}
                    </div>
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
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <Field
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="confirmPassword" />
                        {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                        {!registred && <div className="text-red-500">Email is found</div>}
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                </Form>
            )}
        </Formik>
    )
}