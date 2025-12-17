import { useEffect, useState } from "react";
import ListComments from "../Comments/ListComments";
import ListTags from "../Tags/ListTags";
import VotePost from "../Votes/VotePost";
import Signature from "../Post/Signature";
import { getImagesPost } from "../../services/apiQuestionService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import './DetailQuestion.scss'

const DetailQuestion = (props) => {
    const { detailQuestion, idPost, idAuthorEdited, idAuthorAsked, askedTime, editedTime, previousEditId,
        postType
    } = props;

    const [imagesPost, setImagesPost] = useState([]);
    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);

    useEffect(() => {
        document.getElementById("id-content-question").innerHTML = detailQuestion;
    }, [detailQuestion])

    const fetchListTagsByQuestion = async () => {
        if (idPost) {
            const data = await getListTagsByQuestion(idPost);
            setListTagsByQuestion(data.DT);
        }
    }

    const fetchImagesPost = async () => {
        if (idPost) {
            const data = await getImagesPost(idPost);
            setImagesPost(data.DT);
        }
    }

    useEffect(() => {
        fetchImagesPost();
        fetchListTagsByQuestion();
    }, [idPost])

    return (
        <div className="detail-question-container">
            <div >
                <VotePost idpost={idPost} idPostType={1} idAuthor={idAuthorAsked} />
            </div>
            <div className="detail-question">
                <div className="content-question" id="id-content-question"></div>
                {imagesPost && imagesPost.length > 0 && imagesPost.map((image, index) => {
                    return (
                        <img src={image.file_name} className='img-thumbnail' key={index} />
                    )
                })}
                <ListTags listTags={listTagsByQuestion} />
                <Signature idAuthorEdited={idAuthorEdited} idAuthorAsked={idAuthorAsked} askedTime={askedTime}
                    editedTime={editedTime} idPost={idPost} previousEditId={previousEditId}
                    postType={postType} />
                <ListComments idPost={idPost} />
            </div>
        </div>
    )
}

export default DetailQuestion;