import { useEffect, useState } from 'react';
import Editor from '../../utils/Editor/Editor';
import UploadAndDisplayImage from '../../utils/UploadImage/UploadAndDisplayImage';
import './AskQuestion.scss'
import { toast } from 'react-toastify';
import { createQuestion } from '../../services/apiQuestionService';
import { useSelector } from "react-redux";
import { getListTags } from '../../services/apiTagService';

const AskQuestion = (props) => {
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailProblem, setDetailProblem] = useState("");
    const [tryExpect, setTryExpect] = useState("");
    const [imageQuestion, setImageQuestion] = useState({});
    const [tagQuestion, setTagQuestion] = useState("");
    const [listTags, setListTags] = useState([]);

    const idUser = useSelector(state => state.auth.user.id);

    useEffect(() => {
        const fetchListTags = async () => {
            const data = await getListTags();
            setListTags(data);
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
        setImageQuestion(image);
    }

    const getTagQuestion = (e) => {
        setTagQuestion(e.target.value);
    }

    // const validateAskQuestion = () => {
    //     if (titleQuestion.length < 15) {
    //         toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
    //         return false;
    //     }
    //     if (detailProblem.length < 20) {
    //         toast.error("Mô tả chi tiết vấn đề phải chứa ít nhất 20 ký tự")
    //         return false;
    //     }
    //     if (tryExpect.length < 20) {
    //         toast.error("Mô tả chi tiết vấn đề phải chứa ít nhất 20 ký tự")
    //         return false;
    //     }
    //     return true;
    // }

    // const resetQuestion = () => {
    //     setTitleQuestion("");

    // }

    const handleSubmitQuestion = async () => {
        // const isValidate = validateAskQuestion();
        // if (!isValidate) {
        //     return;
        // }
        const data = await createQuestion(idUser, titleQuestion, detailProblem, tryExpect, imageQuestion);
        console.log('data', data);

        // InsertTagsQuestion()
        if (data && data.EC === 0) {
            toast.success("Gửi câu hỏi thành công");
        }
        else {
            toast.error("Gửi câu hỏi thất bại");
        }

    }

    $('#multiple-select-field').select2({
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
                    value={titleQuestion} onChange={(e) => getTitleQuestion(e)} />
            </div>
            <div className="ask-detail mb-4">
                <span className="fw-bold ">Mô tả chi tiết vấn đề của bạn.</span>
                <span className="small d-block mb-2">Giới thiệu và trình bày cụ thể vấn đề. Tối thiểu 20 ký tự.</span>
                <Editor getContentEditor={getContentEditor} id={1} />
            </div>
            <div className="ask-try-expect mb-4">
                <span className="fw-bold ">Các cách bạn đã thử và kết quả mong đợi.</span>
                <span className="small d-block mb-2">Mô tả chi tiết các cách bạn đã thử làm và kết quả mong đợi xảy ra. Tối thiểu 20 ký tự.</span>
                <Editor getContentEditor={getContentEditor} id={2} />
            </div>
            <UploadAndDisplayImage getImage={getImage} />
            <div className="ask-tag mt-4">
                <span className="fw-bold ">Thẻ</span>
                <span className="small d-block mb-2">Thêm thẻ mô tả chủ để câu hỏi.</span>
                {/* <input type="text" className="form-control rounded" placeholder="Ví dụ: Toán 1, Vật lý 1"
                    value={tagQuestion} onChange={(e) => getTagQuestion(e)} /> */}
                <select className="form-select" id="multiple-select-field" data-placeholder="Chọn thẻ cho câu hỏi" multiple>
                    {listTags && listTags.length > 0 && listTags.map((tag, index) => {
                        return (
                            <option key={tag.id}>{tag.tag_name}</option>
                        )
                    })}
                </select>

            </div>
            <button type='button' className="btn" onClick={() => {
                let el = $('#multiple-select-field').select2('data');
                console.log('el', el);
            }}>
                Show selected values
            </button>
            <button type="button" className="btn btn-primary d-block mt-3" onClick={() => handleSubmitQuestion()}>Gửi câu hỏi</button>
            <button type="button" className="btn btn-danger mt-3">Xóa bản nháp</button>
        </div>
    )
}

export default AskQuestion;
