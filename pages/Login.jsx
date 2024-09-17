import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const [errMessage, setErrMessage] = useState("");
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error message when typing
        if (errMessage) setErrMessage("");
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (admin.username !== "krishna@85") {
            setErrMessage("Username is not correct");
            usernameRef.current.focus(); // Use ref to focus
            return;
        } else if (admin.password !== "krishna123") {
            setErrMessage("Password is not correct");
            passwordRef.current.focus(); // Use ref to focus
            return;
        }

        navigate("/Home");
    };

    return (
        <div className="centered-element">
            <img className="login-img"
                src="./images/login-logo.png"
                width="120px"
                alt="login-logo" />

            <div className="login-container">
                <h1>Admin Login</h1>
                <br />
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        onChange={handleChange}
                        ref={usernameRef}
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={admin.username} />
                    <input
                        onChange={handleChange}
                        ref={passwordRef}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={admin.password} />
                    <button type="submit">Login</button>
                </form>
                {errMessage && (
                    <h5 aria-live="polite">{errMessage}</h5>
                )}
            </div>
        </div>
    );
};

export default Login;
