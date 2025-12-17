import axios from "../utils/Axios/axiosCustomize";

const getUser = (idUser) => {
    return axios.get(`api/v1/user/${idUser}`);
}

const createUser = (email, password, name) => {
    const data = {
        display_name: name,
        email_address: email,
        password: password
    }
    return axios.post('api/v1/register', data);
}

const loginUser = (email, password) => {
    const data = {
        email_address: email,
        password: password
    }
    return axios.post('api/v1/login', data);
}

const getAccount = () => {
    return axios.get('api/v1/get-account');
}

const verifyEmail = (token) => {
    const data = {
        token
    }
    return axios.put('api/v1/verify-email', data);
}

const getListUsers = (page, limit, search) => {
    return axios.get(`api/v1/list-users?page=${page}&limit=${limit}&search=${search}`);
}

const updateUser = (idUser, idRole, userName, locationUser, aboutMe, avatarImage, reputation) => {
    const form = new FormData();
    form.append('idUser', idUser)
    form.append('idRole', idRole)
    form.append('userName', userName)
    form.append('locationUser', locationUser)
    form.append('aboutMe', aboutMe)
    form.append('reputation', reputation)
    avatarImage.forEach((img) => {
        form.append('fileImage', img)
    })
    return axios.put('api/v1/user', form);
}

const refreshAccessToken = () => {
    return axios.post('api/v1/refresh');
}

const logout = () => {
    return axios.put('api/v1/logout');
}

export {
    getUser, createUser, loginUser, getAccount, verifyEmail,
    getListUsers, updateUser, refreshAccessToken, logout
};