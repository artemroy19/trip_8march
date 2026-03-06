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
        <header className="final-header">
          <div className="soft-tag">Бонусная записка</div>
          <h2 className="handwritten final-title">🍿 А вот сюрприз на обратную дорогу</h2>
        </header>
        <div className="final-body">
          <p>
            Помнишь, мы хотели посмотреть &laquo;[Название фильма]&raquo;, но так и не собрались?
            Я нашёл для нас идеальный момент внутри этого фильма.
          </p>
          <p>
            Поставь таймер на <strong>1:23:45</strong> — в это время там происходит невероятно
            милая сцена про ожидание встречи. Как раз для нас.
          </p>
          <p>
            Посмотрим вместе, как только ты вернёшься? Обещаю, я приготовлю попкорн 🤍
          </p>
        </div>
        <footer className="final-footer">
          <button type="button" onClick={onClose}>
            Закрыть и вернуться на карту
          </button>
        </footer>
      </div>
    </div>
  );
}

