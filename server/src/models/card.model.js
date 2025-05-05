import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Card title is required"],
      trim: true,
    },
    frontContent: {
      type: String,
      required: [true, "Front content is required"],
      trim: true,
    },
    backContent: {
      type: String,
      required: [true, "Back content is required"],
      trim: true,
    },
    image: {
      type: String,
      default: null, // URL of the image associated with the card
    },
    tags: {
      type: [String], // Array of tags for better organization
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false, // Whether the card is public or private
    },
    likes: 
    { type: [mongoose.Schema.Types.ObjectId], 
      ref: "User", 
      default: [] 
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;