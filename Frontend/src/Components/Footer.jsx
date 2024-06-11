
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Images/logo.png';
import facebook from '../Images/facebook.png';
import instagram from '../Images/instagram.png';
import twitter from '../Images/twitter.png';
import email from '../Images/email.png';
import telephone from '../Images/telephone.png';
import '../App.css';

const Footer = () => {
    return (
        <div > 
      <section>
        <div className="row m-0 navbar_bg">
          {/* Column 1 */}
          <div className="col-md-2 col-lg-2">
            <img src={logo} style={{ height: '40%', width: '40%' }} className="center mt-5" alt="logo" />
          </div>

          {/* Column 2 */}
          <div className="col-md-2 col-lg-2 text-center mt-4 mb-4">
            <h5>
              About Us
            </h5>
            <p className="text mt-2">
              Our app manages charity in different forms at one platform.
            </p>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 col-lg-3 mt-4 text-center mb-4">
            <h5>
              Contact Us
            </h5>
            <div className="row">
              <div className="col-5">
                <img src={email} style={{ height: '60%', width: '35%' }} className="ms-5" alt="email" />
              </div>
              <div className="col-7">
                <p className="text-left me-5">
                  ngo.org.pk
                </p>
              </div>
              <div className="row">
                <div className="col-5">
                  <img src={telephone} style={{ height: '60%', width: '37%' }} className="ms-5" alt="telephone" />
                </div>
                <div className="col-7">
                  <p className="text-left me-3">
                    xxxx-xxxxxxx
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div className="col-md-6 col-lg-2 text-center mt-4 mb-4">
            <h5>
              Further Information
            </h5>
            <button className="text-center btn-link" style={{ textDecoration: 'none', display: 'block', border: 'none', background: 'transparent'}} onClick={() => {}}>
              Terms and conditions
            </button>
            <button className="text-center btn-link" style={{ textDecoration: 'none', display: 'block' , border: 'none', background: 'transparent'}} onClick={() => {}}>
              Privacy Policy
            </button>
          </div>

          {/* Column 5 */}
          <div className="col-md-3 col-lg-2 text">
            <div className="mt-4 text-center">
              <h5>
                Follow Us
              </h5>
              <div className="mt-2 mb-4">
                <a href="#" style={{ textDecoration: 'none' }}>
                  <img src={facebook} style={{ height: '25%', width: '25%' }} alt="facebook" />
                </a>
                <a href="#" style={{ textDecoration: 'none' }}>
                  <img src={instagram} className="footer_icons" alt="instagram" />
                </a>
                <a href="#" style={{ textDecoration: 'none' }}>
                  <img src={twitter} className="footer_icons" alt="twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Footer;