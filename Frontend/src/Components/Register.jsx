import React from 'react';
import { Link } from 'react-router-dom';
import registerImage from '../Images/register_icon.png';
import donorLogo from '../Images/donor_hand.png';
import recipientLogo from '../Images/recipient_hand.png';

const RegisterPage = () => {
  return (
    <section className="background3" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <img src={registerImage} className="center" style={{ height: '84px', width: '76px' , marginBottom: '20px'}} alt="" />

      <h5 className="mt-4 text-center text-white mb-2" style={{ marginBottom: '10px' }}>Register</h5>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div  >
          {/* Register as Donor button */}
          <Link to="/registerAsDonor" style={{ textDecoration: 'none' }}>
          <button className="btn_bg center" style={{ width: '200px', padding: '10px', marginBottom:'20px' ,marginTop: '30px'}}>
            <img src={donorLogo} alt="Donor Logo" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
              Register as Donor
            </button>
          </Link>
        </div>
        <div >
          {/* Register as Recipient button */}
          <Link to="/registerAsRecipient" style={{ textDecoration: 'none' }}>
          <button className="btn_bg center" style={{ width: '230px', padding: '10px' ,marginLeft:'0px' }}>
              <img src={recipientLogo} alt="Recipient Logo" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
              Register as Recipient
            </button>
          </Link>
        </div>
      </div>
      .
    </section>
  );
};

export default RegisterPage;
