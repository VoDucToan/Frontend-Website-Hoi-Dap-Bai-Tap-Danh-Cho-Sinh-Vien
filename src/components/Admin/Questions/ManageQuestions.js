import { useEffect, useState } from "react";
import { deleteQuestion, getListQuestions } from "../../../services/apiQuestionService";
import { getUser } from "../../../services/apiUserService";
import { getNumberVotesPost } from "../../../services/apiVoteService";
import { getNumberAnswers } from "../../../services/apiAnswerService";
import { toast } from "react-toastify";
import ModalUpdateQuestion from "./ModalUpdateQuestion";
import ReactPaginate from "react-paginate";

const ManageQuestions = () => {
    const [listQuestions, setListQuestions] = useState([]);
    const [author, setAuthor] = useState([]);
    const [numberVotes, setNumberVotes] = useState([]);
    const [numberAnswers, setNumberAnswers] = useState([]);
    const [resetPage, setResetPage] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchListQuestions = async () => {
            if (page && limit) {
                const data = await getListQuestions(page, limit);
                setListQuestions(data.DT.questions);
                setTotalPages(data.DT.totalPages);
            }

        }
        fetchListQuestions();
    }, [resetPage, page, limit])

    useEffect(() => {
        const fetchAuthor = async () => {
            if (listQuestions && listQuestions.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNumberVotes = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getNumberVotesPost(question.id);
                        return data.DT;
                    })
                );
                setNumberVotes(arrNumberVotes);

                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNumberAnswers = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getNumberAnswers(question.id);
                        return data.DT;
                    })
                );
                setNumberAnswers(arrNumberAnswers);

                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrAuthor = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getUser(question.created_by_user_id);
                        return data.DT[0].display_name;
                    })
                );
                setAuthor(arrAuthor);
            }
        }
        fetchAuthor();
    }, [listQuestions])

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    const handleDeleteQuestion = async (idQuestion) => {
        const isConfirm = confirm("Xác nhận xóa câu hỏi này?");
        if (isConfirm) {
            const data = await deleteQuestion(idQuestion);
            if (data && data.EC === 0) {
                toast.success('Xóa câu hỏi thành công');
                handleResetPage();
            }
            else {
                toast.error(data.EM);
            }
        }
    }

    return (
        <div className="manage-questions-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tiêu đề câu hỏi</th>
                        <th scope="col">Phiếu bầu</th>
                        <th scope="col">Số câu trả lời</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian tạo</th>
                        <th scope="col">Thời gian chỉnh sửa</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuestions && listQuestions.length > 0 && listQuestions.map((question, index) => {
                        return (
                            <tr key={question.id}>
                                <th scope="row">{question.id}</th>
                                <td>{question.post_title}</td>
                                <td>{numberVotes[index]}</td>
                                <td>{numberAnswers[index]}</td>
                                <td>{author[index]}</td>
                                <td>{question.post_status ? "Kích hoạt" : "Không kích hoạt"}</td>
                                <td>{question.createdAt}</td>
                                <td>{question.updatedAt}</td>
                                <td>
                                    <ModalUpdateQuestion title={question.post_title} detail={question.post_details}
                                        id={question.id} resetPage={handleResetPage} status={question.post_status} />
                                    {/* <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Xóa</button> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
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

export default ManageQuestions;