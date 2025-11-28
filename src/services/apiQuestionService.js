import axios from "../utils/Axios/axiosCustomize";
const FormData = require('form-data')

const getListQuestions = (page, limit, status, noAnswers, noUpVoted, noAcceptedAnswer, daysOld, typeOrder,
    watchedTags, ignoredTags
) => {
    return axios.get(`api/v1/list-questions?page=${page}&limit=${limit}&status=${status}&noAnswers=${noAnswers}&noUpVoted=${noUpVoted}&noAcceptedAnswer=${noAcceptedAnswer}&daysOld=${daysOld}&typeOrder=${typeOrder}&watchedTags=${watchedTags}&ignoredTags=${ignoredTags}`);
}

const getQuestions = (idPost) => {
    return axios.get(`api/v1/question/${idPost}`);
}

const getQuestionByAnswer = (idAnswer) => {
    return axios.get(`api/v1/questions-by-answer/${idAnswer}`);
}

const createQuestion = (idUser, titleQuestion, detailProblem, plainDetailProblem,
    tryExpect, plainTryExpect, imageQuestions, listIdTags) => {
    const postContent = detailProblem + '<br>' + tryExpect;
    const postPlainContent = plainDetailProblem + ' ' + plainTryExpect;
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('postTitle', titleQuestion)
    form.append('postDetail', postContent)
    form.append('postPlainDetail', postPlainContent)
    imageQuestions.forEach((imageQuestion) => {
        form.append('fileImages', imageQuestion)
    })
    listIdTags.forEach((idTag) => {
        form.append('listIdTags[]', idTag)
    })
    return axios.post('api/v1/create-question', form);
}

const deleteQuestion = (idQuestion) => {
    return axios.delete(`api/v1/delete-question/${idQuestion}`);
}

const updateQuestion = (idQuestion, postTitle, postDetail, postPlainDetail, imageQuestions, listIdTags, postStatus) => {
    const form = new FormData()
    form.append('idQuestion', idQuestion)
    form.append('postTitle', postTitle)
    form.append('postDetail', postDetail)
    form.append('postPlainDetail', postPlainDetail)
    imageQuestions.forEach((imageQuestion) => {
        form.append('fileImages', imageQuestion)
    })
    listIdTags.forEach((idTag) => {
        form.append('listIdTags[]', idTag)
    })
    form.append('postStatus', postStatus)
    return axios.put('api/v1/update-question', form);
}

const getImagesPost = (idPost) => {
    return axios.get(`api/v1/images-for-post/${idPost}`);
}

const getAmountQuestionsByUser = (idUser) => {
    return axios.get(`api/v1/amount-questions-by-user/${idUser}`);
}

const getQuestionsByUser = (idUser, page, limit) => {
    return axios.get(`api/v1/questions-by-user/${idUser}?page=${page}&limit=${limit}`);
}

export {
    getListQuestions, getQuestions, createQuestion, deleteQuestion,
    updateQuestion, getImagesPost, getQuestionByAnswer, getAmountQuestionsByUser,
    getQuestionsByUser
};