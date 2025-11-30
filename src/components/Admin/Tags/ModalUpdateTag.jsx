import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UploadAndDisplayImage from '../../../utils/UploadImage/UploadAndDisplayImage';
import Editor from '../../../utils/Editor/Editor';
import { getImagesTag, updateTag } from '../../../services/apiTagService';
import { toast } from 'react-toastify';

function ModalUpdateTag(props) {
    const { tagname, tagsummary, status, tagwiki, idtag, fetchTags } = props;

    const [show, setShow] = useState(false);
    const [statusTag, setStatusTag] = useState(false);
    const [tagName, setTagName] = useState("");
    const [tagSummary, setTagSummary] = useState("");
    const [tagWiki, setTagWiki] = useState("");
    const [initialTagWiki, setInitialTagWiki] = useState("");
    const [plainTextTagWiki, setPlainTextTagWiki] = useState("");
    const [initialImageTag, setInitialImageTag] = useState([]);
    const [imageTag, setImageTag] = useState([]);

    useEffect(() => {
        setTagName(tagname);
        setTagSummary(tagsummary);
        setStatusTag(status);
        setInitialTagWiki(tagwiki);
    }, [show, tagname, tagsummary, status, tagwiki])

    const fetchImagesTag = async () => {
        const resImagesTag = await getImagesTag(idtag);
        if (resImagesTag && resImagesTag.EC === 0) {
            const arrDataImagesTag = resImagesTag.DT.map((imageTag) => {
                return `${process.env.REACT_APP_URL_NODE}/images/uploads/${imageTag.file_name}`;
            })
            setInitialImageTag(arrDataImagesTag);
        }
    }

    useEffect(() => {
        fetchImagesTag();
    }, [idtag, show])

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const getStatus = (e) => {
        setStatusTag(!statusTag);
    }

    const getTagName = (e) => {
        setTagName(e.target.value)
    }

    const getTagSummary = (e) => {
        setTagSummary(e.target.value);
    }

    const getContentEditor = (content, id) => {
        setTagWiki(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextTagWiki(plainText);
    }

    const getImage = (image) => {
        setImageTag(image);
    }

    const validateUpdateTag = () => {
        if (tagName.length < 5) {
            toast.error("Tên thẻ phải chứa ít nhất 5 ký tự")
            return false;
        }
        if (tagSummary.length < 20) {
            toast.error("Mô tả tổng quát thẻ phải chứa ít nhất 20 ký tự")
            return false;
        }
        if (plainTextTagWiki.length < 20) {
            toast.error("Mô tả chi tiết về thẻ phải chứa ít nhất 20 ký tự")
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        const isValidate = validateUpdateTag();
        if (!isValidate) {
            return;
        }

        const data = await updateTag(idtag, tagName, tagSummary, tagWiki, statusTag, imageTag);
        if (data && data.EC === 0) {
            toast.success("Cập nhật thẻ thành công");
            handleClose();
            await fetchTags();
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
                    <Modal.Title>Cập Nhật Thẻ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-update-tag-container px-4">
                        <div className="form-check form-switch mb-4">
                            <input className="form-check-input" type="checkbox" role="switch" id="idSwitchStatus"
                                checked={statusTag} onChange={(e) => getStatus(e)} />
                            <label className="form-check-label fw-bold" htmlFor="idSwitchStatus">Trạng thái kích hoạt</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="idTagName" className="form-label fw-bold">Tên thẻ</label>
                            <input type="text" className="form-control" id="idTagName" value={tagName}
                                onChange={(e) => getTagName(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="idTagSummary" className="form-label fw-bold">Tổng quát về thẻ</label>
                            <textarea className="form-control" id="idTagSummary" rows="3"
                                value={tagSummary} onChange={(e) => getTagSummary(e)}></textarea>
                        </div>
                        <div className="ask-detail mb-4">
                            <span className="fw-bold d-block mb-2">Mô tả chi tiết về thẻ</span>
                            <Editor getContentEditor={getContentEditor} id={0}
                                getPlainTextEditor={getPlainTextEditor} initialHtml={initialTagWiki}
                                initialHeight={"210px"} />
                        </div>
                        <UploadAndDisplayImage getImage={getImage}
                            initialImage={initialImageTag} isMultiple={true} />
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

export default ModalUpdateTag;