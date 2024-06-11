const express = require("express")
const mongoose  =require("mongoose")
const socketIo = require('socket.io');
const cors = require("cors")
const upload = require("express-fileupload")
const bodyparser= require("body-parser");
const app = express();
const ChatMessage = require('./Model/Chat.schema'); 
const path= require ('path')
const server = require('http').createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach socket.io to the server

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));


app.use(bodyparser.json());
app.use(express.json())
require("dotenv").config()
app.use(upload())
app.use("/uploads" , express.static("uploads"))



//const SearchRouter = require("./Routes/SearchRoutes");
const RecipientRouter = require("./Routes/RecipientRoutes");
app.use("/recipient" ,  RecipientRouter)

const DonorRouter = require("./Routes/DonorRoutes");
app.use("/donor" ,  DonorRouter)








// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     // Handle donor and recipient messages
//     socket.on('sendMessage', ({ donorSocketId, message }) => {
//       // Broadcast the message to the specific recipient
//       io.to(donorSocketId).emit('receiveMessage', { message });
//     });

    
//   socket.on('replyMessage', ({ donorSocketId, message }) => {
//     // Send the reply message back to the original donor
//     io.to(donorSocketId).emit('receiveReply', { message });
//   });
  
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });


// io.on('sendMessage', async ({ donorId, recipientId, message }) => {
//   try {
//     // Broadcast the message to all connected clients
//     io.emit('receiveMessage', { donorId, message });
    
//     // Save the message to the database (MongoDB)
//     const chatMessage = new ChatMessage({
//       recipient: recipientId,
//       donorId,
//       messages: [{ sender: donorId, text: message }],
//     });
// console.log(message);
//     await chatMessage.save();
//   } catch (error) {
//     console.error('Error saving message to the database:', error);
//   }
// });

//   // Handle disconnections
//   io.on('disconnect', () => {
//     console.log('User disconnected');
//   });


io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle donor and recipient messages
  socket.on('sendMessage', async ({ donorId, recipientId, message, chatId }) => {

     console.log('Received sendMessage event:', { donorId, recipientId, message, chatId });

    try {
        if (!chatId) {
             console.error('chat ID is undefined');
            return;
          }
      // Broadcast the message to all connected clients
    //   socket.broadcast.emit('receiveMessage', { donorId, message });


      // Save the message to the database (MongoDB)
    //   const chatMessage = new ChatMessage({
    //     recipient: recipientId,
    //     donorId,
        
    //     messages: [{ 
    //         sender: recipientId,
    //         text: message }],
    //   });

    let chatMessage = await ChatMessage.findOne({
        $or: [
          { recipient: recipientId, donorId },
          { recipient: donorId, donorId: recipientId },
        ],
      });

      if (!chatMessage) {
        // If no chat exists, create a new chat
        chatMessage = new ChatMessage({
          recipient: recipientId,
          donorId,
          messages: [],
        });
        // chatMessage.messages.push({
        //     sender: recipientId,
        //     text: message,
        //   });
        //   await chatMessage.save();
        //   io.to(chatMessage.chatId).emit('receiveMessage', { donorId, message });
      }

      // Add the new message to the chat
      chatMessage.messages.push({
        sender: recipientId,
        text: message,
      });

      // Save the chat message to the database
      await chatMessage.save();
      io.to(chatMessage.chatId).emit('receiveMessage', { donorId, message });

    } catch (error) {
      console.error('Error saving message to the database:', error);
    }
  });

  socket.on('replyMessage', ({ donorSocketId, message }) => {
    // Send the reply message back to the original donor
    io.to(donorSocketId).emit('receiveReply', { message });
  });

  socket.on('joinChat', ({ chatId }) => {
    socket.join(chatId); // Join the room identified by chatId
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



  
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err)
})

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
