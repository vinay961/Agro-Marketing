import {Router} from 'express'
import { 
    changePassword,
    editUser,
    login,
    registerUser,
 } from '../controller/user.controller.js'

 import { verifyJWT } from '../middleware/checkAuth.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/editprofile').put(verifyJWT, editUser)
router.route('/changepassword').post(verifyJWT, changePassword)

export default router