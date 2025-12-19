import { useEffect, useState } from "react";
import './ListAnswers.scss';
import { getListAnswers, getPageNumberByAnswer, handleCreateAnswer } from "../../services/apiAnswerService";
import Editor from "../../utils/Editor/Editor";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage";
import Answer from "./Answer";
import { useLocation } from "react-router-dom";

const ListAnswers = (props) => {
    const { idQuestion, idAcceptedAnswer, getIdAcceptedAnswer, idAuthor, numberAnswers } = props;

    const [listAnswers, setListAnswers] = useState([]);
    const [contentAnswer, setContentAnswer] = useState("");
    const [plainTextAnswer, setPlainTextAnswer] = useState("");
    const [imageAnswers, setImageAnswers] = useState([]);
    const [resetPage, setResetPage] = useState(1);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0)
    const [typeOrder, setTypeOrder] = useState('vote')
    const [idTargetAnswer, setIdTargetAnswer] = useState(null);

    const idUser = useSelector(state => state.auth.user.id);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { state } = useLocation();

    useEffect(() => {
        if (state?.idTargetAnswer) {
            setIdTargetAnswer(state.idTargetAnswer);
        }
    }, [state])

    useEffect(() => {
        const fetchListAnswers = async () => {
            if (idQuestion && page && limit && typeOrder) {
                const data = await getListAnswers(idQuestion, page, limit, typeOrder);
                setListAnswers(data?.DT?.answers);
                setTotalPages(data?.DT?.totalPages);
            }
        }
        fetchListAnswers();
    }, [resetPage, page, limit, typeOrder])

    const fetchPageTargetAnswer = async () => {
        if (idTargetAnswer && idQuestion && limit) {
            const res = await getPageNumberByAnswer(idTargetAnswer, idQuestion, limit)
            if (res && res.EC === 0) {
                setPage(res.DT);
            }
        }
        else {
            setPage(1);
        }
    }

    useEffect(() => {
        fetchPageTargetAnswer();
    }, [idTargetAnswer, idQuestion, limit])

    useEffect(() => {
        if (idTargetAnswer && listAnswers && listAnswers.length > 0) {
            const el = document.getElementById(`${idTargetAnswer}-answer-container`);
            if (el) {
                el.scrollIntoView({ block: "center" });
                el.style.transition = "background-color 1000ms linear";
                el.style.backgroundColor = "#ffe492";
                setTimeout(() => {
                    el.style.backgroundColor = "transparent";
                }, 2000)
            }
            setIdTargetAnswer(null);
        }
    }, [idTargetAnswer, listAnswers]);

    const getContentEditor = (content, id) => {
        setContentAnswer(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextAnswer(plainText);
    }

    const getImage = (image) => {
        setImageAnswers(image);
    }

    const validateAnswer = () => {
        if (!isAuthenticated) {
            toast.error(`Bạn cần đăng nhập để trả lời câu hỏi`)
            return false;
        }
        if (plainTextAnswer.length < 30) {
            toast.error("Câu trả lời phải chứa ít nhất 30 ký tự");
            return false;
        }
        return true;
    }

    const resetEditor = () => {
        setContentAnswer("");
        setPlainTextAnswer("");
        setImageAnswers([]);
        setResetPage(Math.random());
    }

    const createAnswer = async () => {
        const isValidate = validateAnswer();
        if (!isValidate) {
            return;
        }

        const data = await handleCreateAnswer(idUser, idQuestion, contentAnswer, plainTextAnswer, imageAnswers);
        if (data && data.EC === 0) {
            resetEditor();
            toast.success('Gửi câu trả lời thành công');
        }
        else {
            toast.error('Gửi câu trả lời thất bại');
        }
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    const getSortOption = (e) => {
        setTypeOrder(e.target.value);
    }

    return (
        <div className="list-answers-container">
            <div className="list-answers-header">
                <div className="number-answers">
                    {numberAnswers} Trả lời
                </div>
                <div className="sort-answers">
                    <span>Sắp xếp theo:</span>
                    <select className="form-select sort-select-option" onChange={(e) => getSortOption(e)}>
                        <option value={"vote"}>Điểm cao nhất (mặc định)</option>
                        <option value={"newest"}>Câu trả lời mới nhất</option>
                        <option value={"oldest"}>Câu trả lời cũ nhất</option>
                    </select>
                </div>
            </div>

            {listAnswers && listAnswers.length > 0 && listAnswers.map((answer) => {
                return (
                    <Answer idAnswer={answer.id} idQuestion={idQuestion}
                        idAcceptedAnswer={idAcceptedAnswer} getIdAcceptedAnswer={getIdAcceptedAnswer}
                        idAuthor={idAuthor} idAuthorAsked={answer.created_by_user_id}
                        askedTime={answer.askedTime} key={answer.id}
                        postType={answer.post_type_id} contentAnswer={answer.post_details}
                        idTargetAnswer={idTargetAnswer} />
                )
            })}
            <ReactPaginate
                nextLabel="sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                marginPagesDisplayed={2}
                forcePage={page - 1}
                pageCount={totalPages}
                previousLabel="< trước"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
            <div className="post-answer-container">
                <h5>Câu trả lời của bạn</h5>
                <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                    resetPage={resetPage} initialHtml={""} initialHeight={"210px"} />
                <UploadAndDisplayImage getImage={getImage} resetPage={resetPage} isMultiple={true} />
                <button className="btn btn-primary" onClick={() => createAnswer()}>Gửi câu trả lời của bạn</button>
            </div>
        </div>
    )
}

export default ListAnswers;