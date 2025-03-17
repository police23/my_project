import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';

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
        duration: 30,
        content: '',
        questions: []
    });

    // In ra để debug
    console.log("Current skillId from params:", skillId);

    // Lấy thông tin kỹ năng từ API
    useEffect(() => {
        const fetchSkillInfo = async () => {
            if (!skillId) {
                navigate('/admin/exams/new');
                return;
            }

            try {
                // Lấy danh sách kỹ năng để lấy tên
                const response = await fetch('http://localhost:4000/api/skills');
                if (response.ok) {
                    const data = await response.json();
                    setSkills(data);

                    // Tìm kỹ năng được chọn
                    const skill = data.find(s => s.skill_id === parseInt(skillId));
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

    // Đảm bảo cập nhật formData.skill_id khi skillId thay đổi
    useEffect(() => {
        if (skillId) {
            setFormData(prev => ({
                ...prev,
                skill_id: parseInt(skillId)
            }));
            console.log("Form data updated with skillId:", skillId);
        }
    }, [skillId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e) => {
        // Xử lý upload file trong thực tế sẽ cần gọi API riêng
        // Đây là xử lý giản lược cho demo
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({ ...formData, audio_url: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            id: Date.now(),
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
            // Trong thực tế, cần gọi API để lưu đề thi
            const response = await fetch('http://localhost:4000/api/tests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thêm đề thi thành công!');
                navigate('/admin/exams'); // Quay lại trang quản lý đề thi
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

    // Render form theo kỹ năng được chọn
    const renderFormBySkill = () => {
        const skillIdNum = parseInt(skillId);

        switch (skillIdNum) {
            case 1: return renderListeningForm();
            case 2: return renderSpeakingForm();
            case 3: return renderReadingForm();
            case 4: return renderWritingForm();
            default: return <p>Vui lòng chọn kỹ năng</p>;
        }
    };

    // Form cho kỹ năng Listening
    const renderListeningForm = () => (
        <>
            <div className="form-group">
                <label>File âm thanh:</label>
                <div className="file-upload">
                    <input type="file" id="audio-file" accept="audio/*" onChange={handleFileUpload} />
                    <label htmlFor="audio-file" className="upload-button">
                        <FaUpload /> Chọn file âm thanh
                    </label>
                    {formData.audio_url && <span className="file-selected">Đã chọn file</span>}
                </div>
            </div>

            <div className="questions-section">
                <h3>Danh sách câu hỏi</h3>
                <button type="button" className="add-question-button" onClick={handleAddQuestion}>
                    + Thêm câu hỏi
                </button>

                {formData.questions.map((question, qIndex) => (
                    <div className="question-item" key={question.id}>
                        <h4>Câu hỏi {qIndex + 1}</h4>
                        <div className="form-group">
                            <label>Nội dung câu hỏi:</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                placeholder="Nhập nội dung câu hỏi"
                            />
                        </div>

                        <div className="options-group">
                            <label>Các lựa chọn:</label>
                            {question.options.map((option, oIndex) => (
                                <div className="option-item" key={oIndex}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        placeholder={`Lựa chọn ${oIndex + 1}`}
                                    />
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name={`correct-answer-${question.id}`}
                                            value={oIndex}
                                            checked={question.correct_answer === oIndex}
                                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                        />
                                        Đáp án đúng
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    // Form cho kỹ năng Speaking
    const renderSpeakingForm = () => (
        <>
            <div className="form-group">
                <label>Nội dung bài nói:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Nhập nội dung bài nói, yêu cầu hoặc chủ đề..."
                    rows={6}
                />
            </div>

            <div className="questions-section">
                <h3>Các câu hỏi phỏng vấn</h3>
                <button type="button" className="add-question-button" onClick={handleAddQuestion}>
                    + Thêm câu hỏi
                </button>

                {formData.questions.map((question, qIndex) => (
                    <div className="question-item" key={question.id}>
                        <h4>Câu hỏi {qIndex + 1}</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                placeholder="Nhập câu hỏi phỏng vấn"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    // Form cho kỹ năng Reading
    const renderReadingForm = () => (
        <>
            <div className="form-group">
                <label>Nội dung bài đọc:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Nhập nội dung văn bản đọc..."
                    rows={8}
                />
            </div>

            <div className="questions-section">
                <h3>Câu hỏi đọc hiểu</h3>
                <button type="button" className="add-question-button" onClick={handleAddQuestion}>
                    + Thêm câu hỏi
                </button>

                {formData.questions.map((question, qIndex) => (
                    <div className="question-item" key={question.id}>
                        <h4>Câu hỏi {qIndex + 1}</h4>
                        <div className="form-group">
                            <label>Nội dung câu hỏi:</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                placeholder="Nhập nội dung câu hỏi"
                            />
                        </div>

                        <div className="options-group">
                            <label>Các lựa chọn:</label>
                            {question.options.map((option, oIndex) => (
                                <div className="option-item" key={oIndex}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        placeholder={`Lựa chọn ${oIndex + 1}`}
                                    />
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name={`correct-answer-${question.id}`}
                                            value={oIndex}
                                            checked={question.correct_answer === oIndex}
                                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                        />
                                        Đáp án đúng
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    // Form cho kỹ năng Writing
    const renderWritingForm = () => (
        <>
            <div className="form-group">
                <label>Đề bài viết:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Nhập đề bài viết, yêu cầu, chủ đề..."
                    rows={6}
                />
            </div>

            <div className="form-group">
                <label>Tiêu chí đánh giá:</label>
                <textarea
                    name="criteria"
                    value={formData.criteria || ''}
                    onChange={handleChange}
                    placeholder="Mô tả tiêu chí đánh giá bài viết..."
                    rows={4}
                />
            </div>

            <div className="form-group">
                <label>Yêu cầu số từ tối thiểu:</label>
                <input
                    type="number"
                    name="min_words"
                    value={formData.min_words || 250}
                    onChange={handleChange}
                    min="50"
                />
            </div>
        </>
    );

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
                                min="1"
                                required
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
