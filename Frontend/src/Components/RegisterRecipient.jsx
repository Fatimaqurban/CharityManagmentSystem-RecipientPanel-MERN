
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipientRegistration = () => {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cnic: '',
        occupation: '',
        income: '',
        needs: '',
        profilePicture: null,
        document: null, // Updated to a single file for documents
        phoneNum: '',
        address: '',
        religion: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ 
          ...formData,
           [name]: files[0] });
    };

    const handleRegister = async () => {
        try {
            const formDataToSend = new FormData();

            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await fetch('http://localhost:3003/recipient/create', {
                method: 'POST',
                headers: {
                    'token': token,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                console.error('Error response:', await response.text());
                throw new Error(`Status: ${response.status}`);
              }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Recipient created:', result);

                navigate('/login');
            } else {
                console.error('Invalid response format. Expected JSON.');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div>
        <section className="background3">
          <form onSubmit={handleRegister} className="rounded p-4" >
            <div className="row m-0 text-white text" style={{backgroundColor:'white', color:'black', borderRadius:'20px', paddingBottom:'10px'}}>
              <div className="col-md-6" style={{  color:'black'}}>
                <h2 className="text-left mb-4 text-primary text-black" style={{marginTop:'10px'}}>
                  Registration
                </h2>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="name"
                    name="name"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">CNIC:</label>
                  <br></br>
                  <input
                    type="text"
                    name="cnic"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Occupation:</label>
                  <input
                    type="text"
                    name="occupation"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Income:</label>
                  <input
                    type="text"
                    name="income"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="col-md-6" style={{  color:'black'}}>
                <br></br>
                <br></br>

                <div className="mb-3">
                  <label className="form-label">Needs:</label>
                  <input
                    type="text"
                    name="needs"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Picture:</label>
                  <input
                    type="file"
                    name="profilePicture"
                    className="form-control"
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone:</label>
                  <input
                    type="tel"
                    name="phoneNum"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <textarea
                    name="address"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Religion:</label>
                  <input
                    type="text"
                    name="religion"
                    className="form-control"
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Document:</label>
                  <input
                    type="file"
                    name="document"
                    className="form-control"
                    onChange={handleFileChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <div className="text-center regbtncontainer">
              <div className="me-5">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button
                  type="submit"
                  className="btn btn-primary me-4"
                  style={{ width: "150px" }}
                >
                  Confirm
                </button>
                </Link>

            
              </div>
            </div>
            </div>
            <br></br>
           
          </form>
        </section>
      </div>
    );
};

export default RecipientRegistration;