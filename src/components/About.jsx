import React from "react";
import {Container} from "react-bootstrap";
import Team from "./Team";

function About() {
    return (
        <Container fluid className="about-section">
            <Container>
                <h1 className="team-heading">
                    Meet our <strong className="purple"> Team </strong>
                </h1>
                <p style={{ color: "white" }}>
                    Here are the original Degen Bounty Hunters.
                </p>
                <Team/>
            </Container>
        </Container>
    );
}

export default About;