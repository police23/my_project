import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import ListeningForm from './Skills/ListeningForm';
import SpeakingForm from './Skills/SpeakingForm';
import ReadingForm from './Skills/ReadingForm';
import WritingForm from './Skills/WritingForm';

const AddTest = () => {
    const navigate = useNavigate();
    const { skillId } = useParams();
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const [formData, setFormData] = useState({
        test_name: '',
        skill_id: skillId || '',
        audio_url: '',
        description: '',
        difficulty: 1,
        duration: 0,
        content: '',
        questions: []
    });

    console.log("Current skillId from params:", skillId);

    const getSkillId = (skillName) => {
        switch (skillName.toLowerCase()) {
            case 'listening': return 1;
            case 'speaking': return 2;
            case 'reading': return 3;
            case 'writing': return 4;
            default: return null;
        }
    };

    // Lấy thông tin kỹ năng từ API
    useEffect(() => {
        const fetchSkillInfo = async () => {
            const id = getSkillId(skillId); // skillId here is actually the skill name from URL
            if (!id) {
                navigate('/admin/exams/new');
                return;
            }

            try {

                const response = await fetch('http://localhost:4000/api/skills');
                if (response.ok) {
                    const data = await response.json();
                    setSkills(data);


                    const skill = data.find(s => s.skill_id === id);
                    if (skill) {
                        setSelectedSkill(skill);
                        setFormData(prev => ({ ...prev, skill_id: skill.skill_id }));
                    } else {
                        navigate('/admin/exams/new');
                    }
                }
            } catch (error) {
                console.error('Error fetching skill info:', error);
                navigate('/admin/exams/new');
            }
        };

        fetchSkillInfo();
    }, [skillId, navigate]);

    useEffect(() => {
        if (skillId) {
            setFormData(prev => ({
                ...prev,
                skill_id: parseInt(skillId)
            }));
            console.log("Form data updated with skillId:", skillId);
        }
    }, [skillId]);

    // Update duration when skill changes
    useEffect(() => {
        if (skillId) {
            const id = getSkillId(skillId);
            let defaultDuration = 60;

            switch (id) {
                case 1:
                    defaultDuration = 32;
                    break;
                case 2:
                    defaultDuration = 0;
                    break;
                case 3:
                case 4:
                    defaultDuration = 60;
                    break;
            }

            setFormData(prev => ({
                ...prev,
                skill_id: id,
                duration: defaultDuration
            }));
        }
    }, [skillId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e) => {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({ ...formData, audio_url: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddQuestion = (section = 1) => {
        const newQuestion = {
            id: Date.now(),
            section: section,
            question: '',
            options: ['', '', '', ''],
            correct_answer: 0
        };

        setFormData({
            ...formData,
            questions: [...formData.questions, newQuestion]
        });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index][field] = value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleCorrectAnswerChange = (questionIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].correct_answer = parseInt(value);
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const response = await fetch('http://localhost:4000/api/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thêm đề thi thành công!');
                navigate('/admin/exams');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Có lỗi xảy ra khi thêm đề thi');
            }
        } catch (error) {
            console.error('Error adding test:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderFormBySkill = () => {
        const skillIdNum = getSkillId(skillId);
        const props = {
            formData,
            handleChange,
            handleFileUpload,
            handleAddQuestion,
            handleQuestionChange,
            handleOptionChange,
            handleCorrectAnswerChange
        };

        switch (skillIdNum) {
            case 1: return <ListeningForm {...props} />;
            case 2: return <SpeakingForm {...props} />;
            case 3: return <ReadingForm {...props} />;
            case 4: return <WritingForm {...props} />;
            default: return <p>Vui lòng chọn kỹ năng</p>;
        }
    };

    return (
        <div className="add-test-container">
            <div className="add-test-header">
                <button className="back-button" onClick={() => navigate('/admin/exams/new')}>
                    <FaArrowLeft /> Quay lại
                </button>
                <h2 className="header-title center-aligned">{`Thêm đề thi ${selectedSkill?.skill_name || ''}`}</h2>
            </div>

            <form className="add-test-form" onSubmit={handleSubmit}>
                <div className="form-section basic-info">
                    <h3>Thông tin cơ bản</h3>
                    <div className="form-group">
                        <label>Tên đề thi:</label>
                        <input
                            type="text"
                            name="test_name"
                            value={formData.test_name}
                            onChange={handleChange}
                            placeholder="Nhập tên đề thi"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mô tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Nhập mô tả đề thi"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Độ khó:</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                <option value={1}>Dễ</option>
                                <option value={2}>Trung bình</option>
                                <option value={3}>Khó</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Thời gian làm bài (phút):</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                viewonly
                                required={parseInt(skillId) !== 2}
                                disabled={parseInt(skillId) === 2}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section skill-specific">
                    <h3>Chi tiết đề thi</h3>
                    {renderFormBySkill()}
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Đang lưu...' : <><FaSave /> Lưu đề thi</>}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/admin/exams')}>
                        Hủy bỏ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTest;
