import React, { useState } from 'react';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: 'What is the capital of France?', back: 'Paris' },
    { id: 2, front: 'What is 2 + 2?', back: '4' },
    { id: 3, front: 'What is the largest ocean?', back: 'Pacific Ocean' }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [editMode, setEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleAddCard = () => {
    if (newCard.front && newCard.back) {
      const newFlashcard = {
        id: flashcards.length + 1,
        ...newCard
      };
      setFlashcards([...flashcards, newFlashcard]);
      setNewCard({ front: '', back: '' });
    }
  };

  const handleDeleteCard = (id) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleEditCard = (id) => {
    const cardToEdit = flashcards.find(card => card.id === id);
    setEditedCard(cardToEdit);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setFlashcards(flashcards.map(card =>
      card.id === editedCard.id ? editedCard : card
    ));
    setEditMode(false);
    setEditedCard(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCard(null);
  };

  return (
    <div className="flashcard-container">
      <div className="manage-cards">
        <h3>Add a New Flashcard</h3>
        <input
          type="text"
          placeholder="Front side"
          value={newCard.front}
          onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
        />
        <input
          type="text"
          placeholder="Back side"
          value={newCard.back}
          onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>

      <div className={`flashcard ${isFlipped ? 'flip' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            {flashcards[currentCard]?.front || 'No more cards'}
          </div>
          <div className="flashcard-back">
            {flashcards[currentCard]?.back || 'No more cards Present'}
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handlePrev} disabled={currentCard === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentCard === flashcards.length - 1}>Next</button>
      </div>

      {editMode && (
        <div className="edit-card">
          <h3>Edit Flashcard</h3>
          <input
            type="text"
            placeholder="Front side"
            value={editedCard.front}
            onChange={(e) => setEditedCard({ ...editedCard, front: e.target.value })}
          />
          <input
            type="text"
            placeholder="Back side"
            value={editedCard.back}
            onChange={(e) => setEditedCard({ ...editedCard, back: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Save Changes</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}

      <div className="flashcard-list">
        <h3>Flashcards</h3>
        <ul>
          {flashcards.map((card) => (
            <li key={card.id}>
              {card.front} - {card.back}
              <button onClick={() => handleEditCard(card.id)}>Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
