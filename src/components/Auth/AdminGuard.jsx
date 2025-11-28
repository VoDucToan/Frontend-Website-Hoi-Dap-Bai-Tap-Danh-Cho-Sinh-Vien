import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const AdminGuard = ({ children }) => {
    const role = useSelector(state => state.auth.user?.role);

    return role === 2 ?
        children
        :
        <Navigate to="/forbidden" replace />;
}

export default AdminGuard;