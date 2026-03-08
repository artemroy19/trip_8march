import { useState } from 'react';
import type { MorseActivity as MorseActivityType } from '../../data/places';

interface MorseActivityProps {
  activity: MorseActivityType;
  onCompleted: () => void;
}

export function MorseActivity({ activity, onCompleted }: MorseActivityProps) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'fail'>('idle');

  const check = () => {
    const normalized = value.trim().toUpperCase();
    const target = activity.answer.trim().toUpperCase();
    if (!normalized) return;
    if (normalized === target) {
      setStatus('ok');
      onCompleted();
    } else {
      setStatus('fail');
    }
  };

  return (
    <div className="activity-block">
      <h3 className="activity-title">Наш секретный язык</h3>
      
      <div className="morse-message">
        <p className="morse-message-label">🔍 Зашифрованное послание:</p>
        <p className="morse-message-code">{activity.encoded}</p>
      </div>

      <p className="activity-hint">
        Русскую азбуку Морзе мы освоили. Пора освоить и английскую. Что тут написано?
      </p>
      
      <div className="morse-container">
        <div className="morse-grid">
          <div className="morse-column">
            <p>A ·‑</p>
            <p>B ‑···</p>
            <p>C ‑·‑·</p>
            <p>D ‑··</p>
            <p>E ·</p>
            <p>F ··‑·</p>
            <p>G ‑‑·</p>
          </div>
          <div className="morse-column">
            <p>H ····</p>
            <p>I ··</p>
            <p>J ·‑‑‑</p>
            <p>K ‑·‑</p>
            <p>L ·‑··</p>
            <p>M ‑‑</p>
            <p>N ‑·</p>
          </div>
          <div className="morse-column">
            <p>O ‑‑‑</p>
            <p>P ·‑‑·</p>
            <p>Q ‑‑·‑</p>
            <p>R ·‑·</p>
            <p>S ···</p>
            <p>T ‑</p>
            <p>U ··‑</p>
          </div>
          <div className="morse-column">
            <p>V ···‑</p>
            <p>W ·‑‑</p>
            <p>X ‑··‑</p>
            <p>Y ‑·‑‑</p>
            <p>Z ‑‑··</p>
          </div>
        </div>
      </div>

      <div className="activity-input-row">
        <input
          type="text"
          className="activity-input"
          placeholder={activity.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
        />
        <button type="button" onClick={check}>
          Проверить
        </button>
      </div>

      {status === 'ok' && (
        <p className="activity-feedback success">{activity.successText}</p>
      )}
      
      {status === 'fail' && (
        <p className="activity-feedback error">
          Чуть‑чуть мимо. Попробуешь ещё раз? 💌
        </p>
      )}
    </div>
  );
}