import { useState, type DragEvent } from 'react';
import type { PuzzleActivity as PuzzleActivityType } from '../../data/places';

interface PuzzleActivityProps {
  activity: PuzzleActivityType;
  onCompleted: () => void;
}

export function PuzzleActivity({ activity, onCompleted }: PuzzleActivityProps) {
  const [order, setOrder] = useState<number[]>(() => {
    const base = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let tries = 0;
    do {
      for (let i = base.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [base[i], base[j]] = [base[j], base[i]];
      }
      tries += 1;
    } while (tries < 6 && base.every((val, idx) => val === idx));
    return [...base];
  });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const checkSolved = (next: number[]) => {
    if (!done && next.every((val, idx) => val === idx)) {
      setDone(true);
      window.setTimeout(onCompleted, 50);
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[dragIndex], next[index]] = [next[index], next[dragIndex]];
      checkSolved(next);
      return next;
    });
    setDragIndex(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="activity-block">
      <h3 className="activity-title">Пазл 3×3</h3>
      <p>{activity.textBefore}</p>
      <div className="puzzle-grid puzzle-grid--3x3" aria-label="Пазл 3 на 3">
        {order.map((pieceId, cellIndex) => {
          const col = pieceId % 3;
          const row = Math.floor(pieceId / 3);

          const backgroundStyle =
            activity.imageUrl
              ? {
                  backgroundImage: `url(${activity.imageUrl})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${(col / 2) * 100}% ${(row / 2) * 100}%`,
                }
              : undefined;

          return (
          <div
            key={cellIndex}
            className={`puzzle-piece puzzle-piece--photo ${done ? 'puzzle-piece--done' : ''}`}
            draggable={!done}
            onDragStart={() => handleDragStart(cellIndex)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(cellIndex)}
            style={backgroundStyle}
            aria-label={`Кусочек ${pieceId + 1}`}
          >
            {!activity.imageUrl && pieceId + 1}
          </div>
          );
        })}
      </div>
      <p className="activity-hint">Перетаскивай кусочки, чтобы собрать картинку.</p>
      {done && <p className="activity-feedback success">{activity.textAfter}</p>}
    </div>
  );
}

