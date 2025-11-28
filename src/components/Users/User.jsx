import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../services/apiUserService";
import { useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";

const User = (props) => {
    const { iduser } = props;
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUser = async () => {
        if (iduser) {
            const res = await getUser(iduser)
            if (res && res.EC === 0) {
                setUser(res.DT[0]);
            }
            else {
                navigate('/forbidden', { replace: true });
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, [iduser])

    return (
        <div className="account-user-container">
            <HeaderUser user={user} />
            <Outlet context={[user, fetchUser]} />
        </div>
    )
}

export default User;