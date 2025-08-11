import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Adoption } from '../models/adoption.model.js';
import { Pet } from '../models/pet.model.js';
import { sendEmail } from '../utils/sendEmail.js';


const applyForAdoption = asyncHandler(async (req, res) => {
  const { petId } = req.params;
  const {
    adopterName,
    adopterEmail,
    adopterPhone,
    adopterAge,
    experienceWithPets,
  } = req.body;

  if (
    [adopterName, adopterEmail, adopterPhone, experienceWithPets].some(
      (field) => typeof field === 'string' && field.trim() === ''
    ) || !adopterAge
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const pet = await Pet.findById(petId);
  if (!pet) {
    throw new ApiError(404, 'Pet not found.');
  }
  if (pet.status !== 'Available') {
    throw new ApiError(400, 'This pet is not currently available for adoption.');
  }

  const adoptionApplication = await Adoption.create({
    petId,
    adopterName,
    adopterEmail,
    adopterPhone,
    adopterAge,
    experienceWithPets,
  });

  if (!adoptionApplication) {
    throw new ApiError(500, 'Failed to submit adoption application.');
  }
  
 
  await Pet.findByIdAndUpdate(petId, {
    $set: { status: 'Pending Adoption' }
  });

  console.log(`[SUCCESS] Adoption ${adoptionApplication._id} created and pet ${pet._id} updated. Preparing to send response.`);
  
  return res.status(201).json({
    success: true,
    message: "Application submitted successfully.",
    data: { id: adoptionApplication._id }
  });
});



const getPendingAdoptions = asyncHandler(async (req, res) => {
    const pendingAdoptions = await Adoption.find({ status: 'Pending' }).populate('petId');
    return res
        .status(200)
        .json(new ApiResponse(200, pendingAdoptions, 'Pending adoption requests fetched successfully.'));
});



const approveAdoptionRequest = asyncHandler(async (req, res) => {
    console.log("--- [DEBUG] Starting Adoption Approval ---");
    const { adoptionId } = req.params;
    console.log("1. Adoption ID:", adoptionId);

    const adoption = await Adoption.findById(adoptionId);
    if (!adoption || adoption.status !== 'Pending') {
        console.error("Approval failed: Adoption not found or not pending.");
        throw new ApiError(404, 'Adoption request not found or already processed.');
    }
    console.log("2. Found adoption application:", adoption._id);

    const pet = await Pet.findById(adoption.petId);
    if (!pet) {
        console.error("Approval failed: Associated pet not found.");
        throw new ApiError(404, 'Associated pet not found.');
    }
    console.log("3. Found associated pet:", pet._id);

    console.log("4. Updating pet status to 'Adopted'...");
    await Pet.findByIdAndUpdate(adoption.petId, { $set: { status: 'Adopted' } });
    console.log("...Pet status updated.");

    console.log("5. Updating adoption status to 'Approved'...");
    adoption.status = 'Approved';
    adoption.reviewedBy = req.admin._id;
    await adoption.save();
    console.log("...Adoption status updated.");

    try {
        console.log("6. Attempting to send approval email...");
        await sendEmail({
            email: adoption.adopterEmail,
            subject: `Your adoption application for ${pet.petName} is approved!`,
            message: `Dear ${adoption.adopterName},\n\nCongratulations! Your application to adopt ${pet.petName} has been approved.\n\nYou can now contact the original rescuer to arrange the handover. Here are their details:\n\nName: ${pet.rescuerName}\nEmail: ${pet.rescuerEmail}\nPhone: ${pet.rescuerPhone}\n\nThank you for giving a pet a forever home!\n\nThe PetCare Team`
        });
        console.log("...Approval email sent successfully.");
    } catch (error) {
        console.error("!!! FAILED TO SEND ADOPTION APPROVAL EMAIL:", error);
    }

    console.log("7. Sending final success response.");
    return res.status(200).json(new ApiResponse(200, adoption, 'Adoption approved successfully!'));
});

const rejectAdoptionRequest = asyncHandler(async (req, res) => {
    console.log("--- [DEBUG] Starting Adoption Rejection ---");
    const { adoptionId } = req.params;
    console.log("1. Adoption ID:", adoptionId);

    const adoption = await Adoption.findById(adoptionId);
    if (!adoption || adoption.status !== 'Pending') {
        console.error("Rejection failed: Adoption not found or not pending.");
        throw new ApiError(404, 'Adoption request not found or already processed.');
    }
    console.log("2. Found adoption application:", adoption._id);

    if (adoption.petId) {
        console.log("3. Found associated pet. Reverting status to 'Available'...");
        await Pet.findByIdAndUpdate(adoption.petId, { $set: { status: 'Available' } });
        console.log("...Pet status reverted.");
    } else {
        console.log("3. Associated pet not found. Nothing to revert.");
    }
    
    console.log("4. Deleting adoption application...");
    await Adoption.findByIdAndDelete(adoptionId);
    console.log("...Adoption application deleted.");

    console.log("5. Sending final success response.");
    return res.status(200).json(new ApiResponse(200, {}, 'Adoption application rejected. The pet is now available again.'));
});


const getAdoptionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const adoption = await Adoption.findById(id).populate('petId'); 
    if (!adoption) {
        throw new ApiError(404, "Adoption application not found");
    }
    return res.status(200).json(new ApiResponse(200, adoption, "Adoption application fetched successfully."));
});


export {
    applyForAdoption,
    getPendingAdoptions,
    approveAdoptionRequest,
    rejectAdoptionRequest,
    getAdoptionById
}
