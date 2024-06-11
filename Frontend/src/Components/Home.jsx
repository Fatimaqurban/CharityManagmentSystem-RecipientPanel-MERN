import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="background1">
        <div className="row m-0">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <h1 className="text-white hero_section_heading_margins text-center">
              Inclusion
            </h1>
            <p className="text-center hero_section_margins text-white">
              Donate and be the change you want to see in the world
            </p>
            <div className="donate_btn_margins">
              <Link to="/register">
                <button className="btn_bg" style={{ padding: "1%" }}>
                  Donate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section>
        <div className="mt-5 mb-5">
          <p className="text text-center padding_x_20">
            This app is a handy solution to the problems faced by people who
            offer help and those who need it. We provide help to homeless,
            jobless, and people who need money in general by linking them
            directly with the donors along with guaranteed transparency.
          </p>
        </div>
      </section>

      {/* Section 2 - Statistics */}
      <section className="mt-5 mb-5">
        <div className="row m-0">
          {/* Statistic 1 */}
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="text-center mt-3 statistic_heading">
              <h>828</h>
            </div>
            <p className="text padding_x_20 text-center">
              About 828 million people go to bed hungry every night.
            </p>
          </div>

          {/* Statistic 2 */}
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="text-center mt-3 statistic_heading">
              <h>73</h>
            </div>
            <p className="text padding_x_20 text-center">
              The total global number of unemployed youths is estimated to reach
              73 million in 2022
            </p>
          </div>

          {/* Statistic 3 */}
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="text-center mt-3 statistic_heading">
              <h>150</h>
            </div>
            <p className="text padding_x_20 text-center">
              It is estimated that 150 million people are homeless worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - See Feedback */}
      <section className="background2">
        <div className="container-fluid">
          <div className="row m-0 mt-5">
            <div className="col-6 text-center mt-5">
              <h2 style={{ color: "black" }}>About Us</h2>
              <p className="mt-4 mx-5 mb-5">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit
                amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                dolor. Aenean massa.
              </p>
            </div>

            <div className="row m-0 mt-4">
              {/* <div className="col-lg-5 col-md-5 col-sm-12 mb-2">
                <a href="See_donor_feedback.html">
                  <button className="see_feedback_icon btn_dark_bg margin_left_30 mb-5">
                    <p className="btn text text-white ms-5 mb-0 me-3">
                      See donors feedback
                    </p>
                  </button>
                </a>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-12">
                <Link to="/seeRecipientFeedback">
                  <button className="see_feedback_icon btn_dark_bg margin_left_30 mb-5">
                    <p className="btn text text-white ms-5 mb-0">
                      See recipients feedback
                    </p>
                  </button>
                </Link>
              </div> */}

              <div className="donate_btn_margins"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
