import { useState } from 'react';

type Props = {
  onFilterByName: (name: string) => void; // подія догори
};

export default function SearchBar({ onFilterByName }: Props) {
  const [q, setQ] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterByName(q);
  };

  return (
    <form className="d-flex gap-2" onSubmit={onSubmit}>
      <input
        className="form-control"
        placeholder="Пошук за ім'ям…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="btn btn-outline-secondary" type="submit">Фільтрувати</button>
    </form>
  );
}
