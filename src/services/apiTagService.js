import axios from "../utils/Axios/axiosCustomize";

const getListTags = (idPost) => {
    return axios.get(`api/v1/list-tags-by-question/${idPost}`);
}

export { getListTags };