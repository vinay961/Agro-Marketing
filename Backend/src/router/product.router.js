import {Router} from 'express'
import { registerProduct } from '../controller/product.controller.js'
import { verifyJWT } from '../middleware/checkAuth.js'
import { upload } from '../middleware/multer.js'

const router = Router()

router.route('/registerproduct').post(verifyJWT, upload.single("productImage"), registerProduct)

export default router