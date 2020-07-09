/* eslint-disable */
const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    console.log(src);
    audio.play();
};

export default playAudio;
