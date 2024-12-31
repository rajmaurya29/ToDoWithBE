import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
function Nav_bar(){
    return(
        <>
            
            <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="#home" ><h2 className='Navcolor'>Auth</h2></Navbar.Brand>
            <Nav className="me-auto">
            
            <Link to="/"><h2 className='Navcolor' style={{textDecoration:"none"}}>Register</h2></Link>
            <Link to="/login"><h2  className='Navcolor'>Login </h2></Link>
            <Link to="/data"><h2 className='Navcolor'>Data </h2></Link>
            <Link to="/logout"><h2  className='Navcolor'>Logout </h2></Link>
            </Nav>
            </Container>
            </Navbar>
        </>
    );
}
export default Nav_bar;