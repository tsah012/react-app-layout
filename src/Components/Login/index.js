import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN, LOGGED_IN, LOGIN_FAILURE } from '../../actions/auth';
import axios from 'axios';
import Wrapper from './index.css.js';


function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorElement = useRef(null);

    useEffect(() => {
        if (auth.isLogged) {
            navigate('/');
        }
    });

    useEffect(() => {
        errorElement.current.textContent = '';
    }, [mail, password]);

    const validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    const validatePassword = () => {
        return password.trim().length;
    }

    const validateLoginFields = () => {
        let all_valid = true;

        if (!validateEmail()) {
            all_valid = false;
        }

        if (!validatePassword()) {
            all_valid = false;
        }

        errorElement.current.textContent = all_valid ? '' : 'EMAIL OR PASSWORD IS NOT VALID';

        return all_valid;
    }

    const performLogin = async () => {
        if (validateLoginFields()) {
            try {
                console.log('Start login')
                dispatch({ type: LOGIN });

                // HERE WE CALL LOGIN API AND UPDATE STATE ACCORDING TO RESPONSE.
                // TODO: fix process.env.API_SERVER_END_POINT 
                const response = await axios.post('http://localhost:4000/login', {
                    mail: mail,
                    password: password
                }, { withCredentials: true });

                if (response.data.status) {
                    console.log('login success');
                    const user = await axios.get('http://localhost:4000/api/user', { withCredentials: true });
                    dispatch({ type: LOGGED_IN, payload: user.data });
                    navigate('/');
                }
                else {
                    // Login failed in server due to incorrect inputs
                    errorElement.current.textContent = response.data.message.toUpperCase();
                    throw (response.data.message);
                }
            }
            catch (err) {
                console.log('error occurred during login. error:\n' + err || '');
                dispatch({ type: LOGIN_FAILURE, payload: err || '' });
                if (!errorElement.current.textContent) {
                    errorElement.current.textContent = 'UNEXPECTED ERROR';
                }
            }
        }
    }

    return (
        <Wrapper>
            <div className="wrapper">
                <div id="formContent">
                    <h1>Login</h1>
                    <div>
                        <input type="text" name="mail" id="mail" placeholder="Enter Email" value={mail} onChange={(e) => setMail(e.target.value)}></input>

                        <input type="text" name="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                        <input type="button" id="loginBtn" value="log in" onClick={performLogin}></input>
                        <div ref={errorElement} className="errorMessage"></div>
                        <div className="formFooter">
                            <div><span className="underlineHover footer">Register</span></div>
                            <div className="underlineHover footer">Forgot Password?</div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Login
