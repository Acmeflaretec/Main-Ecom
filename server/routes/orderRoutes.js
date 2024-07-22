const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getOrders, getUserOrders, createOrder, updateOrder } = require('../controllers/orderController');

router.get('/', authorization, getOrders);
router.get('/:id', authorization, getUserOrders);
router.post('/', authorization, createOrder);
router.patch('/',authorization, updateOrder);

module.exports = router;
