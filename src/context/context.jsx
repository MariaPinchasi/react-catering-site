import { createContext, useState } from "react";

export const AppContext = createContext();
const userFromLocalStorage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(userFromLocalStorage);
    const [isApiUpdates, setIsApiUpdates] = useState(false);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                isApiUpdates,
                setIsApiUpdates
            }}>
            {children}
        </AppContext.Provider>
    );
}