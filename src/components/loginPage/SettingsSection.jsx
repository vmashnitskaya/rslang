import React, { useState } from 'react';
import { Typography, Dialog, DialogContent } from '@material-ui/core';

const SettingsSection = () => {
    const [isPopUpOpened, setIsPopUpOpened] = useState('');

    const onClick = (event) => {
        setIsPopUpOpened(event.target.dataset.option);
    };

    const handleClose = () => {
        setIsPopUpOpened('');
    };

    return (
        <section className="unique">
            <Typography align="center" color="primary" variant="h5">
                Custom your learning with our tools
            </Typography>
            <div className="settings_vocabulary">
                <div className="settings" onClick={onClick} data-option="settings">
                    <img src="/assets/images/settings.png" alt="settings" data-option="settings" />
                    <Typography color="textSecondary" gutterBottom data-option="settings">
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Settings
                        </Typography>{' '}
                        make the learning more specific
                    </Typography>
                </div>
                <div className="vocabulary" data-option="vocabulary" onClick={onClick}>
                    <img
                        src="/assets/images/vocabulary.png"
                        alt="vocabulary"
                        data-option="vocabulary"
                    />
                    <Typography color="textSecondary" gutterBottom data-option="vocabulary">
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Vocabulary
                        </Typography>{' '}
                        helps to track learned words
                    </Typography>
                </div>
                <div className="statistics" data-option="statistics" onClick={onClick}>
                    <img data-option="statistics" src="/assets/images/angry.jpg" alt="vocabulary" />
                    <Typography data-option="statistics" color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Statistics
                        </Typography>{' '}
                        outlines the progress you achieved
                    </Typography>
                </div>
            </div>
            <Dialog open={Boolean(isPopUpOpened)} onClose={handleClose}>
                <DialogContent>
                    <img
                        src={`/assets/images/${isPopUpOpened}.png`}
                        className="image-options"
                        alt={isPopUpOpened}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default SettingsSection;
