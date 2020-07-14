import React from 'react';
import { Typography } from '@material-ui/core';

const IntervalSection = () => {
    return (
        <section className="interval">
            <Typography align="center" color="primary" variant="h5">
                Interval training allows you to have you own unique learning process
            </Typography>
            <div className="interval_points">
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Decide whether the word was{' '}
                        <Typography variant="inherit" color="primary">
                            easy or difficult
                        </Typography>{' '}
                        for you during training.
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="difficulty1" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Click on{' '}
                        <Typography variant="inherit" color="primary">
                            Repeat icon
                        </Typography>{' '}
                        and the word will be repeated in the training.
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="difficulty2" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Click on{' '}
                        <Typography variant="inherit" color="primary">
                            Delete button
                        </Typography>{' '}
                        so that the word is not repeated again in further trainings.
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="difficulty3" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Custom words selection by click on{' '}
                        <Typography variant="inherit" color="primary">
                            New, Mixed or Repeat words.
                        </Typography>{' '}
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="difficulty4" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        If you have made the{' '}
                        <Typography variant="inherit" color="primary">
                            mistake
                        </Typography>{' '}
                        , the word will be repeated in current training.
                    </Typography>
                    <img src="/assets/images/angry.jpg" alt="difficulty5" />
                </div>
            </div>
        </section>
    );
};

export default IntervalSection;
