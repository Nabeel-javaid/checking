import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/contact.css';
import '../styles/bootstrap.min.css'; 

const ContactSection = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree URL
    const formspreeEndpoint = 'https://formspree.io/f/xbjnyvde';
    
    fetch(formspreeEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        console.log('Form successfully submitted');
        alert('Form submitted successfully!');
        reset(); // Clear form after successful submission
      } else {
        return response.json().then(errorData => {
          // Handle JSON error response
          throw new Error(errorData.error);
        });
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error.message);
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
        </div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>nabeeljaved944@gmail.com</p>
              </div>
              <i className="fa fa-telegram" style={{ fontSize: '36px', color: 'skyblue' }}></i>
              <div className="message">
                <h4>Telegram:</h4>
                <p>@code4renawarden</p>
              </div>
              <div className="github">
                <i className="bi bi-github"></i>
                <h4>GitHub:</h4>
                <p>@Nabeel-javaid</p>
              </div>
              <i className="bi bi-discord"></i>
              <div className="Discord">
                <h4>Discord:</h4>
                <p>0xepley</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form onSubmit={handleSubmit(onSubmit)} role="form" className="php-email-form" id="contact-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" {...register('name', { required: true })} className="form-control" id="name" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" {...register('email', { required: true })} className="form-control" id="email" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <textarea {...register('subject', { required: true })} className="form-control" rows="1"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea {...register('message', { required: true })} className="form-control" rows="10"></textarea>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
