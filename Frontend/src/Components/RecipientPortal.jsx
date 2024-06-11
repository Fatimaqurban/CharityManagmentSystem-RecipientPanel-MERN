import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './RecipientPortal.css';
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';


const RecipientDetails = ({ match }) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const recipientId = decodedToken.id;
  const pic = decodedToken.profilePicture;
  const name = decodedToken.name;
  const [recipient, setRecipient] = useState(null);
  const [editableRecipient, setEditableRecipient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [edited, setEdited]= useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);


  if (recipientId !== undefined ) {
// console.log(recipientId)
// console.log(name)
// console.log(pic);

  } else {
    // Handle the case where recipientId or name is undefined
    console.error('Error: Unable to retrieve recipient details');
  }

  useEffect(() => {
    const fetchRecipientById = async () => {
      try {
        const response = await fetch(`http://localhost:3003/recipient/${recipientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });
        if (response.ok) {
          const recipientData = await response.json();
          setRecipient(recipientData);
          setEditableRecipient(recipientData); // Initialize editable fields with the fetched data
        } else {
          console.error('Error fetching recipient:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRecipientById();
  }, [recipientId, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      console.log(editableRecipient)
      const response = await fetch(`http://localhost:3003/recipient/${recipientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(editableRecipient),
      });
  
      if (response.ok) {
        const updatedRecipient = await response.json();
        
        // Update editableRecipient state with the new values
        setEditableRecipient(updatedRecipient);
        // Update recipient state (if needed)
        setRecipient(updatedRecipient);
  
        // Disable editing mode
        setIsEditing(false);
        setEdited(true);
        setTimeout(() => {
          

          localStorage.removeItem("token");
          navigate("/login");

           }, 5000);

      } else {
        console.error('Error updating recipient:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableRecipient((prevEditableRecipient) => ({
      ...prevEditableRecipient,
      [name]: value, 
    }));
    setButtonDisabled(false);
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    // Use FileReader to read the contents of the file

      // reader.result contains the base64-encoded content of the file
      setEditableRecipient({
        ...editableRecipient,
        [name]: file.name,
      });
      setButtonDisabled(false);

  
    
  };
  
  return (
    <div className="all_screen_padding all-screens-bg"style={{backgroundColor: "#4B7F9C"}} >
      <section  >

        <div >
          <div className="profile-info" style={{  display:'flex'}}  >
            <img
              src={`http://localhost:3003/uploads/${pic}`}
              className="img-dim round-image"
              alt={pic}
       
            />
            <h4 style={{ marginLeft: "40px", marginTop: "10px",marginBottom: "10px", fontSize:"xx-large", color:'white '}}>My Profile</h4>
          </div>
        </div>

        <div className="user-details-content" style={{ marginLeft:"300px", maxWidth:'500px'}}>
          <div className="user-details-column"style={{  marginTop:'30px', backgroundColor:'white', borderRadius:'20px',  boxShadow:' 0 4px 8px rgba(0, 0, 0, 0.1)', paddingLeft:'15px', paddingBottom:'15px'}}>
            {recipient ? (
            <div className="container mt-4">
            <strong className="fs-4">Name:</strong>
            <p className="fs-5">{name}</p>
          
            <strong className="fs-4 mt-3">Email:</strong>
            <p className="fs-5">{recipient.email}</p>
          
            {isEditing ? (
              <>
                <strong className="fs-4 mt-3">Occupation:</strong>
                <input
                  type="text"
                  className="form-control"
                  name="occupation"
                  value={editableRecipient.occupation}
                  onChange={handleInputChange}
                />
          
                <strong className="fs-4 mt-3">Income:</strong>
                <input
                  type="text"
                  className="form-control"
                  name="income"
                  value={editableRecipient.income}
                  onChange={handleInputChange}
                />
          
                <strong className="fs-4 mt-3">Needs:</strong>
                <input
                  type="text"
                  className="form-control"
                  name="needs"
                  value={editableRecipient.needs}
                  onChange={handleInputChange}
                />
          
                <strong className="fs-4 mt-3">Phone:</strong>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={editableRecipient.phone}
                  onChange={handleInputChange}
                />
          
                <strong className="fs-4 mt-3">Address:</strong>
                <textarea
                  className="form-control"
                  name="address"
                  value={editableRecipient.address}
                  onChange={handleInputChange}
                ></textarea>
          
                <strong className="fs-4 mt-3">Religion:</strong>
                <input
                  type="text"
                  className="form-control"
                  name="religion"
                  value={editableRecipient.religion}
                />
          
                <strong className="fs-4 mt-3">Document:</strong>
                <input
                  type="file"
                  className="form-control"
                  name="document"
                  onChange={handleFileChange}
                />
          
                <strong className="fs-4 mt-3">Profile Picture:</strong>
                <input
                  type="file"
                  className="form-control"
                  name="profilePicture"
                  onChange={handleFileChange}
                />
          
                <button
                  className='btn btn-success mt-4'
                  disabled={isButtonDisabled}
                  onClick={handleSaveClick}
                >
                  Save Changes
                </button>
              </>
            )  : (
                  <>
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Occupation:</strong>
                    <p style={{fontSize:'large'}}> {recipient.occupation} </p>
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Income: </strong>
                    <p style={{fontSize:'large'}}> {recipient.income}</p>
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Needs: </strong>
                    <p style={{fontSize:'large'}}>{recipient.needs} </p>
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Phone: </strong>
                    <p style={{fontSize:'large'}}>{recipient.phone}</p> 
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Address: </strong>
                    <p style={{fontSize:'large'}}>{recipient.address} </p>
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Religion: </strong>
                    <p style={{fontSize:'large'}}>{recipient.religion} </p>
                    
                    <strong style={{fontSize:'x-large',marginTop:"10px"}}>Document: </strong>
                    <a
                      href={`http://localhost:3003/uploads/${recipient.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {recipient.document}
                    </a>
                    <br/>
                  </>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <button className='btn btn-primary'  style={{ marginLeft:'1000px', width:'150px',backgroundColor: "#D0D7DB", color:'black'}}  onClick={handleEditClick}><span style={{marginRight:"5px" ,fontSize:'large'}}> Edit </span> <EditIcon/></button>

        <Modal show={edited} >
          <Modal.Body>
            <h5>Changes saved sucessfully. You're redirected to the login page </h5>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default RecipientDetails;



