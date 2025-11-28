import ButtonAskQuestion from "./ButtonAskQuestion";

const TitleQuestion = (props) => {
    const { titleQuestion, askTimeAgo, editTimeAgo } = props;

    return (
        <div className="title-question-container">
            <div className="title-question-header">
                <h1>{titleQuestion}</h1>
                <div className="interact-question">
                    <span className="time-asked">
                        <span className="asked">Đã hỏi</span> {askTimeAgo}
                    </span>
                    <span className="time-modified">
                        <span className="modified">Đã sửa</span> {editTimeAgo}
                    </span>
                </div>
            </div>
            <ButtonAskQuestion />
        </div>
    )
}

export default TitleQuestion;