import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Pet } from '../models/pet.model.js';
import { sendEmail } from '../utils/sendEmail.js';

/**
 * @description Controller for the public-facing rescue form
 * @route POST /api/v1/pets/rescue-request
 * @access Public
 */
const createRescueRequest = asyncHandler(async (req, res) => {
  // 1. Get data from request body
  const {
    rescuerName,
    rescuerEmail,
    rescuerPhone,
    rescuerAge,
    petName,
    petCategory,
    petBreed,
    gender, // ✨ FIX: Added 'gender' to be read from the request body
    petImage,
    address,
  } = req.body;

  // 2. Validate the incoming data
  if (
    [rescuerName, rescuerEmail, petName, petCategory, petBreed, gender, petImage, address].some(
      (field) => typeof field === 'string' && field.trim() === ""
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // 3. Geocode the address to get coordinates
  let latitude, longitude;
  try {
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: {
            q: address,
            key: process.env.OPENCAGE_API_KEY,
            limit: 1
        }
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        throw new ApiError(400, "Could not find the location. Please provide a more specific address (e.g., 'Street, City').");
    }
    
    const locationData = geoResponse.data.results[0].geometry;
    latitude = locationData.lat;
    longitude = locationData.lng;

  } catch (error) {
    console.error("GEOCODING_ERROR:", error.message);
    throw new ApiError(error.statusCode || 500, error.message || "Error contacting the location service. Please try again later.");
  }

  // 4. Create pet object with geocoded data and save to DB
  const pet = await Pet.create({
    rescuerName,
    rescuerEmail,
    rescuerPhone,
    rescuerAge,
    petName,
    petCategory,
    petBreed,
    gender, // ✨ FIX: 'gender' is now correctly included
    petImage,
    address,
    latitude,
    longitude,
    status: 'Pending Rescue Approval'
  });

  if (!pet) {
    throw new ApiError(500, 'Something went wrong while creating the rescue request');
  }

  // 5. Return response
  return res
    .status(201)
    .json(new ApiResponse(201, pet, 'Rescue request submitted successfully. Waiting for admin approval.'));
});

/**
 * @description ADMIN: Get all pets pending rescue approval
 * @route GET /api/v1/pets/pending
 * @access Admin
 */
const getPendingRescues = asyncHandler(async (req, res) => {
  const pendingPets = await Pet.find({ status: 'Pending Rescue Approval' });
  return res
    .status(200)
    .json(new ApiResponse(200, pendingPets, 'Pending rescue requests fetched successfully.'));
});

/**
 * @description ADMIN: Approve a rescue request
 * @route PATCH /api/v1/pets/approve-rescue/:petId
 * @access Admin
 */
const approveRescueRequest = asyncHandler(async (req, res) => {
  const { petId } = req.params;
  const adminId = req.admin._id;
  const pet = await Pet.findById(petId);

  if (!pet) { throw new ApiError(404, 'Pet not found.'); }
  if (pet.status !== 'Pending Rescue Approval') { throw new ApiError(400, `This pet is already ${pet.status}.`); }

  pet.status = 'Available';
  pet.approvedBy = adminId;
  await pet.save();
  
  try {
      await sendEmail({
          email: pet.rescuerEmail,
          subject: `Congratulations! Your rescue request for ${pet.petName} has been approved.`,
          message: `Hello ${pet.rescuerName},\n\nWe are happy to inform you that your rescued pet, ${pet.petName}, has been approved and is now listed for adoption on PetCare.\n\nThank you for making a difference!\n\nThe PetCare Team`
      });
  } catch (error) {
      console.error("Failed to send approval email to rescuer:", error);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, pet, 'Rescue request approved successfully.'));
});

/**
 * @description PUBLIC: Search for available pets
 * @route GET /api/v1/pets/search
 * @access Public
 */
const searchAvailablePets = asyncHandler(async (req, res) => {
  const { category, breed } = req.query;
  const query = { status: 'Available' };

  if (category) {
    query.petCategory = { $regex: `^${category}$`, $options: 'i' };
  }
  if (breed) {
    query.petBreed = { $regex: breed, $options: 'i' };
  }

  const projection = {
    rescuerName: 0, rescuerEmail: 0, rescuerPhone: 0, rescuerAge: 0,
    approvedBy: 0, updatedAt: 0, __v: 0
  };

  const availablePets = await Pet.find(query, projection);
  return res
    .status(200)
    .json(new ApiResponse(200, availablePets, 'Available pets fetched successfully.'));
});


/**
 * @description ADMIN: Reject a rescue request
 * @route DELETE /api/v1/pets/reject-rescue/:petId
 * @access Admin
 */
const rejectRescueRequest = asyncHandler(async (req, res) => {
    const { petId } = req.params;
    const pet = await Pet.findById(petId);

    if (!pet || pet.status !== 'Pending Rescue Approval') {
        throw new ApiError(404, 'Rescue request not found or already processed.');
    }

    const { rescuerEmail, rescuerName, petName } = pet;
    await Pet.findByIdAndDelete(petId);

    try {
        await sendEmail({
            email: rescuerEmail,
            subject: `Update on your rescue submission for ${petName}`,
            message: `Hello ${rescuerName},\n\nThank you for submitting a rescue request for ${petName}. Unfortunately, we were unable to approve the listing at this time.\n\nThis can happen for a variety of reasons, such as missing information or being outside our operational area.\n\nThe PetCare Team`
        });
    } catch (error) {
        console.error("Failed to send rescue rejection email:", error);
    }

    return res.status(200).json(new ApiResponse(200, {}, 'Rescue request rejected and removed.'));
});

/**
 * @description PUBLIC: Get a single pet's details by its ID
 * @route GET /api/v1/pets/:id
 * @access Public
 */
const getPetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findById(id).select("-rescuerName -rescuerEmail -rescuerPhone -rescuerAge -approvedBy -updatedAt -__v");
    if (!pet) { throw new ApiError(404, "Pet not found"); }
    return res
        .status(200)
        .json(new ApiResponse(200, pet, "Pet details fetched successfully."));
});

/**
 * @description ADMIN: Get full pet details, including rescuer info
 * @route GET /api/v1/pets/admin/:id
 * @access Admin
 */
const getPetDetailsForAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) { throw new ApiError(404, "Pet not found"); }
    return res
        .status(200)
        .json(new ApiResponse(200, pet, "Full pet details fetched successfully."));
});


export {
  createRescueRequest,
  getPendingRescues,
  approveRescueRequest,
  searchAvailablePets,
  rejectRescueRequest,
  getPetById,
  getPetDetailsForAdmin
};
