import React from 'react';

const WritingForm = ({ formData, handleChange }) => {
    return (
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
};

export default WritingForm;
