import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline-danger' | 'outline-secondary';
  size?: 'sm' | 'md';
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: PropsWithChildren<Props>) {
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const v = variant.startsWith('outline-') ? `btn btn-${variant}` : `btn btn-${variant}`;
  return (
    <button className={`${v} ${sizeClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
