import React from 'react'
import { useState, forwardRef } from "react";
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import "./Request.css"

const Request = forwardRef((props, ref) => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [formData, setFormData] = useState({ name: "", email: "", message: "", isWedding: true, isLoveStory: false, isFamily: false });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, isWedding, isLoveStory, isFamily } = formData;

    let mm = `📸Новая заявка на фотосессию от <b>${name}</b> \nemail: ${email}\nидеи клиента: ${message}\nКлиент выразил желание к: \n`;
    if (isWedding) {
      mm += '🤵👰🏻Wedding session\n'
    }
    if (isLoveStory) {
      mm += '👩‍❤️‍👨Love story\n'
    }
    if (isFamily) {
      mm += '👨‍👩‍👦‍👦Family vibe'
    }
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
              <path d="M6.73881 32.1315L12.1621 32.9175L34.9297 15.9133L30.2921 9.70397L7.52455 26.7081L6.73881 32.1315Z" stroke="#515151" strokeWidth="2" strokeLinejoin="round" />
              <path d="M24.084 14.3418L32.7215 20.5512" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18.4219" y="31.3848" width="2.90137" height="2.90137" transform="rotate(8.24544 18.4219 31.3848)" fill="#515151" />
              <rect x="22.3799" y="31.959" width="2.90137" height="2.90137" transform="rotate(8.24544 22.3799 31.959)" fill="#515151" />
              <rect x="26.3389" y="32.5312" width="2.90137" height="2.90137" transform="rotate(8.24544 26.3389 32.5312)" fill="#515151" />
            </svg>
            <h2>Let me tell your story</h2>
          </div>
          <p>We’re just one click away from capturing stunning moments of your life. Please, fill out the form to share insights about your session. Or your favorite ice cream flavor.
            Either way, I’d love to talk!</p>
        </div>
        <div className='request_block'>
          <form onSubmit={handleSubmit}>

            <div className='field_name'>Name</div>
            <div><input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange}></input></div>
            <div className='field_name'>I’m looking for:</div>

            <div className='checkboxes'>
              <div className='session_type'>
                <Checkbox {...label} defaultChecked name="isWedding" checked={formData.isWedding} onChange={handleCheckboxChange} sx={
                  {
                    color: '#FFF',
                    '&.Mui-checked': {
                      color: '#BBA591',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                  }
                } />
                <div className='checkbox_name'>Wedding session</div>
              </div>

              <div className='session_type'>
                <Checkbox {...label} name="isLoveStory" checked={formData.isLoveStory} onChange={handleCheckboxChange} sx={
                  {
                    color: '#FFF',
                    '&.Mui-checked': {
                      color: '#BBA591',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                  }
                } />
                <div className='checkbox_name'>Love story</div>
              </div>

              <div className='session_type'>
                <Checkbox {...label} name="isFamily" checked={formData.isFamily} onChange={handleCheckboxChange} sx={
                  {
                    color: '#FFF',
                    '&.Mui-checked': {
                      color: '#BBA591',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 32 }
                  }
                } />
                <div className='checkbox_name'>Family vibe</div>
              </div>
            </div>

            <div className='field_name' id='emailField'>Email</div>
            <div className='emailInput'><input type="text" id="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange}></input></div>
            <div className='field_name'>Tell me your ideas</div>
            <textarea name="message" id='message' value={formData.message} onChange={handleChange} placeholder='e.g. I’d rather not make choices, I simply want to have the most amazing photo session of my life' ></textarea>
            <div className='buttondiv'><button className='btn' type="submit">Send</button></div>

          </form>
        </div>

      </div>
    </section >
  )
});

export default Request