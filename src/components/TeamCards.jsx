import React from "react";
import Card from "react-bootstrap/Card";

function TeamCards(props) {
  return (
    <Card className="team-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
          <button onClick={() => alert("test")}>Add</button>
      </Card.Body>
    </Card>
  );
}
export default TeamCards;
