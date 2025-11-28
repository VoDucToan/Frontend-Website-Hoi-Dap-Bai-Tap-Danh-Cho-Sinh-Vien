import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const location = useLocation();
    const auth = useSelector(state => state.auth);

    return auth.isAuthenticated === true ?
        children
        :
        <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth;