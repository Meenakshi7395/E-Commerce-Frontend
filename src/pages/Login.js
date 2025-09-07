import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import EContext from '../context/ecommerce/EContext';

function Login(){
  
    const {onLogin}= useContext(EContext)

    const[ formData,setFormData]=useState({
        email: '',
        password:''
    });

    const[submitting,setSubmitting]=useState(false);
    const navigate = useNavigate()

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const API_URL = process.env.REACT_APP_BACKEND_API

    function handleSubmit(e){

        e.preventDefault();
        
        setSubmitting(true );
        
        fetch(`${API_URL}/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
    .then(response =>{
        if(!response.ok){
        throw new Error('Login failed');
        }
        return response.json();
    })

    .then(data =>{

        setFormData({
            email:'',
            password:'',
        });

        setSubmitting(false);

        onLogin(data.user,data.accessToken)
        
        navigate("/items");

    })

    .catch(error=>{

        setSubmitting(false);
    });
    
}
  return <>
    <Card className="bg-dark text-white">
      <Card.ImgOverlay>
        {/* <Card.Title></Card.Title> */}
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ marginTop: 80 }}>
            <Card style={{ backgroundColor: '#f0f8ffff' }}>
              <Card.Header style={{ backgroundColor: "skyblue" }}>Login</Card.Header>
              <Card.Body>
                
                <Form className='form' onSubmit={handleSubmit}>
                  
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      Your Email :
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="email" name="email" placeholder='email' onChange={handleChange} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                      Password :
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
                    </Col>
                  </Form.Group>

                  <Button variant="info" type="submit" >Login</Button>
                </Form>
              
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}></Col>
        </Row>

      </Card.ImgOverlay>
    </Card>  
    </>
}

export default Login;