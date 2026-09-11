import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value) {
    return null;
  }

  const normalized = value.replace(/[\s()-]/g, '');

  const phoneRegex = /^\+?\d{10,15}$/;

  const isValid = phoneRegex.test(normalized);

  if (!isValid) {
    return {
      invalidPhone: true,
    };
  }

  return null;
}
