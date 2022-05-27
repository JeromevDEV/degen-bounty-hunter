import React from "react";
import Card from "react-bootstrap/Card";

function ClaimCard(props) {
  return (
    <Card className="team-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
       <button className="btn-primary">Claim bounty</button>
      </Card.Body>
    </Card>
  );
}
export default ClaimCard;
