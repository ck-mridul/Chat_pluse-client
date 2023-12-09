import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.user.user);
    const location = useLocation();

    if (user) {
        return children;
    } else {
        return <Navigate to={'/login'} state={{from: location.pathname}}/>
    }
}