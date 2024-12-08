
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiUserService';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        //validate email
        if (!validateEmail(email)) {
            toast.info("Email chưa nhập");
            return;
        }
        //validate password
        if (!password) {
            toast.info("Mật khẩu chưa nhập");
            return;
        }
        //validate name
        if (!name) {
            toast.info("Tên người dùng chưa nhập");
            return;
        }
        const data = await createUser(email, password, name);
        console.log('data', data);
        if (data.EC === 0) {
            toast.success("Đăng ký thành công!")
            navigate('/');
        }
        else if (data.EC === 1) {
            toast.error("Email đăng ký đã tồn tại!")
        }
        setEmail('');
        setName('');
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

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Tên người dùng</Form.Label>
                <Form.Control type="text" value={name} placeholder="Tên người dùng" onChange={(event) => {
                    setName(event.target.value);
                }} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(event) => handleRegister(event)}>
                Đăng ký
            </Button>
        </Form>
    )
}

export default Register;