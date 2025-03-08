import axios from "../utils/Axios/axiosCustomize";

const getListTagsByQuestion = (idPost) => {
    return axios.get(`api/v1/list-tags-by-question/${idPost}`);
}

const getListTags = () => {
    return axios.get(`api/v1/list-tags`);
}

const InsertTagsQuestion = (idQuestion, listIdTags) => {
    const data = {
        idQuestion, listIdTags
    }
    return axios.post('api/v1/insert-tags-for-question', data);
}

export { getListTagsByQuestion, getListTags, InsertTagsQuestion };