import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import GoogleProvider from './GoogleProvider';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Layout from '../Layout/Layout';

const Login = ({ handleCreateAccout }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isvisible, setIsVisible] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSignin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/'); //home
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/');
            }
        });
    });
    return (
        <div className="welcome">
            <Layout />
            {/* <div className="login__container">
                <input type="email" placeholder="Email" name="email" onBlur={handleEmailChange} />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    name="password"
                />
                <button onClick={handleSignin}>Sign in</button>
                <GoogleProvider />
                <Link to="/register">Create an account</Link>
            </div> */}
            <div className="flex justify-center items-center">
                <div className="bg-slate-300 md:p-20 p-12 rounded shadow-lg mt-3">
                    <div className="flex items-center justify-center flex-col">
                        <h1 className="text-3xl text-gray-500 font-bold">Sign in Now</h1>
                    </div>
                    <div className="flex items-center justify-center ">
                        <form
                            onSubmit={handleSignin}
                            className="flex justify-center items-center flex-col"
                        >
                            <input
                                type="email"
                                className="mt-2 mb-2 rounded w-full"
                                placeholder="Email"
                                name="email"
                                onChange={handleEmailChange}
                            />
                            <div className="relative w-full z-1">
                                <input
                                    type={`${isvisible ? 'text' : 'password'}`}
                                    placeholder="password"
                                    className="rounded w-full"
                                    onChange={handlePasswordChange}
                                    name="password"
                                />
                                {isvisible ? (
                                    <FaRegEye
                                        className="absolute right-3 top-3 cursor-pointer"
                                        onClick={() => setIsVisible(!isvisible)}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        className="absolute right-3 top-3 cursor-pointer"
                                        onClick={() => setIsVisible(!isvisible)}
                                    />
                                )}
                            </div>
                            <div className="mt-5 mb-3 text-left flex justify-start items-center gap-1 w-full">
                                <p className="text-xs">
                                    Don&#39;t have an Account?{' '}
                                    <Link to="/register" className="text-blue-600">
                                        Sign up
                                    </Link>
                                </p>
                                <p className="text-xs">
                                    {' '}
                                    <Link to="/" className="text-blue-600">
                                        Forgot Password
                                    </Link>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-slate-100 hover:text-gray-600 transition-all duration-100 ease-in-out border-blue-500 border-2 hover:border-blue-500 hover:border-2 w-full "
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                    <div className="text-center text-gray-600 mt-5 divide-x-2">OR</div>
                    <GoogleProvider />
                </div>
            </div>
        </div>
    );
};

export default Login;
