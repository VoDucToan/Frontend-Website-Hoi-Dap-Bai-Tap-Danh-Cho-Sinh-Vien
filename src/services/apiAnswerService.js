import axios from "../utils/Axios/axiosCustomize";

const getNumberAnswers = (idPost) => {
    return axios.get(`api/v1/number-answers/${idPost}`);
}

const getListAnswers = (idQuestion) => {
    return axios.get(`api/v1/list-answers/${idQuestion}`);
}

const handleCreateAnswer = (idUser, idQuestion, contentAnswer) => {
    const data = {
        idUser: idUser,
        idQuestion: idQuestion,
        contentAnswer: contentAnswer
    }
    return axios.post('api/v1/create-answers', data);
}

export { getNumberAnswers, getListAnswers, handleCreateAnswer };