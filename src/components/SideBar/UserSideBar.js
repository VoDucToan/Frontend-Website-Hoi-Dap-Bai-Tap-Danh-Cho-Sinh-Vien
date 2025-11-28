import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { GrUserAdmin } from "react-icons/gr";

const UserSideBar = () => {
    const idUser = useSelector(state => state.auth.user.id);
    const role = useSelector(state => state.auth.user?.role);

    return (
        <Sidebar width="164px">
            <Menu>
                {/* <MenuItem active={true}
                    component={<Link to="/" />}>
                    <MdHome /> Trang chủ
                </MenuItem> */}
                <MenuItem component={<Link to="/questions" />}>
                    <BsQuestionCircle /> Câu hỏi </MenuItem>
                <MenuItem component={<Link to="/tags" />}><IoMdPricetags /> Thẻ
                </MenuItem>
                {idUser && (
                    <MenuItem component={<Link to={`/users/saves/${idUser}`} />}>
                        <AiOutlineSave />Lưu trữ
                    </MenuItem>
                )}
                <MenuItem component={<Link to="/users" />}>
                    <LuUsers /> Người dùng
                </MenuItem>
                {role === 2 && (
                    <MenuItem component={<Link to="/admin" />}>
                        <GrUserAdmin /> Trang quản trị
                    </MenuItem>
                )}
            </Menu>
        </Sidebar>
    )
}

export default UserSideBar;