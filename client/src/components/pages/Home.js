import React from 'react';
import { Link } from 'react-router-dom';
import doorImg from '../../img/door.png';

const Home = () => {
  return (
    <div className="home">
      <h2 className="home__heading heading-1">Make your meal special</h2>
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
