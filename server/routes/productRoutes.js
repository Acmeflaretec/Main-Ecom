const { Router } = require('express');
const router = Router();
const { addProduct, getProducts, deleteProduct, getProductById, updateProduct } = require('../controllers/productController');
const { upload } = require('../middlewares/multer');

router.post('/', upload.array('images', 10), addProduct);
router.get('/', getProducts);
router.delete('/:id',deleteProduct);
router.get('/:id', getProductById);
router.patch('/', upload.array('images', 10), updateProduct);

module.exports = router;
