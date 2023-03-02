import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT, LOGGED_OUT, LOGOUT_FAILURE } from '../../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from './index.css.js';

function AppBar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const performLogout = async () => {
        try {
            dispatch({ type: LOGOUT });

            // HERE WE CALL LOGOUT API:
            const response = await axios.delete(process.env.REACT_APP_API_SERVER_END_POINT + '/logout', { withCredentials: true });
            if (response.data.status) {
                dispatch({ type: LOGGED_OUT });
                navigate('/login')
            }
        } catch (error) {
            console.log('error during logging out: ' + error);
            dispatch({ type: LOGOUT_FAILURE, payload: error });
        }
    }

    if (auth.isLogged) {
        return (
            <Wrapper>
                <ul>
                    <li><Link to='/'> Home </Link></li>
                    <li style={{ float: 'right' }}>
                        <Link className="active" onClick={performLogout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </Wrapper>
        )
    }
    else {
        return (<></>)
    }
}

export default AppBar
