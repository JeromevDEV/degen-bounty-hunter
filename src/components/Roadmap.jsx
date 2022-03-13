import React from "react";
import {Container} from "react-bootstrap";
import roadmap from "../Assets/roadmap.png";

function Roadmap() {
    return (
        <section>
            <Container fluid className="roadmap-section" id="roadmap">
                <Container className="roadmap-content">
                    <h1 style={{paddingBottom: 15}} className="heading">
                        We are <strong className="main-name"> Degen </strong> but we follow the roadmap ! <span className="roadmap" role="img" aria-labelledby="roadmap">🗺️</span>
                    </h1>
                    <img src={roadmap} alt="roadmap pic" className="img-fluid" style={{maxWidth : '50%'}}/>
                </Container>
            </Container>
        </section>
    );
}

export default Roadmap;
