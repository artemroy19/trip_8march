import { useMemo, useRef, useState } from 'react';
import type { ITEnglishMatchActivity as ITEnglishMatchActivityType } from '../../data/places';

interface ITEnglishMatchActivityProps {
  activity: ITEnglishMatchActivityType;
  onCompleted: () => void;
}

interface MatchCard {
  id: string;
  pairId: string;
  text: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ITEnglishMatchActivity({
  activity,
  onCompleted,
}: ITEnglishMatchActivityProps) {
  const cards = useMemo<MatchCard[]>(() => {
    const base: MatchCard[] = [];
    activity.pairs.forEach((pair) => {
      base.push(
        { id: `${pair.id}-term`, pairId: pair.id, text: pair.term },
        { id: `${pair.id}-def`, pairId: pair.id, text: pair.definition },
      );
    });
    return shuffle(base);
  }, [activity]);

  const [opened, setOpened] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const completedOnceRef = useRef(false);

  const targetScore = activity.targetScore;
  const hasWon = score >= targetScore;

  const cardById = useMemo<Map<string, MatchCard>>(() => {
    const map = new Map<string, MatchCard>();
    cards.forEach((card) => {
      map.set(card.id, card);
    });
    return map;
  }, [cards]);

  const handleCardClick = (cardId: string) => {
    if (isChecking || hasWon) return;
    if (matched.includes(cardId)) return;
    if (opened.includes(cardId)) return;

    if (opened.length === 0) {
      setOpened([cardId]);
      return;
    }

    if (opened.length === 1) {
      const firstId = opened[0];
      if (firstId === cardId) return;

      const firstCard = cardById.get(firstId);
      const secondCard = cardById.get(cardId);
      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.pairId === secondCard.pairId;
      const nextOpened = [firstId, cardId];
      setOpened(nextOpened);
      setIsChecking(true);

      window.setTimeout(() => {
        if (isMatch) {
          const nextMatched = [...matched, firstId, cardId];
          setMatched(nextMatched);
          setScore((prev) => {
            const next = prev + 10;
            if (!completedOnceRef.current && next >= targetScore) {
              completedOnceRef.current = true;
              onCompleted();
            }
            return next;
          });
        }
        setOpened([]);
        setIsChecking(false);
      }, 650);
    }
  };

  const progress =
    targetScore > 0 ? Math.max(0, Math.min(1, score / targetScore)) : 0;

  return (
    <div className="activity-block">
      <h3 className="activity-title">IT &amp; English Match</h3>
      <p>{activity.textBefore}</p>

      <div className="it-match-score-row">
        <span className="it-match-score">
          Очки: <strong>{score}</strong> / {targetScore}
        </span>
      </div>

      <div className="it-match-progress" aria-hidden="true">
        <div
          className="it-match-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="activity-hint">
        Открывай карточки по две: найди пару из IT‑термина и его перевода или
        объяснения.
      </p>

      <div
        className="it-match-grid"
        aria-label="Игра на соответствие IT‑терминов и английского"
      >
        {cards.map((card) => {
          const isOpened = opened.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              className={`it-match-card ${
                isOpened ? 'it-match-card--opened' : ''
              } ${isMatched ? 'it-match-card--matched' : ''}`}
              onClick={() => handleCardClick(card.id)}
              disabled={isMatched}
            >
              <span className="it-match-card-text">
                {isOpened ? card.text : '❔'}
              </span>
            </button>
          );
        })}
      </div>

      {hasWon && (
        <p className="activity-feedback success it-match-success">
          {activity.successText}
        </p>
      )}
    </div>
  );
}

