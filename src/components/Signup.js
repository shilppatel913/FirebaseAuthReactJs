import React,{useRef,useState} from "react";
import { Form, Button, Card,Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

export default function Signup() {
    const history=useHistory()
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordconfirmRef=useRef();
    const [loading,setLoading]=useState(false)
    const {signup,currentUser}=useAuth() 
    const [error,setError]=useState()
    async function submitHandler(e){
      
        e.preventDefault();
        if(passwordRef.current.value!==passwordconfirmRef.current.value){
            return setError("Passwords dont match")
        }
        //as signup returns a promise
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
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
                    <Card.Title className="text-center">Sign Up Page</Card.Title>
                    {currentUser && currentUser.email}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasipasswordconfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordconfirmRef} placeholder="Enter password again" />
                        </Form.Group>
                        <Button disabled={loading} variant="danger" type="submit">Signup</Button>
                        <div className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}