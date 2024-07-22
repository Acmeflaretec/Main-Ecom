const { Router } = require('express');
const router = Router();
const { getCategory, addCategory, deleteCategory,updateCategory,getCategoryById } = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post("/",upload.single('image'), addCategory);
router.patch("/",updateCategory);
router.delete("/",deleteCategory);

module.exports = router;
