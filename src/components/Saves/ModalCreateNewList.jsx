import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createListSave } from '../../services/apiListSaveService';

const ModalCreateNewList = (props) => {
    const { show, handleClose, listName, setListName,
        fetchListSaves
    } = props;

    const idUser = useSelector(state => state.auth.user.id);

    const getListName = (e) => {
        setListName(e.target.value);
    }

    const validateCreateList = () => {
        if (!listName) {
            toast.error("Tên danh sách không được để trống")
            return false;
        }
        return true;
    }

    const handleSave = async () => {
        const isValidate = validateCreateList();
        if (!isValidate) {
            return;
        }

        const data = await createListSave(idUser, listName);
        if (data && data.EC === 0) {
            toast.success("Tạo danh sách mới thành công");
            fetchListSaves();
            handleClose();
        }
        else {
            toast.error(data.EM);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Danh sách mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-create-new-list-container px-4">
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Nhập tên danh sách"
                            value={listName} onChange={(e) => getListName(e)} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleSave()}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateNewList;