import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdMovieEdit } from "react-icons/md";
import { BsPostcard } from "react-icons/bs";

const AdminSideBar = () => {
    return (
        <Sidebar width="230px">
            <Menu
                menuItemStyles={{
                    icon: {
                        marginRight: '0px',
                    }
                }}
            >
                {/* <MenuItem component={<Link to="/admin" />}
                    icon={<MdOutlineSpaceDashboard />}
                // prefix={<MdOutlineSpaceDashboard />}
                >
                    Bảng điều khiển
                </MenuItem> */}
                <SubMenu label="Bài viết" icon={<BsPostcard />}>
                    <MenuItem component={<Link to="/admin/questions" />}
                        icon={<BsQuestionCircle />}>
                        Câu hỏi
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/answers" />}
                        icon={<RiQuestionAnswerLine />}>
                        Trả lời
                    </MenuItem>
                </SubMenu>
                <SubMenu label="Chỉnh sửa" icon={<CiEdit />}>
                    <MenuItem component={<Link to="/admin/edits-post" />}
                        icon={<FaRegEdit />}>
                        Chỉnh sửa bài viết
                    </MenuItem>
                    <MenuItem component={<Link to="/admin/edits-tag" />}
                        icon={<MdMovieEdit />}>
                        Chỉnh sửa thẻ
                    </MenuItem>
                </SubMenu>
                <MenuItem component={<Link to="/admin/tags" />}
                    icon={<IoMdPricetags />}>
                    Thẻ
                </MenuItem>
                <MenuItem component={<Link to="/admin/users" />}
                    icon={<LuUsers />}>
                    Người dùng
                </MenuItem>
                <MenuItem component={<Link to="/" />}
                    icon={<MdHome />}>
                    Trang chủ
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default AdminSideBar;