import AccountRegister from "../models/AccountRegister.models.js";

// Example route Controller handler

// All Acccount Create

export const AccountCreate = async (req, res) => {
    const { displayName, username, email, Phone ,Referrallink, Referral,  Referralamount, supportcode, posts, documentationstatus, Accountlevel, currentbalance, packagetype, packageexpirationdate,Accountstatus } = req.body;

    if (!displayName || !username || !email || !Phone || !Referrallink || !Referral || !Referralamount || !supportcode || !posts || !documentationstatus || !Accountlevel || !currentbalance || !packagetype || !packageexpirationdate || !Accountstatus) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await AccountRegister.findOne({ email: email });

        if (presuer) {
            res.status(400).json({ error: "This User Allready exist in our db" })
        } else {
            const AccountCreate = new AccountRegister({
                displayName, username, email, Phone,Referrallink,Referral,Referralamount,supportcode,posts,documentationstatus,Accountlevel,currentbalance,packagetype,packageexpirationdate,Accountstatus
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


// All Acccount Update

export const AccountUpdate  = async (req, res) => {

    const { id } = req.params;
    const { displayName } = req.body;
    const { username } = req.body;
    const { email } = req.body;
    const { Phone } = req.body;
    const { bio } = req.body;
    const { Referrallink } = req.body;
    const { file } = req;
    

    try {
        // Find the user by ID
        const user = await AccountRegister.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Update user details
        if (displayName) {
            user.displayName = displayName;
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (Phone) {
            user.Phone = Phone;
        }
        if (bio) {
            user.bio = bio;
        }
        if (Referrallink) {
            user.Referrallink = Referrallink;
        }

        // Update image if a new file is uploaded
        if (file) {
            user.imgpath = file.filename;
        }

        // Save the updated user data
        const updatedUser = await user.save();

        res.status(200).json({ status: 200, updatedUser });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
};


