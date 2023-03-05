import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios";
import { GetToken } from "../config/api";
import { useState, useEffect } from "react";
import FormOpenPosition from "./FormOpenPosition"
import { Button } from "@material-ui/core";

function Login() {
    const [isLogin, setIsLogin] = useState(false);

    const onSuccess = async (res) => {
        const id_token = res.credential
        const response = await axios.post(GetToken, { id_token });
        if (response.data.flag === 200) {
            setIsLogin(true);
        }

    };
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }

    const handleClickLogout = (res) => {
        setIsLogin(false);
    }

    useEffect(() => { }, [isLogin]);

    if (isLogin) {
        return <div style={{ display: 'flex' }}>
            <FormOpenPosition></FormOpenPosition>
            <Button style={{ marginLeft: '30px' }} variant="outlined" onClick={handleClickLogout}>
                Logout
            </Button>
        </div>
    }

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE_OAUTH}>
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
        </GoogleOAuthProvider>
    );
}
export default Login;