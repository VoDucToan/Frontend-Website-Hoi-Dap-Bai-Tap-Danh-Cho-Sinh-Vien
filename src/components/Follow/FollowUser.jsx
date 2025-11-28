import ReactPaginate from "react-paginate";
import FollowedUser from "./FollowedUser";
import { getFollowedPostsByUser } from "../../services/apiFollowService";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import './FollowUser.scss';

const FollowUser = () => {
    const [user] = useOutletContext();
    const [followedPosts, setFollowedPosts] = useState([]);
    const [amountFollowedPosts, setAmountFollowedPosts] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchFollowedPosts = async () => {
        if (user?.id && page && limit) {
            const res = await getFollowedPostsByUser(user.id, page, limit)
            if (res?.EC === 0) {
                setTotalPages(res.DT.totalPages);
                setFollowedPosts(res.DT.followedPosts);
                setAmountFollowedPosts(res.DT.totalRows);
            }
        }
    }

    useEffect(() => {
        fetchFollowedPosts();
    }, [user, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="follow-user-container">
            <div className="head-follow-user">
                <span className="amount-follow-user">
                    {amountFollowedPosts} bài viết đã theo dõi
                </span>
            </div>
            <div className="followed-user">
                {followedPosts?.length > 0 && followedPosts.map((followedPost) => {
                    return (
                        <FollowedUser key={followedPost.id}
                            followedPost={followedPost}
                            fetchFollowedPosts={fetchFollowedPosts} />
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

export default FollowUser;