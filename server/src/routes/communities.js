const router = require('express').Router();
const { getCommunity, createCommunity, joinCommunity } = require('../controllers/communities');
const { protect } = require('../middleware/auth');

router.get('/:id', getCommunity);
router.post('/', protect, createCommunity);
router.post('/:id/join', protect, joinCommunity);

module.exports = router;