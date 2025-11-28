import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/SideBar/AdminSideBar";
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
    return (
        <div className="admin-container">
            <div className="main-admin-container">
                <div className="sidenav-admin-container">
                    <AdminSideBar />
                </div>
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin;