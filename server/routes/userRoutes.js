const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getUser, addToCart, removeFromCart, addToWishlist, removeFromWishlist, updateQty, getUsers } = require('../controllers/userController');

router.use(authorization)
router.get('/',authorization, getUser);
router.get('/getAllUsers', getUsers);
router.patch('/updateQty', updateQty);
router.patch('/addToCart/:id', addToCart);
router.patch('/removeFromCart/:id', removeFromCart);
router.patch('/addToWishlist/:id', addToWishlist);
router.patch('/removeFromWishlist/:id', removeFromWishlist);

module.exports = router;
