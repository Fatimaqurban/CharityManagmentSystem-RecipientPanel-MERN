import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Login from "./Components/Login";
import RegisterRecipient from "./Components/RegisterRecipient";
import Register from "./Components/Register";
import RecipientPortal from "./Components/RecipientPortal";
import DonorList from "./Components/DonorList";
import RecipientFeedback from "./Components/RecipientFeedback"

const isLogin= true;

function App() {
  return (
    <Router>
      <div id="main div" style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <NavBar  isLogin={isLogin}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipientPortal" element={<RecipientPortal/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/registerAsRecipient" element={<RegisterRecipient/>}/>
          <Route path="/fetchAllDonor" element={<DonorList/>}/>
          <Route path="/seeRecipientFeedback" element={<RecipientFeedback/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
