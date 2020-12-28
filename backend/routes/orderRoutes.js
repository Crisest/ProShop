import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getOrderByID } from '../controllers/orderController.js'

const router = express.Router()


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderByID)


export default router