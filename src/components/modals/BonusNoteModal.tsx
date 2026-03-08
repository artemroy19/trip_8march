interface BonusNoteModalProps {
  onClose: () => void;
}

export function BonusNoteModal({ onClose }: BonusNoteModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card fade-in">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <>
          <header className="final-header">
            <div className="soft-tag">Бонусная записка</div>
            <h2 className="handwritten final-title">🍿 А вот сюрприз на обратную дорогу</h2>
          </header>
          
          <div className="final-body">
            <p>
              Когда будешь лететь обратно в Пенджаб, обязательно посмотри в дороге 
              <strong> «Сводишь с ума (2025)»</strong>. Фильм интересный, небанальный и очень тёплый.
            </p>
            
            <p>
              Обрати внимание на <strong>1:04:10</strong> — мне кажется, это самый милый и прекрасный момент 
              во всём фильме, который подтолкнул меня к одной очень интересной мысли...
            </p>
            
            <p>
              В фильме много скрытых смыслов, но один из посылов (не главный, но очень красивый) 
              удивительно точно описывает нас. Думаю, ты его заметишь
            </p>
          </div>

          <div className="meeting-block">
            <p className="meeting-text handwritten">
              До встречи в мае, моя дорогая Эля! 🩷🧸 
            </p>
            <p className="meeting-small">
              Буду ждать тебя и готовить новые точки на карте
            </p>
          </div>

          <footer className="final-footer">
            <button type="button" onClick={onClose}>
              Закрыть и вернуться на карту
            </button>
          </footer>
        </>
      </div>
    </div>
  );
}

