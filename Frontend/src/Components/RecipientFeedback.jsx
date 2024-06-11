import React, { useState, useEffect } from 'react';

const RecipientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch('http://localhost:3003/recipient/seeYourFeedback', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
  
            body: JSON.stringify({
              message: feedbacks,
            }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch feedbacks. Status: ${response.status}`);
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Recipient Feedback</h1>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.id}>
            <p>{feedback.comment}</p>
            <p>Rating: {feedback.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipientFeedback;
