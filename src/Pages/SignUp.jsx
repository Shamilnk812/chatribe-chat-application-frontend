import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axiosInstance from '../Utils/Axios/AxiosInstance';
import { toast } from 'sonner';
import registrationSchema from '../Validations/SignupSchema';



const SignUp = () => {

    const navigate = useNavigate()
   
    const formik = useFormik({
        initialValues:{
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: registrationSchema,
        onSubmit: async (values) => {
            try {
                const  response = await axiosInstance.post('/user/register/',values)
                const {access_token, refresh_token, user_id} = response.data
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('userId', user_id );
                console.log('resoponse',response.data)
                toast.success('your registration successfully completed.')
                navigate('/home');
            } catch (error) {
                console.error('Registration Error:', error);
                if (error.response && error.response.data) {
                    const errors = error.response.data;
            
                    for (let field in errors) {
                        if (Array.isArray(errors[field])) {
                            errors[field].forEach((msg) => {
                                toast.error(`${field}: ${msg}`);
                            });
                        } else {
                            toast.error(`${field}: ${errors[field]}`);
                        }
                    }
                } else {
                    toast.error('Registration failed. Please try again later.');
                }
            }
        }
    })

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-center mb-8">
                            <div className="bg-indigo-600 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
                        <p className="text-center text-gray-300 mb-8">Join our community today</p>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                    placeholder="John Doe"
                                />
                                 {formik.touched.username && formik.errors.username && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.username}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                    placeholder="you@example.com"
                                  
                                />
                                 {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.email}</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                    placeholder="••••••••"
                                   
                                />
                                 {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.password}</div>
                                )}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                                    placeholder="••••••••"
                                   
                                />
                                 {formik.touched.confirm_password && formik.errors.confirm_password && (
                                    <div className="text-red-500 text-sm ml-2 mt-1">{formik.errors.confirm_password}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                    Log in
                                </Link>
                            </p>
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp
