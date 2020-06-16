import React from 'react';
import { Container } from '@material-ui/core';
import Carousel from 'nuka-carousel';
import Member from './member/Member';
import MembersData from './member/MembersData';

const membersArray = Object.keys(MembersData);

const AboutTeam = () => (
    <Container maxWidth="md">
        <Carousel slidesToShow={1}>
            {membersArray.map((el) => (
                <Member member={MembersData[el]} />
            ))}
        </Carousel>
    </Container>
);

export default AboutTeam;
