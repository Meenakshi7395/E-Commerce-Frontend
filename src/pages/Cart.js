import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EContext from "../context/ecommerce/EContext";

function Cart() {
  const { accessToken } = useContext(EContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_API;

  function fetchCart() {
    fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCartItems(data.cartItems);
        } else {
          alert(data.message);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  function handleRemove(itemId) {
    fetch(`${API_URL}/cart/remove`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchCart(); 
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, cartItem) => sum + (cartItem.item?.salePrice || 0) * cartItem.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Button onClick={() => navigate("/items")} variant="primary">Shop Now</Button>
        </div>
      ) : (
        <>
          <Row>
            {cartItems.map((cartItem, i) => (
              <Col key={i} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={cartItem.item?.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{cartItem.item?.name}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong>{cartItem.item?.salePrice} <br />
                      <strong>Quantity:</strong> {cartItem.quantity}
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(cartItem.item?._id)} style={{backgroundColor:"#DCDCDC" , color: "black"}}> Remove </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-end mt-4">
            <h4>Total: ₹{total}</h4>
            <Button style={{backgroundColor:"#DCDCDC" , color: "black"}} >Proceed to Checkout</Button>
            <Button onClick={() => navigate("/items")} style={{marginLeft: 10 , backgroundColor: "#DCDCDC" , color: "black"}}  >Back</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
