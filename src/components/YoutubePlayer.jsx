import React from "react";


function YoutubePlayer() {
    return (
        <div>
            <iframe
                src="https://youtu.be/uqv-pDtKHSE"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                width="100%"
                height="100%"
            />
        </div>
    );
}

export default YoutubePlayer;
