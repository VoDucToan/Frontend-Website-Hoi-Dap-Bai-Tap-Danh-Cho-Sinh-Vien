import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UploadAndDisplayImage from '../../../utils/UploadImage/UploadAndDisplayImage';
import Editor from '../../../utils/Editor/Editor';
import { deleteTagsQuestion, getListTags, getListTagsByQuestion, InsertTagsQuestion } from '../../../services/apiTagService';
import { getImagesPost, updateQuestion } from '../../../services/apiQuestionService';
import { toast } from 'react-toastify';
import { updateAnswer } from '../../../services/apiAnswerService';

function ModalUpdateAnswer(props) {
    const { detail, status, id, resetPage } = props;

    const [show, setShow] = useState(false);
    const [statusAnswer, setStatusAnswer] = useState(false);
    const [detailAnswer, setDetailAnswer] = useState("");
    const [initialDetailAnswer, setInitialDetailAnswer] = useState("");
    const [plainTextDetailAnswer, setPlainTextDetailAnswer] = useState("");
    const [imageAnswer, setImageAnswer] = useState([]);
    const [initialImageAnswer, setInitialImageAnswer] = useState([]);
    const [idAnswer, setIdAnswer] = useState(0);
    const [resetImages, setResetImages] = useState(1);

    useEffect(() => {
        setInitialDetailAnswer(detail);
        setIdAnswer(id);
        setStatusAnswer(status);
    }, [show, detail, id, status])

    const fetchImagesAnswer = async () => {
        if (idAnswer) {
            const dataImagesPost = await getImagesPost(idAnswer);
            if (dataImagesPost && dataImagesPost.EC === 0) {
                const arrDataImagesPost = dataImagesPost.DT.map((imagePost) => {
                    return `http://localhost:8080/images/uploads/${imagePost.file_name}`;
                })
                setInitialImageAnswer(arrDataImagesPost);
            }
        }
    }

    useEffect(() => {
        fetchImagesAnswer();
    }, [idAnswer, show])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const getStatus = (e) => {
        setStatusAnswer(!statusAnswer);
    }

    const getContentEditor = (content, id) => {
        setDetailAnswer(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextDetailAnswer(plainText);
    }

    const getImage = (image) => {
        setImageAnswer(image);
    }

    const validateSaveChange = () => {
        if (plainTextDetailAnswer.length < 30) {
            toast.error("Mô tả chi tiết câu trả lời phải chứa ít nhất 30 ký tự")
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        const isValidate = validateSaveChange();
        if (!isValidate) {
            return;
        }

        const data = await updateAnswer(idAnswer, detailAnswer, statusAnswer, plainTextDetailAnswer, imageAnswer);
        if (data && data.EC === 0) {
            toast.success("Cập nhật câu trả lời thành công");
            resetPage();
            handleClose();
        }
        else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <button className="btn btn-warning me-2" onClick={handleShow}>Cập Nhật</button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Cập Nhật Câu Trả lời</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-update-answer-container px-4">
                        <div class="form-check form-switch mb-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="idSwitchStatus"
                                checked={statusAnswer} onChange={(e) => getStatus(e)} />
                            <label class="form-check-label fw-bold" for="idSwitchStatus">Trạng thái kích hoạt</label>
                        </div>
                        <div className="detail-answer mb-4">
                            <span className="fw-bold ">Nội dung câu trả lời.</span>
                            <span className="small d-block mb-2">Mô tả chi tiết câu trả lời.</span>
                            <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                                initialHtml={initialDetailAnswer} initialHeight={"210px"} />
                        </div>
                        <UploadAndDisplayImage getImage={getImage} initialImage={initialImageAnswer}
                            isMultiple={true} resetPage={resetImages} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges()}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateAnswer;