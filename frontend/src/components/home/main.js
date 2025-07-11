// main.js
import React, { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    // Change background header on scroll
    const scrollheader = () => {
      const header = document.getElementById('header');
      window.scrollY >= 50
        ? header.classList.add('bg-header')
        : header.classList.remove('bg-header');
    };

    window.addEventListener('scroll', scrollheader);

    // Show scroll up button
    const scrollUp = () => {
      const scrollUp = document.getElementById('scroll-up');
      window.scrollY >= 350
        ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll');
    };

    window.addEventListener('scroll', scrollUp);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollheader);
      window.removeEventListener('scroll', scrollUp);
    };
  }, []);

  useEffect(() => {
    const calculateForm = document.getElementById('calculate-form');
    const calculateCm = document.getElementById('calculate-cm');
    const calculateKg = document.getElementById('calculate-kg');
    const calculateMessage = document.getElementById('calculate-message');

    const calculateBmi = (e) => {
      e.preventDefault();
      if (calculateCm.value === '' || calculateKg.value === '') {
        calculateMessage.classList.remove('color-first');
        calculateMessage.classList.add('color-red');
        calculateMessage.textContent = 'Fill in the Height and Weight 👨‍💻';

        setTimeout(() => {
          calculateMessage.textContent = '';
        }, 3000);
      } else {
        const cm = calculateCm.value / 100;
        const kg = calculateKg.value;
        const bmi = Math.round(kg / (cm * cm));

        if (bmi < 18.5) {
          calculateMessage.classList.add('color-first');
          calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😔`;
        } else if (bmi < 25) {
          calculateMessage.classList.add('color-first');
          calculateMessage.textContent = `Your BMI is ${bmi}  and you are healthy 👌 `;
        } else {
          calculateMessage.classList.add('color-first');
          calculateMessage.textContent = `Your BMI is ${bmi}  and you are overwieght 😔 `;
        }

        calculateCm.value = '';
        calculateKg.value = '';

        setTimeout(() => {
          calculateMessage.textContent = '';
        }, 4000);
      }
    };

    calculateForm?.addEventListener('submit', calculateBmi);

    return () => {
      calculateForm?.removeEventListener('submit', calculateBmi);
    };
  }, []);

  return (
    <>
      {/* Include your HTML structure in the main JSX render (if needed) */}
    </>
  );
};

export default Main;
