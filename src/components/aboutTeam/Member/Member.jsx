import React from 'react';
import { Box, Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import './Member.scss';

const Member = ({ member }) => {
    const { name, age, position, location, aboutMe, description, tasks, links } = member;
    return (
        <Box className="memberCard">
            <h1>{name}</h1>
            <div>image</div>
            <div className="memberCard__mainText">Team position: {position}</div>
            <div className="memberCard__mainText">Age: {age}</div>
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
                <Link href={links.telegram} target="_blank" rel="noreferrer">
                    <TelegramIcon fontSize="small" />
                    {links.telegram}
                </Link>
            </div>
            <div>{aboutMe}</div>
            <div>{description}</div>
            <div>
                Completed tasks:
                <ul>
                    {tasks.map((el) => (
                        <li>{el}</li>
                    ))}
                </ul>
            </div>
        </Box>
    );
};

Member.propTypes = {
    member: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.string,
        position: PropTypes.string,
        location: PropTypes.string,
        aboutMe: PropTypes.string,
        description: PropTypes.string,
        tasks: PropTypes.array,
        links: PropTypes.array,
    }).isRequired,
};

export default Member;
