import React from 'react';
import SettingsSection from '../loginPage/SettingsSection';
import AboutUsSection from '../loginPage/AboutUsSection';
import IntervalSection from '../loginPage/IntervalSection';
import './AboutProject.scss';

const AboutProject = () => {
    return (
        <section className="project-container">
            <AboutUsSection />
            <IntervalSection />
            <SettingsSection />
        </section>
    );
};

export default AboutProject;
