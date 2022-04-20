import React from "react";
import YouTube from 'react-youtube';


function YoutubePlayer() {
    return (
        <div className="containerYtb">
            <iframe className="responsive-iframe" src="https://www.youtube.com/embed/uqv-pDtKHSE"/>
        </div>

    );
}

export default YoutubePlayer;
