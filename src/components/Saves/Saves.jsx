import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import './Saves.scss';
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { getListSaves } from "../../services/apiListSaveService";
import _ from "lodash";

const Saves = () => {
    const [user, fetchUser] = useOutletContext();

    const [listSaves, setListSaves] = useState([]);
    const [show, setShow] = useState(false);
    const [listName, setListName] = useState("");

    const fetchListSaves = async () => {
        if (!_.isEmpty(user)) {
            const res = await getListSaves(user.id);
            if (res && res.EC === 0) {
                setListSaves(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchListSaves();
    }, [user])

    const handleClose = () => {
        setListName("");
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    return (
        <div className="saves-container">
            <nav className="nav nav-pills flex-column" style={{ width: "210px" }}>
                {user?.id && listSaves?.[0]?.id && (
                    <NavLink to={`/users/saves/${user.id}`} end
                        className='nav-link list-saves' activeclassname="active">
                        Danh sách xem sau
                    </NavLink>
                )}

                <div className="list-your-saves">
                    <span className="title-saves">
                        Danh sách của bạn
                    </span>
                    <span className="icon-saves" onClick={() => handleShow()}>
                        <GoPlus />
                    </span>
                </div>
                {listSaves && listSaves.length > 0 && listSaves.slice(1).map((listSave) => {
                    return (
                        <NavLink key={listSave.id} to={`/users/saves/${user.id}/${listSave.id}`}
                            className='nav-link list-saves' activeclassname="active">
                            {listSave.list_name}
                        </NavLink>
                    )
                })}
            </nav>
            <div className="main-saves">
                <Outlet context={[show, handleClose, handleShow, listName,
                    setListName, fetchListSaves, user, listSaves
                ]} />
            </div>
        </div >
    )
}

export default Saves;