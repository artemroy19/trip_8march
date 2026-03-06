import React, { useState } from 'react';
import type { GateCodeState } from '../../types';

interface GateProps {
  gate: GateCodeState;
  onDigitChange: (index: number, value: string) => void;
  onSubmit: () => void;
}

export function GateScreen({ gate, onDigitChange, onSubmit }: GateProps) {
  const [clicked, setClicked] = useState(false);
  const isReady = gate.digits.every((d) => d !== '');

  const handleKeyDown = (_index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (e.key === 'Backspace' && !target.value && target.previousElementSibling instanceof HTMLInputElement) {
      target.previousElementSibling.focus();
    }
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(-1);
    onDigitChange(index, value);
    if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
      e.target.nextElementSibling.focus();
    }
  };

  const handleSubmit = () => {
    setClicked(true);
    window.setTimeout(() => setClicked(false), 260);
    onSubmit();
  };

  return (
    <div className="gate-screen fade-in">
      <div className="gate-bg" />
      <div className="gate-card soft-card">
        <div className="gate-header">
          <div className="soft-tag">Тут закрыто, но только для чужих 💌</div>
        </div>
        <h1 className="gate-title handwritten">Маленькая калитка в наш мир</h1>
        <p className="gate-text">
          Привет, моя хорошая! Чтобы открыть калитку в наш маленький мир, нужен секретный код.
          <br />
          Помнишь, 14 февраля в 12:31 по индийскому времени я отправил тебе сообщение в Telegram?
          <br />
          Введи те 4 цифры. Это пароль от нашего путешествия.
        </p>
        <div className="gate-inputs">
          {gate.digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              placeholder="?"
              className="gate-input"
              onKeyDown={(e) => handleKeyDown(index, e)}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
        {gate.error && <p className="gate-error">{gate.error}</p>}
        <div className="gate-actions">
          <button
            type="button"
            onClick={handleSubmit}
            className={`primary-button ${isReady ? 'primary-button--ready' : ''} ${
              clicked ? 'primary-button--pulse' : ''
            }`}
          >
            Открыть
          </button>
        </div>
      </div>
    </div>
  );
}

