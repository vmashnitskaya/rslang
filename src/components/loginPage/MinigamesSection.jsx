import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pages from '../router/pages';

const useStyles = makeStyles({
    media: {
        height: 170,
    },
});

const MinigamesSection = () => {
    const classes = useStyles();
    return (
        <section>
            <Typography align="center" color="primary" variant="h5">
                Learning of new words is combined with mini-games. Check them out!
            </Typography>
            <div className="mini-games-part">
                {pages
                    .filter((element) => element.minigame)
                    .map((element) => {
                        return (
                            <Link to={element.url} className="card" key={element.url}>
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
                            </Link>
                        );
                    })}
            </div>
        </section>
    );
};

export default MinigamesSection;
