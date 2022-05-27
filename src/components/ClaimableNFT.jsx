import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClaimCard from "./ClaimCard";

function ClaimableNFT() {
  return (
    <Container fluid className="team-section">
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={3} className="team-card">
            <ClaimCard
              imgPath=""
              title="9 SOL"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ClaimableNFT;
