import React,{useState,useEffect} from "react";
import logo from './img/logo.png';
import chooseImg from './img/choose-img.png';
import homeImg from './img/home-img.png';
import logo1 from './img/logo1.png';
import logo2 from './img/logo2.png';
import logo3 from './img/logo3.png';
import logo4 from './img/logo4.png';
import calculate from './img/calculate-img.png';
import Main from './main';
import './home.css'
import { BrowserRouter as  Routes, Route, Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Main />
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="main-logo">
            <img src={logo} alt="Logo" className="main-logo-img" />
            Gym & Fitness
          </a>
          <div className="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#choose" className="nav-link">Choose US</a></li>
              <li className="nav-item"><a href="#program" className="nav-link">Program</a></li>
              <li className="nav-item"><a href="#pricing" className="nav-link">Pricing</a></li>
              <li className="nav-item"><Link to="/register" className="button nav-button">Register Now</Link></li>
            </ul>
            <div className="nav-close"><i className="ri-close-line"></i></div>
          </div>
          <div className="nav-toggle"><i className="ri-menu-line"></i></div>
        </nav>
      </header>

      <main className="main">
        <section className="home section" id="home">
          <div className="home-container container grid">
            <div className="home-data">
              <h2 className="home-subtitle">Keep Your</h2>
              <h1 className="home-title">Body Fit & Strong</h1>
              <p className="description">
                In here we will help you to shape and build your ideal body and live your life to the fullest.
              </p>
              <Link to="/login" className="button button-flex">Get Started<i className="ri-arrow-right-line"></i></Link>
            </div>
            <img src={homeImg} alt="Home" className="main-image" />
          </div>
        </section>

        <section className="logos container">
          <div className="logos-container grid">
            <img src={logo1} alt="Logo" className="logo-img" />
            <img src={logo2} alt="Logo" className="logo-img" />
            <img src={logo3} alt="Logo" className="logo-img" />
            <img src={logo4} alt="Logo" className="logo-img" />
          </div>
        </section>

        <section className="choose section" id="choose">
          <div className="choose-container container grid">
            <div className="choose-group">
              <img src={chooseImg} alt="Choose Us" className="choose-img" />
              <div className="choose-timing">
                <h3 className="choose-timing-title">Opening Hours</h3>
                <p className="choose-time">08:00 AM - 10:00 PM</p>
              </div>
            </div>
            <div className="choose-content">
              <h1 className="section-title" data-title="Best Reason"> Why Choose Us ?</h1>
              <p className="description">Choose your favorite class and start now. Remember the only bad workout is the one you didn't do.</p>
              <div className="choose-data grid">
                <ChooseData number="100+" subtitle="Awards" />
                <ChooseData number="200+" subtitle="Total Members" />
                <ChooseData number="50+" subtitle="Best Trainers" />
                <ChooseData number="25+" subtitle="Programs" />
              </div>
            </div>
          </div>
        </section>

        <section className="program container section" id="program">
          <h1 className="section-title title-center" data-title="Our Program">Build Your Best Body</h1>
          <div className="program-container">
            <ProgramCard number="01" title="Flex Muscle" description="Creating tension that's temporarily making the muscle fibers smaller or contracted." />
            <ProgramCard number="02" title="Basic Yoga" description="Diaphragmatic this is the most common breathing technique you'll find in yoga." />
            <ProgramCard number="03" title="Weight Lifting" description="Attempts a maximum weight single lift of a barbell loaded with weight plates." />
          </div>
        </section>

        <section className="pricing container section" id="pricing">
          <h1 className="section-title title-center" data-title="Pricing">Our Special Plan</h1>
          <div className="pricing-container">
            <PricingCard title="Starter" price="$120" events="Weekly Events" />
            <PricingCard title="Popular" price="$240" events="Daily Events" />
            <PricingCard title="Advance" price="$420" events="Weekly Events" />
          </div>
        </section>

        <section className="calculate section">
          <div className="calculate-container container grid">
            <div className="calculate-content">
              <h1 className="section-title" data-title="BMI Calculator">Calculate Your BMI ?</h1>
              <p className="description">The body mass index (BMI) calculator calculates body mass index from your weight and height.</p>
              <form className="calculate-form grid" id="calculate-form">
                <div className="calculate-box">
                  <input type="number" className="calculate-input" placeholder="height" id="calculate-cm" />
                  <label className="calculate-label">CM</label>
                </div>
                <div className="calculate-box">
                  <input type="number" className="calculate-input" placeholder="weight" id="calculate-kg" />
                  <label className="calculate-label">KG</label>
                </div>
                <button className="button button-flex" type="submit">Calculate<i className="ri-arrow-right-line"></i></button>
              </form>
              <p className="calculate-message" id="calculate-message"></p>
            </div>
            <div className="calculate-images">
              <img src={calculate} alt="Calculate" className="calculate-img" />
            </div>
          </div>
        </section>

        <section className="marquee section">
          <div className="marquee-bg">
            {[...Array(2)].map((_, i) => (
              <ul className="marquee-list" key={i} aria-hidden={i === 1}>
                {["Live Classes", "On-Demand Workouts", "Personal Trainers", "Outdoor & Online Trainers"].map((item, idx) => (
                  <li key={idx} className="marquee-item"><i className="ri-asterisk"></i>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer container section" id="footer">
        <div className="footer-container grid">
          <div>
            <a href="#" className="main-logo footer-logo">
              <img src={logo} alt="Logo" className="main-logo-img" />
              Gym & Fitness
            </a>
            <p className="footer-description">Subscribe for company updates below.</p>
            <form className="footer-form">
              <input type="email" placeholder="Your Email" className="footer-input" />
              <button className="button" type="submit">Subscribe</button>
            </form>
          </div>

          <div>
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              {['Flex Muscle', 'Basic Yoga', 'Weight Lifting'].map((service, idx) => (
                <li key={idx}><a href="#" className="footer-link">{service}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-content grid">
            <div>
              <h3 className="footer-title">Pricing</h3>
              <ul className="footer-links">
                {['Basic', 'Premium', 'Diamond'].map((plan, idx) => (
                  <li key={idx}><a href="#" className="footer-link">{plan}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                {['About Us', 'Careers', 'Customers', 'Partners'].map((item, idx) => (
                  <li key={idx}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-group">
          <span className="footer-copy">&#169; Copyright Gym-fitness. All rights reserved</span>
          <div className="footer-social">
            {[
              { icon: 'facebook-circle-fill', link: 'https://facebook.com/yourprofile' },
              { icon: 'twitter-fill', link: 'https://twitter.com/yourprofile' },
              { icon: 'linkedin-fill', link: 'https://www.linkedin.com/in/abdulrahman50?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-socail-link"
              >
                <i className={`ri-${item.icon}`}></i>
              </a>
            ))}
          </div>

        </div>
      </footer>

      <a href="#" className="scrollup" id="scroll-up">
        <i className="ri-arrow-up-line"></i>
      </a>

      <script src="https://unpkg.com/scrollreveal"></script>
    </>
  );
};

const ChooseData = ({ number, subtitle }) => (
  <div className="choose-data-item">
    <h3 className="choose-no">{number}</h3>
    <p className="choose-data-subtitle">{subtitle}</p>
  </div>
);

const ProgramCard = ({ number, title, description }) => (
  <article className="program-card">
    <span className="program-no">{number}</span>
    <h3 className="program-title">{title}</h3>
    <p className="program-description">{description}</p>
  </article>
);

const PricingCard = ({ title, price, active = false, events }) => (
  <article className={`pricing-card${active ? ' pricing-card-active' : ''}`}>
    <h1 className="pricing-title">{title}</h1>
    <h2 className="pricing-no">{price}</h2>
    <ul className="pricing-list">
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>{title === 'Starter' ? '1 Week Access' : title === 'Advance' ? '3 Month Access' : '1 Month Access'}</li>
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>24/7 Gym Access</li>
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>Personal Trainer</li>
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>Nutrition Plan</li>
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>Diet Planning</li>
      <li className="pricing-item"><i className="ri-checkbox-circle-line"></i>{events}</li>
    </ul>
    <a href="#" className="button button-flex pricing-button">Purchase Now <i className="ri-arrow-right-line"></i></a>
  </article>
);

export default Home;
