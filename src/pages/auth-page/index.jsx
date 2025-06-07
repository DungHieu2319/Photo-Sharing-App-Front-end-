import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    TextField,
    Typography,
} from "@mui/material";
import { loginService, signupService } from "../../services";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");

    const [loginForm, setLoginForm] = useState({
        login_name: "",
        password: "",
    });

    const [signupForm, setSignupForm] = useState({
        login_name: "",
        password: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
    });

    const handleChange = (formSetter) => (field) => (e) => {
        formSetter(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleLoginSubmit = async () => {
        try {
            const data = await loginService(loginForm);
            if (data.success) {
                sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
                navigate(`/users/${data.data.user._id}`);
            }
        } catch (error) {
            alert("Login name or password is wrong");
        }
    };

    const handleSignupSubmit = async () => {
        const { password, first_name, last_name } = signupForm;
        const name_regex = /^[A-Za-z\s]+$/;

        if (password.length < 6) {
            alert("Password must have at least 6 characters");
            return;
        }

        if (!name_regex.test(first_name) || !name_regex.test(last_name)) {
            alert("Name must contain only letters");
            return;
        }

        try {
            const data = await signupService(signupForm);
            if (data.success) {
                alert("Signup successful, please login");
            }
        } catch (error) {
            alert("Login name already exists");
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 300 }}>
                <ButtonGroup fullWidth>
                    <Button onClick={() => setMode("login")}>Login</Button>
                    <Button onClick={() => setMode("signup")}>Sign Up</Button>
                </ButtonGroup>

                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                    {mode === "login" ? "Login Form" : "Sign Up Form"}
                </Typography>

                {mode === "login" ? (
                    <>
                        <TextField
                            label="Login name"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={loginForm.login_name}
                            onChange={handleChange(setLoginForm)("login_name")}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={loginForm.password}
                            onChange={handleChange(setLoginForm)("password")}
                        />
                        <Button fullWidth variant="contained" onClick={handleLoginSubmit}>Submit</Button>
                    </>
                ) : (
                    <>
                        <TextField label="Login name" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.login_name}
                            onChange={handleChange(setSignupForm)("login_name")} />
                        <TextField label="Password" type="password" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.password}
                            onChange={handleChange(setSignupForm)("password")} />
                        <TextField label="First Name" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.first_name}
                            onChange={handleChange(setSignupForm)("first_name")} />
                        <TextField label="Last Name" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.last_name}
                            onChange={handleChange(setSignupForm)("last_name")} />
                        <TextField label="Location" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.location}
                            onChange={handleChange(setSignupForm)("location")} />
                        <TextField label="Description" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.description}
                            onChange={handleChange(setSignupForm)("description")} />
                        <TextField label="Occupation" variant="filled" fullWidth sx={{ mb: 2 }}
                            value={signupForm.occupation}
                            onChange={handleChange(setSignupForm)("occupation")} />
                        <Button fullWidth variant="contained" onClick={handleSignupSubmit}>Submit</Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
