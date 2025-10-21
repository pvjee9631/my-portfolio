import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Theme-г body attribute дээр тохируулах
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
          Loading projects...
        </p>
        <div className="portfolio__grid">
          <div className="portfolio__card">
            <img src="/assets/project-1.jpg" alt="portfolio" />
          </div>
          <div className="portfolio__card">
            <img src="/assets/project-2.jpg" alt="portfolio" />
          </div>
          <div className="portfolio__card">
            <img src="/assets/project-3.jpg" alt="portfolio" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section__container contact__container" id="contact">
  <h2 className="section__header">Contact Me</h2>
  <form className="contact__form">
    <input 
      type="text" 
      placeholder="Your name" 
      required 
      className="form__input"
    />
    <input 
      type="email" 
      placeholder="Your email" 
      required 
      className="form__input"
    />
    <textarea 
      placeholder="Your message" 
      required 
      className="form__textarea"
    ></textarea>
    <button type="submit" className="btn form__btn">
      Send Message
    </button>
  </form>
</section>

      <footer className="footer">
        Copyright © 2024 My Portfolio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;