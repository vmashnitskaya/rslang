import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import minigames from './minigames';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {},
    },
    media: {
        height: 170,
    },
}));

const MinigamesSection = () => {
    const classes = useStyles();
    return (
        <section>
            <Typography align="center" color="primary" variant="h5">
                Learning of new words is combined with mini-games. Check them out!
            </Typography>
            <div className="mini-games-part">
                {minigames
                    .filter((element) => element.minigame)
                    .map((element) => {
                        return (
                            <div className="card">
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={element.img}
                                            title={element.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {element.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {element.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default MinigamesSection;
