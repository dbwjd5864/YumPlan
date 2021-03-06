import React from 'react';
import { Link } from 'react-router-dom';

import doorImg from '../../img/door.png';
import SvgIcon from '../layout/SvgIcon';

const Home = () => {
  return (
    <div className="home">
      <div className="home__instruction">
        <p className="home__instruction heading-2">Click the Door</p>
        <SvgIcon
          name="corner-right-down"
          color="#8d8479"
          width="3em"
          height="2.5em"
        />
      </div>
      <div className="home__door">
        <Link to="/meal">
          <h4 className="home__door-heading heading-2">Meal</h4>
          <img src={doorImg} alt="door" className="home__door-img" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
