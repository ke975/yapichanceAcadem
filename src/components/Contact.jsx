import React, { useState } from 'react';
import '../assets/css/Contact.css';

function Contact() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here, e.g., sending data to a server
    console.log('Form data:', contact);
    // Reset form after submission
    setContact({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title mt-4">
          <h2 className='text-center '>Contactános</h2>
          <p className='text-center'>Centro de Educación Continua Yapichance | Cursos de Marketing Digital,Desarrollo Web,Diseño Gráfico y Inseminación Artificial "
#CentrodeEducacionContinuaYapichance
#CursosOnline#CursosPracticos
#CursosSemipresenciales
</p>
        </div>

        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
              <i className="bx bx-current-location"></i> 
                <h4>Ubicación:</h4>
                <p>De los Semáforos de Enabas una cuadra al este y media al sur, Estelí.</p>
              </div>

              <div className="email">
                <i className="bx bx-mail-send"></i>
                <h4>Coreo electronico:</h4>
                <p>yapichance.academy@gmail.com</p>
              </div>

              <div className="phone">
                <i className="bx bx-phone"></i>
                <h4>llamanos:</h4>
                <p>+505 8695-0225</p>
              </div>

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.9298481564383!2d-86.35724506829031!3d13.081167295492037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f718c6a364b44c7%3A0xd8463b72c5c1c168!2sC.%209%20SE%2C%20Estel%C3%AD!5e0!3m2!1sen!2sni!4v1735935766177!5m2!1sen!2sni"
                frameBorder="0" 
                style={{border:0, width: '100%', height: '290px'}} 
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Nombre Completo </label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    required 
                    value={contact.name} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Correo Electronico </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    required 
                    value={contact.email} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Asunto </label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="subject" 
                  id="subject" 
                  required 
                  value={contact.subject} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje </label>
                <textarea 
                  className="form-control" 
                  name="message" 
                  rows="10" 
                  required 
                  value={contact.message} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center">
                <button type="submit">Enviar mensaje </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
