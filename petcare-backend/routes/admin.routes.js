import { Router } from 'express';
import {
  getAdminApplicationById,
  applyForAdminRole,
  approveAdminApplication,
  loginAdmin,
  getPendingAdminApps,
  rejectAdminApplication,
  getAllAdmins,
  removeAdmin
} from '../controllers/admin.controller.js';
import { verifyJWT, isSuperAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// --- Public Routes ---
router.route('/apply').post(applyForAdminRole);
router.route('/login').post(loginAdmin);

// --- SuperAdmin Only Route ---
// This route is first authenticated with verifyJWT, then authorized with isSuperAdmin
router.route('/application/:id').get(verifyJWT, isSuperAdmin, getAdminApplicationById);
router.route('/approve/:adminId').patch(verifyJWT, isSuperAdmin, approveAdminApplication);
router.route('/reject/:adminId').patch(verifyJWT, isSuperAdmin, rejectAdminApplication);
router.route('/all').get(verifyJWT, isSuperAdmin, getAllAdmins);
router.route('/remove/:adminId').delete(verifyJWT, isSuperAdmin, removeAdmin);
//changes For Frontend
// ADD THIS NEW ROUTE
router.route('/pending-applications').get(verifyJWT, isSuperAdmin, getPendingAdminApps);


export default router;