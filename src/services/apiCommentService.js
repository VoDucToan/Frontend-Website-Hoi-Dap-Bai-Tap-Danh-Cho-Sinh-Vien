import axios from "../utils/Axios/axiosCustomize";

const getListComments = (idPost) => {
    return axios.get(`api/v1/list-comments/${idPost}`);
}

export { getListComments };