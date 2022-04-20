import {useContext} from 'react';
import { authContext } from '../ContextAPI/LoginContext';

const useAuthContext = () => {
    return useContext(authContext);
};

export default useAuthContext;