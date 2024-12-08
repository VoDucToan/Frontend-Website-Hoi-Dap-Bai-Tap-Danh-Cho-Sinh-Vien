import ButtonAskQuestion from "./ButtonAskQuestion";

const TitleQuestion = (props) => {
    const { titleQuestion } = props;

    return (
        <div className="title-question-container">
            <div className="title-question-header">
                <h1>{titleQuestion}</h1>
                <div className="interact-question">
                    <span className="time-asked">
                        <span className="asked">Đã hỏi</span> 4 ngày trước
                    </span>
                    <span className="time-modified">
                        <span className="modified">Đã sửa</span> 2 ngày trước
                    </span>
                </div>
            </div>
            <ButtonAskQuestion />
        </div>
    )
}

export default TitleQuestion;