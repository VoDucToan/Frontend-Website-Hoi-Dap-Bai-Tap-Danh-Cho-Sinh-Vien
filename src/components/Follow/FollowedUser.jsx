import { useSelector } from "react-redux";
import { unFollowPostByUser } from "../../services/apiFollowService";
import FollowedAnswer from "./FollowedAnswer";
import FollowedQuestion from "./FollowedQuestion";
import './FollowedUser.scss';
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

const FollowedUser = (props) => {
    const { followedPost, fetchFollowedPosts } = props;
    const idUser = useSelector(state => state.auth.user.id);

    const handleUnfollowPost = async () => {
        if (idUser && followedPost?.id) {
            const res = await unFollowPostByUser(idUser, followedPost.id)
            if (res?.EC === 0) {
                const post = followedPost.post_type_id === 1 ? "câu hỏi" : "câu trả lời"
                toast.success(`Bạn hủy theo dõi ${post}`)
                fetchFollowedPosts();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    return (
        <div className="followed-user-container">
            {followedPost.post_type_id === 1 ?
                (
                    <FollowedQuestion
                        idQuestion={followedPost.id}
                        titleQuestion={followedPost.post_title}
                        idUser={followedPost.created_by_user_id}
                        questionAskedTime={followedPost.askedTime}
                        previewContent={followedPost.post_plain_details}
                        postType={followedPost.post_type_id}
                        idAcceptedAnswer={followedPost.accepted_answer_id} />
                )
                :
                (
                    <FollowedAnswer
                        idAnswer={followedPost.id}
                        idQuestion={followedPost.parent_question_id}
                        idUser={followedPost.created_by_user_id}
                        questionAskedTime={followedPost.askedTime}
                        previewContent={followedPost.post_plain_details}
                        postType={followedPost.post_type_id} />
                )
            }
            <span className="unfollow-post" onClick={() => handleUnfollowPost()}>
                <MdClear />
            </span>
        </div>
    )
}

export default FollowedUser;