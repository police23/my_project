const TestModel = require('../models/testModel');

class TestController {
    static async getAllTests(req, res) {
        try {
            const tests = await TestModel.getAllTests();
            res.status(200).json(tests);
        } catch (error) {
            console.error('Error in TestController.getAllTests:', error);
            res.status(500).json({
                message: 'Có lỗi xảy ra khi tải danh sách đề thi'
            });
        }
    }

    static async getTestById(req, res) {
        try {
            const { id } = req.params;
            const test = await TestModel.getTestById(id);

            if (!test) {
                return res.status(404).json({
                    message: 'Không tìm thấy đề thi'
                });
            }

            res.status(200).json(test);
        } catch (error) {
            console.error('Error in TestController.getTestById:', error);
            res.status(500).json({
                message: 'Có lỗi xảy ra khi tải thông tin đề thi'
            });
        }
    }

    static async createTest(req, res) {
        try {
            const testData = req.body;

            if (!testData.test_name || !testData.skill_id) {
                return res.status(400).json({
                    message: 'Tên đề thi và kỹ năng là bắt buộc'
                });
            }

            const testId = await TestModel.create(testData);

            res.status(201).json({
                message: 'Đề thi đã được tạo thành công',
                test_id: testId
            });
        } catch (error) {
            console.error('Error in TestController.createTest:', error);
            res.status(500).json({
                message: 'Có lỗi xảy ra khi tạo đề thi'
            });
        }
    }
}

module.exports = TestController;
