import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const AdminProtect = ({children}) => {
    const user = useSelector(state => state.user.user);
    const location = useLocation();

    if (user.is_superuser) {
        return children;
    } else {
        return <Navigate to={'/adminlogin'} state={{from: location.pathname}}/>
    }
}

