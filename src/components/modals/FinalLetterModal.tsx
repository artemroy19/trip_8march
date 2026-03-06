interface FinalLetterModalProps {
  onClose: () => void;
  onOpenBonus: () => void;
}

export function FinalLetterModal({ onClose, onOpenBonus }: FinalLetterModalProps) {
  const handleBonus = () => {
    onOpenBonus();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card fade-in">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <header className="final-header">
          <div className="soft-tag">Финальное письмо</div>
          <h2 className="handwritten final-title">Моей любимой путешественнице ✈️</h2>
        </header>
        <div className="final-body">
          <p>
            Ну вот, наше маленькое путешествие подошло к концу... или только начинается? Я надеюсь,
            тебе было тепло вспоминать наши с тобой уголки. Каждый раз, когда я отмечал эти места,
            я улыбался. Потому что каждое из них — это ты. Твоя улыбка, твой смех, твои руки в моих.
          </p>
          <p>
            Я безумно скучаю. Очень хочу скорее обнять тебя и уже не отпускать. С 8 Марта, моя
            самая родная! Ты делаешь этот мир (и мою карту) ярче.
          </p>
          <p>
            P.S. Я решил, что пока тебя нет, мы будем увеличивать нашу коллекцию мест. В мае нас
            ждёт новая глава. А пока — маленький бонус ниже.
          </p>
          <p className="final-signature handwritten">С бесконечной любовью, Твой человек.</p>

          <section className="certificate soft-card">
            <h3 className="certificate-title handwritten">Подарочный сертификат 💝</h3>
            <ul className="certificate-list">
              <li>На одно бесконечное объятие в любую минуту.</li>
              <li>На массаж уставших ножек после прогулки.</li>
              <li>На исполнение любого твоего желания в день возвращения.</li>
              <li>Действителен: Вечно.</li>
            </ul>
          </section>
        </div>
        <footer className="final-footer">
          <button type="button" onClick={handleBonus}>
            Есть ещё кое-что...
          </button>
        </footer>
      </div>
    </div>
  );
}

