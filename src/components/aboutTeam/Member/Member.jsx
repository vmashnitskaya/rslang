import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import './Member.scss';

const preventDefault = (event) => event.preventDefault();
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

const Member = ({ member }) => {
    const classes = useStyles();
    const { name, image, position, location, tasks, links } = member;
    return (
        <Box className="memberCard">
            <h1>{name}</h1>
            <Avatar alt={name} src={image} className={classes.large} />
            <div className="memberCard__mainText">Team position: {position}</div>
            <div className="memberCard__mainText">Location: {location}</div>
            <div className="memberCard__mainText">Contacts:</div>
            <div className="memberLinks">
                <Link href={`mailto:${links.email}`} target="_blank" rel="noreferrer">
                    <EmailIcon fontSize="small" />
                    E-mail
                </Link>
                <Link href={links.git} target="_blank" rel="noreferrer">
                    <GitHubIcon fontSize="small" />
                    GitHub
                </Link>
                <Link href={links.telegram} onClick={preventDefault} rel="noreferrer">
                    <TelegramIcon fontSize="small" />
                    {links.telegram}
                </Link>
            </div>
            <div>
                Completed tasks:
                <ul>
                    {tasks.map((el) => (
                        <li key={el}>{el}</li>
                    ))}
                </ul>
            </div>
        </Box>
    );
};

Member.propTypes = {
    member: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        position: PropTypes.string,
        location: PropTypes.string,
        tasks: PropTypes.array,
        links: PropTypes.shape({
            email: PropTypes.string,
            git: PropTypes.string,
            telegram: PropTypes.string,
        }),
    }).isRequired,
};

export default Member;
