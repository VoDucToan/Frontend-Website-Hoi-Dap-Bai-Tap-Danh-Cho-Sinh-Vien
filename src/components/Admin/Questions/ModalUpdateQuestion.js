import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UploadAndDisplayImage from '../../../utils/UploadImage/UploadAndDisplayImage';
import Editor from '../../../utils/Editor/Editor';
import { deleteTagsQuestion, getListTags, getListTagsByQuestion, InsertTagsQuestion } from '../../../services/apiTagService';
import { getImagesPost, updateQuestion } from '../../../services/apiQuestionService';
import { toast } from 'react-toastify';
// import $ from 'jquery';

function ModalUpdateQuestion(props) {
    const { title, detail, status, id, resetPage } = props;

    const [show, setShow] = useState(false);
    const [statusQuestion, setStatusQuestion] = useState(false);
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailQuestion, setDetailQuestion] = useState("");
    const [initialDetailQuestion, setInitialDetailQuestion] = useState("");
    const [plainTextDeTailQuestion, setPlainTextDeTailQuestion] = useState("");
    const [imageQuestions, setImageQuestions] = useState([]);
    const [initialImageQuestions, setInitialImageQuestions] = useState([]);
    const [idQuestion, setIdQuestion] = useState(0);
    const [listTags, setListTags] = useState([]);
    const [resetImages, setResetImages] = useState(1);

    useEffect(() => {
        const fetchListTags = async () => {
            const data = await getListTags();
            if (data && data.EC === 0) {
                setListTags(data.DT);
            }
        }
        fetchListTags();
    }, [])

    useEffect(() => {
        setTitleQuestion(title);
        setInitialDetailQuestion(detail);
        setIdQuestion(id);
        setStatusQuestion(status);
    }, [show, title, detail, id, status])

    useEffect(() => {
        // listTags && listTags.length > 0 && listTags.map((tag) => {
        //     let newOption = new Option(tag.tag_name, tag.id, false, false);
        //     $('#multiple-select-field').append(newOption).trigger('change');
        // })

        const fetchListTagsByQuestion = async () => {
            if (idQuestion) {
                const dataListTagsByQuestion = await getListTagsByQuestion(idQuestion);
                const valueSelected = dataListTagsByQuestion?.DT?.map((tag) => {
                    return tag.id;
                })
                $('#multiple-select-field').val(valueSelected);
                $('#multiple-select-field').trigger('change'); // Notify any JS components that the value changed
            }
        }
        const fetchImagesQuestion = async () => {
            if (idQuestion) {
                const dataImagesPost = await getImagesPost(idQuestion);
                if (dataImagesPost && dataImagesPost.EC === 0) {
                    const arrDataImagesPost = dataImagesPost.DT.map((imagePost) => {
                        return `http://localhost:8080/images/uploads/${imagePost.file_name}`;
                    })
                    setInitialImageQuestions(arrDataImagesPost);
                }
            }
        }
        fetchImagesQuestion();
        fetchListTagsByQuestion();

    }, [idQuestion, show])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const getStatus = (e) => {
        setStatusQuestion(!statusQuestion);
    }

    const getTitleQuestion = (e) => {
        setTitleQuestion(e.target.value);
    }

    const getContentEditor = (content, id) => {
        setDetailQuestion(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextDeTailQuestion(plainText);
    }

    const getImage = (image) => {
        setImageQuestions(image);
    }

    const validateAskQuestion = (listTagsChoice) => {
        if (titleQuestion.length < 15) {
            toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
            return false;
        }
        if (plainTextDeTailQuestion.length < 40) {
            toast.error("Mô tả chi tiết câu hỏi phải chứa ít nhất 40 ký tự")
            return false;
        }
        if (listTagsChoice.length < 1) {
            toast.error("Câu hỏi phải chứa ít nhất một thẻ mô tả chủ đề");
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        let el = $('#multiple-select-field').select2('data');
        const isValidate = validateAskQuestion(el);
        if (!isValidate) {
            return;
        }
        const listIdTags = el.map((tag) => {
            return tag.id;
        })
        const data = await updateQuestion(idQuestion, titleQuestion, detailQuestion, plainTextDeTailQuestion,
            imageQuestions, listIdTags, statusQuestion);
        if (data && data.EC === 0) {
            toast.success("Cập nhật câu hỏi thành công");
            resetPage();
            handleClose();
        }
        else {
            toast.error(data.EM);
        }
    }

    useEffect(() => {
        $('#multiple-select-field').select2({
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
            closeOnSelect: false,
        }, [show]);
    })

    return (
        <>
            <button className="btn btn-warning me-2" onClick={handleShow}>Cập Nhật</button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Cập Nhật Câu Hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-update-question-container px-4">
                        <div class="form-check form-switch mb-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="idSwitchStatus"
                                checked={statusQuestion} onChange={(e) => getStatus(e)} />
                            <label class="form-check-label fw-bold" for="idSwitchStatus">Trạng thái kích hoạt</label>
                        </div>
                        <div className="ask-title mb-4">
                            <span className="fw-bold ">Tiêu Đề</span>
                            <span className="small d-block mb-2">Hãy xác định và hình dung câu hỏi để đặt cho mọi người.</span>
                            <input type="text" className="form-control rounded" placeholder="Ví dụ: Làm sao viết chương trình Hello World với C++?"
                                value={titleQuestion} onChange={(e) => getTitleQuestion(e)} id="title-input-id" />
                        </div>
                        <div className="detail-question mb-4">
                            <span className="fw-bold ">Mô tả chi tiết câu hỏi.</span>
                            <span className="small d-block mb-2">Giải thích vấn đề, các cách đã thử và kết quả mong đợi của câu hỏi.</span>
                            <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                                initialHtml={initialDetailQuestion} initialHeight={"210px"} />
                        </div>
                        <UploadAndDisplayImage getImage={getImage} initialImage={initialImageQuestions}
                            isMultiple={true} resetPage={resetImages} />
                        <div className="ask-tag mt-4">
                            <span className="fw-bold ">Thẻ</span>
                            <span className="small d-block mb-2">Thêm thẻ mô tả chủ để câu hỏi.</span>
                            <select className="form-select" id="multiple-select-field" data-placeholder="Chọn thẻ cho câu hỏi" multiple>
                                {listTags && listTags.length > 0 && listTags.map((tag, index) => {
                                    return (
                                        <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
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
                    <Button variant="primary" onClick={() => handleSaveChanges()}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuestion;