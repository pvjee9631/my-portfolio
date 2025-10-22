import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    try {
      const response = await fetch('https://formspree.io/f/movkoaeo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New portfolio message from ${formData.name}`
        })
      });

      console.log('Formspree response status:', response.status);

      if (response.ok) {
        setFormStatus('✅ Message sent successfully! Thank you!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const result = await response.json();
        setFormStatus('❌ Error sending message. Please try again.');
        console.error('Formspree error:', result);
      }
      
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('❌ Network error. Please try again later.');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const scrollReveal = () => {
      const elements = document.querySelectorAll('.section__container');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    const elements = document.querySelectorAll('.section__container');
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', scrollReveal);
    scrollReveal();

    return () => {
      window.removeEventListener('scroll', scrollReveal);
    };
  }, []);

  return (
    <div className="App">
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Navigation */}
      <nav>
        <div className="nav__bar">
          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className="ri-menu-3-line"></i>
          </div>
        </div>
        <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
          <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#service" onClick={() => setIsMenuOpen(false)}>Service</a></li>
          <li><a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="section__container header__container" id="home">
        <div className="header__image">
          <img src="/assets/naruto-1.jpg" alt="header" />
        </div>
        <div className="header__content">
          <div>
            <h1>Welcome to My Portfolio</h1>
          </div>
          <p className="section__description">
            Creative Developer | Innovator | 2025
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className="section__container about__container" id="about">
        <div className="about__image">
          <img src="/assets/naruto-2.jpg" alt="about" className="about__img" />
        </div>
        <div className="about__content">
          <h2 className="section__header">Bit About Me</h2>
          <p className="section__description">
            「モンゴル出身で、横浜システム工学院専門学校のデータサイエンス科に在籍しています。
            フロントエンドからバックエンドまで幅広く学び、救急ダッシュボードというプロジェクトに取り組んでいます。
            HTML/CSS、JavaScript、PHP+MySQL、Pythonを中心に、ユーザー体験と読みやすいコードを大切にしています。」
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section__container service__container" id="service">
        <h2 className="section__header">My Skills</h2>
        <div className="service__grid">
          <div className="service__card">
            <h4>HTML & CSS</h4>
            <p>Use a HTML & CSS</p>
          </div>
          <div className="service__card">
            <h4>JavaScript</h4>
            <p>Use a JavaScript</p>
          </div>
          <div className="service__card">
            <h4>React</h4>
            <p>Studying</p>
          </div>
          <div className="service__card">
            <h4>UI/UX Design</h4>
            <p>Studying</p>
          </div>
          <div className="service__card">
            <h4>Languages:</h4>
            <p>Mongolian / 日本語(JLPT N2)</p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section__container portfolio__container" id="portfolio">
        <h2 className="section__header">My Projects</h2>
        <p className="section__description">
          Click on projects to view details
        </p>
        <div className="portfolio__grid">
          <a href="https://tripmark.netlify.app" target="_blank" rel="noopener noreferrer" className="portfolio__link">
            <div className="portfolio__card">
              <img src="/assets/project2.jpg" alt="Trip Mark" />
              <h3>Trip Mark</h3>
            </div>
          </a>
          <a href="https://abs-company-spa.netlify.app" target="_blank" rel="noopener noreferrer" className="portfolio__link">
            <div className="portfolio__card">
              <img src="/assets/project1.jpg" alt="ABS Construction" />
              <h3>ABS建設会社 公式サイト</h3>
            </div>
          </a>
          <a href="https://github.com/pvjee9631/Emergency_Dashboard" target="_blank" rel="noopener noreferrer" className="portfolio__link">
            <div className="portfolio__card">
              <img src="/assets/project3.jpg" alt="Emergency Dashboard" />
              <h3>Emergency Dashboard</h3>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section__container contact__container" id="contact">
        <h2 className="section__header">Contact Me</h2>
        <form className="contact__form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your name" 
            required 
            className="form__input"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your email" 
            required 
            className="form__input"
            value={formData.email}
            onChange={handleInputChange}
          />
          <textarea 
            name="message"
            placeholder="Your message" 
            required 
            className="form__textarea"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" className="btn form__btn">
            Send Message
          </button>
          {formStatus && (
            <div className={`form__status ${formStatus.includes('❌') ? 'error' : 'success'}`}>
              {formStatus}
            </div>
          )}
        </form>
      </section>

      <footer className="footer">
        Copyright © 2024 My Portfolio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;