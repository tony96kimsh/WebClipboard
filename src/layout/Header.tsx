import { Nav, Container, Navbar } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";

const Header = () => {
    return(
        <Navbar>
            <Container>
            <Navbar.Brand>
                <h1>Web Clipboard</h1>
            </Navbar.Brand>            
            <Nav.Link href="/login" className="d-flex align-item-center">
                <PersonFill size={25} className="me-2" /> Login
            </Nav.Link>
            </Container>
        </Navbar>
  )
};

export default Header;
