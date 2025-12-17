import axios from "../utils/Axios/axiosCustomize";

const getEditTagForUser = (idTag, idUser) => {
    return axios.get(`api/v1/edit-tag-for-user?idTag=${idTag}&idUser=${idUser}`);
}

const getImagesForEditTag = (idEditTag) => {
    return axios.get(`api/v1/images-for-edit-tag/${idEditTag}`);
}

const getEditForTag = (idTag) => {
    return axios.get(`api/v1/edit-for-tag/${idTag}`);
}

const editTag = (idUser, idTag, tagName, tagSummary, tagDescription, editSummary, editImages, previousEditId) => {
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('idTag', idTag)
    form.append('tagName', tagName)
    form.append('tagSummary', tagSummary)
    form.append('tagDescription', tagDescription)
    form.append('editSummary', editSummary)
    form.append('previousEditId', previousEditId)
    editImages.forEach((editImage) => {
        form.append('fileImages', editImage)
    })
    return axios.post('api/v1/edit-for-tag', form);
}

const updateEditTag = (idEdit, tagName, tagSummary, tagDescription, editSummary, editImages) => {
    const form = new FormData()
    form.append('idEdit', idEdit)
    form.append('tagName', tagName)
    form.append('tagSummary', tagSummary)
    form.append('tagDescription', tagDescription)
    form.append('editSummary', editSummary)
    editImages.forEach((editImage) => {
        form.append('fileImages', editImage)
    })
    return axios.put('api/v1/update-edittag', form);
}

const getListEditsTag = (editStatus, page, limit) => {
    return axios.get(`api/v1/list-edits-tag/${editStatus}?page=${page}&limit=${limit}`);
}

const getEditTag = (idEditTag) => {
    return axios.get(`api/v1/edittag/${idEditTag}`);
}

const rejectEditForTag = (idEdit) => {
    const data = {
        idEdit
    }
    return axios.put(`api/v1/reject-edit-for-tag`, data);
}

const approveEditForTag = (idEdit) => {
    const data = {
        idEdit
    }
    return axios.put(`api/v1/approve-edit-for-tag`, data);
}

export {
    getEditTagForUser, getImagesForEditTag, editTag, updateEditTag,
    getListEditsTag, getEditTag, rejectEditForTag, approveEditForTag,
    getEditForTag
};