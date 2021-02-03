import React from 'react';
import footerImg from '../../img/YumPlan_footer.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <img className="footer__img" src={footerImg} alt="YumPlan" />
        <small>&copy; Copyright 2021, Yujeong Choung</small>
        <a href="mailto:yujeong.choung@gmail.com">yujeong.choung@gmail.com</a>
      </div>
    </footer>
  );
};

export default Footer;
