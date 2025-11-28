import { useOutletContext } from "react-router-dom";
import { getQuestionsByUser } from "../../services/apiQuestionService";
import { useEffect, useState } from "react";
import QuestionUser from "./QuestionUser";
import './QuestionsUser.scss';
import ReactPaginate from "react-paginate";

const QuestionsUser = () => {
    const [user] = useOutletContext();
    const [questions, setQuestions] = useState([]);
    const [amountQuestions, setAmountQuestions] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchQuestions = async () => {
        if (!_.isEmpty(user) && page && limit) {
            const res = await getQuestionsByUser(user.id, page, limit)
            if (res?.EC === 0) {
                setTotalPages(res.DT.totalPages);
                setQuestions(res.DT.questions);
                setAmountQuestions(res.DT.totalRows);
            }
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, [user, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="questions-user-container">
            <div className="head-questions-user">
                <span className="amount-questions-user">{amountQuestions} câu hỏi</span>
            </div>
            <div className="questions-asked-user">
                {questions?.length > 0 && questions.map((question) => {
                    return (
                        <QuestionUser key={question.id}
                            question={question} />
                    )
                })}
            </div>
            <ReactPaginate
                nextLabel="sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                marginPagesDisplayed={2}
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
        </div>
    )
}

export default QuestionsUser;