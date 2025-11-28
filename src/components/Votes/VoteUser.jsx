import SummaryTitleQuestion from "../Questions/SummaryTitleQuestion";
import VoteAnswer from "./VoteAnswer";
import VoteQuestion from "./VoteQuestion";
import './VoteUser.scss';

const VoteUser = (props) => {
    const { votePost } = props;

    return (
        <div className="vote-user-container">
            {votePost.post_type_id === 1 ?
                (
                    <VoteQuestion
                        voteType={votePost.vote_type_id}
                        idQuestion={votePost.id}
                        titleQuestion={votePost.post_title}
                        postType={votePost.post_type_id}
                        votedTime={votePost.votedTime}
                    />
                )
                :
                (
                    <VoteAnswer
                        voteType={votePost.vote_type_id}
                        idAnswer={votePost.id}
                        idQuestion={votePost.parent_question_id}
                        postType={votePost.post_type_id}
                        votedTime={votePost.votedTime} />
                )
            }
        </div>
    )
}

export default VoteUser;