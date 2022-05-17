import React from "react";
import {Container} from "react-bootstrap";
import gen0_advantage from "../Assets/gen0_advantages.png";
import me_logo from "../Assets/me_logo.png"
import solanart_logo from "../Assets/solanart_logo.png"
import solsea_logo from "../Assets/solsea_logo.png"

function GenZero() {
    return (
        <section>
            <Container fluid className="genzero-section" id="genzero">
                <Container className="genzero-content">
                    <h1 style={{paddingBottom: 15}} className="heading">
                        What is <strong className="main-name"> Gen0 </strong> ?
                    </h1>
                    <p className="genzero-description">
                       This collection of 333 NFTs is the Gen0 and provide to holders an exclusive bonus for the DBH game.<br/>
                        Holding a Gen0 NFT provide you unique channels access, WL, passive incomes and much more !
                    </p>

                    <h4>Official links for <strong className="main-name"> Gen0 </strong></h4>
                    <p style={{fontSize:18}}><a className="genzero-link" href="https://magiceden.io/marketplace/degenbountyhunter">Magic Eden<img src={me_logo} style={{maxWidth:"40px", maxHeight:"40px"}}alt="Magic Eden logo"/></a></p>
                    <p style={{fontSize:18}}><a href="https://solanart.io/collections/degenhuntersol?tab=items">Solanart<img src={solanart_logo} style={{maxWidth:"40px", maxHeight:"40px"}}alt="Magic Eden logo"/></a></p>
                    <p style={{fontSize:18, marginBottom:'50px'}}><a href="https://solsea.io/collection/628262eba48f88b2cbaed6f1">SolSea<img src={solsea_logo} style={{maxWidth:"40px", maxHeight:"40px"}}alt="Magic Eden logo"/></a></p>

                    <img src={gen0_advantage} alt="Gen0 advantages" className="img-fluid" style={{maxWidth: '75%'}}/>
                </Container>
            </Container>
        </section>
    );
}

export default GenZero;
