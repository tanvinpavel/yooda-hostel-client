import {createContext, useState} from 'react';
import { useCookies } from 'react-cookie';

export const authContext = createContext();
const LoginContext = ({children}) => {
    const [cookies] = useCookies(['yoodaHostel']);
    const [user, setUser] = useState(cookies?.yoodaHostel || {});

    return (
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    );
};

export default LoginContext;