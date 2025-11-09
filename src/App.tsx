import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import ParticipantsTable from './components/ParticipantsTable';
import Winners from './components/Winners';
import Modal from './components/Modal';
import type { Participant } from './types';

// допоміжні функції
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizePhone = (phone: string) => phone.trim().replace(/\D/g, '');

type SortKey = 'fullName' | 'birthDate';
type SortDir = 'asc' | 'desc';

export default function App() {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('participants');
    return saved ? JSON.parse(saved) : [];
  });

  const [winners, setWinners] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('winners');
    return saved ? JSON.parse(saved) : [];
  });

  const [filterName, setFilterName] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('fullName');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [editing, setEditing] = useState<Participant | null>(null);

  // збереження у localStorage при зміні
  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('winners', JSON.stringify(winners));
  }, [winners]);

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

  // ✏️ Початок редагування
  const handleEdit = (p: Participant) => {
    setEditing(p);
  };

  // 💾 Оновлення даних
  const handleUpdate = (updated: Participant) => {
    setParticipants((prev) =>
      prev.map((x) => (x.id === updated.id ? updated : x))
    );
    setEditing(null);
  };

  // ❌ Видалення учасника
  const handleDelete = (p: Participant) => {
    if (
      confirm(`Ви дійсно бажаєте видалити учасника "${p.fullName}" (${p.email})?`)
    ) {
      setParticipants((prev) => prev.filter((x) => x.id !== p.id));
      setWinners((prev) => prev.filter((w) => w.id !== p.id));
    }
  };

  // сортування
  const onSortChange = (key: SortKey, dir: SortDir) => {
    setSortKey(key);
    setSortDir(dir);
  };

  // фільтр за іменем
  const handleFilter = (name: string) => setFilterName(name);

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
            <ParticipantsTable
              participants={participants}
              filterName={filterName}
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={onSortChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* 🧩 Модальне вікно редагування */}
      <Modal
        title="Редагування учасника"
        isOpen={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editing);
            }}
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">ПІБ</label>
              <input
                type="text"
                className="form-control"
                value={editing.fullName}
                onChange={(e) =>
                  setEditing({ ...editing, fullName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={editing.email}
                onChange={(e) =>
                  setEditing({ ...editing, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Телефон</label>
              <input
                type="tel"
                className="form-control"
                value={editing.phone}
                onChange={(e) =>
                  setEditing({ ...editing, phone: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Дата народження</label>
              <input
                type="date"
                className="form-control"
                value={editing.birthDate}
                onChange={(e) =>
                  setEditing({ ...editing, birthDate: e.target.value })
                }
              />
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary me-2">
                Оновити
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditing(null)}
              >
                Скасувати
              </button>
            </div>
          </form>
        )}
      </Modal>

      <footer className="text-center mt-5 text-muted small">
        &copy; {new Date().getFullYear()} Lottery App
      </footer>
    </div>
  );
}
