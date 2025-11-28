import { ImArrowUp } from "react-icons/im";
import './VoteComment.scss'
import { useEffect, useState } from "react";
import {
    getNumberVotesComment, getVoteTypeComment, handleIncreaseVoteComment,
    handleUnvoteComment
} from "../../services/apiVoteService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VoteComment = (props) => {
    const { idComment } = props;
    const [numberVotes, setNumberVotes] = useState(0);
    const [voteType, setVoteType] = useState(0)

    const idUser = useSelector(state => state.auth.user.id);

    const fetchVoteType = async () => {
        if (idUser && idComment) {
            const data = await getVoteTypeComment(idComment, idUser);
            setVoteType(data.DT);
        }
    }

    useEffect(() => {
        fetchVoteType();
    }, [idComment, idUser])

    const fetchNumberVotes = async () => {
        const data = await getNumberVotesComment(idComment);
        setNumberVotes(data.DT);
    }

    useEffect(() => {
        fetchNumberVotes();
    }, [idComment])

    const increaseVote = async () => {
        const res = await handleIncreaseVoteComment(idComment, idUser)
        if (res?.EC === 0) {
            fetchVoteType();
            fetchNumberVotes();
        }
        else if (res?.EC === -1) {
            toast.error("Bạn phải đạt được 2 điểm danh tiếng để mở khóa chức năng tăng bình chọn cho bình luận");
        }
        else {
            toast.error(res.EM);
        }
    }

    const unvote = async () => {
        const res = await handleUnvoteComment(idComment, idUser);
        if (res?.EC === 0) {
            fetchVoteType();
            fetchNumberVotes();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="vote-comment">
            <div className="amount-votes-comment">{numberVotes}</div>
            {voteType === 1 ?
                (
                    <div className={"arrow-up arrow-up-check"}
                        onClick={() => unvote()}><ImArrowUp /></div>
                )
                :
                (
                    <div className={"arrow-up"}
                        onClick={() => increaseVote()}><ImArrowUp /></div>
                )
            }
        </div>
    )
}

export default VoteComment;