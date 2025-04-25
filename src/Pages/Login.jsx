
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginSchema from '../Validations/LoginSchema';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PasswordVisibility from '../Components/PasswordVisibility';
import ButtonProcessingCircle from '../Components/ButtonProcessingCircle';



const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [processing, setProcessing] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {

            setProcessing(true);
            try {
                const response = await axiosInstance.post('/user/login/', values)
                console.log(response.data)
                const { access_token, refresh_token, user_id } = response.data
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('userId', user_id);
                toast.success('you are successfully logged in')
                navigate('/home')

            } catch (error) {
                console.error('failed to account login', error)
                const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
                toast.error(errorMessage)
            } finally {
                setProcessing(false);
            }
        }
    })


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-center mb-8">
                            <div className="bg-pink-500 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
                        <p className="text-center text-gray-300 mb-8">Sign in to your account</p>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.email}</div>
                                )}
                            </div>
                            <div className="mb-6 relative">
                                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400"
                                />
                                <PasswordVisibility showPassword={showPassword} setShowPassword={setShowPassword} />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.password}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ${processing ? 'opacity-70 cursor-not-allowed' : ''} `}
                            >
                                {processing ? (
                                    <ButtonProcessingCircle />
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-pink-400 hover:text-pink-300 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
