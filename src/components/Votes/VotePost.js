import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import { FaSave } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useEffect, useState } from "react";
import { getNumberVotesPost, getVoteTypePost, handleDecreaseVotePost, handleIncreaseVotePost, handleUnvotePost } from "../../services/apiVoteService";
import { useParams } from "react-router-dom";
import { getAccount } from "../../services/apiUserService";
import './VotePost.scss';

const VotePost = (props) => {
    const { idpost } = props;
    const [numberVotes, setNumberVotes] = useState(0)
    const [voteType, setVoteType] = useState(0)
    const [voteTypeInitial, setVoteTypeInitial] = useState(false)

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
            const account = await getAccount();
            const data = await getVoteTypePost(idpost, account.id);
            setVoteType(data.DT);
            setVoteTypeInitial(true);
        }
        fetchVoteType();
    }, [])

    useEffect(() => {
        if (voteTypeInitial) {
            const fetchNumberVotes = async () => {
                const account = await getAccount();
                if (voteType === 0) {
                    await handleUnvotePost(idpost, account.id);
                }
                else if (voteType === 1) {
                    await handleUnvotePost(idpost, account.id);
                    await handleIncreaseVotePost(idpost, account.id, voteType);
                }
                else if (voteType === 2) {
                    await handleUnvotePost(idpost, account.id);
                    await handleDecreaseVotePost(idpost, account.id, voteType);
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