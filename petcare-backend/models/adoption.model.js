import mongoose, { Schema } from 'mongoose';

const adoptionSchema = new Schema(
  {
    petId: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    // Adopter's Information
    adopterName: {
      type: String,
      required: true,
    },
    adopterEmail: {
      type: String,
      required: true,
    },
    adopterPhone: {
      type: String,
      required: true,
    },
    adopterAge: {
      type: Number,
      required: true,
    },
    experienceWithPets: {
      type: String,
      required: true,
    },
    
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    }
  },
  { timestamps: true }
);

export const Adoption = mongoose.model('Adoption', adoptionSchema);