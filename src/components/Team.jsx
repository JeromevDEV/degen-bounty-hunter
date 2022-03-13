import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamCards from "./TeamCards";

import pp_leader from "../Assets/OK2.png";
import pp_dev from "../Assets/Taiyo2.png";
import pp_community from "../Assets/OK1.png";
import pp_design from "../Assets/OK3.png";

function Team() {
  return (
    <Container fluid className="team-section">
      <Container>
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
              title="Merry  - Community manager"
              description="NFT Sol/Eth enjoyer - 24 yo. Started crypto since 1.5 years, I'm a Frenchy who eats cheese every morning - Here to give you a lot of information about the project and the progress in a good mood - Long live us, the Degen"
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
