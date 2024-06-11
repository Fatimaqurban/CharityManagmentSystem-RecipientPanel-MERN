
const recipient = require("../Model/Recipient.schema");
const donor = require("../Model/Donor.schema");

// Route to search for a word in all blog titles
const searchByRecipientNeed = async (req, res) => {
    try {
        const need = req.params.need;
        
        // Writing query to search for the need in recipient needs
        const query = { needs: { $regex: need, $options: 'i' } };

        // Execute the query and sorting
        const searchResults = await recipient.find(query).sort({ createdAt: -1 });

        // Respond with the search results
        res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};

const searchByName = async (req, res) => {
    try {
        const nameToSearch = req.params.name;

        // Writing query to search for the name in both donors and recipients
        const donorQuery = { name: { $regex: nameToSearch, $options: 'i' } };

        // Execute the queries for both donors and recipients
        const donorResults = await donor.find(donorQuery).sort({ createdAt: -1 });

        // Combine the results for both donors and recipients
        const searchResults = {
            donors: donorResults,
        };

        // Respond with the search results
        res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};

module.exports = { 
    searchByRecipientNeed, 
    searchByName  
};
