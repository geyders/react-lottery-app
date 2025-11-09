import { useMemo } from 'react';
import type { Participant } from '../types';
import Button from '../components/ui/Buttoon';
import WinnerItem from './WinnerItem';

type Props = {
  participants: Participant[];
  winners: Participant[];
  onAddWinner: () => void;
  onRemoveWinner: (id: string) => void;
};

export default function WinnersList({ participants, winners, onAddWinner, onRemoveWinner }: Props) {
  const disabled = useMemo(() => {
    const cap = winners.length >= 3;
    const empty = participants.length === 0;
    const allSelected = participants.length > 0 && winners.length >= Math.min(3, participants.length);
    return cap || empty || allSelected;
  }, [participants.length, winners.length]);

  return (
    <div className="p-4 bg-light rounded-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Переможці</h2>
        <Button variant="success" onClick={onAddWinner} disabled={disabled}>New winner</Button>
      </div>
      {winners.length === 0 ? (
        <p className="text-muted">Ще немає переможців.</p>
      ) : (
        <ul className="list-group">
          {winners.map((w) => (
            <WinnerItem key={w.id} winner={w} onRemove={onRemoveWinner} />
          ))}
        </ul>
      )}
    </div>
  );
}
