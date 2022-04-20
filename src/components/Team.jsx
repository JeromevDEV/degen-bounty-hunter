import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamCards from "./TeamCards";

import pp_leader from "../Assets/team_lead.png";
import pp_dev from "../Assets/team_front.png";
import pp_community from "../Assets/team_com.png";
import pp_design from "../Assets/team_design.png";
import YoutubePlayer from "./YoutubePlayer";

function Team() {
  return (
    <Container fluid className="team-section">
      <Container>
        <YoutubePlayer/>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={3} className="team-card">
            <TeamCards
              imgPath={pp_leader}
              title="DoubleDCH Sol maximalist - Back end dev / team leader"
              description="32yo, application engineer IRL programming with different language / different type of environment. Passionate about Solana and very active in this environment for 1 year."
            />
          </Col>

          <Col md={3} className="team-card">
            <TeamCards
              imgPath={pp_dev}
              title="ChocooPanda - front-end dev"
              description="24 years old Swiss boy, currently doing my Master degree in computer engineering. True Degen since birth !"
            />
          </Col>

          <Col md={3} className="team-card">
            <TeamCards
              imgPath={pp_community}
              title="Ezode  - Community manager"
              description="Passionate about Marketing and Data Science, I decided to mix the two to work in the field of Data Marketing at Oracle. As soon as I discovered the NFT world, I knew I wanted to evolve and work later in this incredible space. Last thing about me : Im a blackjack Degen and lost too much money at this game !"
            />
          </Col>

          <Col md={3} className="team-card">
            <TeamCards
              imgPath={pp_design}
              title="Bonnie - Illustrator/Designer"
              description="I've always been passionate about drawing and have been drawing digital portraits for 5 years. I'm now an illustrator in the crypto/nft world. Mainly inspired by video games, manga and futuristic media."
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Team;
