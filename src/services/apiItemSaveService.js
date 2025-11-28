import axios from "../utils/Axios/axiosCustomize";

const saveItemForList = (listSaveId, postId, privateNote) => {
    const data = {
        listSaveId, postId, privateNote
    }
    return axios.post('api/v1/save-item-for-list', data);
}

const checkSaveItemByUser = (idUser, idPost) => {
    return axios.get(`api/v1/check-save-item-by-user?idUser=${idUser}&idPost=${idPost}`);
}

const unsaveItemForUser = (idUser, idPost) => {
    return axios.delete(`api/v1/unsave-item-for-user?idUser=${idUser}&idPost=${idPost}`);
}

const getItemsSaveByList = (idListSave) => {
    return axios.get(`api/v1/items-save-by-list/${idListSave}`);
}

const getItemsSaveByListLater = (idUser) => {
    return axios.get(`api/v1/items-save-by-list-later/${idUser}`);
}

const moveItemForList = (idItemSave, idListSave) => {
    const data = {
        idItemSave, idListSave
    }
    return axios.put('api/v1/move-item-for-list', data);
}

const deletePrivateNoteForItem = (idItemSave) => {
    const data = {
        idItemSave
    }
    return axios.put('api/v1/delete-private-note-for-item', data);
}

const updatePrivateNoteForItem = (idItemSave, privateNote) => {
    const data = {
        idItemSave, privateNote
    }
    return axios.put('api/v1/update-private-note-for-item', data);
}


export {
    saveItemForList, checkSaveItemByUser, unsaveItemForUser,
    getItemsSaveByList, getItemsSaveByListLater, moveItemForList,
    deletePrivateNoteForItem, updatePrivateNoteForItem
};