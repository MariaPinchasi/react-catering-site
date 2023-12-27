import { createContext, useState } from "react";

export const AppContext = createContext();
const userFromLocalStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocalStorage);


    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
            }}>
            {children}
        </AppContext.Provider>
    );
}