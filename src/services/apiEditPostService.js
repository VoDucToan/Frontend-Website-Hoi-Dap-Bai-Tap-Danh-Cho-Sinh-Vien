import axios from "../utils/Axios/axiosCustomize";

const editPost = (idUser, idPost, titlePost, detailPost, editSummary, editImages, listIdTags, previousEditId) => {
    const form = new FormData()
    form.append('idUser', idUser)
    form.append('idPost', idPost)
    form.append('titlePost', titlePost)
    form.append('detailPost', detailPost)
    form.append('editSummary', editSummary)
    form.append('previousEditId', previousEditId)
    editImages.forEach((editImage) => {
        form.append('fileImages', editImage)
    })
    listIdTags.forEach((idTag) => {
        form.append('listIdTags[]', idTag)
    })
    return axios.post('api/v1/edit-for-post', form);
}

const getListEditsPost = (idPost) => {
    return axios.get(`api/v1/list-edits-for-post/${idPost}`);
}

const getListRevisionsPost = (idPost, idUser) => {
    return axios.get(`api/v1/list-revisions-for-post/${idPost}?idUser=${idUser}`);
}

const getEditForPost = (idPost) => {
    return axios.get(`api/v1//edit-for-post/${idPost}`);
}

const getEditPost = (idEdit) => {
    return axios.get(`api/v1/editpost/${idEdit}`);
}

const getImagesEdit = (idEdit) => {
    return axios.get(`api/v1/images-for-edit/${idEdit}`);
}

const getListEdits = (editStatus, page, limit) => {
    return axios.get(`api/v1/list-edits/${editStatus}?page=${page}&limit=${limit}`);
}

const rejectEditForPost = (idEdit, idUser, notificationType, notificationSummary, notificationResource) => {
    const data = {
        idEdit, idUser, notificationType, notificationSummary, notificationResource
    }
    return axios.put(`api/v1/reject-edit-for-post`, data);
}

const approveEditForPost = (idEdit, idUser, notificationType, notificationSummary, notificationResource) => {
    const data = {
        idEdit, idUser, notificationType, notificationSummary, notificationResource
    }
    return axios.put(`api/v1/approve-edit-for-post`, data);
}

const updateEditPost = (idEdit, postTitle, postDetail, editSummary, editImages, listIdTags) => {
    const form = new FormData()
    form.append('idEdit', idEdit)
    form.append('postTitle', postTitle)
    form.append('postDetail', postDetail)
    form.append('editSummary', editSummary)
    editImages.forEach((editImage) => {
        form.append('fileImages', editImage)
    })
    listIdTags.forEach((idTag) => {
        form.append('listIdTags[]', idTag)
    })
    return axios.put('api/v1/update-editpost', form);
}

export {
    editPost, getListEditsPost, getListRevisionsPost, getEditPost, getImagesEdit,
    getListEdits, rejectEditForPost, approveEditForPost, getEditForPost,
    updateEditPost
};