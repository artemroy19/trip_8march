import type { ActiveActivityState } from '../../types';
import type { Place } from '../../data/places';
import { WelcomeLetter } from '../ui/WelcomeLetter';
import { FinishedLetterTeaser } from '../ui/FinishedLetterTeaser';
import { MapView } from '../map/MapView';
import { PlaceModal } from '../modals/PlaceModal';
import { FinalLetterModal } from '../modals/FinalLetterModal';
import { BonusNoteModal } from '../modals/BonusNoteModal';

interface MainMapScreenProps {
  visitedCount: number;
  total: number;
  visitedPlaces: number[];
  activePlace: ActiveActivityState | null;
  onCloseActivity: () => void;
  onPlaceCompleted: (id: number) => void;
  showFinalLetter: boolean;
  showBonusNote: boolean;
  onOpenFinalLetter: () => void;
  onOpenBonusNote: () => void;
  onCloseOverlays: () => void;
  hasFinished: boolean;
  onMapMarkerClick: (place: Place) => void;
}

export function MainMapScreen({
  visitedCount,
  total,
  visitedPlaces,
  activePlace,
  onCloseActivity,
  onPlaceCompleted,
  showFinalLetter,
  showBonusNote,
  onOpenFinalLetter,
  onOpenBonusNote,
  onCloseOverlays,
  hasFinished,
  onMapMarkerClick,
}: MainMapScreenProps) {
  return (
    <div className="map-screen fade-in">
      <header className="map-header">
        <div className="map-title-block">
          <div className="soft-tag">С 8 Марта, любимая!</div>
          <h1 className="handwritten map-title">Маленькое путешествие домой</h1>
        </div>
        <div className="map-counter-area">
          <div className="pill-counter">
            <span aria-hidden="true">♡</span>
            Исследовано: {visitedCount}/{total}
          </div>
        </div>
      </header>

      <main className="map-layout">
        <section className="map-left soft-card">
          {!hasFinished ? (
            <WelcomeLetter />
          ) : (
            <FinishedLetterTeaser onOpenFinalLetter={onOpenFinalLetter} />
          )}
        </section>
        <section className="map-right">
          <MapView visitedPlaces={visitedPlaces} onMarkerClick={onMapMarkerClick} />
        </section>
      </main>

      {activePlace && (
        <PlaceModal
          state={activePlace}
          onClose={onCloseActivity}
          onCompleted={onPlaceCompleted}
        />
      )}

      {showFinalLetter && (
        <FinalLetterModal onClose={onCloseOverlays} onOpenBonus={onOpenBonusNote} />
      )}
      {showBonusNote && <BonusNoteModal onClose={onCloseOverlays} />}
    </div>
  );
}

