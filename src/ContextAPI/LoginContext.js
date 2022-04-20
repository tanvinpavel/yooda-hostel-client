import {createContext, useState} from 'react';

export const authContext = createContext();
const LoginContext = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || {});
    return (
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    );
};

export default LoginContext;