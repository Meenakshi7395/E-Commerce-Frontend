import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import eContext from '../context/ecommerce/EContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navigation (){
    const navigate = useNavigate
   const {user,onLogout} = useContext(eContext)
    return <>    
    <Navbar bg="info" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                 {user==null ? <></> : <><Nav className="me-auto">
            </Nav> 

            <Nav> 
                <NavDropdown title={user.name}>
                    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </NavDropdown>
            </Nav></>
            }
        </Container>
    </Navbar>
</>
}

export default Navigation;