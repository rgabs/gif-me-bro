import React, { useState} from 'react';
import ImageZoom from 'react-medium-image-zoom'

const Gif = ({ gifUrl, stillUrl, title, aspectRatio, width }) => {
    const [currentUrl, setCurrenturl] = useState(gifUrl);

    const style = {
        width: width,
        height: width / aspectRatio
    };

    const onImagePress = () => {
        setCurrenturl(currentUrl === gifUrl ? stillUrl : gifUrl);
    };

    return (
        <div style={style} className={`image-container`}>
            <div className="video-controls">
                <span onClick={onImagePress} className={`control-icon ${currentUrl === gifUrl ? "pause" : "play"}`}></span>
            </div>
            <ImageZoom image={{ src: currentUrl }} alt={title} defaultStyles={{image: {width: '100%'}}}/>
            <br />
        </div>
    )
}

export default Gif;