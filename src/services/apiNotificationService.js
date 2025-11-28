import axios from "../utils/Axios/axiosCustomize";

const getListNotificationsByUser = (idUser, unRead, page, limit) => {
    return axios.get(`api/v1/list-notification-by-user/${idUser}?unRead=${unRead}&page=${page}&limit=${limit}`);
}

const readNotification = (idNotification) => {
    const data = {
        idNotification
    }
    return axios.put(`api/v1/read-notification`, data);
}

const unreadNotification = (idNotification) => {
    const data = {
        idNotification
    }
    return axios.put(`api/v1/unread-notification`, data);
}

const markAllRead = (idUser) => {
    const data = {
        idUser
    }
    return axios.put(`api/v1/mark-all-read`, data);
}

export {
    getListNotificationsByUser, readNotification, unreadNotification,
    markAllRead
};