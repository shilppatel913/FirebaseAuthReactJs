import React,{useState} from 'react';
import {Card,Alert,Button} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom';


export default function Dashboard(){
    const history=useHistory()
    const {currentUser,logout}=useAuth();
    const [error,setError]=useState("");
    async function handleLogout(){
        try{
            await logout()
            setError("")
            history.push('/login')
        }catch{
            setError("sorry could not logout")
        }
    }
    return(
        <>
        <Card>
            <Card.Title>Profile</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Body>
                {currentUser.email} <br/><br/>
                <Link to="/update-profile" className="btn btn-primary">
                    Update Profile
                </Link>
                <Button variant="link" onClick={handleLogout}>LogOut</Button>
            </Card.Body>
        </Card>
        </>
    )
}