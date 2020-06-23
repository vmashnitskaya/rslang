import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import './MainCard.scss';

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

    const showImage = isShowImage ? (
        <CardMedia component="img" alt={wordTranslate} image={image} />
    ) : null;

    const showTranslate = isShowTranslate ? (
        <div className="card__translate">{wordTranslate}</div>
    ) : null;
    const showTextMeaning = isShowTextMeaning ? (
        <div className="card__textMeaning">{textMeaning}</div>
    ) : null;
    const showTextExample = isShowTextExample ? (
        <div className="card__textExample">{textExample}</div>
    ) : null;
    const showTranscription = isShowTranscription ? (
        <div className="card__wordTranscription">{transcription}</div>
    ) : null;
    const showTextMeaningTranslate = showTextMeaning ? (
        <div className="card__textMeaningTranslate">{textMeaningTranslate}</div>
    ) : null;
    const showTextExampleTranslate = showTextExample ? (
        <div className="card__textMeaningTranslate">{textExampleTranslate}</div>
    ) : null;

    const showAnswer = isShowAnswer ? (
        <Button variant="contained" color="secondary">
            Answer
        </Button>
    ) : null;
    const showDifficult = isShowDifficult ? (
        <Button variant="contained" color="primary">
            Difficult
        </Button>
    ) : null;
    const showDelete = isShowDelete ? (
        <Button variant="contained" color="primary">
            Delete
        </Button>
    ) : null;

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
                {showImage}
                <CardContent className={cardContainerStyle}>
                    {showTranslate}
                    {showTranscription}
                    {showTextMeaning}
                    {showTextMeaningTranslate}
                    {showTextExample}
                    {showTextExampleTranslate}
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
                    {showAnswer}
                    {showDifficult}
                    {showDelete}
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

export default MainCard;
