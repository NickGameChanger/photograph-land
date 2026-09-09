import { useState, forwardRef } from "react";
import "./Request.css"

// один вариант на выбор; love story и family — основная аудитория, поэтому первыми
const SESSION_TYPES = [
  { value: 'love', label: 'Love story' },
  { value: 'family', label: 'Family' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'other', label: 'Something else' },
];

const WHATSAPP_URL = 'https://wa.me/381638013904';

const Request = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", sessionType: "love" });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const { name, email, message, sessionType } = formData;
    const typeLabel = (SESSION_TYPES.find((t) => t.value === sessionType) || {}).label || '—';
    const text = `📸Новая заявка на фотосессию от <b>${name}</b> \nemail: ${email}\nТип съёмки: ${typeLabel}\nидеи клиента: ${message}`;

    try {
      const response = await fetch('https://api.telegram.org/bot6519972699:AAGaXEUZ8VamvNa1Ynsr-2ILxfgKI8D6ePY/sendMessage', {
        method: 'POST',
        body: JSON.stringify({ chat_id: 333260928, text, parse_mode: 'HTML' }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('telegram');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id='request'>
      <div className='wrapper'>

        <div className='request_intro' data-reveal>
          <div className='eyebrow'>Let’s talk</div>
          <h2>Let me tell your story</h2>
          <p className='request_lead'>
            Tell me a little about you — who you are, what you’d love to remember, and when.
            I’ll reply within a day with ideas and free dates.
          </p>

          <ul className='request_facts'>
            <li>Reply within 24 hours</li>
            <li>Sessions in Belgrade and around</li>
            <li>Photos ready within 2 weeks</li>
          </ul>

          <a className='request_alt' href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
            Prefer chatting? Write me on WhatsApp
            <span aria-hidden='true'> →</span>
          </a>
        </div>

        <div className='request_block' data-reveal style={{ '--reveal-delay': '120ms' }}>
          {status === 'sent' ? (
            <div className='request_done'>
              <div className='request_done_title'>Thank you, {formData.name || 'friend'}!</div>
              <p>
                Your message is with me. I usually answer the same day — check your inbox
                (and the spam folder, just in case).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='form_row'>
                <div className='form_field'>
                  <label className='field_name' htmlFor='name'>Your name</label>
                  <input type="text" id="name" name="name" placeholder="How should I call you?"
                    value={formData.name} onChange={handleChange} required autoComplete='name' />
                </div>
                <div className='form_field'>
                  <label className='field_name' htmlFor='email'>Email</label>
                  <input type="email" id="email" name="email" placeholder="So I can reply"
                    value={formData.email} onChange={handleChange} required autoComplete='email' />
                </div>
              </div>

              <div className='form_field'>
                <div className='field_name'>What are we shooting?</div>
                <div className='type_pills' role='radiogroup' aria-label='Session type'>
                  {SESSION_TYPES.map((type) => (
                    <button
                      type='button'
                      key={type.value}
                      role='radio'
                      aria-checked={formData.sessionType === type.value}
                      className={formData.sessionType === type.value ? 'pill active' : 'pill'}
                      onClick={() => setFormData((prev) => ({ ...prev, sessionType: type.value }))}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='form_field'>
                <label className='field_name' htmlFor='message'>Tell me your ideas</label>
                <textarea name="message" id='message' value={formData.message} onChange={handleChange}
                  placeholder='Where, when, who — or just say hi. We’ll figure out the rest together.' />
              </div>

              <div className='form_actions'>
                <button className='btn' type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>
                <span className='form_hint'>
                  {status === 'error'
                    ? 'Something went wrong — please write me on WhatsApp instead.'
                    : 'No newsletters, just a reply from me.'}
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  )
});

Request.displayName = 'Request';

export default Request
