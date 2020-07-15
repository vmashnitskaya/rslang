import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { getToken, getUserId } from '../router/storage/selectors';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';
import userSettingsApi from '../router/storage/getSettingsRedux/settingsApi';
import settingsActions from '../router/storage/getSettingsRedux/settingsActions';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import './SettingsPage.scss';
import PopUp from './PopUp';

const TooltipIcon = ({ title }) => {
    return (
        <Tooltip title={title} arrow>
            <IconButton>
                <HelpOutlineIcon />
            </IconButton>
        </Tooltip>
    );
};

const SettingsPage = ({ settings, fetchSettings, saveWordsPerDay }) => {
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState('');
    const [popUpText, setPopUpText] = useState('');
    const handleClosePopUp = () => {
        setIsPopUpOpen(false);
    };

    const { optional, wordsPerDay } = settings;
    const [wordsNumber, setWordsNumber] = useState(wordsPerDay);
    const [settingsOptional, setSettingsOptional] = useState({ ...optional });

    const handleSetSettingsOptional = (obj) => {
        setSettingsOptional({ ...settingsOptional, ...obj });
    };

    const handleClickCheckbox = (parameter) => () => {
        const currentValue = settingsOptional[parameter];
        handleSetSettingsOptional({ [parameter]: !currentValue });
    };

    const newSettings = {
        wordsPerDay: wordsNumber,
        optional: {
            ...settingsOptional,
        },
    };

    const saveSettings = async () => {
        saveWordsPerDay();
        await userSettingsApi.putUserSettings(userId, token, newSettings);
        await fetchSettings(userId, token);
        setPopUpTitle('Updated');
        setPopUpText('Settings updated successfully');
        setIsPopUpOpen(true);
    };
    const cancelSettings = () => {
        setWordsNumber(wordsPerDay);
        setSettingsOptional({ ...optional });
        setPopUpTitle('Previous settings');
        setPopUpText('Settings reset to previous');
        setIsPopUpOpen(true);
    };

    return (
        <Container className="setting-page" maxWidth="lg">
            <section className="main-settings">
                <Typography className="main-settings__title" variant="h4">
                    <SettingsIcon fontSize="large" />
                    Settings:
                </Typography>
                <Divider variant="middle" />
                <div className="main-settings__wordsNumber">
                    <Typography id="settings__wordsNumber" variant="h5">
                        Words per day:
                        <TooltipIcon title="The number of words you should learn per day" />
                    </Typography>
                    <Slider
                        value={wordsNumber}
                        aria-labelledby="settings__wordsNumber"
                        valueLabelDisplay="on"
                        step={10}
                        marks
                        min={10}
                        max={100}
                        onChange={(e, value) => setWordsNumber(value)}
                    />
                </div>

                <FormControl component="fieldset">
                    <FormGroup aria-label="position" column="true">
                        <div>
                            <FormControlLabel
                                value="top"
                                control={
                                    <Checkbox
                                        color="secondary"
                                        checked={settingsOptional.isShowTranslate}
                                    />
                                }
                                label="Word translate:"
                                labelPlacement="start"
                                onChange={handleClickCheckbox('isShowTranslate')}
                            />
                            <TooltipIcon title="On/Off translate word" />
                        </div>
                        <div>
                            <FormControlLabel
                                value="top"
                                control={
                                    <Checkbox
                                        color="secondary"
                                        checked={settingsOptional.isShowTextMeaning}
                                    />
                                }
                                label="Text Meaning:"
                                labelPlacement="start"
                                onChange={handleClickCheckbox('isShowTextMeaning')}
                            />
                            <TooltipIcon title="On/Off sentence explaining the meaning of the word" />
                        </div>
                        <div>
                            <FormControlLabel
                                value="top"
                                control={
                                    <Checkbox
                                        color="secondary"
                                        checked={settingsOptional.isShowTextExample}
                                    />
                                }
                                label="Text Example:"
                                labelPlacement="start"
                                onChange={handleClickCheckbox('isShowTextExample')}
                            />
                            <TooltipIcon title="On/Off example sentence with the word" />
                        </div>
                    </FormGroup>
                </FormControl>
            </section>

            <section className="option-settings">
                <Typography className="option-settings__title" variant="h4">
                    <SettingsIcon fontSize="large" />
                    Optional:
                </Typography>
                <Divider variant="middle" />
                <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox
                                color="secondary"
                                checked={settingsOptional.isShowTranscription}
                            />
                        }
                        label="Word Transcription:"
                        labelPlacement="start"
                        onChange={handleClickCheckbox('isShowTranscription')}
                    />
                    <TooltipIcon title="On/Off word transcription" />
                </div>
                <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox color="secondary" checked={settingsOptional.isShowImage} />
                        }
                        label="Word Image:"
                        labelPlacement="start"
                        onChange={handleClickCheckbox('isShowImage')}
                    />
                    <TooltipIcon title="On/Off word image" />
                </div>
                <Typography
                    className="option-settings__title option-settings__subtitle"
                    variant="h4"
                >
                    <SettingsIcon fontSize="large" />
                    Buttons:
                </Typography>
                <Divider variant="middle" />
                <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox color="secondary" checked={settingsOptional.isShowAnswer} />
                        }
                        label="Answer:"
                        labelPlacement="start"
                        onChange={handleClickCheckbox('isShowAnswer')}
                    />
                    <TooltipIcon title="On/Off after click show answer" />
                </div>
                <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox
                                color="secondary"
                                checked={settingsOptional.isShowDifficult}
                            />
                        }
                        label="Difficult:"
                        labelPlacement="start"
                        onChange={handleClickCheckbox('isShowDifficult')}
                    />
                    <TooltipIcon title="On/Off after click adds this word to the categories difficult" />
                </div>
                <div>
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox color="secondary" checked={settingsOptional.isShowDelete} />
                        }
                        label="Delete:"
                        labelPlacement="start"
                        onChange={handleClickCheckbox('isShowDelete')}
                    />
                    <TooltipIcon title="On/Off after click removes this word from the word list" />
                </div>
            </section>
            <section className="buttons-block">
                <Button variant="contained" color="primary" size="large" onClick={cancelSettings}>
                    Cancel
                </Button>
                <Button variant="contained" color="secondary" size="large" onClick={saveSettings}>
                    Save
                </Button>
            </section>
            <PopUp
                isPopUpOpen={isPopUpOpen}
                onPopUpClose={handleClosePopUp}
                title={popUpTitle}
                text={popUpText}
            />
        </Container>
    );
};
const mapStateToProps = (state) => ({
    settings: settingsSelectors.getSettings(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchSettings: (userId, token) => {
        dispatch(settingsActions.fetchSettings(userId, token));
    },
    saveWordsPerDay: () => dispatch(statisticsActions.saveWordsPerDay()),
});

SettingsPage.propTypes = {
    settings: PropTypes.shape({
        wordsPerDay: PropTypes.number,
        optional: PropTypes.objectOf(PropTypes.bool),
    }).isRequired,
    fetchSettings: PropTypes.func.isRequired,
    saveWordsPerDay: PropTypes.func.isRequired,
};
TooltipIcon.propTypes = {
    title: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
