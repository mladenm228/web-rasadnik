export interface ValidationResult {
  valid: boolean;
  message?: string;
}


export class FormValidator {
  static required(value: string, fieldLabel: string): ValidationResult {
    if (!value || !value.trim()) {
      return { valid: false, message: `${fieldLabel} je obavezno polje.` };
    }
    return { valid: true };
  }

  static email(value: string): ValidationResult {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!pattern.test(value)) {
      return { valid: false, message: 'Unesite ispravnu email adresu.' };
    }
    return { valid: true };
  }

  static minLength(value: string, min: number, fieldLabel: string): ValidationResult {
    if (value.trim().length < min) {
      return { valid: false, message: `${fieldLabel} mora imati bar ${min} karaktera.` };
    }
    return { valid: true };
  }

  static phone(value: string): ValidationResult {
    const pattern = /^[0-9+\s-]{6,}$/;
    if (!pattern.test(value)) {
      return { valid: false, message: 'Unesite ispravan broj telefona.' };
    }
    return { valid: true };
  }

  static firstError(...results: ValidationResult[]): string | undefined {
    return results.find((r) => !r.valid)?.message;
  }
}
