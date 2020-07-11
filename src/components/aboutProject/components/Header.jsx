import React from 'react';
import ReactPlayer from 'react-player/youtube';

const HeaderSlogan = () => {
    return (
        <div>
            <p className="slogan">
                RSLang - онлайн-сервис для изучения и практики английского языка которым пользуются
                по всему миру
            </p>
        </div>
    );
};

const VideoBox = () => {
    return (
        <ReactPlayer
            url="https://www.youtube.com/embed/5woDAZ9Pjw8"
            controls
            width="40%"
            hight="60%"
        />
    );
};

export default function Header() {
    return (
        <div className="headerBox">
            <HeaderSlogan />
            <VideoBox />
        </div>
    );
}
