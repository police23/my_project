import React from 'react';
import { FaUpload } from 'react-icons/fa';

const ListeningForm = ({ formData, handleFileUpload, handleAddQuestion, handleQuestionChange, handleOptionChange, handleCorrectAnswerChange }) => {
    return (
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

            {[1, 2, 3, 4].map((section) => (
                <div key={section} className="listening-section">
                    <h3>Section {section}</h3>
                    <div className="questions-section">
                        <button
                            type="button"
                            className="add-question-button"
                            onClick={() => handleAddQuestion(section)}
                        >
                            + Thêm câu hỏi Section {section}
                        </button>

                        {formData.questions
                            .filter(q => q.section === section)
                            .map((question, qIndex) => (
                                <div className="question-item" key={question.id}>
                                    <h4>Câu hỏi {qIndex + 1}</h4>
                                    <div className="form-group">
                                        <label>Nội dung câu hỏi:</label>
                                        <input
                                            type="text"
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
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
                                                    onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
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
                </div>
            ))}
        </>
    );
};

export default ListeningForm;
