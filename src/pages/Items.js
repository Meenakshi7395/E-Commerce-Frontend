import Container from 'react-bootstrap/Container';
import {Row,Button} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import EContext from "../context/ecommerce/EContext";


function Items(){

    const {accessToken} = useContext(EContext)
    
    const [items,setItems] = useState([])

    const navigate = useNavigate();

    // const [isDataChange,setIsDataChange] = useState(0)
    
    const [isDataReady,setIsDataReady] = useState(false)
    // function dataChange(){
    //     setIsDataChange(isDataChange+1);
    // }

    const API_URL = process.env.REACT_APP_BACKEND_API
    function getAllItems()   
    {
        fetch(`${API_URL}/items`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type':'application/json',
            },
                                                        
        }).then(response =>{
            if(!response.ok){
              throw new Error("Failed");
            }
            return response.json();
        })
        .then(data =>{
           
            if(data.success)
            {
                setItems(data.items)
                setIsDataReady(true)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
            //console.error('Login Error: ',error);
            navigate('/')
        });  
    }

    useEffect(()=>{
         getAllItems();
    }, []);

    return<>
       <Container style={{ marginTop: "10px" }}>
      {/* <Row className="mb-4">
        <Col>
          <Card style={{ textAlign: "center", backgroundColor: "#00BFFF" }}>
            <h2 style={{ padding: "10px", color: "white" }}>All Items</h2>
          </Card>
        </Col>
      </Row> */}

      {isDataReady ? (
        <Row>
          {items.map((item, i) => (
            <Col key={i} sm={12} md={6} lg={4} className="mb-4">
              <Card style={{ height: "100%" }}>
                <Card.Img variant="top"  src={item.image}  style={{ height: "200px", objectFit: "cover" }} />

                <Card.Body style={{ backgroundColor: "#B0E0E6" }}>

                  <Card.Title>{item.name}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>

                  <Card.Text>{item.description?.substring(0, 80)}...</Card.Text>
                  <p><strong>Purchase Price:</strong> {item.purchasePrice} </p>
                  <p><strong>Sale Price:</strong> {item.salePrice} </p>
                  <p> <strong>Stock:</strong> {item.stock}</p>
                  <p> <strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Ratings:</strong> {item.ratings}</p>
                  <Button variant="primary" onClick={() => navigate(`/items/${item._id}`)} >Add to Cart </Button>
                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      )}
    </Container>
    </>
}
export default Items;