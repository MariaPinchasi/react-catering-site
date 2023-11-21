import { createContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();
const userFromLocalStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocalStorage);

    const showToastError = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                showToastError
            }}>
            {children}
        </AppContext.Provider>
    );
}