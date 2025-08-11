import mongoose, { Schema } from 'mongoose';

const petSchema = new Schema(
  {
    // Rescuer's Information
    rescuerName: {
      type: String,
      required: true,
      trim: true,
    },
    rescuerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    rescuerPhone: {
      type: String,
      required: true,
    },
    rescuerAge: {
      type: Number,
      required: true,
    },

    // Pet's Information
    petName: {
      type: String,
      required: true,
      trim: true,
    },
    petCategory: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat', 'Bird', 'Other'], // Enforces specific categories
    },
    petBreed: {
      type: String,
      required: true,
      trim: true,
    },
    petImage: {
      type: String, // URL to the image (e.g., from Cloudinary)
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    // location: {
    //   type: String, // For simplicity, we'll store a string address
    //   required: true,
    // },
    //Changes Made for Frontend
    // --- LOCATION CHANGE START ---
    address: { // We'll store the original address string
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    
    // System-managed fields
    status: {
      type: String,
      enum: ['Pending Rescue Approval', 'Available', 'Pending Adoption', 'Adopted'],
      default: 'Pending Rescue Approval',
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    }
  },
  { timestamps: true }
);

export const Pet = mongoose.model('Pet', petSchema);