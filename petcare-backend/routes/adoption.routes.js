import { Router } from 'express';
import {
  applyForAdoption,
  getPendingAdoptions,
  approveAdoptionRequest,
  rejectAdoptionRequest,
  getAdoptionById
} from '../controllers/adoption.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// --- Public Route ---
router.route('/apply/:petId').post(applyForAdoption);

// --- Admin Only Routes ---
router.route('/pending').get(verifyJWT, getPendingAdoptions);
router.route('/approve/:adoptionId').patch(verifyJWT, approveAdoptionRequest);
router.route('/reject/:adoptionId').delete(verifyJWT, rejectAdoptionRequest);
router.route('/:id').get(verifyJWT, getAdoptionById);

export default router;