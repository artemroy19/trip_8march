import { useState } from 'react';
import type { QuizActivity } from '../../data/places';

interface QuizActivityProps {
  activity: QuizActivity;
  onCompleted: () => void;
}

export function QuizActivity({ activity, onCompleted }: QuizActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const question = activity.questions[currentIndex];
  const isLast = currentIndex === activity.questions.length - 1;
  const canGoNext = correct === true;

  const handleSelect = (id: string) => {
    if (correct === true) return;
    setSelected(id);
    const isCorrect = question.options.some((opt) => opt.id === id && opt.correct);
    setCorrect(isCorrect);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    if (isLast) {
      onCompleted();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setCorrect(null);
  };

  return (
    <div className="activity-block">
      <h3 className="activity-title">Мини‑квиз</h3>
      <p className="activity-question">
        {question.question}{' '}
        {activity.questions.length > 1 && (
          <span className="activity-step">
            (вопрос {currentIndex + 1} из {activity.questions.length})
          </span>
        )}
      </p>
      <div className="activity-options">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`activity-option ${
              selected === opt.id ? (opt.correct ? 'correct' : 'incorrect') : ''
            }`}
            onClick={() => handleSelect(opt.id)}
            disabled={correct === true}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {correct != null && (
        <p className={`activity-feedback ${correct ? 'success' : 'error'}`}>
          {correct
            ? question.successText
            : 'Почти! Попробуй ещё раз, я верю в твой детективный талант 🌸'}
        </p>
      )}

      {canGoNext && (
        <div className="activity-next">
          <button type="button" onClick={handleNext} className="primary-button primary-button--ready">
            {isLast ? 'Всё вспомнила ✨' : 'Следующий вопрос ➔'}
          </button>
        </div>
      )}
    </div>
  );
}

