import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const OwnerGuard = ({ children }) => {
    const authId = useSelector(state => state.auth.user?.id);
    const { iduser } = useParams();

    return authId === +iduser ?
        children
        :
        <Navigate to="/forbidden" replace />;
}

export default OwnerGuard;