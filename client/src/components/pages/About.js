import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h2 className="about__heading heading-1 ">About This App</h2>
      <p className="about__description">
        This is a full stack React app for your daily meal.
        <span>
          You can see what people eat, get ideas for your meal{' '}
          <strong>AND</strong> create your meal plan for the week or to share
          with other people.
        </span>
      </p>

      <p className="about__version">
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
