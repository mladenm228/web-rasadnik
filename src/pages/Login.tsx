import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormField } from '../components/FormField';
import { Button } from '../components/Button';
import { FormValidator } from '../models/FormValidator';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Login.css';

interface LocationState {
  from?: string;
}

/**
 * Jednostavna prijava (bez pravog backend-a): validira ime i email,
 * a zatim korisnika vraća na stranicu sa koje je preusmeren (ProtectedRoute).
 */
export function Login() {
  useDocumentTitle('Prijava');
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = {
      name: FormValidator.firstError(FormValidator.required(name, 'Ime')),
      email: FormValidator.firstError(
        FormValidator.required(email, 'Email'),
        FormValidator.email(email),
      ),
    };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email) return;

    login(name, email);
    notify(`Dobrodošli, ${name.split(' ')[0]}!`, 'success');
    navigate(state?.from ?? '/');
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <h1>Prijava</h1>
        <p className="login__hint">
          Prijavite se kako biste imali pristup listi omiljenih biljaka.
        </p>

        <FormField label="Ime i prezime" name="name" value={name} onChange={setName} error={errors.name} />
        <FormField label="Email" name="email" type="email" value={email} onChange={setEmail} error={errors.email} />

        <Button type="submit">Prijavi se</Button>
      </form>
    </div>
  );
}
