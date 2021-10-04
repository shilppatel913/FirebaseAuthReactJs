import React,{useRef,useState} from "react";
import { Form, Button, Card,Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
export default function Login() {
    const history=useHistory();
    const emailRef=useRef();
    const passwordRef=useRef();
    const [loading,setLoading]=useState(false)
    const {login,currentUser}=useAuth() 
    const [error,setError]=useState()
    async function submitHandler(e){
        e.preventDefault();
        //as signup returns a promise
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }catch{
            setError("Something went wrong")
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Login Page</Card.Title> 
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submitHandler} className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required/>
                        </Form.Group>
                        <Button disabled={loading} variant="danger" type="submit">Login</Button>
                        <div className="mt-3 text-center d-inline">Need an account? <Link to="/signup">Signup</Link></div>
                    </Form>
                    <Link to="/reset-password">Forgot password ?</Link>
                </Card.Body>
            </Card>
        </>
    )
}


