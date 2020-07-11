import React from 'react';
import Carousel from 'nuka-carousel';
import '../style.css';

const imgInCarousel = [
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://ongame.pro/wp-content/uploads/2019/01/1546546565338249.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
    'https://sun9-65.userapi.com/c849420/v849420202/15cf5f/9aSA92sHWc8.jpg',
];

const sliderShow = 3;

function createSlide() {
    const arrImg = [];
    for (let i = 0; i <= imgInCarousel.length - 1; i += 1) {
        const index = `${i}`;
        const prefix1 = 'ab0';
        const prefix2 = 'cd0';
        const postfix1 = `ab`;
        const postfix2 = `cd`;
        const key1 = index + postfix1;
        const key2 = index + postfix2;
        const slide = (
            <div key={prefix1}>
                <div key={prefix1 + key1} className="grandChild">
                    <img key={key1} src={imgInCarousel[i]} alt="" className="slide" width="400px" />
                </div>
                <div key={prefix2 + key2} className="grandChild">
                    <img
                        key={key2}
                        src={imgInCarousel[i + 1]}
                        alt=""
                        className="slide"
                        width="400px"
                    />
                </div>
            </div>
        );
        i += 1;
        arrImg.push(slide);
    }
    return (
        <Carousel
            className="carouselScreenshots"
            autoplay
            height="46em"
            slidesToShow={sliderShow}
            wrapAround
        >
            {arrImg}
        </Carousel>
    );
}

export default function CarouselScreenshots() {
    return createSlide();
}
