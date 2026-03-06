import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { CatchHeartsActivity as CatchHeartsActivityType } from '../../data/places';

interface CatchHeartsActivityProps {
  activity: CatchHeartsActivityType;
  onCompleted: () => void;
}

type HeartKind = 'pink' | 'gold' | 'broken';

interface Heart {
  id: number;
  kind: HeartKind;
  x: number; // 0–100 (%)
  y: number; // 0–100 (%)
  speed: number; // относительная скорость падения
}

const SPAWN_MIN_MS = 1200;
const SPAWN_MAX_MS = 2000;
const BASKET_WIDTH_PERCENT = 24;
const BASKET_HALF = BASKET_WIDTH_PERCENT / 2;
const CATCH_Y_MIN = 78;
const CATCH_Y_MAX = 98;

export function CatchHeartsActivity({ activity, onCompleted }: CatchHeartsActivityProps) {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [basketX, setBasketX] = useState(50);
  const nextHeartId = useRef(1);
  const spawnAccumRef = useRef(0);
  const nextSpawnInRef = useRef(
    SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS),
  );
  const basketXRef = useRef(50);
  const completedOnceRef = useRef(false);

  const targetScore = activity.targetScore;
  const hasWon = score >= targetScore;

  const updateBasketX = (value: number) => {
    const clamped = Math.min(100 - BASKET_HALF, Math.max(BASKET_HALF, value));
    basketXRef.current = clamped;
    setBasketX(clamped);
  };

  const randomHeartKind = (): HeartKind => {
    const r = Math.random();
    if (r < 0.6) return 'pink';
    if (r < 0.8) return 'broken';
    return 'gold';
  };


  const heartsRef = useRef<Heart[]>([]);
  heartsRef.current = hearts;

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      spawnAccumRef.current += delta;
      let shouldSpawn = false;
      if (spawnAccumRef.current >= nextSpawnInRef.current) {
        spawnAccumRef.current = 0;
        nextSpawnInRef.current =
          SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
        shouldSpawn = true;
      }

      const prev = heartsRef.current;
      const updated: Heart[] = [];
      let deltaScore = 0;
      const basketCenter = basketXRef.current;

      prev.forEach((heart) => {
        const speedPerFrame = heart.speed * (delta / 16.67);
        const nextY = heart.y + speedPerFrame;

        if (nextY >= CATCH_Y_MIN && nextY <= CATCH_Y_MAX) {
          const dx = heart.x - basketCenter;
          const isCaught = Math.abs(dx) <= BASKET_HALF;
          if (isCaught) {
            if (heart.kind === 'pink') deltaScore += 1;
            else if (heart.kind === 'gold') deltaScore += 3;
            else if (heart.kind === 'broken') deltaScore -= 1;
            return;
          }
        }

        if (nextY >= 110) return;

        updated.push({
          ...heart,
          y: nextY,
        });
      });

      if (shouldSpawn) {
        const id = nextHeartId.current;
        nextHeartId.current += 1;
        const kind = randomHeartKind();
        const baseSpeed = kind === 'gold' ? 0.55 : kind === 'broken' ? 0.65 : 0.5;
        updated.push({
          id,
          kind,
          x: 10 + Math.random() * 80,
          y: -8,
          speed: baseSpeed * (0.85 + Math.random() * 0.3),
        });
      }

      setHearts(updated);

      if (deltaScore !== 0) {
        setScore((prevScore) => {
          const nextScore = prevScore + deltaScore;
          if (!completedOnceRef.current && nextScore >= targetScore) {
            completedOnceRef.current = true;
            onCompleted();
          }
          return nextScore;
        });
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [onCompleted, targetScore]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
    updateBasketX(relativeX);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const delta = event.key === 'ArrowLeft' ? -6 : 6;
      updateBasketX(basketXRef.current + delta);
    }
  };

  const progress =
    targetScore > 0 ? Math.max(0, Math.min(1, score / targetScore)) : 0;

  return (
    <div className="activity-block">
      <h3 className="activity-title">Лови сердечки</h3>
      <p>{activity.textBefore}</p>

      <div className="catch-hearts-score-row">
        <span className="catch-hearts-score">
          Очки: <strong>{score}</strong> / {targetScore}
        </span>
        {score < 0 && (
          <span className="catch-hearts-message">
            Ничего страшного, даже разбитые сердечки можно залечить 🌸
          </span>
        )}
      </div>

      <div className="catch-hearts-progress" aria-hidden="true">
        <div
          className="catch-hearts-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        className={`catch-hearts-field ${hasWon ? 'catch-hearts-field--won' : ''}`}
        onMouseMove={handleMouseMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Игровое поле: лови падающие сердечки"
      >
        <div className="catch-hearts-sky" aria-hidden="true" />

        {hearts.map((heart) => {
          let emoji = '❤️';
          if (heart.kind === 'gold') emoji = '💛';
          if (heart.kind === 'broken') emoji = '💔';

          return (
            <div
              key={heart.id}
              className={`catch-hearts-heart catch-hearts-heart--${heart.kind}`}
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            >
              {emoji}
            </div>
          );
        })}

        <div
          className="catch-hearts-basket"
          style={{ left: `${basketX}%` }}
          aria-hidden="true"
        >
          🧺
        </div>

        {hasWon && <div className="catch-hearts-confetti" aria-hidden="true" />}
      </div>

      {hasWon && (
        <p className="activity-feedback success catch-hearts-success">
          {activity.successText}
        </p>
      )}
    </div>
  );
}

