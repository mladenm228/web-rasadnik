import { useState, type FormEvent } from 'react';
import { FormField } from '../components/FormField';
import { Button } from '../components/Button';
import { FormValidator } from '../models/FormValidator';
import { useNotification } from '../context/NotificationContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: ContactForm = { name: '', email: '', phone: '', message: '' };

/** Kontakt forma sa ručnom validacijom preko FormValidator klase. */
export function Contact() {
  useDocumentTitle('Kontakt');
  const { notify } = useNotification();
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof ContactForm) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactForm, string>> = {
      name: FormValidator.firstError(FormValidator.required(form.name, 'Ime')),
      email: FormValidator.firstError(
        FormValidator.required(form.email, 'Email'),
        FormValidator.email(form.email),
      ),
      phone: form.phone ? FormValidator.firstError(FormValidator.phone(form.phone)) : undefined,
      message: FormValidator.firstError(
        FormValidator.required(form.message, 'Poruka'),
        FormValidator.minLength(form.message, 10, 'Poruka'),
      ),
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    notify('Poruka je uspešno poslata. Javićemo vam se uskoro!', 'success');
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <div className="contact">
      <div className="contact__intro">
        <h1>Kontaktirajte nas</h1>
        <p>
          Imate pitanje o nezi biljaka ili porudžbini? Pošaljite nam poruku i odgovorićemo u
          najkraćem roku.
        </p>
        <ul className="contact__details">
          <li>📍 Bulevar Cvetne 12, Beograd</li>
          <li>✉️ kontakt@webrasadnik.rs</li>
          <li>📞 011 234 5678</li>
        </ul>
      </div>

      <form className="contact__form" onSubmit={handleSubmit} noValidate>
        <FormField label="Ime i prezime" name="name" value={form.name} onChange={setField('name')} error={errors.name} />
        <FormField label="Email" name="email" type="email" value={form.email} onChange={setField('email')} error={errors.email} />
        <FormField label="Telefon (opciono)" name="phone" value={form.phone} onChange={setField('phone')} error={errors.phone} />
        <FormField
          label="Poruka"
          name="message"
          as="textarea"
          value={form.message}
          onChange={setField('message')}
          error={errors.message}
        />

        <Button type="submit">Pošalji poruku</Button>
        {submitted && <p className="contact__success">Hvala, poruka je poslata!</p>}
      </form>
    </div>
  );
}
