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
            Ну вот, наше маленькое путешествие по Москве подошло к концу! Всего 8 мест, но таких родных и важных. Я надеюсь,
            тебе было тепло вспоминать наши встречи, прогулки, разговоры. Каждый раз, когда я отмечал эти места,
            я улыбался, вспоминал их с невероятным теплом и радостью. Потому что каждое из них — это ты. Твоя улыбка, твой смех, твои слова, твоя энергия (я главный её фанат), твои нежные руки и твои крепкие объятия ❤️
          </p>
          <p>
            <br /><br />
            С 8 Марта, моя самая родная, самая любимая, самая прекрасная Эля!💐 Ты делаешь этот мир (и особенно мою карту) ярче!☀️ Каждое отмеченное место сияет по-особенному благодаря тебе! Спасибо большое тебе! 😘
            <br /><br />
            Солнышко, в этот день я особенно хочу пожелать тебе быть счастливой! Ты этого заслуживаешь больше всех на свете!  И я приложу максимум усилий, чтобы ты всегда чувствовала себя самой любимой и самой счастливой 🩷🫂
          </p>
          <p>
            P.S.  В мае нас
            ждёт новая глава. А пока — маленький бонус ниже...
          </p>
          <p className="final-signature handwritten">С бесконечной любовью, Тёмик.</p>

          <section className="certificate soft-card">
              <h3 className="certificate-title handwritten">Твой главный подарок 💝</h3>
              <p className="certificate-text">
                Чтобы получить свой подарок на 8 марта, отправь мне скриншот этого письма -
                как подтверждение, что ты прошла всё путешествие до конца. Я буду ждать его и сразу 
                расскажу, что для тебя приготовил ✨
              </p>
              <p className="certificate-small">
                ЛЮБЛЮ ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
              </p>
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

