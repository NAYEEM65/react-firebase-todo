import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [isvisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setRegisterInfo({ ...registerInfo, email: e.target.value });
    };
    const handleNameChange = (e) => {
        setRegisterInfo({ ...registerInfo, name: e.target.value });
    };
    const handlePasswordChange = (e) => {
        setRegisterInfo({ ...registerInfo, password: e.target.value });
    };
    const handleConfirmPasswordChange = (e) => {
        setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value });
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (registerInfo.password !== registerInfo.confirmPassword) {
            alert('Password does not same');
            return;
        }
        createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            .then(() => {
                navigate('/home'); //home
            })
            .catch((err) => console.log(err.message));
    };
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home'); //home
            }
        });
    });
    return (
        <div>
            {/* <div className="login__container">
                <input
                    type="email"
                    placeholder="Email"
                    value={registerInfo.email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={registerInfo.password}
                />
                <input
                    type="password"
                    placeholder="Confrim Password"
                    onChange={handleConfirmPasswordChange}
                    value={registerInfo.confirmPassword}
                />
                <button onClick={handleRegister}>Register</button>
                <Link to="/">Go Back</Link>
            </div> */}
            <div className="flex justify-center items-center ">
                <div className="bg-slate-300 md:p-20 p-12 rounded shadow-lg mt-3">
                    <div className="flex items-center justify-center flex-col">
                        <h1 className="text-3xl text-gray-500 font-bold">Sign up Now</h1>
                    </div>
                    <div className="flex items-center justify-center ">
                        <form
                            onSubmit={handleRegister}
                            className="flex justify-center items-center flex-col"
                        >
                            <input
                                type="text"
                                className="mt-2 mb-2 rounded w-full"
                                placeholder="Your name"
                                value={registerInfo.name}
                                onChange={handleNameChange}
                            />
                            <input
                                type="email"
                                className="mt-2 mb-2 rounded w-full"
                                placeholder="Email"
                                value={registerInfo.email}
                                onChange={handleEmailChange}
                            />
                            <div className="relative w-full">
                                <input
                                    type={`${isvisible ? 'text' : 'password'}`}
                                    placeholder="password"
                                    className="rounded w-full mb-2"
                                    onChange={handlePasswordChange}
                                    value={registerInfo.password}
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
                            <div className="relative w-full">
                                <input
                                    type={`${isvisible ? 'text' : 'password'}`}
                                    className="rounded w-full"
                                    placeholder="Confrim Password"
                                    onChange={handleConfirmPasswordChange}
                                    value={registerInfo.confirmPassword}
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
                                    have an Account?{' '}
                                    <Link to="/" className="text-blue-600">
                                        Sign in.
                                    </Link>
                                </p>
                                <p className="text-xs">
                                    {' '}
                                    <Link to="/signup" className="text-blue-700">
                                        Forgot Password
                                    </Link>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-slate-100 hover:text-gray-600 transition-all duration-100 ease-in-out border-blue-500 border-2 hover:border-blue-500 hover:border-2 w-full "
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
