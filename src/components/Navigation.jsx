import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  WalletMultiButton,
  WalletModalButton,
} from "@solana/wallet-adapter-react-ui";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineFileUnknown,
  AiOutlineThunderbolt,
  AiOutlineDollarCircle,
} from "react-icons/ai";

function Navigation() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container fluid className="containerNavBar">
        <Navbar.Brand href="/" className="d-flex">
          <p style={{ marginTop: "15px" }}>
            <strong className="main-name"> D</strong>egen{" "}
            <strong className="main-name">B</strong>ounty{" "}
            <strong className="main-name">H</strong>unter
          </p>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/hunt"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineThunderbolt style={{ marginBottom: "2px" }} /> Hunt
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/roadmap"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFileUnknown style={{ marginBottom: "2px" }} /> Roadmap
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Whitepaper"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineBook style={{ marginBottom: "2px" }} /> White paper
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/genZero"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineThunderbolt style={{ marginBottom: "2px" }} /> Gen
                <strong className="main-name">0</strong>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/claim"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineDollarCircle style={{ marginBottom: "2px" }} /> Claim
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>
                <WalletMultiButton/>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
