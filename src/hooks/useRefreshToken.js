import axios from '../api/axios';
import useAuthContext from './useAuthContext';

const useRefreshToken = () => {
    const {setUser} = useAuthContext();
    const refresh = async () => {
        try {
            const response = await axios.get('/auth/getAccessToken', {
                headers: { 'Content-Type': 'application-json' },
                withCredentials: true,
            });

            setUser(prev => {
                return {...prev, roles: response.data.roles, accessToken: response.data.accessToken}
            });
     
            return response.data;
         } catch (error) {
             console.log(error);
         }
    }
    return refresh;
};

export default useRefreshToken;