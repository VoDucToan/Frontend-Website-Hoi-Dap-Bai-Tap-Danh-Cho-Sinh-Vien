import { useEffect, useState } from "react";
import { getQuestions } from "../../services/apiQuestionService";
import MetaQuestion from "../Questions/MetaQuestion";

const AnswerResult = (props) => {
    const { answer } = props;
    const [question, setQuestion] = useState({});

    const fetchQuestion = async () => {
        if (answer?.parent_question_id) {
            const res = await getQuestions(answer.parent_question_id);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [answer])

    return (
        <div className="answer-result-contaier">
            <MetaQuestion
                idQuestion={question.id} idUser={question.created_by_user_id}
                titleQuestion={question.post_title} questionAskedTime={question.askedTime}
                previewContent={question.post_plain_details} postType={answer.post_type_id}
                idAnswer={answer.id} idAcceptedAnswer={question.accepted_answer_id}
            />
        </div>
    )
}

export default AnswerResult;