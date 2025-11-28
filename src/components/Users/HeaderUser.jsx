import './HeaderUser.scss'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const HeaderUser = (props) => {
    const { user } = props;
    const idUser = useSelector(state => state.auth.user.id);

    return (
        <>
            <div className="header-user">
                <div className="avatar-user">
                    <img className="img-avatar-user "
                        src={`http://localhost:8080/images/uploads/${user.avatar_file_name}`} alt="Avatar Author" />
                    <div className='info-avatar-user'>
                        <span className='display-name-avatar-user'>{user.display_name}</span>
                        <div className='member-user'>
                            <span className='icon-member-user'><LiaBirthdayCakeSolid /></span>
                            <span className='text-member-user'>Thành viên từ {user.createdAtAgo}</span>
                        </div>
                        {user.location && (
                            <div className='location-user'>
                                <span className='icon-location-user'><FaLocationDot /></span>
                                <span className='text-location-user'>{user.location}</span>
                            </div>
                        )}

                    </div>
                </div>
                <Link to={`/users/edit/${user.id}`} className='nav-link'>
                    <div className="btn-edit-profile">
                        <MdEdit />
                        <span className='text-edit-profile'>Chỉnh sửa thông tin</span>
                    </div>
                </Link>
            </div>
            <nav className="nav nav-pills navigate-body-user">
                <NavLink to={`/users/${user.id}`} className='nav-link profile-user ' activeclassname="active">
                    Thông tin
                </NavLink>
                <NavLink to={`/users/activity/${user.id}`} className='nav-link activity-user' activeclassname="active">
                    Hoạt động
                </NavLink>
                {user.id === idUser && (
                    <>
                        <NavLink to={`/users/saves/${user.id}`} className='nav-link saves-user' activeclassname="active">
                            Lưu trữ
                        </NavLink>
                        <NavLink to={`/users/inboxes/${user.id}`} className='nav-link saves-user' activeclassname="active">
                            Thông báo
                        </NavLink>
                        <NavLink to={`/users/edit/${user.id}`} className='nav-link settings-user' activeclassname="active">
                            Cài đặt
                        </NavLink>
                    </>
                )}
            </nav>

        </>

    )
}

export default HeaderUser;