import { useState } from 'react';
import {
  emailRegex,
  phoneRegex,
  isPastOrToday,
  uuid,
} from '../utils/validators';
import type { Participant } from '../types';
import FormField from './FormField';

type RegistrationFormData = Omit<Participant, 'id'>;

const empty: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
};

type DuplicateResult = { email: boolean; phone: boolean };

type Props = {
  onAdd: (p: Participant) => void;
  isDuplicate: (data: RegistrationFormData) => DuplicateResult;
};

export default function RegistrationForm({ onAdd, isDuplicate }: Props) {
  const [data, setData] = useState<RegistrationFormData>({ ...empty });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (field: keyof RegistrationFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (d: RegistrationFormData): Record<string, string> => {
    const e: Record<string, string> = {};

    if (!d.fullName.trim()) e.fullName = 'Введіть ПІБ';
    if (!d.email.trim()) e.email = 'Введіть email';
    else if (!emailRegex.test(d.email)) e.email = 'Некоректний email';
    if (!d.phone.trim()) e.phone = 'Введіть телефон';
    else if (!phoneRegex.test(d.phone)) e.phone = 'Некоректний телефон';
    if (!d.birthDate.trim()) e.birthDate = 'Оберіть дату народження';
    else if (!isPastOrToday(d.birthDate)) e.birthDate = 'Дата не може бути з майбутнього';

    // ✅ Перевірка на дублікати лише якщо базова валідація пройдена
    if (Object.keys(e).length === 0) {
      const dup = isDuplicate(d);
      if (dup.email) e.email = 'Користувач з таким email вже існує';
      if (dup.phone) e.phone = 'Користувач з таким телефоном вже існує';
    }

    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // все добре — додаємо
      onAdd({ id: uuid(), ...data });
      // очищення
      setData({ ...empty });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded-3 shadow-sm">
      <h2 className="mb-3">Реєстрація нового учасника</h2>

      <FormField label="ПІБ" htmlFor="fullName" error={errors.fullName}>
        <input
          id="fullName"
          className="form-control"
          value={data.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
        />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email}>
        <input
          id="email"
          type="email"
          className="form-control"
          value={data.email}
          onChange={(e) => setField('email', e.target.value)}
        />
      </FormField>

      <FormField label="Телефон" htmlFor="phone" error={errors.phone}>
        <input
          id="phone"
          type="tel"
          className="form-control"
          placeholder="+380XXXXXXXXX"
          value={data.phone}
          onChange={(e) => setField('phone', e.target.value)}
        />
      </FormField>

      <FormField label="Дата народження" htmlFor="birthDate" error={errors.birthDate}>
        <input
          id="birthDate"
          type="date"
          className="form-control"
          value={data.birthDate}
          onChange={(e) => setField('birthDate', e.target.value)}
        />
      </FormField>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
