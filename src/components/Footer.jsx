import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {AiOutlineTwitter} from "react-icons/ai";
import { FaDiscord } from 'react-icons/fa';


function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <Container fluid className="footer">
            <Row>
                <Col md="4" className="footer-copywright">
                    <h3>Designed and Developed by Degen Bounty Hunter</h3>
                </Col>
                <Col md="4" className="footer-copywright">
                    <h3>Copyright © {year} DBK</h3>
                </Col>
                <Col md="4" className="footer-body">
                    <ul className="footer-icons">
                        <li className="social-icons">
                            <a
                                href="https://discord.gg/GfJNY2xdRK"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaDiscord />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://twitter.com/DegenHunterSOL"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiOutlineTwitter />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
