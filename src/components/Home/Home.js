import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { IoAdd } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Home = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState('');
    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((err) => console.log(err.message));
    };
    useEffect(() => {
        let isMounted = true;
        auth.onAuthStateChanged((user) => {
            if (user) {
                //read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            if (isMounted) return setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                navigate('/login');
            }
            return () => {
                isMounted = false;
            };
        });
    }, [navigate]);

    //read TODO
    //write
    const writeToDatabase = () => {
        const uidd = uid();
        if (todo !== '') {
            set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
                todo: todo,
                uidd: uidd,
            });
        } else {
            alert('Please write something');
        }

        setTodo('');
    };

    //update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };
    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd,
        });
        setTodo('');
        setIsEdit(false);
    };
    //delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
        if (!remove) {
            alert('Something went wrong!');
        } else {
            alert('Todo deleted successfully!!');
        }
    };
    return (
        <>
            <div className="bg-blue-300 w-full px-3 py-3 shadow-md">
                <div className="flex justify-around items-center">
                    {' '}
                    <h1 className="text-3xl text-center text-gray-600">
                        <Link to="/">
                            <span className="text-blue-600">React</span> Firebase Todo App
                        </Link>
                    </h1>
                    <button
                        onClick={handleSignout}
                        className="text-md rounded hover:bg-blue-600 bg-blue-500 px-3 py-1 text-white"
                    >
                        Sign out
                    </button>
                </div>
            </div>
            <div className="w-full min-h-screen bg-blue-200">
                <div className="flex justify-center items-center flex-col pt-10">
                    <h1 className="text-gray-500 text-3xl m-3">Add todo</h1>
                    <div className="flex justify-around items-center gap-3">
                        <input
                            type="text"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            placeholder="Add todo..."
                            className="rounded"
                        />
                        {isEdit ? (
                            <div>
                                <button
                                    onClick={handleEditConfirm}
                                    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    <IoMdCheckmark className="text-2xl text-white" />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={writeToDatabase}
                                    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    <IoAdd className="text-2xl text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="overflow-x-auto relative w-[350px] mt-10 shadow-md sm:rounded-lg md:w-[750px]">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="border-b-2 border-gray-300 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-2xl">
                                        Todos
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <AiOutlineEdit className="text-3xl" />
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <AiOutlineDelete className="text-3xl" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo) => {
                                    return (
                                        <tr
                                            className="bg-white border-b-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
                                            key={todo.uidd}
                                        >
                                            <td className="py-4 px-6">{todo.todo}</td>
                                            <td
                                                onClick={() => handleUpdate(todo)}
                                                className="py-4 px-6"
                                            >
                                                <button
                                                    onClick={() => handleUpdate(todo)}
                                                    className="bg-blue-500 py-1 px-3 rounded text-white hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td
                                                onClick={() => handleDelete(todo.uidd)}
                                                className="py-4 px-6"
                                            >
                                                <button
                                                    onClick={() => handleDelete(todo.uidd)}
                                                    className="bg-red-500 py-1 px-3 rounded text-white hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
