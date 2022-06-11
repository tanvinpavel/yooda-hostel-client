import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const PrivateRoute = ({allowRoles}) => {
    const {user} = useAuthContext();
    const location = useLocation();

    return user?.roles?.find(role => allowRoles.includes(role)) 
        ? <Outlet/>
        : user?.accessToken
            ?  <Navigate to='/unauthorized' state={{from: location}} replace />
            : <Navigate to='/login' state={{from: location}} replace />
};

export default PrivateRoute;