// RecipientDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipientDetails = () => {
  const { recipientId } = useParams();
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isNeedFulfilled, setIsNeedFulfilled] = useState(false);

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3001/admin/get-recipient-by-id/${recipientId}`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipient details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setRecipient(data);
        setIsBlocked(data.isBlocked);
        setIsNeedFulfilled(data.isNeedFulfilled);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipient details:", error.message);
        setLoading(false);
      }
    };

    fetchRecipientDetails();
  }, [recipientId]);

  const handleBlockToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const action = isBlocked ? "unblock" : "block";

      const response = await fetch(
        `http://localhost:3001/admin/${action}-user/${recipientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${action} recipient. Status: ${response.status}`
        );
      }

      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} recipient:`,
        error.message
      );
    }
  };

  const handleNeedToggle = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/admin/update-recipient-status/${recipientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update recipient status. Status: ${response.status}`
        );
      }

      setIsNeedFulfilled(!isNeedFulfilled);
    } catch (error) {
      console.error(`Error updating recipient status:`, error.message);
    }
  };

  return (
    <div>
      <h2>Recipient Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : recipient ? (
        <div>
          <p>Name: {recipient.name}</p>
          <p>Email: {recipient.email}</p>
          <p>Status: {isBlocked ? "Blocked" : "Active"}</p>
          <p>Need Fulfilled: {isNeedFulfilled ? "Yes" : "No"}</p>
          <button onClick={handleBlockToggle}>
            {isBlocked ? "Unblock Recipient" : "Block Recipient"}
          </button>
          <button onClick={handleNeedToggle} className="ms-3">
            {isNeedFulfilled
              ? "Mark Need Not Fulfilled"
              : "Mark Need Fulfilled"}
          </button>
        </div>
      ) : (
        <p>Recipient not found</p>
      )}
    </div>
  );
};

export default RecipientDetails;
