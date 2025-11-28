import Tag from './Tag';
import './TagBrowser.scss';

const TagBrowser = (props) => {
    const { tag } = props;

    return (
        <div className="tag-browser-container">
            <Tag tag={tag} />
            <div className='tag-browser-description'>
                {tag && tag.tag_summary && tag.tag_summary.length > 141 ?
                    tag.tag_summary.substring(0, 141) + '...'
                    :
                    tag.tag_summary
                }
            </div>
            <div className='tag-browser-figures-question'>
                <span className='number-questions-all-time'>{tag.amountQuestions} câu hỏi</span>
            </div>
        </div>
    )
}

export default TagBrowser;