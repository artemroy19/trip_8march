import type { ActiveActivityState } from '../../types';
import { ActivityRenderer } from '../ui/ActivityRenderer';

interface PlaceModalProps {
  state: ActiveActivityState;
  onClose: () => void;
  onCompleted: (id: number) => void;
}

export function PlaceModal({ state, onClose, onCompleted }: PlaceModalProps) {
  if (!state) return null;
  const { place, completed } = state;

  const handleCompletedOnce = () => {
    if (!completed) {
      onCompleted(place.id);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card fade-in">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <header className="place-header">
          <h2 className="place-title">
            {place.name}
            <span className="place-subtitle">{place.subtitle}</span>
          </h2>
        </header>
        <div className="place-body">
          <div className="place-image-wrap">
          <img 
              src={place.image} 
              alt={place.name}
              className="place-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('place-image-placeholder');
              }}
            />
          </div>
          <div className="place-content">
            <p className="place-memory">{place.memoryText}</p>
            <ActivityRenderer activity={place.activity} onCompleted={handleCompletedOnce} />
            <div className="place-footer">
              <button
                type="button"
                onClick={onClose}
                className={`primary-button ${completed ? 'primary-button--ready' : ''}`}
              >
                {completed ? 'Едем дальше! ✅' : 'Закрыть'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

