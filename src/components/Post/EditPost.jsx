import { useEffect, useState } from "react";
import { getPostType } from "../../services/apiPostService";
import { useParams } from "react-router-dom";
import EditQuestion from "../Questions/EditQuestion";
import EditAnswer from "../Answer/EditAnswer";

const EditPost = () => {
    const { idpost } = useParams();

    const [postType, setPostType] = useState({});

    const fetchPostType = async () => {
        const data = await getPostType(idpost);
        if (data && data.EC === 0) {
            setPostType(data.DT);
        }
    }

    useEffect(() => {
        fetchPostType();
    }, [idpost])

    return (
        <div className="edit-post-container">
            {postType.post_type_id === 1 ?
                (
                    <EditQuestion idQuestion={idpost} />
                )
                :
                (
                    <EditAnswer idAnswer={idpost} idQuestion={postType.parent_question_id} />
                )
            }
        </div>
    )
}

export default EditPost;