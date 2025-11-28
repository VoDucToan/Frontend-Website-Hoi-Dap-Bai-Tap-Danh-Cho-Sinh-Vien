import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createListSave, getListSaves } from '../../services/apiListSaveService';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { checkSaveItemByUser, saveItemForList, unsaveItemForUser } from '../../services/apiItemSaveService';
import './ModalSaveItem.scss';
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const ModalSaveItem = (props) => {
    const { idPostType, idpost } = props;

    const [show, setShow] = useState(false);
    const [idListSave, setIdListSave] = useState(0);
    const [listSaves, setListSaves] = useState([]);
    const [privateNote, setPrivateNote] = useState("");
    const [isSavePost, setIsSavePost] = useState(false);

    const idUser = useSelector(state => state.auth.user.id);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const fetchListSaves = async () => {
        if (idUser) {
            const res = await getListSaves(idUser);
            if (res && res.EC === 0) {
                setListSaves(res.DT);
                setIdListSave(res.DT[0]?.id);
            }
        }
    }

    useEffect(() => {
        fetchListSaves();
    }, [idUser])

    const fetchIsSavePost = async () => {
        if (idUser && idpost) {
            const res = await checkSaveItemByUser(idUser, idpost)
            if (res && res.EC === 0) {
                setIsSavePost(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchIsSavePost();
    }, [idUser, idpost])

    const handleClose = () => {
        resetSaveItem();
        setShow(false);
    }

    const validateSavePost = () => {
        const postType = idPostType === 1 ? "câu hỏi" : "câu trả lời"
        if (!isAuthenticated) {
            toast.error(`Bạn cần đăng nhập để lưu ${postType}`)
            return false;
        }
        return true;
    }

    const handleShow = () => {
        const isValidate = validateSavePost();
        if (!isValidate) {
            return;
        }
        setShow(true);
    }

    const getIdListSave = (e) => {
        setIdListSave(e.target.value);
    }

    const getPrivateNote = (e) => {
        setPrivateNote(e.target.value);
    }

    const resetSaveItem = () => {
        setIdListSave(listSaves[0].id);
        setPrivateNote("");
    }

    const handleSavePost = async () => {
        const data = await saveItemForList(idListSave, idpost, privateNote);
        if (data && data.EC === 0) {
            const postType = idPostType === 1 ? "Câu hỏi" : "Câu trả lời"
            toast.success(`${postType} đã lưu thành công`);
            handleClose();
            fetchIsSavePost();
        }
        else {
            toast.error(data.EM);
        }
    }

    const handleUnsavePost = async () => {
        const res = await unsaveItemForUser(idUser, idpost);
        if (res && res.EC === 0) {
            const postType = idPostType === 1 ? "Câu hỏi" : "Câu trả lời"
            toast.success(`${postType} đã bỏ lưu thành công`);
            fetchIsSavePost();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            {isSavePost ?
                (
                    <OverlayTrigger
                        placement={'right'}
                        overlay={
                            <Tooltip>
                                Bỏ lưu {idPostType === 1 ? "câu hỏi" : "câu trả lời"}
                            </Tooltip>
                        }
                    >
                        <span className="unsave-post" onClick={() => handleUnsavePost()}>
                            <FaBookmark />
                        </span>
                    </OverlayTrigger>
                )
                :
                (
                    <OverlayTrigger
                        placement={'right'}
                        overlay={
                            <Tooltip>
                                Lưu {idPostType === 1 ? "câu hỏi" : "câu trả lời"}
                            </Tooltip>
                        }
                    >
                        <span className="save-post" onClick={() => handleShow()}>
                            <FaRegBookmark />
                        </span>
                    </OverlayTrigger>
                )
            }

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Lưu vào</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-save-item-container px-4">
                        <div >
                            <select className="form-select" value={idListSave}
                                onChange={(e) => getIdListSave(e)}
                            >
                                {listSaves && listSaves.length > 0 && listSaves.map((listSave) => {
                                    return (
                                        <option value={listSave.id} key={listSave.id}>
                                            {listSave.list_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <hr />
                        <div >
                            <textarea className="form-control" rows="3"
                                placeholder='Thêm ghi chú của bạn (không bắt buộc)'
                                value={privateNote} onChange={(e) => getPrivateNote(e)}
                            ></textarea>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSavePost()}>
                        Xong
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default ModalSaveItem;