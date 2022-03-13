import React from "react";
import {Container} from "react-bootstrap";
import hunt from "../Assets/hunt.png";

function Hunt() {
    return (
        <section>
            <Container fluid className="hunt-section" id="hunt">
                <Container className="hunt-content">
                    <h1 style={{paddingBottom: 25}} className="heading">
                        Coming soon...
                    </h1>
                    <img src={hunt} alt="hunt pic" className="img-fluid" style={{maxWidth : '75%'}}/>
                </Container>
            </Container>
        </section>
    );
}

export default Hunt;
