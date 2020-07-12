import React from 'react';
import { Typography } from '@material-ui/core';

const SettingsSection = () => {
    return (
        <section className="unique">
            <Typography align="center" color="primary" variant="h5">
                Custom your learning
            </Typography>
            <div className="settings_vocabulary">
                <div className="settings">
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="span" color="primary">
                            Settings
                        </Typography>{' '}
                        make the learning process more specific
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="settings" />
                </div>
                <div className="vocabulary">
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="span" color="primary">
                            Vocabulary
                        </Typography>{' '}
                        helps to track your learned words
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="vocabulary" />
                </div>
                <div className="statistics">
                    <Typography color="textSecondary" gutterBottom>
                        {' '}
                        <Typography variant="span" color="primary">
                            Statistics
                        </Typography>{' '}
                        outlines the progress you achieved
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="vocabulary" />
                </div>
            </div>
        </section>
    );
};

export default SettingsSection;
