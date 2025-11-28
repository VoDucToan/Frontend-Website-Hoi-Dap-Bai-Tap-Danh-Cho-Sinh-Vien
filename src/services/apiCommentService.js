import axios from "../utils/Axios/axiosCustomize";

const getListComments = (idPost) => {
    return axios.get(`api/v1/list-comments/${idPost}`);
}

const createComment = (idUser, idPost, contentComment) => {
    const data = {
        idUser: idUser,
        idPost: idPost,
        contentComment: contentComment
    }
    return axios.post(`api/v1/create-comment`, data);
}

const editComment = (commentText, idComment) => {
    const data = {
        commentText, idComment
    }
    return axios.put(`api/v1/edit-comment`, data);
}

const deleteComment = (idComment) => {
    return axios.delete(`api/v1/comment/${idComment}`);
}

export {
    getListComments, createComment, editComment,
    deleteComment
};