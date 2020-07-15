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
                        Our{' '}
                        <Typography variant="inherit" color="primary">
                            formula
                        </Typography>{' '}
                        for interval learning.{' '}
                        <Typography variant="inherit" color="primary">
                            X
                        </Typography>{' '}
                        stands for day of previus repetition.{' '}
                        <Typography variant="inherit" color="primary">
                            Y
                        </Typography>{' '}
                        is the day when word needs to be repeated again.
                    </Typography>
                    <img src="/assets/images/formula.svg" alt="difficulty5" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Repeated word will be{' '}
                        <Typography variant="inherit" color="primary">
                            indicated
                        </Typography>{' '}
                        at the top of the card.
                    </Typography>
                    <img src="/assets/images/repeat.png" alt="difficulty2" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Click on{' '}
                        <Typography variant="inherit" color="primary">
                            Delete button
                        </Typography>{' '}
                        so that the word is not repeated again in further trainings.
                    </Typography>
                    <img src="/assets/images/delete.png" alt="difficulty3" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Custom words selection by click on{' '}
                        <Typography variant="inherit" color="primary">
                            New, Mixed or Repeat words.
                        </Typography>{' '}
                    </Typography>
                    <img src="/assets/images/mixed.png" alt="difficulty4" />
                </div>
                <div className="interval_point">
                    <Typography color="textSecondary" gutterBottom>
                        Decide whether the word was{' '}
                        <Typography variant="inherit" color="primary">
                            easy or difficult.
                        </Typography>{' '}
                        Click on{' '}
                        <Typography variant="inherit" color="primary">
                            repeat
                        </Typography>{' '}
                        and the word will be repated in current training.
                    </Typography>
                    <img src="/assets/images/difficult.png" alt="difficulty1" />
                </div>
            </div>
        </section>
    );
};

export default IntervalSection;
