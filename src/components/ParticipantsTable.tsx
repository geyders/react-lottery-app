import type { Participant } from '../types';

type Props = { participants: Participant[] };

export default function ParticipantsTable({ participants }: Props) {
  return (
    <div className="p-4 bg-light rounded-3 shadow-sm">
      <h2 className="mb-3">Список учасників</h2>
      {participants.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
