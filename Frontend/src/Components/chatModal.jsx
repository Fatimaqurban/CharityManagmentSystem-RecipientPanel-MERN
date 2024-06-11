import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatModal = ({ donorId, recipientName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit('sendMessage', {
        donorId,
        message: newMessage,
      });
      setMessages([...messages, { sender: recipientName, text: newMessage }]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', ({ message }) => {
      setMessages([...messages, { sender: donorId, text: message }]);
    });

    return () => {
      // Clean up when the component unmounts
      socket.off('receiveMessage');
    };
  }, [messages, donorId]);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chat with {donorId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
