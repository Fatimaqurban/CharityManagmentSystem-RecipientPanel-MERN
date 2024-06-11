const { Login, getAllRecipients, getRecipientById, createRecipient, updateRecipientById, deleteRecipientById, giveFeedbackToDonor, seeYourFeedback, seeAllFeedback, giveAppFeedback, getAllFeedback, fetchDonors, searchByName,sendRequest, getRequestStatus,getRecipientName, getMessage, postMessage, getRecipientId} = require("../Controller/RecipientController")

const express = require("express");
const { AuthenticateUser } = require("../utils");
const router2 = express.Router();

router2.get("/recipientName" ,AuthenticateUser,  getRecipientName)
router2.get('/recipientId',AuthenticateUser,getRecipientId)

router2.get('/messages/:donorId', AuthenticateUser, getMessage)
router2.post('/messages/:donorId',  AuthenticateUser, postMessage)


router2.post("/create" , createRecipient)
router2.post ("/login", Login )
router2.get("/" , AuthenticateUser, getAllRecipients)
router2.get("/fetchAllDonors" , fetchDonors)
router2.post("/searchDonor" ,AuthenticateUser, searchByName )
router2.post('/sendRequest/:donorId', AuthenticateUser, sendRequest)
router2.get('/getRequestStatus/:donorId',AuthenticateUser, getRequestStatus);

router2.get('/seeYourFeedback' , AuthenticateUser, seeYourFeedback), // see donor given feedbak
router2.get('/seeAllFeedback', seeAllFeedback), // see all feedback given by you to the donors

router2.post('/feedback', AuthenticateUser, giveAppFeedback); // give spp feedback
router2.get('/feedback', getAllFeedback); // see all the  recipeint feedback about your app

router2.get("/:id" ,AuthenticateUser, getRecipientById)
router2.patch("/:id" ,AuthenticateUser, updateRecipientById)
router2.delete("/:id" ,AuthenticateUser,  deleteRecipientById)
router2.post('/giveFeedbackToDonor/:id', AuthenticateUser, giveFeedbackToDonor )
router2.delete("/:id" ,AuthenticateUser,  deleteRecipientById)

module.exports = router2;


