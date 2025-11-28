import axios from "../utils/Axios/axiosCustomize";

const createListSave = (idUser, listName) => {
    const data = {
        idUser, listName
    }
    return axios.post('api/v1/create-list-save', data);
}

const getListSaves = (idUser) => {
    return axios.get(`api/v1/list-saves-by-user/${idUser}`);
}

const updateListSaveName = (idListSave, listName) => {
    const data = {
        idListSave, listName
    }
    return axios.put('api/v1/update-list-save-name', data);
}

const deleteListSave = (idListSave) => {
    return axios.delete(`api/v1/delete-list-save/${idListSave}`);
}

export {
    createListSave, getListSaves, updateListSaveName,
    deleteListSave
};