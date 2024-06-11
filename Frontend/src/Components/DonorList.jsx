import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import RateReviewIcon from "@mui/icons-material/RateReview";
import io from "socket.io-client";
import ChatIcon from "@mui/icons-material/Chat";

var socket = io("http://localhost:3003", {
  cors: {
    credentials: true,
  },
  transports: ["websocket"],
});

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [recipient, setRecipient] = useState("");
  const [chatID, setchatId] = useState("");
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState("");

  const [selectedDonor, setSelectedDonor] = useState(null); // Track the selected donor for chatting
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [RecipientID, setRecipientID] = useState(null); // Track the selected donor for chatting

  /////////////////// FETCHING DONORS /////////////////////

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3003/recipient/searchDonor`,
          {
            method: "POST",
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: searchTerm,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch donors. Status: ${response.status}`);
        }

        const data = await response.json();
        setDonors(data.donors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donors:", error.message);
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  useEffect(() => {
    const getRecipientName = async () => {
      try {
        const token = localStorage.getItem("token");

        const response3 = await fetch(
          `http://localhost:3003/recipient/recipientName`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response3.ok) {
          throw new Error(
            `Failed to send request. Status: ${response3.status}`
          );
        }

        const data3 = await response3.json();
        setRecipient(data3);
      } catch (error) {
        console.error("Error fetching recipient Name:", error.message);
      }
    };
    getRecipientName();
  }, []);

  /////////////////////////// HANDLE REQUEST //////////////////////////

  const handleSendRequest = async (donorId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3003/recipient/sendRequest/${donorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send request. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const response2 = await fetch(
        `http://localhost:3003/recipient/getRequestStatus/${donorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response2.ok) {
        throw new Error(`Failed to send request. Status: ${response2.status}`);
      }

      const data2 = await response2.json();
      setRequestStatus(data2.requestStatus);
    } catch (error) {
      console.error("Error sending request:", error.message);
    }
  };

  /////////////////////////// HANDLE FEEDBACK //////////////////////////
  const handleFeedbackButton = () => {
    setShowModal(true);
    setFeedbackSuccess(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedbackText("");
    setFeedbackSuccess(false);
  };

  const handleSendFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response4 = await fetch(
        "http://localhost:3003/recipient/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },

          body: JSON.stringify({
            message: feedbackText,
          }),
        }
      );
      const data6 = await response4.json();

      if (
        data6.message ===
        "You have already given feedback within the last 6 months!"
      ) {
        setFeedbackSuccess(true);
        setFeedbackErrorMessage(data6.message);
      } else {
        setFeedbackSuccess(true);
        setFeedbackErrorMessage("FeedBack sent sucessfully!");
      }
    } catch (error) {
      console.error("Error sending feedback:", error.message);
      setFeedbackSuccess(false); // Set feedback success status
    }
  };

  ////////////// HANDLE CHAT MODAL ///////////////
  useEffect(() => {
    const getRecipientID = async () => {
      try {
        const token = localStorage.getItem("token");

        const response4 = await fetch(
          `http://localhost:3003/recipient/recipientId`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        if (!response4.ok) {
          throw new Error(
            `Failed to send request. Status: ${response4.status}`
          );
        }

        const data4 = await response4.json();
        // console.log(data4)
        setRecipientID(data4.recipientId);
        // console.log(data4.recipientID)
      } catch (error) {
        console.error("Error fetching recipient id:", error.message);
      }
    };
    getRecipientID();
  });

  const handleSendMessage = (donorId) => {
    setSelectedDonor(donorId);
  };

  const handleChatModalClose = () => {
    setSelectedDonor(null);
  };

  const handleChatModalSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Emit the sendMessage event to the socket
      let id = Math.floor(Math.random() * (100 - 1 + 1));
      setchatId(() => id);

      socket.emit("sendMessage", {
        donorId: selectedDonor,
        message: newMessage,
        recipientId: RecipientID,
        chatId: chatID,
      });
      // console.log(chatID)
      setMessages([
        ...messages,
        {
          sender: recipient,
          text: newMessage,
        },
      ]);
      // console.log(chatID);
      setNewMessage("");
    }
  };

  useEffect(() => {}, [chatID]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", ({ donorId, message }) => {
      setMessages([
        ...messages,
        {
          sender: donorId,
          text: message,
        },
      ]);
      console.log(message);
    });

    return () => {
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        console.log("Socket object:", socket);
      });
    };
  }, [messages]);

  return (
    <section style={{ paddingTop: "40px", backgroundColor: "#4B7F9C" }}>
      <div className="container">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by donor name"
            name="searchTerm"
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              width: "50%",
              marginLeft: "290px",
            }}
          />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="list-group">
                {donors.map((donor) => (
                  <li
                    key={donor._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5 className="mb-1">
                        <strong>{donor.name}</strong>
                      </h5>
                      <p className="mb-1">{donor.email}</p>
                      <p className="mb-1">{donor.occupation}</p>

                      <div style={{ marginTop: "10px" }}>
                        <strong>
                          {" "}
                          <h6>Reviews:</h6>
                        </strong>
                        {donor.feedback && donor.feedback.length > 0 ? (
                          donor.feedback.map((feedbackEntry, index) => (
                            <div key={index}>
                              <p className="mb-1">
                                <strong>{feedbackEntry.donorEmail}:</strong>{" "}
                                {feedbackEntry.message}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No Reviews available.</p>
                        )}
                      </div>
                    </div>

                    {!donor.requests.some(
                      (request) => request.recipientName === recipient
                    ) ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#4B7F9C",
                          border: "none",
                        }}
                        onClick={() => handleSendRequest(donor._id)}
                      >
                        Send Request
                      </button>
                    ) : donor.requests.some(
                        (request) =>
                          request.recipientName === recipient &&
                          request.requestStatus === "pendingRequest"
                      ) ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#4B7F9C",
                          border: "none",
                        }}
                        disabled
                      >
                        Pending Request
                      </button>
                    ) : donor.requests.some(
                        (request) =>
                          request.recipientName === recipient &&
                          request.requestStatus === "confirmRequest"
                      ) ? (
                      <button
                        type="button"
                        className="btn  btn-success"
                        style={{
                          // backgroundColor: "#4B7F9C",
                          border: "none",
                        }}
                        onClick={() => handleSendMessage(donor._id)}
                      >
                        <span style={{ marginRight: "5px" }}>
                          {" "}
                          Send Message{" "}
                        </span>
                        <ChatIcon />
                      </button>
                    ) : (
                      <p>Send Request</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {/* Feedback button */}
            <button
              type="button"
              className="btn btn-success feedback-button"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "800px",
                width: "170px",
                backgroundColor: "#D9D9D9",
                color: "black",
              }}
              onClick={handleFeedbackButton}
            >
              <RateReviewIcon />
              Give Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Modal for feedback */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Give Feedback About Our App</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter your feedback here"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          {feedbackSuccess && (
            <p style={{ color: "black" }}>{feedbackErrorMessage}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendFeedback}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Chat Modal */}
      {selectedDonor && (
        <Modal show={true} onHide={handleChatModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chat with {selectedDonor}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleChatModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleChatModalSendMessage}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default DonorList;
