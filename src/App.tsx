import { useCallback, useMemo, useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import ParticipantsTable from './components/ParticipantsTable';
import Winners from './components/Winners';
import type { Participant } from './types';

// Додаємо нормалізацію прямо тут, щоб не імпортувати зайвого
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizePhone = (phone: string) => phone.trim().replace(/\D/g, '');

export default function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Participant[]>([]);

  // Ті, хто ще не переміг
  const availableForWin = useMemo(() => {
    const winnerIds = new Set(winners.map((w) => w.id));
    return participants.filter((p) => !winnerIds.has(p.id));
  }, [participants, winners]);

  // Додавання учасника
  const handleAddParticipant = useCallback((p: Participant) => {
    setParticipants((prev) => [p, ...prev]);
  }, []);

  // 🔹 Перевірка дублікатів
  const isDuplicate = useCallback(
    (data: Omit<Participant, 'id'>) => {
      const nEmail = normalizeEmail(data.email);
      const nPhone = normalizePhone(data.phone);
      const emailExists = participants.some(
        (p) => normalizeEmail(p.email) === nEmail
      );
      const phoneExists = participants.some(
        (p) => normalizePhone(p.phone) === nPhone
      );
      return { email: emailExists, phone: phoneExists };
    },
    [participants]
  );

  // Випадковий вибір переможця
  const addWinner = useCallback(() => {
    if (winners.length >= 3 || availableForWin.length === 0) return;
    const idx = Math.floor(Math.random() * availableForWin.length);
    const winner = availableForWin[idx];
    setWinners((prev) => [...prev, winner]);
  }, [availableForWin, winners.length]);

  // Видалення переможця
  const removeWinner = useCallback((id: string) => {
    setWinners((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return (
    <div className="container py-4">
      <header className="mb-4 text-center">
        <h1 className="fw-bold">🎟️ Lottery App</h1>
        <p className="text-muted">React + TypeScript + Bootstrap</p>
      </header>

      <div className="row g-4">
        {/* Блок переможців */}
        <div className="col-lg-4">
          <Winners
            participants={participants}
            winners={winners}
            onAddWinner={addWinner}
            onRemoveWinner={removeWinner}
          />
        </div>

        {/* Форма + таблиця */}
        <div className="col-lg-8">
          <RegistrationForm onAdd={handleAddParticipant} isDuplicate={isDuplicate} />
          <div className="mt-4">
            <ParticipantsTable participants={participants} />
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 text-muted small">
        &copy; {new Date().getFullYear()} Lottery App
      </footer>
    </div>
  );
}
