import { useEffect, useState } from "react";
import { getListQuestions } from '../../services/apiQuestionService';
import './ListQuestions.scss'
import ButtonAskQuestion from "./ButtonAskQuestion";
import ReactPaginate from "react-paginate";
import MetaQuestion from "./MetaQuestion";
import { IoFilterSharp } from "react-icons/io5";
import { getListTags } from "../../services/apiTagService";
import { toast } from "react-toastify";

const ListQuestions = (props) => {
    const [listQuestions, setListQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [listTags, setListTags] = useState([]);
    const [noAnswers, setNoAnswers] = useState(false);
    const [noUpVoted, setNoUpVoted] = useState(false);
    const [noAcceptedAnswer, setNoAcceptedAnswer] = useState(false);
    const [dayOlds, setDayOlds] = useState('');
    const [typeOrder, setTypeOrder] = useState('vote');
    const [textQuestion, setTextQuestion] = useState('');

    useEffect(() => {
        const fetchListTags = async () => {
            const data = await getListTags();
            if (data && data.EC === 0) {
                setListTags(data.DT);
            }
        }
        fetchListTags();
    }, [])

    const fetchListQuestions = async (watchedTags, ignoredTags) => {
        let data = await getListQuestions(page, limit, true, noAnswers, noUpVoted,
            noAcceptedAnswer, dayOlds, typeOrder, watchedTags, ignoredTags
        );
        if (data && data.EC === 0) {
            setListQuestions(data.DT.questions);
            setTotalPages(data.DT.totalPages);
            setTextQuestion(
                noAnswers ? 'không có câu trả lời'
                    : noUpVoted ? 'không có phiếu bầu'
                        : noAcceptedAnswer ? 'không có câu trả lời được chấp nhận'
                            : dayOlds ? `${dayOlds} ngày trước`
                                : ''
            );
        }
    }

    useEffect(() => {
        fetchListQuestions();
    }, [page, limit])

    useEffect(() => {
        $('#multiple-select-field-following-tags').select2({
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
            closeOnSelect: false,
        });

        $('#multiple-select-field-ignored-tags').select2({
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
            closeOnSelect: false,
        });
    }, [showFilter])

    // useEffect(() => {
    //     const fetchNumberVotes = async () => {
    //         if (listQuestions && listQuestions.length > 0) {
    //             // Sử dụng Promise.all để đợi tất cả các API hoàn thành
    //             const arrNumberVotes = await Promise.all(
    //                 listQuestions.map(async (question) => {
    //                     let data = await getNumberVotesPost(question.id);
    //                     return data.DT;
    //                 })
    //             );
    //             setNumberVotes(arrNumberVotes);
    //         }

    //         if (listQuestions && listQuestions.length > 0) {
    //             // Sử dụng Promise.all để đợi tất cả các API hoàn thành
    //             const arrNumberAnswers = await Promise.all(
    //                 listQuestions.map(async (question) => {
    //                     let data = await getNumberAnswers(question.id);
    //                     return data.DT;
    //                 })
    //             );
    //             setNumberAnswers(arrNumberAnswers);
    //         }

    //         if (listQuestions && listQuestions.length > 0) {
    //             // Sử dụng Promise.all để đợi tất cả các API hoàn thành
    //             const arrNameUser = await Promise.all(
    //                 listQuestions.map(async (question) => {
    //                     let data = await getUser(question.created_by_user_id);
    //                     return data.DT[0].display_name;
    //                 })
    //             );
    //             setNameUser(arrNameUser);
    //         }
    //     }
    //     fetchNumberVotes();
    // }, [listQuestions])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    const handleBtnFilter = () => {
        setShowFilter(!showFilter);
    }

    const getNoAnswers = () => {
        setNoAnswers(!noAnswers);
    }

    const getNoUpVoted = () => {
        setNoUpVoted(!noUpVoted);
    }

    const getNoAcceptedAnswer = () => {
        setNoAcceptedAnswer(!noAcceptedAnswer);
    }

    const getDayOlds = (e) => {
        setDayOlds(e.target.value);
    }

    const getTypeOrder = (e) => {
        setTypeOrder(e.target.value);
    }

    const validateFilterQuestions = () => {
        if (dayOlds !== '' && Number(dayOlds) <= 0) {
            toast.error("Số ngày trước đó của câu hỏi phải lớn hơn hoặc bằng 1")
            return false;
        }

        return true;
    }

    const handleFilterQuestions = () => {
        const isValidate = validateFilterQuestions();
        if (!isValidate) {
            return;
        }

        let arrWatchedTags = $('#multiple-select-field-following-tags').select2('data');
        arrWatchedTags = arrWatchedTags.map((tag) => {
            return tag.id;
        })
        let watchedTags = '';
        if (arrWatchedTags && arrWatchedTags.length > 0) {
            watchedTags = `(${arrWatchedTags.join(',')})`;
        }
        let arrIgnoredTags = $('#multiple-select-field-ignored-tags').select2('data');
        arrIgnoredTags = arrIgnoredTags.map((tag) => {
            return tag.id;
        })
        let ignoredTags = '';
        if (arrIgnoredTags && arrIgnoredTags.length > 0) {
            ignoredTags = `(${arrIgnoredTags.join(',')})`;
        }

        fetchListQuestions(watchedTags, ignoredTags)
    }

    return (
        <div className="list-questions-container">
            <ButtonAskQuestion />
            <div className="filter-list-questions">
                <div className="header-filter">
                    <div className="amount-questions-filter">
                        {listQuestions.length} câu hỏi {textQuestion}
                    </div>
                    <div className={(showFilter ? "bg-primary-subtle " : '') + "btn-filter"} onClick={handleBtnFilter}>
                        <IoFilterSharp />
                        <span>Lọc</span>
                    </div>
                </div>
                {showFilter && (
                    <div className="detail-filter">
                        <div className="form-detail-filter">
                            <div className="filter-by">
                                <h6>Lọc theo</h6>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="noAnswers"
                                        checked={noAnswers} onChange={() => getNoAnswers()} />
                                    <label className="form-check-label" htmlFor="noAnswers">
                                        Không có câu trả lời
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="noUpvoted"
                                        checked={noUpVoted} onChange={() => getNoUpVoted()} />
                                    <label className="form-check-label" htmlFor="noUpvoted">
                                        Không có phiếu bầu
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="noAcceptedAnswers"
                                        checked={noAcceptedAnswer} onChange={() => getNoAcceptedAnswer()} />
                                    <label className="form-check-label" htmlFor="noAcceptedAnswers">
                                        Không có câu trả lời được chấp nhận
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="hasBounty" />
                                    <label className="form-check-label" htmlFor="hasBounty">
                                        Có điểm thưởng
                                    </label>
                                </div>
                                <div className="form-day-olds">
                                    <input type="number" className="form-control input-day-olds" id="dayOlds"
                                        value={dayOlds} onChange={(e) => getDayOlds(e)} />
                                    <label htmlFor="dayOlds" className="col-form-label ">Ngày trước</label>
                                </div>
                            </div>
                            <div className="sorted-by">
                                <h6>Sắp xếp theo</h6>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="highestScore"
                                        name="sortOptions" value='vote' checked={typeOrder === 'vote'}
                                        onChange={(e) => getTypeOrder(e)} />
                                    <label className="form-check-label" htmlFor="highestScore">
                                        Điểm cao nhất
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="newest"
                                        name="sortOptions" value='newest' checked={typeOrder === 'newest'}
                                        onChange={(e) => getTypeOrder(e)} />
                                    <label className="form-check-label" htmlFor="newest">
                                        Mới nhất
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="oldest"
                                        name="sortOptions" value='oldest' checked={typeOrder === 'oldest'}
                                        onChange={(e) => getTypeOrder(e)} />
                                    <label className="form-check-label" htmlFor="oldest">
                                        Cũ nhất
                                    </label>
                                </div>
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" id="recentActivity"
                                        name="sortOptions" />
                                    <label className="form-check-label" htmlFor="recentActivity">
                                        Kích hoạt gần đây
                                    </label>
                                </div> */}
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" id="mostView"
                                        name="sortOptions" />
                                    <label className="form-check-label" htmlFor="mostView">
                                        Xem nhiều nhất
                                    </label>
                                </div> */}
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" id="bountyEndingSoon"
                                        name="sortOptions" />
                                    <label className="form-check-label" htmlFor="bountyEndingSoon">
                                        Điểm thưởng kết thúc sớm
                                    </label>
                                </div> */}
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" id="trending"
                                        name="sortOptions" />
                                    <label className="form-check-label" htmlFor="trending">
                                        Xu hướng
                                    </label>
                                </div> */}
                            </div>
                            <div className="tagged-with">
                                <h6>Thêm thẻ</h6>
                                <div className="select-following-tags">
                                    <label htmlFor="multiple-select-field-following-tags" className="form-label">Thẻ đang theo dõi</label>
                                    <select className="form-select" id="multiple-select-field-following-tags"
                                        data-placeholder="Chọn thẻ cho câu hỏi" multiple>
                                        {listTags && listTags.length > 0 && listTags.map((tag, index) => {
                                            return (
                                                <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
                                            )
                                        })}
                                    </select>

                                    <label htmlFor="multiple-select-field-ignored-tags" className="form-label">Thẻ bị bỏ qua</label>
                                    <select className="form-select" id="multiple-select-field-ignored-tags"
                                        data-placeholder="Chọn thẻ cho câu hỏi" multiple>
                                        {listTags && listTags.length > 0 && listTags.map((tag, index) => {
                                            return (
                                                <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="action-filter">
                            <div>
                                <button type="button" className="btn btn-primary me-1"
                                    onClick={() => handleFilterQuestions()}>Lọc</button>
                                <button type="button" className="btn btn-secondary">Lưu tùy chỉnh lọc</button>
                            </div>

                            <button type="button" className="btn btn-light ms-auto"
                                onClick={() => handleBtnFilter()}>Thoát</button>
                        </div>
                    </div>
                )}

            </div>
            {listQuestions && listQuestions.length > 0 &&
                listQuestions.map((question, index) => {
                    return (
                        <MetaQuestion idQuestion={question.id} idUser={question.created_by_user_id}
                            titleQuestion={question.post_title} questionAskedTime={question.askedTime}
                            previewContent={question.post_plain_details} key={question.id}
                            idAcceptedAnswer={question.accepted_answer_id} />
                    )
                })}
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

export default ListQuestions;