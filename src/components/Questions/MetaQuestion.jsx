import { useEffect, useState } from "react";
import { getUser } from "../../services/apiUserService";
import { getNumberAnswers } from "../../services/apiAnswerService";
import { getNumberVotesPost } from "../../services/apiVoteService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import SummaryMetaQuestion from './SummaryMetaQuestion';
import './MetaQuestion.scss';
import SummaryStatsQuestion from "./SummaryStatsQuestion";

const MetaQuestion = (props) => {
    const { idQuestion, idUser, titleQuestion, questionAskedTime,
        previewContent, postType, idAnswer, idAcceptedAnswer
    } = props;

    const [numberVotes, setNumberVotes] = useState(0);
    const [numberAnswers, setNumberAnswers] = useState(0);
    const [user, setUser] = useState({});

    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);

    const fetchNumberVotes = async () => {
        if (idQuestion) {
            let data = await getNumberVotesPost(idQuestion);
            setNumberVotes(data.DT);
        }
    }

    const fetchNumberAnswers = async () => {
        if (idQuestion) {
            let data = await getNumberAnswers(idQuestion);
            setNumberAnswers(data.DT);
        }

    }

    const fetchListTagsByQuestion = async () => {
        if (idQuestion) {
            const data = await getListTagsByQuestion(idQuestion);
            setListTagsByQuestion(data.DT);
        }

    }

    useEffect(() => {
        fetchNumberVotes();
        fetchNumberAnswers();
        fetchListTagsByQuestion();
    }, [idQuestion])

    const fetchUser = async () => {
        if (idUser) {
            let data = await getUser(idUser);
            if (data && data.EC === 0) {
                setUser(data.DT[0]);
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, [idUser])

    return (
        <div className="question" >
            <SummaryStatsQuestion
                amountVotes={numberVotes}
                amountAnswers={numberAnswers}
                idAcceptedAnswer={idAcceptedAnswer}
                isColumn={true}
            />
            <div className="summary-content-container">
                <SummaryMetaQuestion
                    idQuestion={idQuestion}
                    titleQuestion={titleQuestion}
                    listTags={listTagsByQuestion}
                    avatarAuthor={`${process.env.REACT_APP_URL_NODE}/images/uploads/${user.avatar_file_name}`}
                    nameUser={user.display_name}
                    questionAskedTime={questionAskedTime}
                    previewContent={previewContent}
                    postType={postType}
                    idAnswer={idAnswer}
                    idAuthor={idUser}
                    reputation={user.reputation}
                />
            </div>
        </div>
    )
}

export default MetaQuestion;