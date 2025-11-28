import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

import { MdHistory } from "react-icons/md";
import { useEffect, useState } from "react";
import { downVoteForPost, getNumberVotesPost, getVoteTypePost, handleDecreaseVotePost, handleIncreaseVotePost, handleUnvotePost, upVoteForPost } from "../../services/apiVoteService";
import { useParams } from "react-router-dom";
import { ImCheckmark } from "react-icons/im";
import { ImCheckmark2 } from "react-icons/im";
import './VotePost.scss';
import { useSelector } from "react-redux";
import { handleAcceptAnswer, handleUnacceptAnswer } from "../../services/apiAnswerService";
import { toast } from "react-toastify";
import ModalSaveItem from "../Saves/ModalSaveItem";

const VotePost = (props) => {
    const { idpost, idPostType, idQuestion, initialAccepted, getIdAcceptedAnswer,
        idAuthor
    } = props;
    const [numberVotes, setNumberVotes] = useState(0)
    const [voteType, setVoteType] = useState(0)
    const [isAccepted, setIsAccepted] = useState(false);

    const idUser = useSelector(state => state.auth.user.id);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const fetchVoteType = async () => {
        if (idUser && idpost) {
            const data = await getVoteTypePost(idpost, idUser);
            setVoteType(data.DT);
        }
    }

    const fetchNumberVotes = async () => {
        if (idpost) {
            const data = await getNumberVotesPost(idpost)
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchVoteType();
        fetchNumberVotes();
    }, [idUser, idpost])

    useEffect(() => {
        setIsAccepted(initialAccepted);
    }, [initialAccepted])

    const acceptAnswer = async (idAnswer) => {
        const data = await handleAcceptAnswer(idQuestion, idAnswer);
        if (data && data.EC === 0) {
            getIdAcceptedAnswer(idAnswer);
        }
        else {
            toast.error(data.EM);
        }
    }

    const unacceptAnswer = async () => {
        const data = await handleUnacceptAnswer(idQuestion)
        if (data?.EC === 0) {
            getIdAcceptedAnswer(null);
        }
        else {
            toast.error(data.EM);
        }
    }

    const validateVotePost = () => {
        const postType = idPostType === 1 ? "câu hỏi" : "câu trả lời"
        if (!isAuthenticated) {
            toast.error(`Bạn cần đăng nhập để bình chọn cho ${postType}`)
            return false;
        }
        if (idAuthor === idUser) {
            toast.error(`Bạn không thể bình chọn cho ${postType} của bạn`)
            return false;
        }
        return true;
    }

    const handleUpVote = async () => {
        const isValidate = validateVotePost();
        if (!isValidate) {
            return;
        }
        const res = await upVoteForPost(idpost, idUser)
        if (res?.EC === 0) {
            fetchVoteType();
            fetchNumberVotes();
        }
        else if (res?.EC === -1) {
            toast.error("Bạn phải đạt được 15 điểm danh tiếng để mở khóa chức năng bình chọn lên");
        }
        else if (res?.EC === -2) {
            toast.error("Bạn không đủ điểm danh tiếng để tăng bình chọn");
        }
        else {
            toast.error(res.EM);
        }
    }

    const handleDownVote = async () => {
        const isValidate = validateVotePost();
        if (!isValidate) {
            return;
        }
        const res = await downVoteForPost(idpost, idUser)
        if (res?.EC === 0) {
            fetchVoteType();
            fetchNumberVotes();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="amount-votes-container">
            <button className={"btn-vote " + ((voteType === 1) ? "btn-voted" : "")} onClick={() => handleUpVote()}>
                <GoTriangleUp className="increase-vote" />
            </button>
            <span className="amount-votes">{numberVotes}</span>
            <button className={"btn-vote " + ((voteType === 2) ? "btn-voted" : "")} onClick={() => handleDownVote()}>
                <GoTriangleDown className="decrease-vote" />
            </button>

            <ModalSaveItem idPostType={idPostType} idpost={idpost} />

            {idPostType === 2 &&
                (
                    <>
                        {idAuthor === idUser ?
                            (
                                <>
                                    {isAccepted ?
                                        (<ImCheckmark className="accepted-answer" onClick={() => unacceptAnswer()} />)
                                        :
                                        (<ImCheckmark2 className="check-mark-answer" onClick={() => acceptAnswer(idpost)} />)
                                    }
                                </>

                            )
                            :
                            (
                                <>
                                    {isAccepted && <ImCheckmark className="accepted-answer" />}
                                </>
                            )
                        }
                    </>

                )}
            <MdHistory className="history-activity" />
        </div>
    )
}

export default VotePost;