import './ListComments.scss';
import { useEffect, useState } from "react";
import { getListComments } from "../../services/apiCommentService";
import { getNameUser } from "../../services/apiUserService";
import VoteComment from '../Votes/VoteComment';

const ListComments = (props) => {
    const { idPost } = props;
    const [listComments, setListComments] = useState([]);
    const [nameUser, setNameUser] = useState([]);

    useEffect(() => {
        const fetchListComments = async () => {
            const data = await getListComments(idPost);
            setListComments(data.DT);
        }
        fetchListComments();
    }, [])

    useEffect(() => {
        const fetchNameUser = async () => {
            if (listComments && listComments.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNameUser = await Promise.all(
                    listComments.map(async (comment) => {
                        let data = await getNameUser(comment.created_by_user_id);
                        return data.DT[0].display_name;
                    })
                );
                setNameUser(arrNameUser);
            }
        }
        fetchNameUser();
    }, [listComments])

    return (
        <div className="list-comments-container">
            {listComments && listComments.length > 0 && listComments.map((comment, index) => {
                return (
                    <div className="comment" key={comment.id}>
                        <VoteComment idComment={comment.id} />
                        <div className="content-comment">
                            <span>
                                <span>{comment.comment_text}</span> - <span>{nameUser[index]} datetime comment</span>
                            </span>
                        </div>
                    </div>
                )
            })}

            <div className="add-comment">Thêm bình luận</div>
        </div>
    )
}

export default ListComments