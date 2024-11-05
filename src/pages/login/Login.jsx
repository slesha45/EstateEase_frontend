import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from "../../apis/Api";
import "./Login.css";

const Login = () => {
    // Make a useState for each input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Make an error state
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Initialize navigate
    const navigate = useNavigate();

    // Validation function
    const validation = () => {
        let isValid = true;

        if (email.trim() === '' || !email.includes('@')) {
            setEmailError("Email is empty or invalid");
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError("Password is empty");
            isValid = false;
        }
        return isValid;
    }

    // Function to handle the form submission
    const handleLogin = (e) => {
        e.preventDefault();

        // Validation
        if (!validation()) {
            return;
        }

        // Make a JSON object
        const data = {
            "email": email,
            "password": password
        }

        // Make an API request
        loginUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    const convertedUser = JSON.stringify(res.data.userData);
                    localStorage.setItem("user", convertedUser);

                    if (res.data.userData.isAdmin) {
                        window.location.href = "/admin/dashboard";
                    } else {
                        window.location.href = "/homepage";
                    }
                }
            })
            .catch((error) => {
                toast.error("Login failed");
            });
    };

    const handleFacebookLogin = () => {
        // Handle Facebook login
    }

    const handleGoogleLogin = () => {
        // Handle Google login
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <h2>Login</h2>
                    <form>
                        <label>Email Address :</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter your email address"></input>
                        {emailError && <p className="error-message">{emailError}</p>}

                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter your password"></input>
                        {passwordError && <p className="error-message">{passwordError}</p>}

                        <button onClick={handleLogin} className="btn login-button">Login</button>
                        <p className="forgot-password-text">
                            <a href="/forgot_password">Forgot your password?</a>
                        </p>
                    </form>
                    <div className="social-login-container">
                        <p className="or-text">or</p>
                        <div className="social-icons">
                            <img src="/assets/icons/facebook.png" alt="Facebook Login" onClick={handleFacebookLogin} />
                            <img src="/assets/icons/google.png" alt="Google Login" onClick={handleGoogleLogin} />
                        </div>
                    </div>
                    <p className="signup-text">Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
                <div className="welcome-text">
                    <h2>WELCOME BACK!</h2>
                    <img src='/assets/images/loginpage.png' alt='Login' />
                    <p>Hey there, please login to your account to continue Estate Ease! Always remember us if you're finding a home.</p>
                </div>
            </div>
        </div>
    )
}

export default Login;