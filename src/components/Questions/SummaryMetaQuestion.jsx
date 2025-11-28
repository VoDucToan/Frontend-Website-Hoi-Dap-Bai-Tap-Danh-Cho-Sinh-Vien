import ListTags from "../Tags/ListTags"
import MetaAuthor from "../Users/MetaAuthor"
import SummaryTitleQuestion from "./SummaryTitleQuestion"
import './SummaryMetaQuestion.scss';

const SummaryMetaQuestion = (props) => {
    const { idQuestion, titleQuestion, listTags,
        avatarAuthor, nameUser, questionAskedTime,
        previewContent, postType, idAnswer,
        idAuthor, reputation } = props;
    return (
        <div className="summary-content">
            <SummaryTitleQuestion idQuestion={idQuestion} titleQuestion={titleQuestion}
                postType={postType} idAnswer={idAnswer} />
            {previewContent?.length > 0 && (
                <span className="preview-content">
                    {previewContent && previewContent.length > 220 ?
                        previewContent.substring(0, 220) + '...'
                        :
                        previewContent
                    }
                </span>
            )}
            {listTags && listTags.length > 0 && (
                <ListTags listTags={listTags} />
            )}
            <div className="meta-author-container">
                <MetaAuthor avatarAuthor={avatarAuthor}
                    nameUser={nameUser}
                    questionAskedTime={questionAskedTime}
                    postType={postType}
                    idAuthor={idAuthor}
                    reputation={reputation} />
            </div>

        </div>
    )
}

export default SummaryMetaQuestion