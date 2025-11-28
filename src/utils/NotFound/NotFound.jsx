import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
    return (
        <div class="custom-bg text-dark">
            <div class="d-flex align-items-center justify-content-center min-vh-100 px-2">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-2 fw-medium mt-4">Trang không tìm thấy!</p>
                    <p class="mt-4 mb-5">Trang bạn đang tìm không tồn tại hoặc đã được thay đổi.</p>
                    <Link to='/' className='btn btn-light fw-semibold rounded-pill px-4 py-2 custom-btn'>Về trang chủ</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;