import type { Participant } from '../types';
import Button from '../components/ui/Buttoon';

type Props = {
  winner: Participant;
  onRemove: (id: string) => void;
};

export default function WinnerItem({ winner, onRemove }: Props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{winner.fullName}</strong><br />
        <small className="text-muted">{winner.email} | {winner.phone}</small>
      </div>
      <Button variant="outline-danger" size="sm" onClick={() => onRemove(winner.id)}>Remove</Button>
    </li>
  );
}
