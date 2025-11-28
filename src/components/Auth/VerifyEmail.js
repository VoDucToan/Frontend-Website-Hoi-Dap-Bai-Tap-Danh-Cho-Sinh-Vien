import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/apiUserService";
import './VerifyEmail.scss';

const VerifyEmail = () => {
    const [result, setResult] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        const fetchVerifyEmail = async () => {
            const data = await verifyEmail(token);
            console.log('data', data);
            if (data.EC === 0) {
                setResult(true);
            }
        }
        fetchVerifyEmail();
    }, [])


    return (
        <div className="container-verify-email">
            {result ?
                (
                    <>
                        <h2 className="message-verify-email alert alert-info">Xác thực email thành công!</h2>
                        <Link to='/login' className='text-decoration-none btn btn-primary btn-lg'>Đăng nhập</Link>
                    </>
                )
                :
                (
                    <>
                        <h2 className="message-verify-email alert alert-danger">Xác thực email thất bại!</h2>
                        <Link to='/' className='text-decoration-none btn btn-primary btn-lg'>Quay về trang chủ</Link>
                    </>
                )
            }
        </div>
    )
}

export default VerifyEmail;