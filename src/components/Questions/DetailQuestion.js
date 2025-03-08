import { useEffect } from "react";
import ListComments from "../Comments/ListComments";
import ListTags from "../Tags/ListTags";
import VotePost from "../Votes/VotePost";

const DetailQuestion = (props) => {
    const { detailQuestion, idPost, imageName } = props;
    useEffect(() => {
        document.getElementById("id-content-question").innerHTML = detailQuestion;
    }, [detailQuestion])
    return (
        <div className="detail-question-container">
            <div >
                <VotePost idpost={idPost} />
            </div>
            <div className="detail-question">
                <div className="content-question" id="id-content-question"></div>
                {imageName && <img src={`http://localhost:8080/images/uploads/${imageName}`} className='img-thumbnail' />}
                <ListTags idQuestion={idPost} />
                <div className="signature-question">
                    <div className="option-question">
                        <span>Chia sẻ</span>
                        <span>Chỉnh sửa</span>
                        <span>Theo dõi</span>
                    </div>
                    <div className="user-edited-question">
                        Đã chỉnh sửa vào ngày
                    </div>
                    <div className="user-asked-question">
                        Đã hỏi vào ngày
                    </div>
                </div>
                <ListComments idPost={idPost} />
            </div>
        </div>
    )
}

export default DetailQuestion;