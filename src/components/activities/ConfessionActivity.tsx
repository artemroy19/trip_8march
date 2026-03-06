import { useEffect, useRef, useState } from 'react';
import type { ConfessionActivity as ConfessionActivityType } from '../../data/places';

interface ConfessionActivityProps {
  activity: ConfessionActivityType;
  onCompleted: () => void;
}

const EMOJIS = ['🧸', '🌸', '💌', '❤️', '⭐'] as const;
type SlotIndex = 0 | 1 | 2;
type SlotsState = [number, number, number];

export function ConfessionActivity({ activity, onCompleted }: ConfessionActivityProps) {
  const [slots, setSlots] = useState<SlotsState>([0, 0, 0]);
  const [activeSlot, setActiveSlot] = useState<SlotIndex | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [localDone, setLocalDone] = useState(false);
  const completedOnceRef = useRef(false);

  const chosen = [EMOJIS[slots[0]], EMOJIS[slots[1]], EMOJIS[slots[2]]];
  const isCorrect = chosen[0] === '🧸' && chosen[1] === '🧸' && chosen[2] === '🧸';

  useEffect(() => {
    if (revealed && !localDone) {
      setLocalDone(true);
    }
  }, [revealed, localDone]);

  useEffect(() => {
    if (localDone && !completedOnceRef.current) {
      completedOnceRef.current = true;
      onCompleted();
    }
  }, [localDone, onCompleted]);

  useEffect(() => {
    if (!revealed && isCorrect) {
      setRevealed(true);
    }
  }, [isCorrect, revealed]);

  const cycle = (idx: SlotIndex) => {
    if (revealed) return;
    setActiveSlot(idx);
    setSlots((prev) => {
      const next = [...prev] as SlotsState;
      next[idx] = (next[idx] + 1) % EMOJIS.length;
      return next;
    });
  };

  const reset = () => {
    setSlots([0, 0, 0]);
    setActiveSlot(null);
    setRevealed(false);
  };

  return (
    <div className="activity-block">
      <h3 className="activity-title">Романтическое признание</h3>
      <p>{activity.textBefore}</p>

      <div className={`emoji-lock ${revealed ? 'emoji-lock--success' : ''}`}>
        <div className="emoji-lock-row" role="group" aria-label="Кодовый замок">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`emoji-slot ${activeSlot === idx ? 'emoji-slot--active' : ''}`}
              onClick={() => cycle(idx as SlotIndex)}
              aria-label={`Ячейка ${idx + 1}`}
            >
              {chosen[idx]}
            </button>
          ))}
        </div>
        <div className="emoji-lock-hint">
          Подсказка: попробуй собрать трёх плюшевых мишек 🧸
        </div>
        <div className="emoji-lock-actions">
          <button type="button" onClick={reset} className="emoji-reset">
            Сбросить
          </button>
        </div>
      </div>

      {revealed && (
        <p className="activity-feedback success confession confession-reveal" aria-live="polite">
          {activity.revealedText}
        </p>
      )}
    </div>
  );
}

