import Container from 'react-bootstrap/Container';
import {Row,Button} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import EContext from "../context/ecommerce/EContext";
import './Items.css';

function Items(){

    const {accessToken} = useContext(EContext)
    
    const [items,setItems] = useState([])

    const navigate = useNavigate();
    
    const [isDataReady,setIsDataReady] = useState(false)
  
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
            navigate('/')
        });  
    }

    useEffect(()=>{
         getAllItems();
    }, []);


    function AddToCart(itemId) {
    fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, quantity: 1 }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/cart");
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  }



    return<>
       <Container style={{ marginTop: "10px" }}>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Items</h2>
        <Button variant="success" onClick={() => navigate("/cart")}>
          View Cart
        </Button>
      </div>

      {isDataReady ? (
        <Row>
          {items.map((item, i) => (
            <Col key={i} sm={12} md={6} lg={4} className="mb-4">
              <Card className='item-card' style={{ height: "100%" }}>
                <Card.Img  variant="top"  src={item.image}  
                style={{ height: "200px", objectFit: "cover" }} />

                <Card.Body style={{ backgroundColor: "#F0F8FF" }}>

                  <Card.Title>{item.name}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>

                  <Card.Text>{item.description?.substring(0, 80)}...</Card.Text>
                  <p><strong>Purchase Price:</strong> {item.purchasePrice} </p>
                  <p><strong>Sale Price:</strong> {item.salePrice} </p>
                  <p> <strong>Stock:</strong> {item.stock}</p>
                  <p> <strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Ratings:</strong> {item.ratings}</p>
                  <Button className='btn' style={{backgroundColor:"#DCDCDC" , color: "black"}} onClick={() => AddToCart(item._id)} >Add to Cart </Button>
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