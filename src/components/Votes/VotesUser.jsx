import ReactPaginate from "react-paginate";
import VoteUser from "./VoteUser";
import { useOutletContext } from "react-router-dom";
import { getVotePostsByUser } from "../../services/apiVoteService";
import { useEffect, useState } from "react";
import './VotesUser.scss';

const VotesUser = () => {
    const [user] = useOutletContext();
    const [votePosts, setVotePosts] = useState([]);
    const [amountVotePosts, setAmountVotePosts] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchVotePosts = async () => {
        if (user?.id && page && limit) {
            const res = await getVotePostsByUser(page, limit, user.id)
            if (res?.EC === 0) {
                setTotalPages(res.DT.totalPages);
                setVotePosts(res.DT.votePosts);
                setAmountVotePosts(res.DT.totalRows);
            }
        }
    }

    useEffect(() => {
        fetchVotePosts();
    }, [user, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="votes-user-container">
            <div className="head-votes-user">
                <span className="amount-votes-user">
                    {amountVotePosts} bình chọn
                </span>
            </div>
            <div className="vote-user">
                {votePosts?.length > 0 && votePosts.map((votePost) => {
                    return (
                        <VoteUser key={votePost.id}
                            votePost={votePost} />
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

export default VotesUser;