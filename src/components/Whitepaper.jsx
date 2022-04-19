import React, { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import wp_1 from "../Assets/wp_1.png";
import wp_2 from "../Assets/wp_2.png";
import wp_3 from "../Assets/wp_3.png";
import wp_4 from "../Assets/wp_4.png";
import wp_5 from "../Assets/wp_5.png";
import YouTube from 'react-youtube'

var cElement = null;

function Pause(props) {
    return <button onClick={props.handleClick}>Pause</button>;
}

function Video(props) {
    console.log(props);
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    useEffect(() => {
        if (cElement) {
            props.isPaused
                ? cElement.target.pauseVideo()
                : cElement.target.playVideo();
        }
    }, [props.isPaused]);

    const _onReady = event => {
        console.log("_onReady");
        cElement = event;
        // event.target.playVideo();
    };

    const _onStateChange = event => {
        // event.target.pauseVideo()
    };
    return (
        <YouTube
            videoId={"21X5lGlDOfg"}
            opts={opts}
            onReady={_onReady}
            onStateChange={_onStateChange}
        />
    );
}

function Whitepaper() {
    const [isPaused, setIsPaused] = useState(false);

    return (<section>
            <Container fluid className="whitepaper-section" id="whitepaper">
                <Container className="whitepaper-content">
                    <h1 style={{paddingBottom: 15}} className="heading">
                        You asked for the <strong className="main-name"> White-paper </strong> ?
                    </h1>

                    <Video isPaused={isPaused} />

                    <Row>
                        <Col md={12}>
                            <img src={wp_1} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_2} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_3} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_4} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <img src={wp_5} alt="roadmap pic" className="img-fluid" style={{maxWidth: '50%'}}/>
                        </Col>
                    </Row>

                </Container>
            </Container>
        </section>);
}

export default Whitepaper;
