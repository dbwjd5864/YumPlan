import React from 'react';
import footerImg from '../../img/YumPlan_footer.png';
import SvgIcon from './SvgIcon';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__copyright">
          <img className="footer__img" src={footerImg} alt="YumPlan" />
          <small>&copy; Copyright 2021, Yujeong Choung</small>
        </div>
        <div className="footer__email">
          <a
            href="https://github.com/dbwjd5864"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SvgIcon
              name="github"
              color="#8d8479"
              width="1.8em"
              height="1.8em"
            />
          </a>
          <a href="mailto:yjchoung10@gmail.com">
            <SvgIcon name="mail" color="#8d8479" width="1.8em" height="1.8em" />
            yjchoung10@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
