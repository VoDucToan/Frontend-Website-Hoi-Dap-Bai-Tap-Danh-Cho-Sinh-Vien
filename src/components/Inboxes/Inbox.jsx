import { IoSchool } from "react-icons/io5";

const Inbox = () => {
    return (
        <div className="inbox-container">
            <div className="inbox-info-creation">Jun 18</div>
            <span className="inbox-icon"><IoSchool /></span>
            <span className="inbox-info-type">announcement</span>
            <div className="inbox-info-summary">New! You can now comment on posts
                Join the conversation to ask for clarification, add details, and help improve questions and answers.</div>
        </div>
    )
}

export default Inbox;