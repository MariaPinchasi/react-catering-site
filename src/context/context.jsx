import { createContext, useState } from "react";
import { getUser, postUser } from "../api/userApi";

export const AppContext = createContext();
const userFromLocalStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocalStorage);
    const [userErr, setUserErr] = useState('');

    const login = async (userFormData, navigate) => {
        const userData = await getUser(userFormData.email);
        if (!userData) {
            setUserErr("Email does not exist in our systems, Please register");
        }
        else {
            if (userData.password !== userFormData.password) {
                setUserErr("Password doesn't match the email provided");
            }
            else {
                localStorage.setItem('userData', JSON.stringify(userData))
                setUser(userData);
                navigate('/');
            }
        }

    }

    const register = async (userFormData, navigate) => {
        const registeredUser = await getUser(userFormData.email);
        if (registeredUser) {
            setUserErr('Email found in our system, please log in');
        }
        else {
            postUser(userFormData);
            navigate('/login');
        }
    }

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                login,
                userErr,
                setUserErr,
                register
            }}>
            {children}
        </AppContext.Provider>
    );
}