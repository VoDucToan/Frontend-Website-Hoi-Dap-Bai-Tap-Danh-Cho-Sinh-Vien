import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
import './ActivityUser.scss'
import { useSelector } from 'react-redux';

const ActivityUser = (props) => {
    const [user] = useOutletContext();
    const idUser = useSelector(state => state.auth.user.id);

    return (
        <div className='activity-user-container'>
            <nav className="nav nav-pills flex-column" style={{ width: "130px" }}>
                {/* <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Tổng quát
                </NavLink> */}
                <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Câu hỏi
                </NavLink>
                <NavLink to={`/users/activity/${user.id}/answers`}
                    className='nav-link answers-sidebar' activeclassname="active">
                    Trả lời
                </NavLink>
                {user.id === idUser && (
                    <>
                        <NavLink to={`/users/activity/${user.id}/following`}
                            className='nav-link following-sidebar' activeclassname="active">
                            Theo dõi
                        </NavLink>
                        <NavLink to={`/users/activity/${user.id}/votes`}
                            className='nav-link votes-sidebar' activeclassname="active">
                            Bình chọn
                        </NavLink>
                    </>
                )}

                {/* <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Thẻ
                </NavLink>
                <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Huy chương
                </NavLink> */}

                {/* <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Điểm thưởng
                </NavLink>
                <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Danh tiếng
                </NavLink>
                <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Tất cả hoạt động
                </NavLink>
                <NavLink to={`/users/activity/${user.id}/questions`}
                    className='nav-link questions-sidebar' activeclassname="active">
                    Phản hồi
                </NavLink> */}
            </nav>
            <div className='detail-activity-user'>
                <Outlet context={[user]} />
            </div>
        </div>
    )
}

export default ActivityUser;