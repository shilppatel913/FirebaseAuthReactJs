import React,{useRef,useState} from "react";
import { Form, Button, Card,Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'

export default function UpdateProfile() {
    const history=useHistory()
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordconfirmRef=useRef();
    const [loading,setLoading]=useState(false)
    const {signup,currentUser,updateEmail,updatePassword}=useAuth() 
    const [error,setError]=useState()
     function submitHandler(e){
      
        e.preventDefault();
       if(passwordRef.current.value!==passwordconfirmRef.current.value){
           return setError("Passwords do not match")
       }
       const promises=[]
       if(currentUser.email!=emailRef.current.value){
           promises.push(updateEmail(emailRef.current.value))
       }
      if(passwordRef.current.value){
          promises.push(updatePassword(passwordRef.current.value))
      }
      Promise.all(promises).then(()=>{
          history.push('/')
      }).catch(()=>{
          setError('Failed to update the account')
      }).finally(()=>{
          setLoading(false)
      })
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Update Page</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicpassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}  placeholder="Leave it empty to keep it same" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasipasswordconfirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordconfirmRef}  placeholder="leave it empty to keep it same"/>
                        </Form.Group>
                        <Button disabled={loading} variant="success" type="submit">Update</Button>
                        <div className="mt-3 text-center"> <Link to="/login">Cancel</Link></div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}