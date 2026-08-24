import { useEffect, useRef, useState } from 'react';
import { submitWaitlistEntry } from '../lib/waitlist';
import { track } from '../lib/analytics';
import { ANALYTICS_EVENTS, INSTAGRAM_PRIORITY_WAITLIST_URL } from '../config/site';
import './WaitlistForm.css';

const INITIAL_STATE = { name: '', email: '', phone: '' };

export default function WaitlistForm({ id = 'waitlist-form', compact = false }) {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | duplicate | error
  const [statusMessage, setStatusMessage] = useState('');
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    track(ANALYTICS_EVENTS.WAITLIST_FORM_VIEW, { formId: id });
  }, [id]);

  function handleChange(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    const result = await submitWaitlistEntry(values);

    if (result.status === 'success') {
      setStatus('success');
      track(ANALYTICS_EVENTS.WAITLIST_SIGNUP, { formId: id });
      setValues(INITIAL_STATE);
    } else if (result.status === 'duplicate') {
      setStatus('duplicate');
    } else {
      setStatus('error');
      setStatusMessage(result.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success' || status === 'duplicate') {
    return (
      <div className="waitlist-form waitlist-form--confirmation" role="status">
        <p className="waitlist-form__confirm-title">
          {status === 'success'
            ? "You\u2019re officially on the Vinea Waitlist."
            : "You\u2019re already on the Vinea Waitlist."}
        </p>
        {status === 'success' && (
          <p className="waitlist-form__confirm-body">
            We{"\u2019"}ll keep you updated with Vinea launch news and early access.
          </p>
        )}
        <p className="waitlist-form__confirm-next">Want to stay even closer to the launch?</p>
        <a
          href={INSTAGRAM_PRIORITY_WAITLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline btn--block"
          onClick={() => track(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { formId: id, context: 'post-submit' })}
        >
          Join the Vinea Priority Waitlist 
        </a>
      </div>
    );
  }

  return (
    <form className={`waitlist-form ${compact ? 'waitlist-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={`${id}-email`}>Email address</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={`${id}-phone`}>
          Phone number <span className="field-hint">(optional)</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange('phone')}
        />
      </div>

      {status === 'error' && (
        <p className="field-error" role="alert">
          {statusMessage}
        </p>
      )}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining\u2026' : 'Secure My Priority Access'}
      </button>

      <p className="waitlist-form__microcopy">
      ✓ Free to join. Zero obligation. No credit card needed.
      </p>
    </form>
  );
}

