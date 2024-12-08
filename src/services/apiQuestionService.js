import axios from "../utils/Axios/axiosCustomize";

const getListQuestions = () => {
    return axios.get('api/v1/list-questions');
}

const getQuestions = (idPost) => {
    return axios.get(`api/v1/question/${idPost}`);
}

const createQuestion = (idUser, titleQuestion, detailProblem, imgDetailProblem, tryExpect, imgTryExpect) => {
    const postContent = detailProblem + '<br>' + tryExpect;
    const data = {
        idUser: idUser,
        postTitle: titleQuestion,
        postDetail: postContent,
        imgDetail: imgDetailProblem,
        imgTryExpect: imgTryExpect
    }
    return axios.post('api/v1/create-question', data);

}

export { getListQuestions, getQuestions, createQuestion };