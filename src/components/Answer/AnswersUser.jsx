import './AnswersUser.scss'
import ReactPaginate from "react-paginate";
import { getAnswersByUser } from "../../services/apiAnswerService";
import AnswerUser from "./AnswerUser";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const AnswersUser = () => {
    const [user] = useOutletContext();
    const [answers, setAnswers] = useState([]);
    const [amountAnswers, setAmountAnswers] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchAnswers = async () => {
        if (user?.id && page && limit) {
            const res = await getAnswersByUser(user.id, page, limit)
            if (res?.EC === 0) {
                setTotalPages(res.DT.totalPages);
                setAnswers(res.DT.answers);
                setAmountAnswers(res.DT.totalRows);
            }
        }
    }

    useEffect(() => {
        fetchAnswers();
    }, [user, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="answers-user-container">
            <div className="head-answers-user">
                <span className="amount-answers-user">
                    {amountAnswers} câu trả lời</span>
            </div>
            <div className="answers-answered-user">
                {answers?.length > 0 && answers.map((answer) => {
                    return (
                        <AnswerUser key={answer.id}
                            answer={answer} />
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

export default AnswersUser;