import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect,useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EContext from '../../context/ecommerce/EContext';


function ViewItem(){

    const { id } = useParams(); // Access the userId parameter

    const [itemData, setItemData] = useState({
        name: '',
        description:'',  
        purchasePrice:'',
        salePrice:'',
        category:'',
        stock:'',
        brand:'',
        ratings:'',
    })

    const navigate = useNavigate()
    const {accessToken} = useContext(EContext)
   
    const API_URL = process.env.REACT_APP_BACKEND_API

    function getById()   
    {
        fetch(`${API_URL}/items/${id}`,{
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
                setItemData(data.item)
            }
            else
            {
                alert(data.message)
            }

        }).catch(error=>{
    
            navigate('/')
        });
    }

    useEffect(()=>{getById()},[])
    
    return<>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#B0E0E6'}}>
          <Card.Header style={{backgroundColor:"#00BFFF",fontFamily:'sans-serif'}}>All Items</Card.Header>
          

          <Card.Body>
          <div style={{border:1,height:"280px",overflowY:"scroll"}}>
            <p><strong>Name : </strong>{itemData.name}</p>
            <p><strong>Description : </strong> {itemData.description}</p>
            <p><strong>Purchase Price : </strong>{itemData.purchasePrice}</p>
            <p><strong>Sale Price : </strong>{itemData.salePrice}</p>
            <p><strong>Category : </strong>{itemData.category}</p>
            <p><strong>Stock : </strong>{itemData.stock}</p>
            <p><strong>Brand : </strong>{itemData.brand}</p>
            <p><strong>Ratings : </strong>{itemData.ratings}</p>
        
            </div>
          </Card.Body>
         
        </Card>
          </Col>
          <Col sm="3"></Col>
        </Row>
     
    </>
}

export default ViewItem;
