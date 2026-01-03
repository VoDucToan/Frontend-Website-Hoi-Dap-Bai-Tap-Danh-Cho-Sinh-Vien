import { Link } from 'react-router-dom';
import './Notification.scss'
import { IoIosNotifications } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getListNotificationsByUser, markAllRead, readNotification, unreadNotification } from '../../services/apiNotificationService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LuMailOpen } from "react-icons/lu";
import socket from '../../utils/Socket/Socket';

const Notification = () => {
    const idUser = useSelector(state => state.auth.user.id);
    const [listNotifications, setListNotifications] = useState([]);
    const [amountUnreadNotifications, setAmountUnreadNotifications] = useState(0);
    const [unRead, setUnRead] = useState(false);

    const fetchListNotifications = async () => {
        if (idUser) {
            const res = await getListNotificationsByUser(idUser, unRead);
            if (res && res.EC === 0) {
                setListNotifications(res.DT.listNotifications);
                setAmountUnreadNotifications(res.DT.amountUnreadNotifications);
            }
        }
    }

    useEffect(() => {
        fetchListNotifications();
    }, [idUser, unRead])

    useEffect(() => {
        socket.emit('join_notifications', idUser);
        socket.on("new_notification", (payload) => {
            if (payload) {
                fetchListNotifications();
            }
        });

        return () => {
            socket.off("new_notification");
        };
    }, []);

    const handleInbox = async (isRead, idNotification) => {
        if (isRead) {
            const res = await unreadNotification(idNotification);
            if (res && res.EC === 0) {
                await fetchListNotifications();
            }
            else {
                toast.error(res.EM);
            }
        }
        else {
            const res = await readNotification(idNotification);
            if (res && res.EC === 0) {
                await fetchListNotifications();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const handleClickNotifications = async (isRead, idNotification) => {
        if (!isRead) {
            const res = await readNotification(idNotification);
            if (res && res.EC === 0) {
                await fetchListNotifications();
            }
            else {
                toast.error(res.EM);
            }
        }
        const $ = window.$;
        const $sel = $('#idIconNotification');
        $sel.dropdown('toggle');
    }

    const handleMarkAllRead = async () => {
        const res = await markAllRead(idUser)
        if (res && res.EC === 0) {
            fetchListNotifications();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="dropdown">
            <span className='icon-notification' data-bs-toggle="dropdown"
                data-bs-auto-close="outside" aria-expanded="false"
                id="idIconNotification">
                <IoIosNotifications />
                {amountUnreadNotifications > 0 &&
                    (
                        <span className='amount-notification'>
                            {amountUnreadNotifications <= 20 ? amountUnreadNotifications : '20+'}
                        </span>
                    )
                }

            </span>

            <ul className="dropdown-menu dropdown-menu-end notification-menu">
                <div className='notification-header'>
                    <div className="dropdown">
                        <span className='dropdown-toggle notification-inbox' data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Thông báo ({unRead ? 'Chưa đọc' : 'Tất cả'})
                        </span>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" type="button"
                                onClick={() => setUnRead(false)}>Tất cả</button></li>
                            <li><button className="dropdown-item" type="button"
                                onClick={() => setUnRead(true)}>Chưa đọc</button></li>
                        </ul>
                    </div>
                    {amountUnreadNotifications > 0 && (
                        <span className='notification-mark'
                            onClick={() => handleMarkAllRead()}>Đánh dấu tất cả đã đọc</span>
                    )}
                </div>
                {listNotifications && listNotifications.length > 0 && listNotifications.map((notification) => {
                    return (
                        <li key={notification.id}>
                            <div className='open-notification' onClick={() => handleInbox(notification.is_read, notification.id)}>
                                {notification.is_read ?
                                    (
                                        <LuMailOpen />
                                    )
                                    :
                                    (
                                        <IoMdMail />
                                    )}
                            </div>

                            <Link to={`${notification.notification_resource}`}
                                state={{ idTargetAnswer: notification.id_target_answer }}
                                className={"dropdown-item notification-content" + (notification.is_read ? " notification-read" : " notification-unread")}
                                onClick={() => handleClickNotifications(notification.is_read, notification.id)}>
                                <span><IoSchool /></span>
                                <div className='notification-info'>
                                    <div className='info-header'>
                                        <span className='info-type'>{notification.notification_type}</span>
                                        <span className='info-creation'>{notification.noticedTime}</span>
                                    </div>
                                    <div className='info-summary'>{notification.notification_summary}</div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
                <Link to={`/users/inboxes/${idUser}`} className='text-decoration-none'>
                    <div className='go-full-inbox'>Đi đến toàn bộ thông báo</div>
                </Link>

            </ul>
        </div >
    )
}

export default Notification;

