import AnswerResult from "./AnswerResult";
import QuestionResult from "./QuestionResult";

const PostResult = (props) => {
    const { result } = props;
    return (
        <div className="post-result-container">
            {result.post_type_id === 1 ?
                (
                    <QuestionResult question={result} />
                )
                :
                (
                    <AnswerResult answer={result} />
                )
            }
        </div>
    )
}

export default PostResult;