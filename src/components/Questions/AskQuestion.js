import { useEffect, useReducer, useState } from 'react';
import Editor from '../../utils/Editor/Editor';
import UploadAndDisplayImage from '../../utils/UploadImage/UploadAndDisplayImage';
import './AskQuestion.scss'
import { toast } from 'react-toastify';
import { createQuestion } from '../../services/apiQuestionService';
import { useSelector } from "react-redux";
import { getListTags, InsertTagsQuestion } from '../../services/apiTagService';

const AskQuestion = (props) => {
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailProblem, setDetailProblem] = useState("");
    const [plainTextDetailProblem, setPlainTextDetailProblem] = useState("");
    const [tryExpect, setTryExpect] = useState("");
    const [plainTextTryExpect, setPlainTextTryExpect] = useState("");
    const [imageQuestions, setImageQuestions] = useState([]);
    const [listTags, setListTags] = useState([]);
    const [resetPage, setResetPage] = useState(1);

    const idUser = useSelector(state => state.auth.user.id);

    useEffect(() => {
        const fetchListTags = async () => {
            const data = await getListTags();
            if (data && data.EC === 0) {
                setListTags(data.DT);
            }
        }
        fetchListTags();
    }, [])

    const getTitleQuestion = (e) => {
        setTitleQuestion(e.target.value);
    }

    const getContentEditor = (content, id) => {
        if (id === 1) {
            setDetailProblem(content);
        }
        else if (id === 2) {
            setTryExpect(content);
        }
    }

    const getImage = (image) => {
        setImageQuestions(image);
    }

    const getPlainTextEditor = (plainText, id) => {
        if (id === 1) {
            setPlainTextDetailProblem(plainText);
        }
        else if (id === 2) {
            setPlainTextTryExpect(plainText);
        }
    }

    const validateAskQuestion = (listTagsChoice) => {
        if (titleQuestion.length < 15) {
            toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
            return false;
        }
        if (plainTextDetailProblem.length < 20) {
            toast.error("Mô tả chi tiết vấn đề phải chứa ít nhất 20 ký tự")
            return false;
        }
        if (plainTextTryExpect.length < 20) {
            toast.error("Mô tả cách đã thử và kết quả mong đợi phải chứa ít nhất 20 ký tự")
            return false;
        }
        if (listTagsChoice.length < 1) {
            toast.error("Câu hỏi phải chứa ít nhất một thẻ mô tả chủ đề");
            return false;
        }
        return true;
    }

    const clearPage = () => {
        setTitleQuestion("");
        setDetailProblem("");
        setTryExpect("");
        setImageQuestions([]);
        setResetPage(Math.random());
        const $ = window.$;
        const $sel = $('#multiple-select-field');
        $sel.val(null).trigger('change');
    }

    const handleSubmitQuestion = async () => {
        const $ = window.$;
        const $sel = $('#multiple-select-field');
        let el = $sel.select2('data');

        const isValidate = validateAskQuestion(el);
        if (!isValidate) {
            return;
        }
        const listIdTags = el.map((tag) => {
            return tag.id;
        })

        const data = await createQuestion(idUser, titleQuestion, detailProblem, plainTextDetailProblem,
            tryExpect, plainTextTryExpect, imageQuestions, listIdTags);

        if (data && data.EC === 0) {
            clearPage();
            toast.success("Gửi câu hỏi thành công");
        }
        else {
            toast.error("Gửi câu hỏi thất bại");
        }
    }

    const $ = window.$;
    const $sel = $('#multiple-select-field');
    $sel.select2({
        theme: "bootstrap-5",
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        closeOnSelect: false,
    });

    return (
        <div className="ask-question-container px-4">
            <div className="ask-title mb-4">
                <span className="fw-bold ">Tiêu Đề</span>
                <span className="small d-block mb-2">Hãy xác định và hình dung câu hỏi để đặt cho mọi người.</span>
                <input type="text" className="form-control rounded" placeholder="Ví dụ: Làm sao viết chương trình Hello World với C++?"
                    value={titleQuestion} onChange={(e) => getTitleQuestion(e)} id="title-input-id" />
            </div>
            <div className="ask-detail mb-4">
                <span className="fw-bold ">Mô tả chi tiết vấn đề của bạn.</span>
                <span className="small d-block mb-2">Giới thiệu và trình bày cụ thể vấn đề. Tối thiểu 20 ký tự.</span>
                <Editor getContentEditor={getContentEditor} id={1} resetPage={resetPage} getPlainTextEditor={getPlainTextEditor}
                    initialHtml={""} initialHeight={"210px"} />
            </div>
            <div className="ask-try-expect mb-4">
                <span className="fw-bold ">Các cách bạn đã thử và kết quả mong đợi.</span>
                <span className="small d-block mb-2">Mô tả chi tiết các cách bạn đã thử làm và kết quả mong đợi xảy ra. Tối thiểu 20 ký tự.</span>
                <Editor getContentEditor={getContentEditor} id={2} resetPage={resetPage} getPlainTextEditor={getPlainTextEditor}
                    initialHtml={""} initialHeight={"210px"} />
            </div>

            <UploadAndDisplayImage getImage={getImage} resetPage={resetPage} isMultiple={true} />
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
            <button type="button" className="btn btn-primary d-block mt-3" onClick={() => handleSubmitQuestion()}>Gửi câu hỏi</button>
            <button type="button" className="btn btn-danger mt-3" onClick={() => {
                const isConfirm = confirm("Xác nhận xóa bản nháp này?");
                if (isConfirm) {
                    clearPage()
                }
            }}>Xóa bản nháp</button>
        </div>
    )
}

export default AskQuestion;
