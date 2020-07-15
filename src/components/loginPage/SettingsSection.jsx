import React from 'react';
import { Typography } from '@material-ui/core';

const SettingsSection = () => {
    return (
        <section className="unique">
            <Typography align="center" color="primary" variant="h5">
                Custom your learning with our tools
            </Typography>
            <div className="settings_vocabulary">
                <div className="settings">
                    <img src="/assets/images/angry.jpg" alt="settings" />
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Settings
                        </Typography>{' '}
                        make the learning more specific
                    </Typography>
                </div>
                <div className="vocabulary">
                    <img src="/assets/images/angry.jpg" alt="vocabulary" />
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Vocabulary
                        </Typography>{' '}
                        helps to track learned words
                    </Typography>
                </div>
                <div className="statistics">
                    <img src="/assets/images/angry.jpg" alt="vocabulary" />
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="inherit" color="primary">
                            Statistics
                        </Typography>{' '}
                        outlines the progress you achieved
                    </Typography>
                </div>
            </div>
        </section>
    );
};

export default SettingsSection;
