import AccountRegister from "../models/AccountRegister.models.js";

// Example route Controller handler

// All Acccount Create

export const AccountCreate = async (req, res) => {
    const { displayName, username, email, Phone } = req.body;

    if (!displayName || !username || !email || !Phone) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await AccountRegister.findOne({ email: email });

        if (presuer) {
            res.status(400).json({ error: "This User Allready exist in our db" })
        } else {
            const AccountCreate = new AccountRegister({
                displayName, username, email, Phone
            });


            const storeData = await AccountCreate.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }

};

// All Acccount View 
export const AccountIndex = async (req, res) => {
    try {

        const AcoountsRegister = await AccountRegister.find();

        res.json(AcoountsRegister);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// single Acccount View 

export const AccountSingleDetails = async (req, res) => {
    try {
        const AccountsRegister = await AccountRegister.findById(req.params.id);
        if (AccountsRegister == null) {
            return res.status(404).json({ message: "Cannot Find Acoount" });
        }
        else {
            res.json(AccountsRegister);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// All Acccount Update

export const AccountUpdate = async (req, res) => {

    try {
        const AccountUpdatelist =  await AccountRegister.findOneAndUpdate({_id: req.params.id},{
            displayName: req.body.displayName,
            username: req.body.username,
            email: req.body.email,
            Phone: req.body.Phone
        },
        {
            new:true,
        }
    );

        res.status(200).json(AccountUpdatelist);

    } catch (error) {
        res.status(400).json({message:error.message});
    }
};



// All Acccount Delete

export const AccountDelete = async (req, res) => {
   const AccountId =  req.params.id;
   
   try {
        await AccountRegister.deleteOne({_id: AccountId})
        res.json({message:"Acoount deleted!"});
   } catch (error) {
    res.status(500).json({message:error.message})
   }
};