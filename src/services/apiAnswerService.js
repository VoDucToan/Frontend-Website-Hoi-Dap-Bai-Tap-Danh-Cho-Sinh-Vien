import axios from "../utils/Axios/axiosCustomize";

const getNumberAnswers = (idPost) => {
    return axios.get(`api/v1/number-answers/${idPost}`);
}

const getListAnswers = (idQuestion, page, limit, typeOrder) => {
    return axios.get(`api/v1/list-answers/${idQuestion}?page=${page}&limit=${limit}&typeOrder=${typeOrder}`);
}

const handleCreateAnswer = (idUser, idQuestion, contentAnswer, contentPlainAnswer, imageAnswers) => {
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('idQuestion', idQuestion)
    form.append('contentAnswer', contentAnswer)
    form.append('contentPlainAnswer', contentPlainAnswer)
    imageAnswers.forEach((imageAnswer) => {
        form.append('fileImages', imageAnswer)
    })
    // const data = {
    //     idUser: idUser,
    //     idQuestion: idQuestion,
    //     contentAnswer: contentAnswer
    // }
    return axios.post('api/v1/create-answers', form);
}

const handleAcceptAnswer = (idQuestion, idAnswer) => {
    const data = {
        idQuestion, idAnswer
    }
    return axios.put('api/v1/accept-answer', data);
}

const getPageNumberByAnswer = (idAnswer, idQuestion, limit) => {
    return axios.get(`api/v1/page-number-by-answer?idAnswer=${idAnswer}
        &idQuestion=${idQuestion}&limit=${limit}`);
}

const handleUnacceptAnswer = (idQuestion) => {
    const data = {
        idQuestion
    }
    return axios.put('api/v1/unaccepted-answer', data);
}

const getAmountAnswersByUser = (idUser) => {
    return axios.get(`api/v1/amount-answers-by-user/${idUser}`);
}

const getAnswersByUser = (idUser, page, limit) => {
    return axios.get(`api/v1/answers-by-user/${idUser}?page=${page}&limit=${limit}`);
}

const getAnswers = (page, limit) => {
    return axios.get(`api/v1/answers?page=${page}&limit=${limit}`);
}

const updateAnswer = (idAnswer, postDetail, postStatus, postPlainDetail, imageAnswers) => {
    const form = new FormData()
    form.append('idAnswer', idAnswer)
    form.append('postDetail', postDetail)
    form.append('postPlainDetail', postPlainDetail)
    form.append('postStatus', postStatus)
    imageAnswers.forEach((imageAnswer) => {
        form.append('fileImages', imageAnswer)
    })
    return axios.put('api/v1/update-answer', form);
}

export {
    getNumberAnswers, getListAnswers, handleCreateAnswer, handleAcceptAnswer,
    getPageNumberByAnswer, handleUnacceptAnswer, getAmountAnswersByUser,
    getAnswersByUser, getAnswers, updateAnswer
};