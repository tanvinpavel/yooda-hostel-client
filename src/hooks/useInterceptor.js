import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuthContext from './useAuthContext';
import useRefreshToken from './useRefreshToken';

const useInterceptor = () => {
    const {user} = useAuthContext();
    const refresh = useRefreshToken();
    useEffect(()=>{
        const requestInterceptor = axiosPrivate.interceptors.request.use(config => {
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
            }
            return config;
        }, error => Promise.reject(error));

        const responseInterceptor = axiosPrivate.interceptors.response.use(response => response, async (error) => {
            if(error?.response?.status === 403 && !error?.config?.send){
                error.config.send = true;
                const newAccessToken = await refresh();
                error.config.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;
                return axiosPrivate(error.config);
            }

            return Promise.reject(error);
        });

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    } , [refresh, user?.accessToken]);

    return axiosPrivate;
};

export default useInterceptor;