const express = require('express');
const SkillController = require('../controllers/skillController');

const router = express.Router();

router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getSkillById);

module.exports = router;
