import React,{useRef,useState} from "react";
import { Form, Button, Card,Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
export default function ResetPassword() {
    const history=useHistory();
    const emailRef=useRef();
    const [loading,setLoading]=useState(false)
    const {login,currentUser,resetpassword}=useAuth() 
    const [message,setMessage]=useState("")
    const [error,setError]=useState()
    async function submitHandler(e){
        e.preventDefault();
        //as signup returns a promise
        try{
            await resetpassword(emailRef.current.value)
            setError('')
            setMessage("reset link has been sent to the email")
            history.push('/login')
        }catch{
            setError('Failed to reset your password ,check your email first')
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Reset Password</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={submitHandler} className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                        </Form.Group>
                        <Button disabled={loading} variant="danger" type="submit">Reset Password</Button>
                    </Form>
                    <div className="mt-3 text-center d-inline">Need an account? <Link to="/signup">Signup</Link></div>
                   <div><Link to="/login">Login</Link></div>
                </Card.Body>
            </Card>
        </>
    )
}


