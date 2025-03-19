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

    useEffect(() => {
        console.log(`Current skillId from params: ${skillId}`); // Debug
        const fetchSkillInfo = async () => {
            // skillId từ URL bây giờ là ID thực, không cần mapping
            const id = parseInt(skillId);

            try {
                const response = await fetch('http://localhost:4000/api/skills');
                if (response.ok) {
                    const data = await response.json();
                    const skill = data.find(s => s.skill_id === id);
                    if (skill) {
                        setSelectedSkill(skill);
                        setFormData(prev => ({ ...prev, skill_id: id }));
                    } else {
                        navigate('/admin/exams/new');
                    }
                } else {
                    console.error('Error fetching skill info');
                }
            } catch (error) {
                console.error('Error fetching skill info:', error);
            }
        };

        fetchSkillInfo();
    }, [skillId, navigate]);

    useEffect(() => {
        if (skillId) {
            const id = parseInt(skillId);
            let defaultDuration = 60;

            switch (id) {
                case 1: // Listening
                    defaultDuration = 32;
                    break;
                case 2: // Speaking 
                    defaultDuration = 0;
                    break;
                case 3: // Reading
                case 4: // Writing
                    defaultDuration = 60;
                    break;
                default:
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
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderFormBySkill = () => {
        const id = parseInt(skillId);
        const props = {
            formData,
            handleChange,
            handleFileUpload,
            handleAddQuestion,
            handleQuestionChange,
            handleOptionChange,
            handleCorrectAnswerChange
        };

        switch (id) {
            case 1: return <ListeningForm {...props} />; // Listening
            case 2: return <ReadingForm {...props} />; // Reading (was SpeakingForm)
            case 3: return <WritingForm {...props} />; // Writing (was ReadingForm)
            case 4: return <SpeakingForm {...props} />; // Speaking (was WritingForm)
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
                                readOnly
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
