const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
    });
};

module.exports = errorHandler;
