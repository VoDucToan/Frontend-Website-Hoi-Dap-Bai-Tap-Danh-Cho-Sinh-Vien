import { ImArrowUp } from "react-icons/im";
import './VoteComment.scss'
import { useEffect, useState } from "react";
import {
    getNumberVotesComment, getVoteTypeComment, handleIncreaseVoteComment,
    handleUnvoteComment
} from "../../services/apiVoteService";
import { useSelector } from "react-redux";

const VoteComment = (props) => {
    const { idComment } = props;
    const [numberVotes, setNumberVotes] = useState(0);
    const [voteType, setVoteType] = useState(0)
    const [voteTypeInitial, setVoteTypeInitial] = useState(false)

    const idUser = useSelector(state => state.auth.user.id);

    const increaseVote = () => {
        if (voteType === 1) {
            setVoteType(0);
        }
        else {
            setVoteType(1);
        }
    }

    useEffect(() => {
        const fetchVoteType = async () => {
            const data = await getVoteTypeComment(idComment, idUser);
            setVoteType(data.DT);
            setVoteTypeInitial(true);
        }
        fetchVoteType();
    }, [])

    useEffect(() => {
        if (voteTypeInitial) {
            const fetchNumberVotes = async () => {
                if (voteType === 0) {
                    await handleUnvoteComment(idComment, idUser);
                }
                else if (voteType === 1) {
                    await handleUnvoteComment(idComment, idUser);
                    await handleIncreaseVoteComment(idComment, idUser, voteType)
                }
                const data = await getNumberVotesComment(idComment);
                setNumberVotes(data.DT);
            }
            fetchNumberVotes();
        }
    }, [voteType, voteTypeInitial])

    return (
        <div className="vote-comment">
            <div className="amount-votes-comment">{numberVotes}</div>
            <div className={"arrow-up " + ((voteType === 1) ? "arrow-up-check" : "")} onClick={() => increaseVote()}><ImArrowUp /></div>
        </div>
    )
}

export default VoteComment;