import express from "express";
import {
  createCard,
  getPublicCards,
  getMyCards,
  updateCard,
  deleteCard,
  getCardById,
  toggleLikeCard,
} from "../controllers/cardController.js";
import { verifiedJWT } from "../middleware/auth.middleware.js"; // Ensure this middleware is implemented

const router = express.Router();

// Routes
router.get("/", getPublicCards); // Get all public cards
router.get("/my-cards", verifiedJWT, getMyCards); // Get all cards of the logged-in user
router.get("/:id",  verifiedJWT, getCardById); // Get a single card by ID
router.post("/",  verifiedJWT, createCard); // Create a new card
router.put("/:id",  verifiedJWT, updateCard); // Update a card
router.delete("/:id",  verifiedJWT, deleteCard); // Delete a card
router.post("/:id/like",  verifiedJWT, toggleLikeCard); // Like or unlike a card

export default router;