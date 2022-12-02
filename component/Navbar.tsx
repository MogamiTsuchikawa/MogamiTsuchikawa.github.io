import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        <img
          src="/myicon.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
          style={{ marginRight: "5px", borderRadius: "50%" }}
        />
        mogami.dev
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Link
              href="/"
              style={{
                color: "white",
                marginRight: "10px",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              href="/works"
              style={{
                color: "white",
                marginRight: "10px",
                textDecoration: "none",
              }}
            >
              Works
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
