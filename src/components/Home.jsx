import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import home1 from "../Assets/home_1.png";
import home2 from "../Assets/home_2.png";

import Type from "./Type";

function Home() {
    return (
        <section>
            <Container fluid className="home-section" id="home">
                <Container className="home-content">
                    <Row>
                        <Col md={6} className="home-header">
                            <h1 style={{ paddingBottom: 15 }} className="heading">
                                Hi <strong className="main-name"> Degen bounty hunter </strong><span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
                            </h1>
                            <button onClick={() => alert("test")}>Add</button>


                            <div style={{ padding: 50, textAlign: "left" }}>
                                <Type />
                            </div>
                        </Col>

                        <Col md={6} style={{ paddingBottom: 20 }}>
                            <img src={home1} alt="home first part" className="img-fluid" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="home-header">
                            <h1 style={{ paddingBottom: 15 }} className="heading">

                            </h1>
                        </Col>
                        <Col md={6} style={{ paddingBottom: 20 }}>
                            <img src={home2} alt="home second part" className="img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default Home;
