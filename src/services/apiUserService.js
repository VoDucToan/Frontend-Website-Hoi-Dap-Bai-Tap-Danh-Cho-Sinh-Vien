import axios from "../utils/Axios/axiosCustomize";

const getNameUser = (idUser) => {
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

export { getNameUser, createUser, loginUser, getAccount };