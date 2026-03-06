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
      <p>{activity.encoded}</p>
      <p className="activity-hint">
        Нам с тобой известен свой секретный язык. Что тут написано?
      </p>
      <p className="activity-morse-legend">
        A ·‑ &nbsp; B ‑··· &nbsp; C ‑·‑· &nbsp; D ‑·· &nbsp; E · &nbsp; F ··‑· &nbsp; G ‑‑· &nbsp; H
        ···· &nbsp; I ·· &nbsp; J ·‑‑‑ &nbsp; K ‑·‑ &nbsp; L ·‑·· &nbsp; M ‑‑ &nbsp; N ‑· &nbsp; O
        ‑‑‑ &nbsp; P ·‑‑· &nbsp; Q ‑‑·‑ &nbsp; R ·‑· &nbsp; S ··· &nbsp; T ‑ &nbsp; U ··‑ &nbsp; V
        ···‑ &nbsp; W ·‑‑ &nbsp; X ‑··‑ &nbsp; Y ‑·‑‑ &nbsp; Z ‑‑··
      </p>
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
      {status === 'ok' && <p className="activity-feedback success">{activity.successText}</p>}
      {status === 'fail' && (
        <p className="activity-feedback error">
          Чуть‑чуть мимо. Но я всё равно люблю каждую твою букву. Попробуешь ещё раз? 💌
        </p>
      )}
    </div>
  );
}

