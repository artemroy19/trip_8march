import { useState } from 'react';

interface FinishedLetterTeaserProps {
  onOpenFinalLetter: () => void;
}

export function FinishedLetterTeaser({ onOpenFinalLetter }: FinishedLetterTeaserProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    window.setTimeout(() => setClicked(false), 260);
    onOpenFinalLetter();
  };

  return (
    <div className="welcome-letter">
      <h2 className="handwritten welcome-title">Ты прошла всё путешествие ✨</h2>
      <p>
        Жду тебя, солнышко 
      </p>
      <button
        type="button"
        onClick={handleClick}
        className={`primary-button primary-button--ready ${
          clicked ? 'primary-button--pulse' : ''
        }`}
      >
        Открыть письмо ещё раз
      </button>
      <div className="final-continue-wrapper">
            <p className="final-continue"> 🎀 Продолжение в мае...</p>
          </div>
    </div>
  );
}