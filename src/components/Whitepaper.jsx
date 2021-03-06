import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import wp_1 from "../Assets/wp_1.png";
import wp_2 from "../Assets/wp_2.png";
import wp_3 from "../Assets/wp_3.png";
import wp_4 from "../Assets/wp_4.png";
import wp_5 from "../Assets/wp_5.png";
import YoutubePlayer from "./YoutubePlayer";

function Whitepaper() {
    return (
            <Container fluid className="whitepaper-section" id="whitepaper">
                <Container className="whitepaper-content">
                    <h1 style={{paddingBottom: 15}} className="heading">
                        You asked for the <strong className="main-name"> White-paper </strong> ?
                    </h1>

                    <YoutubePlayer/>

                    <Row>
                        <Col md={12}>
                            <img src={wp_1} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_2} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_3} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_4} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_5} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>

                </Container>
            </Container>
);
}

export default Whitepaper;
