import { useMemo } from 'react';
import type { Participant } from '../types';

type Props = {
  participants: Participant[];
  winners: Participant[];
  onAddWinner: () => void;
  onRemoveWinner: (id: string) => void;
};

export default function Winners({ participants, winners, onAddWinner, onRemoveWinner }: Props) {
  const isDisabled = useMemo(() => {
    const maxReached = winners.length >= 3;
    const noUsers = participants.length === 0;
    const allSelected = participants.length > 0 && winners.length >= participants.length;
    return maxReached || noUsers || allSelected;
  }, [participants.length, winners.length]);

  return (
    <div className="p-4 bg-light rounded-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Переможці</h2>
        <button
          onClick={onAddWinner}
          className="btn btn-success"
          disabled={isDisabled}
        >
          New winner
        </button>
      </div>

      {winners.length === 0 ? (
        <p className="text-muted">Ще немає переможців.</p>
      ) : (
        <ul className="list-group">
          {winners.map((w) => (
            <li key={w.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{w.fullName}</strong> <br />
                <small className="text-muted">{w.email} | {w.phone}</small>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onRemoveWinner(w.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
