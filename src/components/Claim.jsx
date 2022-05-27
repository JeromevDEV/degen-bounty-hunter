import React from "react";
import {Container} from "react-bootstrap";
import ClaimableNFT from "./ClaimableNFT";

function Claim() {
    return (
        <section>
        <Container fluid className="claim-section">
            <Container>
                <h1 className="team-heading">
                    You did a good job hunter... now it's time to retire <span className="roadmap" role="img"
                                                                               aria-labelledby="roadmap">💰</span>
                </h1>
                {/*<ClaimableNFT/>*/}
                <p>WIP</p>
            </Container>
        </Container>
        </section>
    );
}

export default Claim;
