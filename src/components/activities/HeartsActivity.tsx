import { useEffect, useState } from 'react';
import type { HeartsActivity as HeartsActivityType } from '../../data/places';

interface HeartsActivityProps {
  activity: HeartsActivityType;
  onCompleted: () => void;
}

export function HeartsActivity({ activity, onCompleted }: HeartsActivityProps) {
  const [filled, setFilled] = useState(0);
  const [localDone, setLocalDone] = useState(false);

  useEffect(() => {
    if (localDone) {
      onCompleted();
    }
  }, [localDone, onCompleted]);

  const handleClick = () => {
    setFilled((prev) => {
      const next = Math.min(activity.total, prev + 1);
      if (next === activity.total && !localDone) {
        setLocalDone(true);
      }
      return next;
    });
  };

  const hearts = Array.from({ length: activity.total }, (_, idx) => idx < filled);

  return (
    <div className="activity-block">
      <h3 className="activity-title">Собери сердечки</h3>
      <p>{activity.textBefore}</p>
      <div className="hearts-row">
        {hearts.map((isFilled, idx) => (
          <button
            key={idx}
            type="button"
            onClick={handleClick}
            className={`heart-chip ${isFilled ? 'heart-chip--filled' : ''}`}
          >
            {isFilled ? '❤' : '♡'}
          </button>
        ))}
      </div>
      {localDone && <p className="activity-feedback success">{activity.textAfter}</p>}
    </div>
  );
}

