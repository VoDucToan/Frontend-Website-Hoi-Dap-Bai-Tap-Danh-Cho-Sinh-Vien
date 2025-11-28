import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { moveItemForList } from "../../services/apiItemSaveService";

const ModalMoveItem = (props) => {
    const { idPostType, show, handleClose, listSaves,
        fetchItems, idItemSave
    } = props;

    const [idListSave, setIdListSave] = useState(0);

    const { idlist } = useParams();

    useEffect(() => {
        if (idlist) {
            setIdListSave(idlist);
        }
        else if (listSaves && listSaves.length > 0) {
            setIdListSave(listSaves[0].id)
        }
    }, [idlist, listSaves, show])

    const getIdListSave = (e) => {
        setIdListSave(e.target.value);
    }

    const handleMovePost = async () => {
        const data = await moveItemForList(idItemSave, idListSave);
        if (data && data.EC === 0) {
            const postType = idPostType === 1 ? "Câu hỏi" : "Câu trả lời"
            toast.success(`${postType} đã di chuyển thành công`);
            handleClose();
            fetchItems();
        }
        else {
            toast.error(data.EM);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered size="sm">
            <Modal.Header closeButton>
                <Modal.Title>Lưu vào</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-move-item-container px-4">
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
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleMovePost()}>
                    Xong
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMoveItem;
