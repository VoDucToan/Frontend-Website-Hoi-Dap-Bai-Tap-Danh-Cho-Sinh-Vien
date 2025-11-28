import './ListTags.scss';
import Tag from './Tag';

const ListTags = (props) => {
    const { listTags } = props;

    return (
        <div className="meta-tags">
            <ul className="meta-list-tags">
                {listTags && listTags.length > 0 && listTags.map((tag) => {
                    return (
                        <Tag tag={tag} key={tag.id} />
                    )
                })}
            </ul>
        </div>
    )
}

export default ListTags