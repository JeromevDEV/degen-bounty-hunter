import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
    return (
        <Card className="quote-card-view">
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p style={{ textAlign: "justify" }}>
                        Hi Everyone, we are <span className="purple">DEGEN BOUNTY HUNTER </span>.
                        <br />
                        <br />
                        Here are some information about our project :
                    </p>
                    <ul>
                        <li className="about-activity">
                            <ImPointRight /> Supply: 3333
                        </li>
                        <li className="about-activity">
                            <ImPointRight /> Price: 1 SOL
                        </li>
                        <li className="about-activity">
                            <ImPointRight /> Visual: Dice
                        </li>
                    </ul>

                    <p style={{ marginBlockEnd: 0, color: "rgb(155 126 172)" }}>
                        "Welcome back degen... take a seat"{" "}
                    </p>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default AboutCard;
