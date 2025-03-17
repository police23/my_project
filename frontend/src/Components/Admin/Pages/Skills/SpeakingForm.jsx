import React from 'react';

const SpeakingForm = ({ formData, handleChange, handleAddQuestion, handleQuestionChange }) => {
    return (
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
};

export default SpeakingForm;
