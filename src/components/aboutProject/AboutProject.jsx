import React from 'react';
import SettingsSection from './SettingsSection';
import AboutUsSection from './AboutUsSection';
import IntervalSection from './IntervalSection';
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
