import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

// Checks for a valid JWT and attaches the user to the request
export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decodedToken?._id).select('-password');

    if (!admin) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});

// Checks if the authenticated user is a SuperAdmin
export const isSuperAdmin = (req, res, next) => {
    if (req.admin?.role !== 'superadmin') {
        return next(new ApiError(403, 'Forbidden: This action requires SuperAdmin privileges.'));
    }
    next();
}