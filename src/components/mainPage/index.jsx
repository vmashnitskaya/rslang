import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function MainPage({ routes }) {
    const classes = useStyles();

    return (
        <section className="main_page">
            {routes
                .filter((i) => i.url !== '/')
                .map((e) => {
                    return (
                        <Link to={e.url} key={`mpurl_${e.url}`}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={e.img}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {e.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    );
                })}
        </section>
    );
}

MainPage.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        })
    ).isRequired,
};
