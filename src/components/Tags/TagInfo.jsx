import './TagInfo.scss'
import ButtonAskQuestion from "../Questions/ButtonAskQuestion";
import Tag from "./Tag";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getImagesTag, getTag } from '../../services/apiTagService';

const TagInfo = () => {
    const { idtag } = useParams();

    const [tag, setTag] = useState({})
    const [imagesTag, setImagesTag] = useState([]);

    const fetchTag = async () => {
        const res = await getTag(idtag);
        if (res && res.EC === 0) {
            setTag(res.DT);
        }
    }

    const fetchImagesTag = async () => {
        const res = await getImagesTag(idtag);
        if (res && res.EC === 0) {
            setImagesTag(res.DT);
        }
    }

    useEffect(() => {
        fetchTag();
        fetchImagesTag();
    }, [idtag])

    useEffect(() => {
        document.getElementById("id-tag-info-content-wiki").innerHTML = tag.tag_description;
    }, [tag])

    return (
        <div className="tag-info-container">
            <div className="tag-info-header">
                <div>
                    <h5 className="d-inline">Thông tin về </h5>
                    <Tag tag={tag} />
                </div>
                <ButtonAskQuestion />
            </div>

            <div className="tag-info-content">
                <div className='tag-info-content-summary'>
                    {tag.tag_summary}
                </div>
                <div className='tag-info-content-wiki' id='id-tag-info-content-wiki'>
                </div>
                <div>
                    {imagesTag && imagesTag.length > 0 && imagesTag.map((image, index) => {
                        return (
                            <img src={`${process.env.REACT_APP_URL_NODE}images/uploads/${image.file_name}`}
                                className='img-thumbnail' key={index} />
                        )
                    })}
                </div>
            </div>
            <div className="tag-info-action">
                <Link to={`/edit-tag-wiki/${tag.id}`}>
                    <button type="button" className="btn btn-primary">Cải thiện thông tin thẻ</button>
                </Link>
            </div>
        </div>
    )
}

export default TagInfo;