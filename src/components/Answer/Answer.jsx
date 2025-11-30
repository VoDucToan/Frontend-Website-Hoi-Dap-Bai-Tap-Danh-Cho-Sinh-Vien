import { useEffect, useState } from 'react';
import './Answer.scss'
import VotePost from '../Votes/VotePost';
import ListComments from '../Comments/ListComments';
import { getEditForPost } from '../../services/apiEditPostService';
import Signature from '../Post/Signature';
import { getImagesPost } from '../../services/apiQuestionService';

const Answer = (props) => {
    const { idAnswer, idQuestion, idAcceptedAnswer, getIdAcceptedAnswer,
        idAuthor, idAuthorAsked, askedTime, postType, contentAnswer
    } = props;

    const [imagesByAnswers, setImagesByAnswers] = useState([]);
    const [editAnswer, setEditAnswer] = useState({});

    const fetchEditAnswer = async () => {
        if (idAnswer) {
            const res = await getEditForPost(idAnswer);
            if (res && res.EC === 0) {
                setEditAnswer(res.DT);
            }
        }
    }

    const fetchImagesByAnswers = async () => {
        if (idAnswer) {
            const data = await getImagesPost(idAnswer);
            if (data && data.EC === 0) {
                setImagesByAnswers(data.DT);
            }
        }
    }
    useEffect(() => {
        fetchEditAnswer();
        fetchImagesByAnswers();
    }, [idAnswer])

    return (
        <div className="answer-container" id={`${idAnswer}-answer-container`}>
            <div >
                <VotePost idpost={idAnswer} idPostType={2} idQuestion={idQuestion}
                    initialAccepted={idAnswer === idAcceptedAnswer ? true : false}
                    getIdAcceptedAnswer={getIdAcceptedAnswer} idAuthor={idAuthor} />
            </div>
            <div className="detail-answer">
                <div className="content-answer"
                    dangerouslySetInnerHTML={{ __html: contentAnswer }}></div>
                {imagesByAnswers && imagesByAnswers.length > 0 && imagesByAnswers.map((image, index) => {
                    return (
                        <img src={`${process.env.REACT_APP_URL_NODE}/images/uploads/${image.file_name}`} className='img-thumbnail' key={index} />
                    )
                })}
                <Signature idAuthorAsked={idAuthorAsked} askedTime={askedTime}
                    editedTime={editAnswer.editedTime} idPost={idAnswer}
                    previousEditId={editAnswer.previous_edit_id}
                    idAuthorEdited={editAnswer.edited_by_user_id}
                    postType={postType} />
                <ListComments idPost={idAnswer} />
            </div>
        </div>
    )
}

export default Answer;