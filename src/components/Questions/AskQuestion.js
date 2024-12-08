import { useState } from 'react';
import Editor from '../../utils/Editor/Editor';
import UploadAndDisplayImage from '../../utils/UploadImage/UploadAndDisplayImage';
import './AskQuestion.scss'
import { toast } from 'react-toastify';
import { createQuestion } from '../../services/apiQuestionService';
import { getAccount } from '../../services/apiUserService';

const AskQuestion = (props) => {
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailProblem, setDetailProblem] = useState("");
    const [imgDetailProblem, setImgDetailProblem] = useState("");
    const [tryExpect, setTryExpect] = useState("");
    const [imgTryExpect, setImgTryExpect] = useState("");
    const [tagQuestion, setTagQuestion] = useState("");

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

    const getImage = (image, id) => {
        if (id === 1) {
            setImgDetailProblem(image);
        }
        else if (id === 2) {
            setImgTryExpect(image);
        }
    }

    const getTagQuestion = (e) => {
        setTagQuestion(e.target.value);
    }

    const validateAskQuestion = () => {
        if (titleQuestion.length < 15) {
            toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
            return false;
        }
        if (detailProblem.length < 20) {
            toast.error("Mô tả chi tiết vấn đề phải chứa ít nhất 20 ký tự")
            return false;
        }
        if (tryExpect.length < 20) {
            toast.error("Mô tả chi tiết vấn đề phải chứa ít nhất 20 ký tự")
            return false;
        }
        return true;
    }

    // const resetQuestion = () => {
    //     setTitleQuestion("");

    // }

    const handleSubmitQuestion = async () => {
        const isValidate = validateAskQuestion();
        if (!isValidate) {
            return;
        }
        const account = await getAccount();
        const data = await createQuestion(account.id, titleQuestion, detailProblem, imgDetailProblem, tryExpect, imgTryExpect);
        console.log('data', data);
        if (data && data.EC === 0) {
            toast.success("Gửi câu hỏi thành công");
        }
        else {
            toast.error("Gửi câu hỏi thất bại");
        }

    }

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
                <UploadAndDisplayImage getImage={getImage} id={1} />
            </div>
            <div className="ask-try-expect mb-4">
                <span className="fw-bold ">Các cách bạn đã thử và kết quả mong đợi.</span>
                <span className="small d-block mb-2">Mô tả chi tiết các cách bạn đã thử làm và kết quả mong đợi xảy ra. Tối thiểu 20 ký tự.</span>
                <Editor getContentEditor={getContentEditor} id={2} />
                <UploadAndDisplayImage getImage={getImage} id={2} />
            </div>
            <div className="ask-tag mb-4">
                <span className="fw-bold ">Thẻ</span>
                <span className="small d-block mb-2">Thêm thẻ mô tả chủ để câu hỏi.</span>
                <input type="text" className="form-control rounded" placeholder="Ví dụ: Toán 1, Vật lý 1"
                    value={tagQuestion} onChange={(e) => getTagQuestion(e)} />
            </div>
            <button type="button" className="btn btn-primary d-block mb-3" onClick={() => handleSubmitQuestion()}>Gửi câu hỏi</button>
            <button type="button" className="btn btn-danger">Xóa bản nháp</button>
        </div>
    )
}

export default AskQuestion;
