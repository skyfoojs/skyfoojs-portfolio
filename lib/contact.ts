/** Shared validation for the contact form (client) and /api/contact (server). */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
  messageMin: 10,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name) errors.name = `Keep it under ${CONTACT_LIMITS.name} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";

  if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Keep it under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}
