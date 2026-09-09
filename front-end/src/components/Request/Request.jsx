import React from 'react'
import { useState, forwardRef } from "react";
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import "./Request.css"

// один вариант на выбор — радиокнопки, а не галочки
const SESSION_TYPES = [
  { value: 'wedding', label: 'Wedding session' },
  { value: 'love', label: 'Love story' },
  { value: 'family', label: 'Family vibe' },
  { value: 'other', label: 'Other — tell me below' },
];

const radioStyle = {
  color: '#F2EDE6',
  '&.Mui-checked': { color: '#FFFFFF' },
  '& .MuiSvgIcon-root': { fontSize: 22 },
};

const Request = forwardRef((props, ref) => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "", sessionType: "wedding" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSessionTypeChange = (event) => {
    setFormData((prevFormData) => ({ ...prevFormData, sessionType: event.target.value }));
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, sessionType } = formData;
    const typeLabel = (SESSION_TYPES.find((t) => t.value === sessionType) || {}).label || '—';

    const mm = `📸Новая заявка на фотосессию от <b>${name}</b> \nemail: ${email}\nТип съёмки: ${typeLabel}\nидеи клиента: ${message}`;

    const body = {
      chat_id: 333260928,
      text: mm,
      parse_mode: 'HTML'
    };


    const response = await fetch('https://api.telegram.org/bot6519972699:AAGaXEUZ8VamvNa1Ynsr-2ILxfgKI8D6ePY/sendMessage', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    console.log(result)
  }

  return (
    <section ref={ref} id='request'>
      <div className='wrapper'>
        <div className='first_block'>
          <div className='header_section'>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
              <path d="M6.73881 32.1315L12.1621 32.9175L34.9297 15.9133L30.2921 9.70397L7.52455 26.7081L6.73881 32.1315Z" stroke="#F2EDE6" strokeWidth="2" strokeLinejoin="round" />
              <path d="M24.084 14.3418L32.7215 20.5512" stroke="#F2EDE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18.4219" y="31.3848" width="2.90137" height="2.90137" transform="rotate(8.24544 18.4219 31.3848)" fill="#F2EDE6" />
              <rect x="22.3799" y="31.959" width="2.90137" height="2.90137" transform="rotate(8.24544 22.3799 31.959)" fill="#F2EDE6" />
              <rect x="26.3389" y="32.5312" width="2.90137" height="2.90137" transform="rotate(8.24544 26.3389 32.5312)" fill="#F2EDE6" />
            </svg>
            <h2>Let me tell your story</h2>
          </div>
          <p>We’re just one click away from capturing stunning moments of your life. Please, fill out the form to share insights about your session. Or your favorite ice cream flavor.
            Either way, I’d love to talk!</p>
        </div>
        <div className='request_block'>
          <form onSubmit={handleSubmit}>
            <div className='form_col form_col_left'>

              <div className='field_name'>Name</div>
              <div><input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange}></input></div>
              <div className='field_name'>I’m looking for:</div>

              <div className='checkboxes'>
                {SESSION_TYPES.map((type) => (
                  <label className='session_type' key={type.value}>
                    <Radio
                      name='sessionType'
                      value={type.value}
                      checked={formData.sessionType === type.value}
                      onChange={handleSessionTypeChange}
                      inputProps={{ 'aria-label': type.label }}
                      sx={radioStyle}
                    />
                    <span className='checkbox_name'>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className='form_col form_col_right'>
              <div className='field_name' id='emailField'>Email</div>
              <div className='emailInput'><input type="text" id="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange}></input></div>
              <div className='field_name'>Tell me your ideas</div>
              <textarea name="message" id='message' value={formData.message} onChange={handleChange} placeholder='e.g. I’d rather not make choices, I simply want to have the most amazing photo session of my life' ></textarea>
              <div className='buttondiv'><button className='btn' type="submit">Send</button></div>
            </div>

          </form>
        </div>

      </div>
    </section >
  )
});

export default Request