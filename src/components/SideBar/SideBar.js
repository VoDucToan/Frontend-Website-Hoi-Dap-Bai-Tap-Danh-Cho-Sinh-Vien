import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";

const SideBar = () => {
    return (
        <Sidebar>
            <Menu>
                <MenuItem component={<Link to="/" />}>
                    <MdHome /> Home
                </MenuItem>
                <MenuItem component={<Link to="/questions" />}>
                    <BsQuestionCircle /> Questions </MenuItem>
                <MenuItem component={<Link to="/tags" />}><IoMdPricetags /> Tags
                </MenuItem>
                <MenuItem component={<Link to="/user/saves" />}>
                    <AiOutlineSave />Saves
                </MenuItem>
                <MenuItem component={<Link to="/users" />}>
                    <LuUsers /> Users
                </MenuItem>
                {/* <MenuItem component={<Link to="/admin" />}>
                        Admin
                    </MenuItem> */}
            </Menu>
        </Sidebar>
    )
}

export default SideBar;