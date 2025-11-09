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

/** Приводимо email до нижнього регістру і обрізаємо пробіли */
export function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}

/** Залишаємо тільки цифри і, якщо була, початковий + */
export function normalizePhone(phone: string): string {
  const trimmed = (phone || '').trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}
