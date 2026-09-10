import type { ChangeEvent } from 'react';
import './FormField.css';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  as?: 'input' | 'textarea';
  placeholder?: string;
  error?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  as = 'input',
  placeholder,
  error,
}: FormFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(event.target.value);

  return (
    <div className={`form-field ${error ? 'form-field--invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {as === 'textarea' ? (
        <textarea id={name} name={name} value={value} placeholder={placeholder} rows={4} onChange={handleChange} />
      ) : (
        <input id={name} name={name} type={type} value={value} placeholder={placeholder} onChange={handleChange} />
      )}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
