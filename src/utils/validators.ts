export const emailRegex = /^[\w.!#$%&'*+/=?^`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const phoneRegex = /^\+?[0-9]{10,14}$/;

export function isPastOrToday(dateStr: string): boolean {
  if (!dateStr) return false;
  const input = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return input.getTime() <= today.getTime();
}

export function uuid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export const normalizeEmail = (email: string) => (email || '').trim().toLowerCase();
export const normalizePhone = (phone: string) => (phone || '').trim().replace(/\D/g, '');
