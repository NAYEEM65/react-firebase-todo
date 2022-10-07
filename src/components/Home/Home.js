import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';

const Home = () => {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState('');
    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => console.log(err.message));
    };
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                //read
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            return setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                navigate('/');
            }
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
        if (remove) {
            alert('Todo deleted successfully!!');
        } else {
            alert('Something went wrong!');
        }
    };
    return (
        <div className="home__container">
            <h1>Home</h1>
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add todo..."
            />

            {todos.map((todo) => {
                return (
                    <div className="todo__container" key={todo.uidd}>
                        <h1>{todo.todo}</h1>
                        <button onClick={() => handleUpdate(todo)}>Edit</button>
                        <button onClick={() => handleDelete(todo.uidd)}>Delete</button>
                    </div>
                );
            })}
            {isEdit ? (
                <div>
                    <button onClick={handleEditConfirm}>Confirm</button>
                </div>
            ) : (
                <div>
                    <button onClick={writeToDatabase}>Add</button>
                </div>
            )}

            <button onClick={handleSignout}>Signout</button>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
};

export default Home;
