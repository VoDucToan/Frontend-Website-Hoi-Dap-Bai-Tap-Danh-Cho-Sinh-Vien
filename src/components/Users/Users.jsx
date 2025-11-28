import { useParams } from "react-router-dom";
import './Users.scss'
import User from "./User";
import ListUsers from "./ListUsers";

const Users = () => {
    const { iduser } = useParams();

    return (
        <div className="accounts-users-container">
            {iduser ?
                (
                    <User iduser={iduser} />
                )
                :
                (
                    <ListUsers />
                )
            }
        </div>
    )
}

export default Users;