import MetaQuestion from "../Questions/MetaQuestion";

const QuestionResult = (props) => {
    const { question } = props;
    return (
        <div className="question-result-container">
            <MetaQuestion
                idQuestion={question.id} idUser={question.created_by_user_id}
                titleQuestion={question.post_title} questionAskedTime={question.askedTime}
                previewContent={question.post_plain_details} postType={question.post_type_id}
                idAcceptedAnswer={question.accepted_answer_id}
            />
        </div>
    )
}

export default QuestionResult;