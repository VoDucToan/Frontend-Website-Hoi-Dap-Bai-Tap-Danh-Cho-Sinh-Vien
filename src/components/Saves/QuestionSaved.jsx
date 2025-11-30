import { useEffect, useRef, useState } from 'react';
import { getListTagsByQuestion } from '../../services/apiTagService';
import SummaryMetaQuestion from '../Questions/SummaryMetaQuestion';
import SummaryStatsQuestion from '../Questions/SummaryStatsQuestion';
import { getNumberAnswers } from "../../services/apiAnswerService";
import { getNumberVotesPost } from "../../services/apiVoteService";
import './QuestionSaved.scss';
import { getUser } from '../../services/apiUserService';

const QuestionSaved = (props) => {
    const { idQuestion, titleQuestion, questionAskedTime, idUser,
        idAcceptedAnswer
    } = props;

    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);
    const [user, setUser] = useState({});
    const [numberVotes, setNumberVotes] = useState(0);
    const [numberAnswers, setNumberAnswers] = useState(0);

    const fetchListTagsByQuestion = async () => {
        if (idQuestion) {
            const data = await getListTagsByQuestion(idQuestion);
            setListTagsByQuestion(data.DT);
        }
    }

    const fetchNumberAnswers = async () => {
        if (idQuestion) {
            let data = await getNumberAnswers(idQuestion);
            setNumberAnswers(data.DT);
        }

    }

    const fetchNumberVotes = async () => {
        if (idQuestion) {
            let data = await getNumberVotesPost(idQuestion);
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchListTagsByQuestion();
        fetchNumberAnswers();
        fetchNumberVotes();
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
        <div className="question-saved-container">
            <div className="stats-question-saved">
                <SummaryStatsQuestion
                    amountVotes={numberVotes}
                    amountAnswers={numberAnswers}
                    idAcceptedAnswer={idAcceptedAnswer}
                // amountViews={3}
                />
            </div>
            <SummaryMetaQuestion
                idAuthor={idUser}
                idQuestion={idQuestion}
                titleQuestion={titleQuestion}
                listTags={listTagsByQuestion}
                avatarAuthor={`${process.env.REACT_APP_URL_NODE}/images/uploads/${user.avatar_file_name}`}
                nameUser={user.display_name}
                questionAskedTime={questionAskedTime}
                reputation={user.reputation}
            />
        </div>
    )
}

export default QuestionSaved;