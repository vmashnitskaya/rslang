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
import settingsActions from '../router/storage/getSettingsRedux/settingsActions';
import settingsSelectors from '../router/storage/getSettingsRedux/settingsSelectors';

import Loading from './Loading';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const MainPage = ({
    routes,
    userId,
    token,
    fetchStatistics,
    loading,
    error,
    settingsError,
    settingsLoading,
    fetchSettings,
}) => {
    const classes = useStyles();

    useEffect(() => {
        fetchStatistics(userId, token);
    }, [fetchStatistics]);

    useEffect(() => {
        fetchSettings(userId, token);
    }, [fetchSettings]);

    return loading || error || settingsError || settingsLoading ? (
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
    fetchSettings: (userId, token) => {
        dispatch(settingsActions.fetchSettings(userId, token));
    },
});

const mapStateToProps = (state) => ({
    statistics: statisticsSelectors.getStatistics(state),
    loading: statisticsSelectors.getLoading(state),
    error: statisticsSelectors.getError(state),
    settingsError: settingsSelectors.getError(state),
    settingsLoading: settingsSelectors.getLoading(state),
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
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    settingsError: PropTypes.string.isRequired,
    settingsLoading: PropTypes.bool.isRequired,
    fetchSettings: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
