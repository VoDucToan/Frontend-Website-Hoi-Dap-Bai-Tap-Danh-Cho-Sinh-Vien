import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../../services/apiUserService';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await loginUser(email, password);
        console.log('data', data);
        if (data && data.EC === 0) {
            localStorage.setItem("access_token", data.DT.access_token);
            setAuth({
                isAuthenticated: true,
                user: {
                    email: data?.DT?.email ?? "",
                    name: data?.DT?.name ?? ""
                }
            })
            toast.success("Đăng nhập thành công!");
            navigate('/');
        }
        else {
            toast.error("Email/Password không hợp lệ")
        }
        setEmail('');
        setPassword('');
    }

    return (
        <Form className='w-50 mx-auto mt-5'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} placeholder="Email" onChange={(event) => {
                    setEmail(event.target.value);
                }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" value={password} placeholder="Mật khẩu" onChange={(event) => {
                    setPassword(event.target.value);
                }} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(event) => handleLogin(event)}>
                Đăng nhập
            </Button>
        </Form>
    )
}

export default Login;