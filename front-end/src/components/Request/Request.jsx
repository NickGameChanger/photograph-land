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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    console.log(result);
  }


  return (
    <section ref={ref} id='request'>
      <div className='wrapper'>
        <div className='first_block'>
          <div className='header_section'>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
              <path d="M6.73881 32.1315L12.1621 32.9175L34.9297 15.9133L30.2921 9.70397L7.52455 26.7081L6.73881 32.1315Z" stroke="#515151" strokeWidth="2" strokeLinejoin="round" />
              <path d="M24.084 14.3418L28.7215 20.5512" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <table id='first_table'>
              <tr>
                <th>Name</th>
                <th></th>
                <th>Email</th>
              </tr>
              <tr id='empty_line1'>
              </tr>
              <tr>
                <td><input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange}></input></td>
                <td></td>
                <td><input type="text" id="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange}></input></td>
              </tr>
              <tr id='empty_line2'>
              </tr>
              <tr>
                <td>I’m looking for:</td>
                <td></td>
                <td>Tell me your ideas</td>
              </tr>
              <tr id='empty_line1'>
              </tr>

            </table>
            <table id='second_table'>
              <tr>
                <td>
                  <Checkbox {...label} defaultChecked name="isWedding" checked={formData.isWedding} onChange={handleCheckboxChange} sx={
                    {
                      color: '#FFF',
                      '&.Mui-checked': {
                        color: '#BBA591',
                      },
                      '& .MuiSvgIcon-root': { fontSize: 28 }
                    }
                  } />
                </td>
                <td>Wedding session</td>
              </tr>
              <tr id='empty_line3'>
              </tr>
              <tr>
                <td>
                  <Checkbox {...label} name="isLoveStory" checked={formData.isLoveStory} onChange={handleCheckboxChange} sx={
                    {
                      color: '#FFF',
                      '&.Mui-checked': {
                        color: '#BBA591',
                      },
                      '& .MuiSvgIcon-root': { fontSize: 28 }
                    }
                  } />
                </td>
                <td>Love story</td>
              </tr>
              <tr id='empty_line3'>
              </tr>
              <tr>
                <td>
                  <Checkbox {...label} name="isFamily" checked={formData.isFamily} onChange={handleCheckboxChange} sx={
                    {
                      color: '#FFF',
                      '&.Mui-checked': {
                        color: '#BBA591',
                      },
                      '& .MuiSvgIcon-root': { fontSize: 28 }
                    }
                  } />
                </td>
                <td>Family vibe</td>
              </tr>

            </table>
            <button className='btn' type="submit">Send</button>
            <textarea name="message" id='message' value={formData.message} onChange={handleChange} placeholder='e.g. I’d rather not make choices, I simply want to have the most amazing photo session of my life' ></textarea>
          </form>
        </div>

      </div>
    </section >
  )
});

export default Request