import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR GEMSTONE LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Gemstone City</li>
              <li>Crystal Metropolis</li>
              <li>Precious Stone Haven</li>
              <li>Opal Oasis</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT DUMMY GEMSTONE MARKET</p>
          </div>
          <div className="list">
            <ul>
              <li>About Dummy Gemstone Market</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Our Gemstone Team</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>DUMMY GEMSTONE MARKET</p>
          </div>
          <div className="list">
            <ul>
              <li>Help Center</li>
              <li>Gemstone Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Gemstone Enthusiast Countries: Diamond Nation - Crystal Republic - Jade Archipelago</p>
        <p>Free Classifieds in Gemland. © 2023 Dummy Gemstone Online Market</p>
      </div>
    </div>
  );
}

export default Footer;
