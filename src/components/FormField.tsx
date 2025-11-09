import type { PropsWithChildren } from 'react';

type BaseProps = {
  label: string;
  htmlFor: string;
  error?: string;
};

export default function FormField({
  label,
  htmlFor,
  error,
  children,
}: PropsWithChildren<BaseProps>) {
  return (
    <div className="mb-3">
      <label htmlFor={htmlFor} className="form-label fw-semibold">
        {label}
      </label>
      {children}
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
}
