import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './MainCard.scss';

const ShowImage = ({ isShowImage, image }) => {
    if (isShowImage) {
        return <CardMedia component="img" alt="img" image={image} />;
    }
    return null;
};

const ShowTranslate = ({ isShowTranslate, wordTranslate }) => {
    if (isShowTranslate) {
        return <div className="card__translate">{wordTranslate}</div>;
    }
    return null;
};

const ShowTranscription = ({ isShowTranscription, transcription }) => {
    if (isShowTranscription) {
        return <div className="card__wordTranscription">{transcription}</div>;
    }
    return null;
};

const ShowTextMeaning = ({ isShowTextMeaning, textMeaning, textMeaningTranslate }) => {
    if (isShowTextMeaning) {
        return (
            <>
                <div className="card__textMeaning">{textMeaning}</div>
                <div className="card__textMeaningTranslate">{textMeaningTranslate}</div>
            </>
        );
    }
    return null;
};

const ShowTextExample = ({ isShowTextExample, textExample, textExampleTranslate }) => {
    if (isShowTextExample) {
        return (
            <>
                <div className="card__textExample">{textExample}</div>
                <div className="card__textMeaningTranslate">{textExampleTranslate}</div>
            </>
        );
    }
    return null;
};

const ShowAnswer = ({ isShowAnswer }) => {
    if (isShowAnswer) {
        return (
            <Button variant="contained" color="secondary">
                Answer
            </Button>
        );
    }
    return null;
};

const ShowDifficult = ({ isShowDifficult }) => {
    if (isShowDifficult) {
        return (
            <Button variant="contained" color="primary">
                Difficult
            </Button>
        );
    }
    return null;
};

const ShowDelete = ({ isShowDelete }) => {
    if (isShowDelete) {
        return (
            <Button variant="contained" color="primary">
                Delete
            </Button>
        );
    }
    return null;
};

const MainCard = ({ wordObj, settings }) => {
    const {
        id,
        word,
        image,
        audio,
        audioMeaning,
        audioExample,
        textMeaning,
        textExample,
        transcription,
        wordTranslate,
        textMeaningTranslate,
        textExampleTranslate,
    } = wordObj;

    const {
        isShowImage,
        isShowTranslate,
        isShowTextMeaning,
        isShowTextExample,
        isShowTranscription,
        isShowAnswer,
        isShowDifficult,
        isShowDelete,
    } = settings;

    const styleV1 = isShowImage && (isShowAnswer || isShowDifficult || isShowDelete);
    const styleV2 = isShowImage || isShowAnswer || isShowDifficult || isShowDelete;

    let cardStyle;
    let cardContainerStyle;
    if (styleV1) {
        cardStyle = 'card card_v1';
        cardContainerStyle = 'card__container card__container_v1';
    } else if (styleV2) {
        cardStyle = 'card card_v2';
        cardContainerStyle = 'card__container card__container_v2';
    } else {
        cardStyle = 'card card_v3';
        cardContainerStyle = 'card__container card__container_v3';
    }
    return (
        <div className="card__wrapper">
            <Card className={cardStyle}>
                <ShowImage isShowImage={isShowImage} image={image} />
                <CardContent className={cardContainerStyle}>
                    <ShowTranslate
                        isShowTranslate={isShowTranslate}
                        wordTranslate={wordTranslate}
                    />

                    <ShowTranscription
                        isShowTranscription={isShowTranscription}
                        transcription={transcription}
                    />

                    <ShowTextMeaning
                        isShowTextMeaning={isShowTextMeaning}
                        textMeaning={textMeaning}
                        textMeaningTranslate={textMeaningTranslate}
                    />

                    <ShowTextExample
                        isShowTextExample={isShowTextExample}
                        textExample={textExample}
                        textExampleTranslate={textExampleTranslate}
                    />

                    <CardMedia component="audio" src={audio} />
                    <CardMedia component="audio" src={audioMeaning} />
                    <CardMedia component="audio" src={audioExample} />

                    <div className="card__input">
                        <Input autoFocus key={id} value={word} />
                    </div>
                    <Button variant="contained" color="secondary">
                        Next Card
                    </Button>
                </CardContent>
                <CardActions disableSpacing className="card__buttons">
                    <ShowAnswer isShowAnswer={isShowAnswer} />
                    <ShowDifficult isShowDifficult={isShowDifficult} />
                    <ShowDelete isShowDelete={isShowDelete} />
                </CardActions>
            </Card>
        </div>
    );
};

MainCard.propTypes = {
    wordObj: PropTypes.shape({
        id: PropTypes.string,
        word: PropTypes.string,
        image: PropTypes.string,
        audio: PropTypes.string,
        audioMeaning: PropTypes.string,
        audioExample: PropTypes.string,
        textMeaning: PropTypes.string,
        textExample: PropTypes.string,
        transcription: PropTypes.string,
        wordTranslate: PropTypes.string,
        textMeaningTranslate: PropTypes.string,
        textExampleTranslate: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        isShowImage: PropTypes.bool,
        isShowTranslate: PropTypes.bool,
        isShowTextMeaning: PropTypes.bool,
        isShowTextExample: PropTypes.bool,
        isShowTranscription: PropTypes.bool,
        isShowAnswer: PropTypes.bool,
        isShowDifficult: PropTypes.bool,
        isShowDelete: PropTypes.bool,
    }).isRequired,
};

ShowImage.propTypes = {
    image: PropTypes.string.isRequired,
    isShowImage: PropTypes.bool,
};
ShowImage.defaultProps = {
    isShowImage: false,
};

ShowTranslate.propTypes = {
    wordTranslate: PropTypes.string.isRequired,
    isShowTranslate: PropTypes.bool,
};
ShowTranslate.defaultProps = {
    isShowTranslate: false,
};

ShowTranscription.propTypes = {
    transcription: PropTypes.string.isRequired,
    isShowTranscription: PropTypes.bool,
};
ShowTranscription.defaultProps = {
    isShowTranscription: false,
};

ShowTextMeaning.propTypes = {
    textMeaning: PropTypes.string.isRequired,
    textMeaningTranslate: PropTypes.string.isRequired,
    isShowTextMeaning: PropTypes.bool,
};
ShowTextMeaning.defaultProps = {
    isShowTextMeaning: false,
};

ShowTextExample.propTypes = {
    textExample: PropTypes.string.isRequired,
    textExampleTranslate: PropTypes.string.isRequired,
    isShowTextExample: PropTypes.bool,
};
ShowTextExample.defaultProps = {
    isShowTextExample: false,
};

ShowAnswer.propTypes = {
    isShowAnswer: PropTypes.bool,
};
ShowAnswer.defaultProps = {
    isShowAnswer: false,
};

ShowDifficult.propTypes = {
    isShowDifficult: PropTypes.bool,
};
ShowDifficult.defaultProps = {
    isShowDifficult: false,
};

ShowDelete.propTypes = {
    isShowDelete: PropTypes.bool,
};
ShowDelete.defaultProps = {
    isShowDelete: false,
};
export default MainCard;
