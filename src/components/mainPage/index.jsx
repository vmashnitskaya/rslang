import './styles.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import statisticsActions from '../router/storage/getPutStatisticsRedux/statisticsActions';
import statisticsSelectors from '../router/storage/getPutStatisticsRedux/statisticsSelectors';
import { getToken, getUserId } from '../router/storage/selectors';

import Loading from './Loading';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const MainPage = ({ routes, userId, token, fetchStatistics, loading, error }) => {
    const classes = useStyles();

    useEffect(() => {
        fetchStatistics(userId, token);
    }, [fetchStatistics]);

    return loading || error ? (
        <Loading error={error} />
    ) : (
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
};

const mapDispatchToProps = (dispatch) => ({
    fetchStatistics: (userId, token) => {
        dispatch(statisticsActions.fetchStatistics(userId, token));
    },
});

const mapStateToProps = (state) => ({
    statistics: statisticsSelectors.getStatistics(state),
    loading: statisticsSelectors.getLoading(state),
    error: statisticsSelectors.getError(state),
    userId: getUserId(state),
    token: getToken(state),
});

MainPage.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        })
    ).isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    fetchStatistics: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
