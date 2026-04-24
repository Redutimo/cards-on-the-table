import { useState, useEffect } from 'react';
import Background from './components/Background';
import Card from './components/Card';
import { CARDS_STAFF, CARDS_STUDENT } from './data/decks';
import { spawnParticles } from './utils/canvasFX';

function App() {
  const [deck, setDeck] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const px = (e.clientX / window.innerWidth) * 100;
      const py = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mx-back', px);
      document.body.style.setProperty('--my-back', py);
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const handleChooseDeck = (type) => {
    setDeck(type);
    setFlippedCards(new Set());
    setSelectedCard(null);
  };

  const handleCardClick = (e, card) => {
    if (!flippedCards.has(card.id)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnParticles(cx, cy);
      
      setFlippedCards(prev => {
        const next = new Set(prev);
        next.add(card.id);
        return next;
      });
    }
    
    setSelectedCard(card);
  };

  const currentCards = deck === 'staff' ? CARDS_STAFF : CARDS_STUDENT;

  return (
    <>
      <Background />

      <div className={`splash-overlay ${deck ? 'hidden' : ''}`}>
        <div className="splash-card">
          <div className="splash-eyebrow">Moving Targets Workshop · BLE</div>
          <div className="splash-title">AI — Cards on the Table</div>
          <div className="splash-subtitle">A persona-based conversation exercise</div>
          <div className="splash-divider"></div>
          <div className="splash-body">
            <p>Two sets of characters. Each with a complicated relationship with AI.</p>
            <p>Each character has a set of tags naming the anxieties driving their behaviour, a comment, and a "shadow thought": the thing they haven't quite admitted yet.</p>
            <p>Click a card to reveal their story, then use the discussion questions to open up a conversation.</p>
            <p>There are no right answers here, only honest ones.</p>
            <div className="splash-how">
              <div className="splash-how-title">Choose your deck</div>
              <div className="deck-chooser">
                <button className="deck-btn" onClick={() => handleChooseDeck('staff')}>
                  <div className="deck-btn-title">HE Staff</div>
                  <div className="deck-btn-sub">Personas from across higher education — digital, library, academic and professional support</div>
                </button>
                <button className="deck-btn" onClick={() => handleChooseDeck('student')}>
                  <div className="deck-btn-title">Students</div>
                  <div className="deck-btn-sub">Personas navigating AI in their studies — the pressures, the shortcuts, and the grey areas</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="info-btn" onClick={() => setDeck(null)} title="Switch deck">ℹ Info</button>

      {deck && (
        <>
          <div className="header">
            <div className="eyebrow">Moving Targets Workshop · BLE</div>
            <h1>AI — Cards on the Table</h1>
            <div className="divider"></div>
            <p>Choose a card. Discover a colleague's story. Explore the questions it raises.</p>
            <div className={`deck-badge visible`}>
              Playing: {deck === 'staff' ? 'HE Staff Deck' : 'Student Deck'}
            </div>
          </div>

          <div className="grid">
            {currentCards.map((card, i) => (
              <div 
                className={`card-slot ${flippedCards.has(card.id) ? 'flipped' : ''}`}
                key={card.id}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Card 
                  card={card} 
                  isFlipped={flippedCards.has(card.id)} 
                  onClick={(e) => handleCardClick(e, card)} 
                />
              </div>
            ))}
          </div>

          <div className="footer">
            <button className="reset-btn" onClick={() => setFlippedCards(new Set())}>
              ✦ Flip All Cards Back ✦
            </button>
            <div className="counter">
              {flippedCards.size} of {currentCards.length} revealed
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <div className={`overlay ${selectedCard ? 'active' : ''}`} onClick={(e) => {
        if (e.target.classList.contains('overlay')) setSelectedCard(null);
      }}>
        {selectedCard && (
          <div className="modal">
            <button className="close-btn" onClick={() => setSelectedCard(null)}>✕</button>
            
            <div className="modal-header">
              <div className="modal-card-visual" style={{ width: '150px', height: '214px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ transform: 'scale(0.535)', transformOrigin: 'top left', pointerEvents: 'none' }}>
                  <Card card={selectedCard} isFlipped={false} onClick={() => {}} />
                </div>
              </div>
              <div className="modal-card-meta">
                <div className="modal-card-label">Card {currentCards.findIndex(c => c.id === selectedCard.id) + 1}</div>
                <div className="modal-name">{selectedCard.name}</div>
                <div className="modal-role">{selectedCard.role}</div>
                <div className="anxieties">
                  {selectedCard.anxieties.map(anx => (
                    <span className="anxiety-tag" key={anx}>{anx}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="quote-block">
                <p>"{selectedCard.quote}"</p>
              </div>
              <div className="shadow-block">
                <p>"{selectedCard.shadow}"</p>
              </div>
              
              <div className="prompts-label">Discussion Prompts</div>
              <div className="prompts-list">
                {selectedCard.prompts.map((prompt, i) => (
                  <div className="prompt-item" key={i}>
                    <div className="prompt-num">{i + 1}.</div>
                    <p>{prompt}</p>
                  </div>
                ))}
              </div>
              
              <div className="debrief-block">
                <div className="debrief-label">Facilitator Note</div>
                <p>{selectedCard.debrief}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
