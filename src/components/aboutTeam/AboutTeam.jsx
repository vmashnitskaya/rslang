import React from 'react';
import { Container } from '@material-ui/core';
import Carousel from 'nuka-carousel';
import Member from './Member/Member';
import MembersData from './Member/MembersData';
import './aboutTeam.scss';

const membersArray = Object.keys(MembersData);

const AboutTeam = () => (
    <Container className="aboutTeamContainer" maxWidth="md">
        <Carousel slidesToShow={1} enableKeyboardControls wrapAround heightMode="max">
            {membersArray.map((el) => (
                <Member key={MembersData[el]} member={MembersData[el]} />
            ))}
        </Carousel>
    </Container>
);

export default AboutTeam;
