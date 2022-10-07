import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as DashboardImage } from '../../assets/undraw_dashboard_re_3b76.svg';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => console.log(err.message));
    };
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/');
            }
        });
    }, [navigate]);
    return (
        <>
            <div className="bg-slate-300 w-full px-3 py-3 shadow-md">
                <div className="flex justify-around items-center">
                    {' '}
                    <h1 className="text-3xl text-center text-gray-600">
                        <span className="text-blue-600">React</span> Firebase Todo App
                    </h1>
                    <button
                        onClick={handleSignout}
                        className="text-md rounded hover:bg-blue-600 bg-blue-500 px-3 py-1 text-white"
                    >
                        Sign out
                    </button>
                </div>
            </div>
            <div className="w-full h-full bg-blue-200">
                <div className="">
                    <h1>Welcome to dashboard</h1>
                </div>
                <div className="">
                    <div className="">
                        <Link to="/home">View Todo</Link>
                    </div>
                    <div className="">
                        <DashboardImage width="400px" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Dashboard;
