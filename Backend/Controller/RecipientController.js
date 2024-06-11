const Recipient = require("../Model/Recipient.schema");
const Donor = require("../Model/Donor.schema")
const Feedback = require('../Model/Feedback.schema');

const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');


let Login = async (req, res) => {
    let { email, password } = req.body;
    console.log(password)
    console.log(req.body)
    try {
        let recipient = await Recipient.findOne({ email });
        let donor = await Donor.findOne({ email });
   //     let admin = await Admin.findOne({ email: email.trim() });

         if(recipient) {
                console.log(recipient.password)
                if (recipient && recipient.password === password) {
                    let id = recipient._id;
                    let role = recipient.role
                    let name=recipient.name
                    let profilePicture=recipient.profilePicture;
                   
                    if (recipient.isBlocked) {
                        return res.status(401).json({ "Message": "Your account is blocked." });
                    }
                    let token = await jwt.sign({ id, name, role, profilePicture },
                        process.env.SECRET_KEY,
                        { expiresIn: '24h' })
                        res.json({ status: 'success', recipient, token });
                    } else {
                        res.status(401).json({ status: 'failure', message: 'Invalid credentials' });
                    }  

         }


        //  else if(admin)
        //  {
        //         console.log(admin.password)
        //         if (admin.password == password) {
        //             let id = admin._id;
        //             let role = admin.role;
        //             let name=admin.name;
        //             let profilePicture=admin.profilePicture;         
        //             let token = await jwt.sign({ id, name, role, profilePicture},
        //                 process.env.SECRET_KEY,
        //                 { expiresIn: '24h' })
        //             res.json({ admin, "Success": true, token })
        //         } else {
        //             res.json({ "Success": false, "Message": "Invalid password" })
        //         }
        //  }


        else if(donor)
        {

            console.log(donor.password)
            if (donor.password == password) {
                let id = donor._id;
                let role = donor.role;
                let name=donor.name;
                let profilePicture=donor.profilePicture;
                   
                if (donor.isBlocked) {
                    return res.status(401).json({ "Message": "Your account is blocked." });
                }
                let token = await jwt.sign({ id, name, role, profilePicture},
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' })
                res.json({ donor, "Success": true, token })
            } else {
                res.json({ "Success": false, "Message": "Invalid password" })

            }
        }

        else {
            res.json({ "Success": false, "Message": "User not Found" })
        }
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ "Success": false, "Message": "Error during login", err: err.message });
    }

};

let getAllRecipients = async (req, res) => {
    try {
        let recipients = await Recipient.find({});
        res.status(200).json(recipients);
    } catch (err) {
        res.status(500).json({ "Message": "Error", err: err });
    }
};

let getRecipientById = async (req, res) => {
    let id = req.params.id;
    try {
        let recipient = await Recipient.findOne({ _id: id });
        if (recipient) {
            res.status(200).json(recipient);
        } else {
            res.status(404).json({ "Message": "Recipient not found" });
        }
    } catch (err) {
        res.status(500).json({ "Message": "Error", err: err });
    }
};



const createRecipient = async (req, res) => {
    try {
        const data = req.body;
        const { profilePicture, document } = req.files;

        // Generate unique filenames to avoid overwriting
        const profilePicturePath =' ${Date.now()}_${profilePicture.name}';
        const documentPath = '${Date.now()}_${document.name}';

        // Define the upload directory
        const uploadDirectory = './uploads/';

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }

        // Move the files to the upload directory
        profilePicture.mv(path.join(uploadDirectory, profilePicturePath));
        document.mv(path.join(uploadDirectory, documentPath));

        // Create a new recipient with the file paths
        const newRecipient = await Recipient.create({
            name: data.name,
            email: data.email,
            password: data.password,
            cnic: data.cnic,
            occupation: data.occupation,
            income: data.income,
            needs: data.needs,
            phone: data.phone,
            address: data.address,
            religion: data.religion,
            profilePicture: profilePicturePath,
            document: documentPath
        });

        console.log(document)
        console.log(profilePicture)

        res.status(201).json(newRecipient);

       
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'There was some error', error });
    }
};


let updateRecipientById = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
console.log(data)

    try {

        let recipient = await Recipient.findByIdAndUpdate(id, data);
        if (recipient) {
            res.status(200).json(recipient);
        } else {
            res.status(404).json({ "Message": "Recipient not found" });
        }
    } catch (err) {
        res.status(500).json({ "Message": "Error", err: err });
    }
};

let deleteRecipientById = async (req, res) => {
    let id = req.params.id;
    try {
        let recipient = await Recipient.findByIdAndDelete(id);
        if (recipient) {
            res.status(200).json({"Message": recipient.name +  " deleted "});
        } else {
            res.status(404).json({ "Message": "Recipient not found" });
        }
    } catch (err) {
        res.status(500).json({ "Message": "Error", err: err });
    }
};

