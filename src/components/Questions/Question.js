import { useParams } from "react-router-dom";
import TitleQuestion from "./TitleQuestion";
import DetailQuestion from "./DetailQuestion";
import ListAnswers from "../Answer/ListAnswers";
import './Question.scss';
import { useEffect, useState } from "react";
import { getQuestions } from "../../services/apiQuestionService";

const Question = (props) => {
    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailQuestion, setDetailQuestion] = useState("");
    const { idpost } = useParams();

    useEffect(() => {
        const fetchTitleQuestion = async () => {
            const data = await getQuestions(idpost);
            setTitleQuestion(data.DT.post_title);
            setDetailQuestion(data.DT.post_details);
        }
        fetchTitleQuestion();
    }, [])

    return (
        <div className="question-container">
            <TitleQuestion titleQuestion={titleQuestion} />
            <DetailQuestion detailQuestion={detailQuestion} idPost={idpost} />
            <ListAnswers idQuestion={idpost} />
        </div>
    )
}

export default Question;