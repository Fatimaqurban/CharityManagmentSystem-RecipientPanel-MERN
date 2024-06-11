const {createDonor, getAllDonors, getDonorById, updateDonorById, deleteDonorById, giveFeedbackToRecipient, Login} = require("../Controller/DonorController")

const express = require("express");
const { AuthenticateUser } = require("../utils");
const router2 = express.Router();

router2.get("/" , getAllDonors)
router2.get("/:id" ,getDonorById)
router2.post("/create" , createDonor)
router2.post ("/login", Login )
router2.patch("/:id" , updateDonorById)
router2.delete("/:id" ,  deleteDonorById)
router2.post( "/giveFeedbackToRecipient/:id", AuthenticateUser, giveFeedbackToRecipient) 

module.exports = router2;


