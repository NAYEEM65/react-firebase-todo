import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
// import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
