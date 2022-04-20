import React from "react";


function YoutubePlayer() {
    return (
        <div>
            <button onClick={() => alert("test")}>Add</button>
            <iframe
                src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
            />
        </div>
    );
}

export default YoutubePlayer;
