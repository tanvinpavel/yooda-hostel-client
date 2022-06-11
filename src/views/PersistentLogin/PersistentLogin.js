import {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import useRefreshToken from '../../hooks/useRefreshToken';

const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {user} = useAuthContext();

    useEffect(() => {
        const newAccessToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally{
                setIsLoading(false);
            }
        }

        !user?.accessToken ? newAccessToken() : setIsLoading(false);
    }, []);

    return isLoading ? <div className='text-center mt-5'><h1>Loading...</h1></div> : <Outlet/>
};

export default PersistentLogin;