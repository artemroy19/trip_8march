import { useEffect, useState } from 'react';
import "./styles/main.css";
import { ACCESS_CODE } from './data/codeData';
import { places } from './data/places';
import type { AppStage, GateCodeState, ActiveActivityState } from './types';
import { LoaderScreen } from './components/screens/LoaderScreen';
import { GateScreen } from './components/screens/GateScreen';
import { BoardingPassScreen } from './components/screens/BoardingPassScreen';
import { MainMapScreen } from './components/screens/MainMapScreen';
import type { Place } from './data/places';

function App() {
  const [stage, setStage] = useState<AppStage>('loader');
  const [gate, setGate] = useState<GateCodeState>({ digits: ['', '', '', ''], error: null });
  const [visitedPlaces, setVisitedPlaces] = useState<number[]>([]);
  const [activePlace, setActivePlace] = useState<ActiveActivityState | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [pendingFinalAfterPlace, setPendingFinalAfterPlace] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderDone(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;
    setVisitedPlaces([]);
    setStage('gate');
  }, [loaderDone]);

  const visitedCount = visitedPlaces.length;
  const totalPlaces = places.length;
  const allVisited = visitedCount === totalPlaces;

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setGate((prev) => {
      const digits = [...prev.digits];
      digits[index] = value;
      return { digits, error: null };
    });
  };

  const checkCode = () => {
    const code = gate.digits.join('');
    if (code === ACCESS_CODE) {
      setStage('boarding');
    } else {
      setGate((prev) => ({
        ...prev,
        error:
          'Ой, это не тот код... Попробуй ещё раз. На картинке нет случайных деталей',
      }));
    }
  };

  const handlePlaceCompleted = (placeId: number) => {
    setVisitedPlaces((prev) => {
      if (prev.includes(placeId)) return prev;
      const next = [...prev, placeId];
      if (next.length === places.length) {
        setPendingFinalAfterPlace(true);
      }
      return next;
    });
    setActivePlace((prev) => (prev ? { ...prev, completed: true } : prev));
  };

  const handleMapMarkerClick = (place: Place) => {
    setActivePlace({ place, completed: visitedPlaces.includes(place.id) });
  };

  const handleCloseActivity = () => {
    if (pendingFinalAfterPlace) {
      setPendingFinalAfterPlace(false);
      setStage('finalLetter');
      return;
    }
    setActivePlace(null);
  };

  const showLoader = !loaderDone || stage === 'loader';

  return (
    <div className="app-root">
      {showLoader && <LoaderScreen />}
      {!showLoader && stage === 'gate' && (
        <GateScreen gate={gate} onDigitChange={handleDigitChange} onSubmit={checkCode} />
      )}
      {!showLoader && stage === 'boarding' && (
        <BoardingPassScreen onNext={() => setStage('map')} />
      )}
      {!showLoader && (stage === 'map' || stage === 'finalLetter' || stage === 'bonusNote') && (
        <MainMapScreen
          visitedCount={visitedCount}
          total={totalPlaces}
          visitedPlaces={visitedPlaces}
          activePlace={activePlace}
          onCloseActivity={handleCloseActivity}
          onPlaceCompleted={handlePlaceCompleted}
          showFinalLetter={stage === 'finalLetter'}
          showBonusNote={stage === 'bonusNote'}
          onOpenFinalLetter={() => setStage('finalLetter')}
          onOpenBonusNote={() => setStage('bonusNote')}
          onCloseOverlays={() => setStage('map')}
          hasFinished={allVisited}
          onMapMarkerClick={handleMapMarkerClick}
        />
      )}
    </div>
  );
}

export default App;
