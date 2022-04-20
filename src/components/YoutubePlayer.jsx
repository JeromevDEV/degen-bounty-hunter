import React from "react";


function YoutubePlayer() {
    return (
        <div>
            <iframe width="1120" height="630" src="https://www.youtube.com/embed/uqv-pDtKHSE"
    title="YouTube video player" frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen/>
        </div>
    );
}

export default YoutubePlayer;
