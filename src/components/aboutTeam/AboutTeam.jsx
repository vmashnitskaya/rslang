import React from 'react';
import { Container } from '@material-ui/core';
import Member from './Member/Member';
import MembersData from './Member/MembersData';

const { ramanenka } = MembersData;
const AboutTeam = () => {
    return (
        <Container maxWidth="md">
            <Member member={ramanenka} />
        </Container>
    );
};

export default AboutTeam;
