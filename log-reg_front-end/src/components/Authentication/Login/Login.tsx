import React, { createContext, useState, useEffect, useRef } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { notify } from "../../Others/Notify";
import axios from "axios";
import { ENDPOINT_AUTH, INTERNET_DISCONNECTED, ADMIN_ROLE, ENDPOINT_REFRESH } from "../../Utils/links";
import { LoginForm } from "./LoginForm";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { LoginContextType } from '../../Utils/Interfaces/LoginContextType';
import "../../../css/styles.css";
import { Title } from "../../Others/Title";

export const LoginContext = createContext<LoginContextType | null>(null);
export const CaptchaContext = createContext<React.MutableRefObject<ReCAPTCHA | null> | null>(null);

export const Login = () => {
    const captchaRef = useRef<ReCAPTCHA | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (captchaRef.current) {
            const token = captchaRef.current.getValue();
            console.log(`token capta= ${token}`)
            captchaRef.current.reset();
        } else {
            console.warn("captchaRef.current is null");
        }
    };

    // Obs?uga b??du sieciowego
    const handleNetworkError = (error: any) => {
        console.error(error);

        if (error.response) {
            notify(error.response.data);
        } else {
            notify(INTERNET_DISCONNECTED);
        }
    };

    const handleTokenRefresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await axios.post(ENDPOINT_REFRESH, {
                    refreshToken,
                });

                if (response.status === 200) {
                    const token = response.data.token;
                    const refreshToken = response.data.refreshToken;
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setIsAuthenticated(true);
                    notify("Token refreshed successfully.");
                } else {
                    notify("Failed to refresh token.");
                }
            } catch (error: any) {
                // Obs?uga b??du sieciowego
                handleNetworkError(error);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && isAuthenticated) {
            handleTokenRefresh();
        }
    }, [isAuthenticated]);

    return (
        <>
            <LoginContext.Provider
                value={{
                    username,
                    password,
                    setPassword,
                    setUsername,
                    handleSubmit,
                }}
            >
                <CaptchaContext.Provider value={captchaRef}>
                    <Title props={'Login panel'} />
                    <div className="container">
                        <LoginForm />
                        <div className="left-side">
                            <div className="regist__buttons">
                                <RedirectBtn to="/">Menu</RedirectBtn>
                                <RedirectBtn to="/regist">Regist</RedirectBtn>
                                <RedirectBtn to="/reset-email">Reset</RedirectBtn>
                            </div>
                        </div>
                    </div>
                </CaptchaContext.Provider>
            </LoginContext.Provider>
        </>
    );
};
