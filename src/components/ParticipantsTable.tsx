import React, { useMemo } from 'react';
import type { Participant } from '../types';
import Button from '../components/ui/Buttoon';

type SortKey = 'fullName' | 'birthDate';
type SortDir = 'asc' | 'desc';

type Props = {
  participants: Participant[];
  filterName: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSortChange: (key: SortKey, dir: SortDir) => void;
  onEdit: (p: Participant) => void;
  onDelete: (p: Participant) => void;
};

export default function ParticipantsTable({
  participants,
  filterName,
  sortKey,
  sortDir,
  onSortChange,
  onEdit,
  onDelete,
}: Props) {
  // 🔍 Фільтрація та сортування
  const filteredSorted = useMemo(() => {
    const q = filterName.trim().toLowerCase();

    let arr = q
      ? participants.filter((p) => p.fullName.toLowerCase().includes(q))
      : [...participants];

    arr.sort((a, b) => {
      let A: string = a[sortKey];
      let B: string = b[sortKey];
      if (sortKey === 'fullName') {
        A = A.toLowerCase();
        B = B.toLowerCase();
      }
      if (A < B) return sortDir === 'asc' ? -1 : 1;
      if (A > B) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return arr;
  }, [participants, filterName, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key !== sortKey) onSortChange(key, 'asc');
    else onSortChange(key, sortDir === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="p-4 bg-light rounded-3 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Список учасників</h2>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => toggleSort('fullName')}
          >
            Ім’я {sortKey === 'fullName' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => toggleSort('birthDate')}
          >
            Дата {sortKey === 'birthDate' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
          </Button>
        </div>
      </div>

      {filteredSorted.length === 0 ? (
        <p className="text-muted">Поки що немає учасників.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ПІБ</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Дата народження</th>
                <th className="text-center">Редагувати</th>
                <th className="text-center">Видалити</th>
              </tr>
            </thead>
            <tbody>
              {filteredSorted.map((p) => (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.birthDate}</td>
                  <td className="text-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(p)}
                    >
                      ✎ Edit
                    </Button>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(p)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
