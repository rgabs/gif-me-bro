import React, { useState} from 'react';

const Gif = ({ gifUrl, stillUrl, title, aspectRatio, width }) => {
    const [currentUrl, setCurrenturl] = useState(gifUrl);
    const [fullScreenStatus, setFullScreenStatus] = useState(false);

    const style = {
        width: fullScreenStatus ? "100%" : width,
        height: fullScreenStatus ? "100%" : width / aspectRatio
    };

    const onImagePress = () => {
        setCurrenturl(currentUrl === gifUrl ? stillUrl : gifUrl);
    }

    const toggleFullScreen = () => {
        setFullScreenStatus(!fullScreenStatus);
        setCurrenturl(gifUrl);
    }

    return (
        <div style={style} className={`image-container ${fullScreenStatus ? "full-screen" : ""}`}>
            <div className="video-controls">
                <span onClick={onImagePress} className={`control-icon ${currentUrl === gifUrl ? "pause" : "play"}`}></span>
                <span onClick={toggleFullScreen} className={`control-icon ${fullScreenStatus ? "collapse" : "expand"}`} ></span>
            </div>
            <img src={currentUrl} alt={title} width="100%" />
            <br />
        </div>
    )
}

export default Gif;