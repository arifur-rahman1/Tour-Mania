import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin/SocialLogin';

const Login = () => {
    const navigate = useNavigate();
    const navigateRegister = () => {
        navigate('/register')
    }
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    if (user) {
        navigate(from, { replace: true });
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password)
    }
    return (
        <div className='container w-50 mx-auto'>
            <h2 className='text-center text-primary mt-5'>Please Login </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>New to My website?? <Link to={'/register'} className='pe-auto text-decoration-none' onClick={navigateRegister}>Please Register</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;