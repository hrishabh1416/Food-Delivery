import React, { useState } from 'react';
import './Contactform.css';
import { toast } from 'react-toastify';

const Contactform = ({ setshowcontact }) => {
  const [data, setdata] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.message) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("access_key", "86d2a638-2052-4bcc-a331-a97c0ab68a73"); // ✅ your Web3Forms key
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        setdata({ name: '', email: '', message: '' }); // reset local state
        setshowcontact(false);
      } else {
        toast.error("Failed to send message");
        console.error(result.message);
      }
    } catch (err) {
      toast.error("Error sending message");
      console.error(err);
    }
  };

  return (
    <div className="contact-overlay">
      <div className="contact-popup">
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <label>Full Name</label>
            <input
              type='text'
              name='name'
              value={data.name}
              className='field'
              placeholder='Enter your name'
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-box'>
            <label>Email Address</label>
            <input
              type='email'
              name='email'
              value={data.email}
              className='field'
              placeholder='Enter your email'
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-box'>
            <label>Your Message</label>
            <textarea
              name='message'
              value={data.message}
              className='field mess'
              placeholder='Enter your message'
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className='btn-group'>
            <button type='submit'>Send Message</button>
            <button type='button' onClick={() => setshowcontact(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contactform;
