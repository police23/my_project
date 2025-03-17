import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../AddTest.css';


const AddTestSkillSelect = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/skills');
                if (response.ok) {
                    const data = await response.json();
                    setSkills(data);
                } else {
                    console.error('Failed to fetch skills');
                    setSkills([
                        { skill_id: 1, skill_name: 'Listening' },
                        { skill_id: 2, skill_name: 'Speaking' },
                        { skill_id: 3, skill_name: 'Reading' },
                        { skill_id: 4, skill_name: 'Writing' }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching skills:', error);
                setSkills([
                    { skill_id: 1, skill_name: 'Listening' },
                    { skill_id: 2, skill_name: 'Speaking' },
                    { skill_id: 3, skill_name: 'Reading' },
                    { skill_id: 4, skill_name: 'Writing' }
                ]);
            }
        };

        fetchSkills();
    }, []);

    const getSkillPath = (skillId) => {
        switch (skillId) {
            case 1: return 'listening';
            case 2: return 'speaking';
            case 3: return 'reading';
            case 4: return 'writing';
            default: return '';
        }
    };

    const handleSkillSelect = (skillId) => {
        const skillPath = getSkillPath(skillId);
        navigate(`/admin/exams/new/${skillPath}`);
    };

    return (
        <div className="add-test-container">
            <div className="header-with-back">
                <button className="back-button" onClick={() => navigate('/admin/exams')}>
                    <FaArrowLeft /> Quay lại
                </button>
                <h2>Thêm đề thi mới</h2>
            </div>

            <div className="skill-selection">
                <h3>Chọn kỹ năng</h3>
                <div className="skills-grid">
                    {skills.map(skill => (
                        <div
                            key={skill.skill_id}
                            className="skill-card"
                            onClick={() => handleSkillSelect(skill.skill_id)}
                        >
                            <div className="skill-icon">
                                {skill.skill_id === 1 && '🎧'}
                                {skill.skill_id === 4 && '🗣️'}
                                {skill.skill_id === 2 && '📚'}
                                {skill.skill_id === 3 && '✏️'}
                            </div>
                            <h4>{skill.skill_name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddTestSkillSelect;
