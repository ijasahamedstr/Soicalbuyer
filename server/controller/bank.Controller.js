import BankDB from "../models/bank.models.js";

export const BankCreate = async (req, res) => {
    const { userId, bankAccountName, iban, accountNumber } = req.body;

    // Validate required fields
    if (!userId || !bankAccountName || !iban || !accountNumber) {
        return res.status(400).json({ error: "Please enter all required fields." });
    }

    try {
        // Create a new bank account entry
        const accountCreate = new BankDB({
            userId,
            bankAccountName,
            iban,
            accountNumber
        });

        // Save to database
        const storeData = await accountCreate.save();

        // Respond with success and the created data
        return res.status(201).json(storeData); // 201 Created is more appropriate for successful creation
    } catch (error) {
        // Handle errors and respond with a generic message
        console.error('Error creating account:', error); // Log error for debugging
        return res.status(500).json({ error: "An error occurred while creating the bank account." });
    }
};


// All Acccount View 
export const BankDeatailsView = async (req, res) => {
    try {

        const BankDeatails = await BankDB.find();

        res.json(BankDeatails);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

