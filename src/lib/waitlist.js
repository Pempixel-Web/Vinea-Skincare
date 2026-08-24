import { supabase } from './supabaseClient';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose international phone check: digits, spaces, +, -, ( ) — 7 to 15 digits.
const PHONE_DIGIT_REGEX = /\D/g;

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function validateEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return { valid: false, message: 'Enter your email address.' };
  if (!EMAIL_REGEX.test(normalized)) {
    return { valid: false, message: 'Enter a valid email address.' };
  }
  return { valid: true, value: normalized };
}

export function validatePhone(phone) {
  const trimmed = String(phone || '').trim();
  if (!trimmed) return { valid: true, value: null }; // optional field
  const digits = trimmed.replace(PHONE_DIGIT_REGEX, '');
  if (digits.length < 7 || digits.length > 15) {
    return { valid: false, message: 'Enter a valid phone number, or leave it blank.' };
  }
  return { valid: true, value: trimmed };
}

export function validateName(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return { valid: false, message: 'Enter your name.' };
  return { valid: true, value: trimmed };
}

const UNIQUE_VIOLATION_CODE = '23505';

/**
 * Submits a waitlist entry to Supabase.
 * Requires a UNIQUE constraint on vinea_waitlist.email (see README / RLS
 * setup) so duplicate detection works without granting SELECT access.
 *
 * Returns: { status: 'success' | 'duplicate' | 'error', message? }
 */
export async function submitWaitlistEntry({ name, email, phone }) {
  const nameCheck = validateName(name);
  if (!nameCheck.valid) return { status: 'error', message: nameCheck.message };

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return { status: 'error', message: emailCheck.message };

  const phoneCheck = validatePhone(phone);
  if (!phoneCheck.valid) return { status: 'error', message: phoneCheck.message };

  try {
    const { error } = await supabase.from('vinea_waitlist').insert({
      name: nameCheck.value,
      email: emailCheck.value,
      phone: phoneCheck.value,
      instagram_joined: false,
      source: 'instagram_ugc',
    });

    if (error) {
      if (error.code === UNIQUE_VIOLATION_CODE) {
        return { status: 'duplicate' };
      }
      // eslint-disable-next-line no-console
      console.error('[Vinea] Waitlist insert failed:', error);
      return {
        status: 'error',
        message: "Something went wrong on our end. Please try again in a moment.",
      };
    }

    return { status: 'success' };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Vinea] Waitlist network error:', err);
    return {
      status: 'error',
      message: 'We couldn{"\u2019"}t reach the server. Check your connection and try again.',
    };
  }
}
