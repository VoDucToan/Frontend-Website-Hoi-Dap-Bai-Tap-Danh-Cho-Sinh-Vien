import { useEffect, useState } from 'react';
import './ListTags.scss';
import { getListTagsByQuestion } from '../../services/apiTagService';

const ListTags = (props) => {
    const { idQuestion } = props;
    const [listTags, setListTags] = useState([]);

    useEffect(() => {
        const fetchListTags = async () => {
            const data = await getListTagsByQuestion(idQuestion);
            setListTags(data.DT);
        }
        fetchListTags();
    }, [])

    return (
        <div className="meta-tags">
            <ul className="meta-list-tags">
                {listTags && listTags.length > 0 && listTags.map((tag) => {
                    return (
                        <li key={tag.tag_id}>{tag.tag_name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListTags