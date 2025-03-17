import React from 'react';

const ReadingForm = ({ formData, handleChange, handleAddQuestion, handleQuestionChange, handleOptionChange, handleCorrectAnswerChange }) => {
    return (
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
                                            onChange={() => handleCorrectAnswerChange(question.id, oIndex)}
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
};

export default ReadingForm;
