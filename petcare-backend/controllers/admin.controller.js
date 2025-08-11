import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'; // Built-in Node.js module

// PUBLIC: User applies to be an admin
const applyForAdminRole = asyncHandler(async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    throw new ApiError(400, 'Full name, email and phone are required');
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(409, 'An admin with this email already exists or application is pending.');
  }

  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(phone)) {
      throw new ApiError(400, "Phone number must contain only digits.");
  }

  const adminApplication = await Admin.create({
    fullName,
    email,
    phone,
    role: 'admin',
    status: 'Pending',
  });

  return res
    .status(201)
    .json(new ApiResponse(201, adminApplication, 'Application submitted successfully.'));
});

// SUPERADMIN ONLY: Approve an admin application
const approveAdminApplication = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);

  if (!admin || admin.status !== 'Pending') {
    throw new ApiError(404, 'Admin application not found or already processed.');
  }

  // Generate a random temporary password
  const tempPassword = crypto.randomBytes(8).toString('hex');
  
  admin.password = tempPassword; // The .pre('save') hook in the model will hash this
  admin.status = 'Approved';
  await admin.save();
  
  // Send email with credentials
  try {
    await sendEmail({
        email: admin.email,
        subject: 'Your PetCare Admin Account is Approved!',
        message: `Hello ${admin.fullName},\n\nYour application to become an admin has been approved. You can now log in using the following credentials:\n\nEmail: ${admin.email}\nPassword: ${tempPassword}\n\nPlease change your password after your first login.\n\nBest regards,\nThe PetCare Team`
    });
  } catch (error) {
    // This is important: if email fails, we should ideally roll back the change or at least log it.
    console.error("Failed to send approval email:", error);
    throw new ApiError(500, "Admin approved, but failed to send credentials email.");
  }

  // Do not send the password back in the response
  const createdAdmin = await Admin.findById(admin._id);

  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, 'Admin approved and credentials sent.'));
});

const rejectAdminApplication = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId);

    if (!admin || admin.status !== 'Pending') {
        throw new ApiError(404, 'Admin application not found or already processed.');
    }

    admin.status = 'Rejected';
    await admin.save();

    // Optional: Notify the applicant via email
    try {
        await sendEmail({
            email: admin.email,
            subject: 'Your PetCare Admin Application Status',
            message: `Hello ${admin.fullName},\n\nAfter careful consideration, we regret to inform you that your application to become an admin has not been approved at this time.\n\nThank you for your interest.\n\nThe PetCare Team`
        });
    } catch (error) {
        console.error("Failed to send rejection email:", error);
    }

    return res.status(200).json(new ApiResponse(200, {}, 'Admin application rejected.'));
});



// PUBLIC: Admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await Admin.findOne({ email, status: 'Approved' }).select("+password");

    if (!admin) {
        throw new ApiError(404, "Invalid credentials or admin not approved");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = admin.generateAccessToken();
    const loggedInAdmin = await Admin.findById(admin._id).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, { admin: loggedInAdmin, accessToken }, "Admin logged In Successfully"));
});


// Changes Made For Frontend
// SUPERADMIN ONLY: Get all pending admin applications
const getPendingAdminApps = asyncHandler(async (req, res) => {
    const pendingAdmins = await Admin.find({ status: 'Pending' }).select('-password');
    return res
        .status(200)
        .json(new ApiResponse(200, pendingAdmins, 'Pending admin applications fetched successfully.'));
});

// SUPERADMIN ONLY: Get all approved admins (excluding other superadmins)
const getAllAdmins = asyncHandler(async (req, res) => {
    // Find all users with the role 'admin'
    const admins = await Admin.find({ role: 'admin', status: 'Approved' }).select('-password');
    return res
        .status(200)
        .json(new ApiResponse(200, admins, 'All admins fetched successfully.'));
});

// SUPERADMIN ONLY: Remove an admin
const removeAdmin = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    // To prevent a superadmin from deleting themselves by mistake
    if (req.admin._id.toString() === adminId) {
        throw new ApiError(400, "You cannot remove yourself.");
    }

    const adminToDelete = await Admin.findById(adminId);
    if (!adminToDelete) {
        throw new ApiError(404, "Admin not found.");
    }
    if (adminToDelete.role === 'superadmin') {
        throw new ApiError(403, "Cannot remove another SuperAdmin.");
    }

    await Admin.findByIdAndDelete(adminId);

    return res.status(200).json(new ApiResponse(200, {}, 'Admin removed successfully.'));
});

const getAdminApplicationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const adminApp = await Admin.findById(id).select("-password");
    if (!adminApp) {
        throw new ApiError(404, "Admin application not found");
    }
    return res.status(200).json(new ApiResponse(200, adminApp, "Admin application fetched successfully."));
});



export {
  applyForAdminRole,
  approveAdminApplication,
  loginAdmin,
  getPendingAdminApps,
  rejectAdminApplication,
  removeAdmin,
  getAllAdmins,
  getAdminApplicationById
};