/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './login.scss';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', credentials);
            if(res.data.isAdmin){

              dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
              navigate('/');
            }else {
            dispatch({ type: 'LOGIN_FAILURE', payload: {message:"You are not allowed!"} });

            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };

    return (
        <div className="login">
            <nav className="header-login">
                <div className="logo">SuaU.com</div>
                
            </nav>
            <div className="lContainer">
                <div className="text">Sign in or create an account</div>
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleLogin} className="lButton">
                    Login
                </button>
                {error && <span style={{ marginTop: '10px', color: 'red' }}>{error.message}</span>}
                <div className="policy">
                    By signing in or creating an account, you agree with our <a href="/">Terms & conditions</a> and{' '}
                    <a href="/">Privacy statement</a>
                </div>
            </div>
        </div>
    );
};
