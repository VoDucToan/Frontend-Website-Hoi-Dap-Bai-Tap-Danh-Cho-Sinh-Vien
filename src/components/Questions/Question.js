import { useParams } from "react-router-dom";
import TitleQuestion from "./TitleQuestion";
import DetailQuestion from "./DetailQuestion";
import ListAnswers from "../Answer/ListAnswers";
import './Question.scss';
import { useEffect, useState } from "react";
import { getQuestions } from "../../services/apiQuestionService";
import { getEditForPost } from "../../services/apiEditPostService";

const Question = (props) => {
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailQuestion, setDetailQuestion] = useState("");
    const [idAcceptedAnswer, setIdAcceptedAnswer] = useState(null);
    const [idAuthor, setIdAuthor] = useState(null);
    const [askTimeAgo, setAskTimeAgo] = useState("");
    const [editTimeAgo, setEditTimeAgo] = useState("");
    const [askedTime, setAskedTime] = useState("");
    const [editedTime, setEditedTime] = useState("");
    const [numberAnswers, setNumberAnswers] = useState(0);
    const [editQuestion, setEditQuestion] = useState({});
    const [question, setQuestion] = useState({});

    const { idpost } = useParams();

    const fetchQuestion = async () => {
        const data = await getQuestions(idpost);
        setTitleQuestion(data.DT.post_title);
        setDetailQuestion(data.DT.post_details);
        setIdAcceptedAnswer(data.DT.accepted_answer_id);
        setIdAuthor(data.DT.created_by_user_id);
        setAskTimeAgo(data.DT.createdAtAgo);
        setEditTimeAgo(data.DT.updatedAtAgo);
        setAskedTime(data.DT.askedTime);
        setEditedTime(data.DT.editedTime);
        setNumberAnswers(data.DT.numberAnswers);
        setQuestion(data.DT);
    }

    const fetchEditQuestion = async () => {
        const res = await getEditForPost(idpost);
        if (res && res.EC === 0) {
            setEditQuestion(res.DT);
        }
    }

    useEffect(() => {
        fetchQuestion();
        fetchEditQuestion();
    }, [idpost])

    const getIdAcceptedAnswer = (idAnswer) => {
        setIdAcceptedAnswer(idAnswer);
    }

    return (
        <div className="question-container">
            <TitleQuestion titleQuestion={titleQuestion} askTimeAgo={askTimeAgo} editTimeAgo={editTimeAgo} />
            <DetailQuestion detailQuestion={detailQuestion} idPost={idpost}
                idAuthorAsked={idAuthor} idAuthorEdited={editQuestion.edited_by_user_id} askedTime={askedTime}
                editedTime={editQuestion.editedTime} previousEditId={editQuestion.previous_edit_id}
                postType={question.post_type_id} />
            <ListAnswers idQuestion={idpost} idAcceptedAnswer={idAcceptedAnswer}
                getIdAcceptedAnswer={getIdAcceptedAnswer} idAuthor={idAuthor}
                numberAnswers={numberAnswers} />
        </div>
    )
}

export default Question;