import express from 'express'
import { 
    authUser, 
    deleteUser, 
    getUserProfile, 
    getUsers, 
    registerUser, 
    updateUserProfile 
} from '../controllers/userController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, isAdmin, getUsers)
router.post('/login', authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id').delete(protect, isAdmin, deleteUser)



export default router