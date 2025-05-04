import Card from "../models/card.model.js";
import {asynchandler} from "../utils/asynchandler.js";

// Create a new card (only for creators)
export const createCard = asynchandler(async (req, res) => {
  const { title, frontContent,backContent,  image, tags, isPublic } = req.body;

  if (!title || !frontContent || !backContent) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  const newCard = await Card.create({
    title,
    frontContent,
    backContent,
    image: image || null,
    tags: tags || [],
    userId: req.user._id, // Assuming `req.user` contains the authenticated user's info
    isPublic: isPublic || false,
  });

  return res.status(201).json({ message: "Card created successfully.", card: newCard });
});

// Get all public cards (for users)
export const getPublicCards = asynchandler(async (req, res) => {
  const cards = await Card.find({ isPublic: true }).populate("userId", "username fullname");
  return res.status(200).json(cards);
});

// Get all cards of the logged-in creator
export const getMyCards = asynchandler(async (req, res) => {
  const myCards = await Card.find({ userId: req.user._id });
  return res.status(200).json(myCards);
});

// Update a card (only for the creator)
export const updateCard = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { title, frontContent, backContent , image, tags, isPublic } = req.body;

  const card = await Card.findById(id);

  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  // Check if the logged-in user is the creator of the card
  if (card.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to update this card." });
  }

  card.title = title || card.title;
  card.frontContent = frontContent || card.frontContent;
  card.backContent = backContent || card.backContent;
  card.image = image || card.image;
  card.tags = tags || card.tags;
  card.isPublic = isPublic !== undefined ? isPublic : card.isPublic;

  const updatedCard = await card.save();
  return res.status(200).json({ message: "Card updated successfully.", card: updatedCard });
});

// Delete a card (only for the creator)
export const deleteCard = asynchandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  // Check if the logged-in user is the creator of the card
  if (card.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to delete this card." });
  }

  await card.remove();
  return res.status(200).json({ message: "Card deleted successfully." });
});

// Get a single card by ID (for users)
export const getCardById = asynchandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id).populate("userId", "username fullname");

  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  // If the card is private, ensure only the creator can view it
  if (!card.isPublic && card.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to view this card." });
  }

  return res.status(200).json(card);
});

// Like or unlike a card
export const toggleLikeCard = asynchandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  const userId = req.user._id;

  // Check if the user has already liked the card
  if (card.likes.includes(userId)) {
    // Unlike the card
    card.likes = card.likes.filter((like) => like.toString() !== userId.toString());
    await card.save();
    return res.status(200).json({ message: "Card unliked successfully.", likes: card.likes.length });
  } else {
    // Like the card
    card.likes.push(userId);
    await card.save();
    return res.status(200).json({ message: "Card liked successfully.", likes: card.likes.length });
  }
});