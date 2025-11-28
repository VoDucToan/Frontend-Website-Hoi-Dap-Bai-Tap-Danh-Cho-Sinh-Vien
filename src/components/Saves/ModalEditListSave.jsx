import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import './ModalEditListSave.scss'
import { MdEdit } from "react-icons/md";
import { deleteListSave, updateListSaveName } from '../../services/apiListSaveService';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ModalEditListSave = (props) => {
    const { currentListSave, fetchListSaves } = props;

    const [show, setShow] = useState(false);
    const [listName, setListName] = useState("");
    const navigate = useNavigate();
    const idUser = useSelector(state => state.auth.user.id);

    const fetchInitialListName = () => {
        if (!_.isEmpty(currentListSave) && currentListSave.list_name) {
            setListName(currentListSave.list_name);
        }
    }

    useEffect(() => {
        fetchInitialListName();
    }, [currentListSave])

    const handleClose = () => {
        setShow(false);
        fetchInitialListName();
    }
    const handleShow = () => {
        setShow(true);
    }

    const getListName = (e) => {
        setListName(e.target.value);
    }

    const validateEditList = () => {
        if (!listName) {
            toast.error("Tên danh sách không được để trống")
            return false;
        }
        return true;
    }

    const handleSave = async () => {
        const isValidate = validateEditList();
        if (!isValidate) {
            return;
        }

        const data = await updateListSaveName(currentListSave.id, listName);
        if (data && data.EC === 0) {
            toast.success("Cập nhật tên danh sách thành công");
            fetchListSaves();
            handleClose();
        }
        else {
            toast.error(data.EM);
        }
    }

    const handleDelete = async () => {
        const res = await deleteListSave(currentListSave.id)
        if (res && res.EC === 0) {
            toast.success("Xóa danh sách thành công. Các mục lưu trữ trong danh sách đã được chuyển đến 'Danh sách xem sau'");
            fetchListSaves();
            handleClose();
            navigate(`/users/saves/${idUser}`);
        }
        else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <div className="btn-edit-list-save" onClick={() => handleShow()}>
                <MdEdit />
                <span className='text-edit-list-save'>Chỉnh sửa danh sách</span>
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static" centered size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-edit-list-save-container px-4">
                        <input type="text" className="form-control" placeholder="Nhập tên danh sách"
                            value={listName} onChange={(e) => getListName(e)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Lưu
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default ModalEditListSave;