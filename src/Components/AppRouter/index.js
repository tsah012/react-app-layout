import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Login';
import AppBar from '../AppBar';
import Home from '../Home';
import Error from '../Error';


function AppRouter() {
    return (
        <Router>
            <AppBar />
            <Routes>
                <Route exact path='/login' element={<Login />}></Route>
                <Route exact path='/' element={<Home />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter
