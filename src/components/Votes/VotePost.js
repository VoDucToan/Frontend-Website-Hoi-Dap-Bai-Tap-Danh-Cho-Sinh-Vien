import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useEffect, useState } from "react";
import { getNumberVotesPost, getVoteTypePost, handleDecreaseVotePost, handleIncreaseVotePost, handleUnvotePost } from "../../services/apiVoteService";
import { useParams } from "react-router-dom";
import './VotePost.scss';
import { useSelector } from "react-redux";

const VotePost = (props) => {
    const { idpost } = props;
    const [numberVotes, setNumberVotes] = useState(0)
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

    const decreaseVote = () => {
        if (voteType === 2) {
            setVoteType(0);
        }
        else {
            setVoteType(2);
        }
    }

    useEffect(() => {
        const fetchVoteType = async () => {
            const data = await getVoteTypePost(idpost, idUser);
            setVoteType(data.DT);
            setVoteTypeInitial(true);
        }
        fetchVoteType();
    }, [])

    useEffect(() => {
        if (voteTypeInitial) {
            const fetchNumberVotes = async () => {
                if (voteType === 0) {
                    await handleUnvotePost(idpost, idUser);
                }
                else if (voteType === 1) {
                    await handleUnvotePost(idpost, idUser);
                    await handleIncreaseVotePost(idpost, idUser, voteType);
                }
                else if (voteType === 2) {
                    await handleUnvotePost(idpost, idUser);
                    await handleDecreaseVotePost(idpost, idUser, voteType);
                }
                const data = await getNumberVotesPost(idpost)
                setNumberVotes(data.DT);
            }
            fetchNumberVotes();
        }
    }, [voteType, voteTypeInitial])

    return (
        <div className="amount-votes-container">
            <button className={"btn-vote " + ((voteType === 1) ? "btn-voted" : "")} onClick={() => increaseVote()}>
                <GoTriangleUp className="increase-vote" />
            </button>
            <span className="amount-votes">{numberVotes}</span>
            <button className={"btn-vote " + ((voteType === 2) ? "btn-voted" : "")} onClick={() => decreaseVote()}>
                <GoTriangleDown className="decrease-vote" />
            </button>
            <FaSave className="save-question" />
            <MdHistory className="history-activity" />
        </div>
    )
}

export default VotePost;