import axios from "../utils/Axios/axiosCustomize";

const getListTagsByQuestion = (idPost) => {
    return axios.get(`api/v1/list-tags-by-question/${idPost}`);
}

const getListTagsByEdit = (idEdit) => {
    return axios.get(`api/v1/list-tags-by-edit/${idEdit}`);
}

const getListTags = (page, limit, status, search) => {
    return axios.get(`api/v1/list-tags?page=${page}&limit=${limit}&status=${status}&search=${search}`);
}

const InsertTagsQuestion = (idQuestion, listIdTags) => {
    const data = {
        idQuestion, listIdTags
    }
    return axios.post('api/v1/insert-tags-for-question', data);
}

const deleteTagsQuestion = (idQuestion) => {
    return axios.delete(`api/v1/delete-tags-for-question/${idQuestion}`);
}

const createTag = (idUser, tagName, tagSummary, tagDescription, imageTags) => {
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('tagName', tagName)
    form.append('tagSummary', tagSummary)
    form.append('tagDescription', tagDescription)
    imageTags.forEach((imageTag) => {
        form.append('fileImages', imageTag)
    })
    return axios.post('api/v1/create-tag', form);
}

const getImagesTag = (idTag) => {
    return axios.get(`api/v1/images-for-tag/${idTag}`);
}

const updateTag = (idTag, tagName, tagSummary, tagDescription, tagStatus, imageTags) => {
    const form = new FormData()
    form.append('idTag', idTag)
    form.append('tagName', tagName)
    form.append('tagSummary', tagSummary)
    form.append('tagDescription', tagDescription)
    imageTags.forEach((imageTag) => {
        form.append('fileImages', imageTag)
    })
    form.append('tagStatus', tagStatus)
    return axios.put('api/v1/update-tag', form);
}

const getTag = (idTag) => {
    return axios.get(`api/v1/tag/${idTag}`);
}

export {
    getListTagsByQuestion, getListTags, InsertTagsQuestion, deleteTagsQuestion,
    getListTagsByEdit, createTag, getImagesTag, updateTag, getTag
};