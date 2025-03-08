import axios from "../utils/Axios/axiosCustomize";
const FormData = require('form-data')

const getListQuestions = () => {
    return axios.get('api/v1/list-questions');
}

const getQuestions = (idPost) => {
    return axios.get(`api/v1/question/${idPost}`);
}

const createQuestion = (idUser, titleQuestion, detailProblem, tryExpect, imageQuestion) => {
    const postContent = detailProblem + '<br>' + tryExpect;
    // const data = {
    //     idUser: idUser,
    //     postTitle: titleQuestion,
    //     postDetail: postContent,
    //     imageQuestion: imageQuestion
    // }
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('postTitle', titleQuestion)
    form.append('postDetail', postContent)
    form.append('fileImage', imageQuestion)
    return axios.post('api/v1/create-question', form);

}

export { getListQuestions, getQuestions, createQuestion };