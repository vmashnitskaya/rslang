const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.play();
};

export default playAudio;
