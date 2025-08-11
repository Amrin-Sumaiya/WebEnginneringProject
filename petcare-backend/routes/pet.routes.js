import { Router } from 'express';
import {
  createRescueRequest,
  getPendingRescues,
  approveRescueRequest,
  searchAvailablePets,
  rejectRescueRequest,
  getPetById,
  getPetDetailsForAdmin
} from '../controllers/pet.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

// --- Public Routes ---
router.route('/rescue-request').post(createRescueRequest);
router.route('/search').get(searchAvailablePets);

// --- Admin Only Routes ---
router.route('/pending').get(verifyJWT, getPendingRescues);
router.route('/approve-rescue/:petId').patch(verifyJWT, approveRescueRequest);
router.route('/reject-rescue/:petId').delete(verifyJWT, rejectRescueRequest);
router.route('/:id').get(getPetById);
router.route('/admin/:id').get(verifyJWT, getPetDetailsForAdmin);

export default router;