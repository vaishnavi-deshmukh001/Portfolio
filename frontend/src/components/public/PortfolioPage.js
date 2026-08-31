import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Certificates from './Certificates';
import Achievements from './Achievements';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';

const PortfolioPage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [education, setEducation] = useState([]);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          profileRes,
          skillsRes,
          projectsRes,
          experienceRes,
          certificatesRes,
          achievementsRes,
          educationRes,
          contactRes,
        ] = await Promise.all([
          api.get('/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
          api.get('/certificates'),
          api.get('/achievements'),
          api.get('/education'),
          api.get('/contact'),
        ]);

        setProfile(profileRes.data);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperiences(experienceRes.data);
        setCertificates(certificatesRes.data);
        setAchievements(achievementsRes.data);
        setEducation(educationRes.data);
        setContact(contactRes.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <Navbar name={profile?.name} />
      <Hero profile={profile} loading={loading} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Certificates certificates={certificates} />
      <Achievements achievements={achievements} />
      <Education education={education} />
      <Contact contact={contact} />
      <Footer name={profile?.name} />
    </>
  );
};

export default PortfolioPage;
