import { Link, useNavigate } from 'react-router-dom';
import './Tag.scss'

const Tag = (props) => {
    const { tag } = props;

    return (
        <Link to={`/tags/${tag.id}/info`} className='navbar-brand' >
            <li className='meta-tag'>{tag.tag_name}</li>
        </Link>
    )
}

export default Tag;