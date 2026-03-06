import { useState } from 'react';

interface BoardingProps {
  onNext: () => void;
}

export function BoardingPassScreen({ onNext }: BoardingProps) {
  const [clicked, setClicked] = useState(false);

  const handleNext = () => {
    setClicked(true);
    window.setTimeout(() => setClicked(false), 260);
    onNext();
  };

  return (
    <div className="boarding-screen fade-in">
      <div className="boarding-card soft-card">
        <div className="boarding-left">
          <div className="boarding-airline">Eleonora Airlines</div>
          <div className="boarding-main">
            <div className="boarding-label">Пассажир</div>
            <div className="boarding-value boarding-passenger">
              ПЕТРОВА ЭЛЕОНОРА
              <span className="boarding-sub">PETROVA ELEONORA</span>
            </div>
            <div className="boarding-row">
              <div>
                <div className="boarding-label">Откуда</div>
                <div className="boarding-value">
                  ПЕНДЖАБ (МОХАЛИ)
                  <span className="boarding-sub">PUNJAB (MOHALI)</span>
                </div>
              </div>
              <div>
                <div className="boarding-label">Куда</div>
                <div className="boarding-value">
                  МОСКВА (SVO)
                  <span className="boarding-sub">MOSCOW (SVO)</span>
                </div>
              </div>
            </div>
            <div className="boarding-row">
              <div>
                <div className="boarding-label">Рейс</div>
                <div className="boarding-value">LL 0803</div>
                <div className="boarding-sub">LOVE LOVE 8 MARCH</div>
              </div>
              <div>
                <div className="boarding-label">Дата</div>
                <div className="boarding-value">08 МАР 2026</div>
              </div>
            </div>
            <div className="boarding-row">
              <div>
                <div className="boarding-label">Время вылета</div>
                <div className="boarding-value">КОГДА ЗАХОЧЕШЬ</div>
              </div>
              <div>
                <div className="boarding-label">Выход (Gate)</div>
                <div className="boarding-value">GATE MY HEART</div>
              </div>
              <div>
                <div className="boarding-label">Место (Seat)</div>
                <div className="boarding-value">1A</div>
                <div className="boarding-sub">РЯДОМ СО МНОЙ</div>
              </div>
            </div>
          </div>
        </div>
        <div className="boarding-right">
          <div className="boarding-welcome handwritten">ДОБРО ПОЖАЛОВАТЬ ДОМОЙ</div>
          <p className="boarding-note">
            Этот билет даёт право на одно бесконечно счастливое возвращение. Сохрани его ❤️
          </p>
          <div className="boarding-barcode" aria-hidden="true">
            <div className="barcode-hearts">LOVE</div>
          </div>
        </div>
      </div>
      <div className="boarding-bottom">
        <button
          type="button"
          onClick={handleNext}
          className={`primary-button primary-button--ready ${
            clicked ? 'primary-button--pulse' : ''
          }`}
        >
          Пора в путь →
        </button>
      </div>
    </div>
  );
}

