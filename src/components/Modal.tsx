import React, { useEffect, ReactNode } from 'react';
import Button from '../components/ui/Buttoon';

type Props = {
  title?: string;
  onClose: () => void;
  footer?: ReactNode;
  isOpen: boolean;
  children?: ReactNode;
};

export default function Modal({ title, onClose, footer, isOpen, children }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
      <div className="modal-dialog modal-dialog-centered" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title m-0">{title}</h5>
            <Button variant="outline-secondary" onClick={onClose} aria-label="Close">
              ✕
            </Button>
          </div>
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
