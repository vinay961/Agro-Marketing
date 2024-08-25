import {Router} from 'express'
import { 
    deleteProduct,
    editProduct,
    getProduct,
    getSpecificProduct,
    getUserProduct,
    registerProduct 
} from '../controller/product.controller.js'
import { verifyJWT } from '../middleware/checkAuth.js'
import { upload } from '../middleware/multer.js'

const router = Router()

router.route('/registerproduct').post(verifyJWT, upload.single("productImage"), registerProduct)
router.route('/getuserproduct').get(verifyJWT,getUserProduct)
router.route('/getproduct').get(getProduct)
router.route('/editproduct/:id').put(verifyJWT,upload.single("productImage"), editProduct)
router.route('/deleteproduct/:id').delete(verifyJWT,deleteProduct)
router.route('/getspecificproduct/:id').get(verifyJWT, getSpecificProduct)

export default router
