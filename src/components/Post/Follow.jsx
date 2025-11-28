import { toast } from 'react-toastify';
import { checkFollowPostByUser, followPostByUser, unFollowPostByUser } from '../../services/apiFollowService';
import './Follow.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Follow = (props) => {
    const { idPost, postType, idAuthor } = props;

    const [isFollow, setIsFollow] = useState(false);
    const idUser = useSelector(state => state.auth.user.id);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const fetchIsFollow = async () => {
        if (idUser && idPost) {
            const res = await checkFollowPostByUser(idUser, idPost);
            if (res?.EC === 0) {
                setIsFollow(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchIsFollow();
    }, [idUser, idPost])

    const validateFollow = () => {
        const post = postType === 1 ? "câu hỏi" : "câu trả lời"
        if (!isAuthenticated) {
            toast.error(`Bạn cần đăng nhập để theo dõi cho ${post}`)
            return false;
        }
        return true;
    }

    const handleFollowPost = async () => {
        const isValidate = validateFollow();
        if (!isValidate) {
            return;
        }
        if (idUser && idPost) {
            const res = await followPostByUser(idUser, idPost)
            if (res?.EC === 0) {
                const post = postType === 1 ? "câu hỏi" : "câu trả lời"
                toast.success(`Bạn đang theo dõi ${post}`)
                fetchIsFollow();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const handleUnFollowPost = async () => {
        if (idUser && idPost) {
            const res = await unFollowPostByUser(idUser, idPost)
            if (res?.EC === 0) {
                const post = postType === 1 ? "câu hỏi" : "câu trả lời"
                toast.success(`Bạn hủy theo dõi ${post}`)
                fetchIsFollow();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    return (
        <>
            {isAuthenticated ?
                (
                    (idAuthor !== idUser) && (
                        <>
                            {isFollow ?
                                (
                                    <span className="follow-option-post" onClick={() => handleUnFollowPost()}>Đang theo dõi</span>
                                )
                                :
                                (
                                    <span className="follow-option-post" onClick={() => handleFollowPost()}>Theo dõi</span>

                                )
                            }
                        </>
                    )
                )
                :
                (
                    <span className="follow-option-post" onClick={() => handleFollowPost()}>Theo dõi</span>
                )
            }
        </>
    )
}

export default Follow;