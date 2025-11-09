import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
  id: string;
};

export default function Input({ error, label, id, ...rest }: Props) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-semibold">
          {label}
        </label>
      )}
      <input id={id} className={`form-control ${error ? 'is-invalid' : ''}`} {...rest} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