let giveFeedbackToDonor = async (req, res) => {
    try {
      const { id } = req.params;
      const recipientId  = req.userId;
      const {  feedbackMessage } = req.body;

      // Assuming you have a model named Recipient for your recipients
      const recipient = await Recipient.findById(recipientId);
  
      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }
  
      // Assuming each recipient has an email property
      const recipientEmail = recipient.email;
  
      const donor = await Donor.findById(id);
  
      if (!donor) {
        return res.status(404).json({ error: 'Donor not found' });
      }
  
      // Update the donor's feedback
      donor.feedback.push({
        recipientEmail,
        message: feedbackMessage,
      });
      await donor.save();
  
      return res.json({ success: 'Feedback has been posted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
let seeYourFeedback = async (req, res) => {
  try {
    const recipientId  = req.userId;
    const recipient = await Recipient.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const feedbackArray = recipient.feedback;

    return res.json({ feedback: feedbackArray });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const seeAllFeedback = async (req, res) => {
    try {
        const recipientsWithFeedback = await Recipient.find({
            feedback: { $exists: true, $ne: [] } // Filter recipients with non-empty feedback array
        });

        const allFeedback = recipientsWithFeedback.map(recipient => ({
            email: recipient.email,
            feedback: recipient.feedback,
        }));

        return res.json({ feedback: allFeedback });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




//Controller to handle the creation of feedback
// const giveAppFeedback = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const name=req.name;
//     const id = req.userId;
//     const role= req.role;
//     // Create a new feedback instance
//     const newFeedback = new Feedback({
//       userName: name,
//       userId: id,
//       userRole: role,
//       message,
//     });

//     // Save the feedback to the database
//     const savedFeedback = await newFeedback.save();

//     res.status(201).json(savedFeedback);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const giveAppFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const name = req.name;
    const id = req.userId;
    const role = req.role;

    // Check if the user has given feedback in the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const existingFeedback = await Feedback.findOne({
      userId: id,
      createdAt: { $gte: sixMonthsAgo },
    });

    if (existingFeedback) {
      return res.status(400).json({ 'message': 'You have already given feedback within the last 6 months!' });
    }

    // Create a new feedback instance
    const newFeedback = new Feedback({
      userName: name,
      userId: id,
      userRole: role,
      message,
    });

    // Save the feedback to the database
    const savedFeedback = await newFeedback.save();

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Controller to retrieve all feedback
const getAllFeedback = async (req, res) => {
  try {
    // Retrieve all feedback from the database
    const allFeedback = await Feedback.find({});

    res.status(200).json(allFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchDonors = async (req, res) => {
  try {
      const donors = await Donor.find({});
      res.status(200).json(donors);
  } 
  catch (err) {
      res.status(500).json({ "Message": "Error", err: err });
  }
};

const searchByName = async (req, res) => {
  try {
    const nameToSearch = req.body.name;
    
    console.log(nameToSearch);

    // Check if the nameToSearch is empty
    if (!nameToSearch) {
      // If empty, return all donors
      const allDonors = await Donor.find().sort({ createdAt: -1 });

      // Respond with all donors
      return res.status(200).json({ donors: allDonors });
    }

    // Writing query to search for the name in both donors and recipients
    const donorQuery = { name: { $regex: nameToSearch, $options: 'i' } };

    // Execute the query for donors
    const donorResults = await Donor.find(donorQuery).sort({ createdAt: -1 });

    // Combine the results for donors
    const searchResults = {
      donors: donorResults,
    };

    // Respond with the search results
    res.status(200).json(searchResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const sendRequest= async (req, res) => {
  try {
    const recipientName = req.name; // Assuming username is stored in the token

    // Find the donor by ID
    const donor = await Donor.findById(req.params.donorId);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Check if the recipient has already sent a request
    const existingRequest = donor.requests.find(
      (request) => request.recipientName === recipientName
    );

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent'});
    }

    // Add the new request to the donor's requests array
    donor.requests.push({
      recipientName: recipientName,
      requestStatus: 'pendingRequest',
    });

    // Save the updated donor document
    await donor.save();
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error sending request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRequestStatus = async (req, res) => {
  try {
    const recipientName = req.name; // Assuming username is stored in the token

    // Find the donor by ID
    const donor = await Donor.findById(req.params.donorId);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Check if there is a request from the specified recipient
    const request = donor.requests.find(
      (request) => request.recipientName === recipientName
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Return the request status
    res.status(200).json({ requestStatus: request.requestStatus });
  } catch (error) {
    console.error('Error getting request status:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRecipientName= async (req, res) => {
  try {
    const recipientName = req.name; 
    res.status(200).json(recipientName);
  }
  catch (error) {
  console.error('Error getting recipient name:', error.message);
  res.status(500).json({ message: 'Internal server error' });
}
}

const getRecipientId=  async (req, res) => {
  try {
    const  recipientName  = req.name;

    const recipient = await Recipient.findOne({ name: recipientName });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const recipientId = recipient._id;
    console.log(recipientId.toString());

    res.json({ recipientId });
  } catch (error) {
    console.error('Error fetching recipient ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to get messages from a donor
const getMessage = async (req, res) => {
  try {
    const { donorId } = req.params;
    const messages = await ChatMessage.find({ donorId });
    
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



// Route to post a message to a donor
const postMessage = async (req, res) => {
  try {
    const { donorId } = req.params;
    const { sender, text } = req.body;

    const newMessage = {
      sender,
      text,
    };

    const chatMessage = await ChatMessage.findOneAndUpdate(
      { donorId },
      { $push: { messages: newMessage } },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: 'Message posted successfully', chatMessage });
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




module.exports = {
    Login,
    getAllRecipients,
    getRecipientById,
    createRecipient,
    updateRecipientById,
    deleteRecipientById,
    giveFeedbackToDonor,
    seeYourFeedback,
    seeAllFeedback,
    giveAppFeedback,
    getAllFeedback,
    fetchDonors,
    searchByName,
    sendRequest,
    getRequestStatus,
    getRecipientName,
    getMessage,
    postMessage,
    getRecipientId
};
