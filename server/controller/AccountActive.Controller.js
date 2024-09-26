import Accountactive from '../models/AccountActive.models.js';
import moment from 'moment';

// Example route Controller handler

// All Acccount Create

export const AccountActivecreate = async (req, res) => {
    const { filename } = req.file;
    const { userid } = req.body;
    const { fname } = req.body;
    const { midname } = req.body;
    const { lname } = req.body;
    const { documentcountry } = req.body;
    const { documenttype } = req.body;
    const { documentnumber } = req.body;


    if (!userid || !fname || !midname || !lname || !documentcountry || !documenttype || !documentnumber || !filename) {
        return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    }

    try {
        const date = moment().format('YYYY-MM-DD');

        const userdata = new Accountactive({
            userid,
            fname,
            midname,
            lname,
            documentcountry,
            documenttype,
            documentnumber,
            imgpath: filename,
            date
        });

        const finaldata = await userdata.save();

        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};



// All Acccount View 
export const AccountActiveView = async (req, res) => {
    try {
        const getUser = await Accountactive.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
};



// All Acccount Delete

export const AccountActiveDelete = async (req, res) => {
    try {
        const {id} = req.params;

        const dltUser = await Accountactive.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
};


// All Acccount Update

export const AccountActiveUpdate = async (req, res) => {

    const { id } = req.params;
    const { fname } = req.body;
    const { file } = req;

    try {
        // Find the user by ID
        const user = await Accountactive.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Update user details
        if (fname) {
            user.fname = fname;
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



// single Acccount View 

export const AccountSingleActiveDetails = async (req, res) => {
    try {
        const AccountsActive = await Accountactive.findById(req.params.id);
        if (AccountsActive == null) {
            return res.status(404).json({ message: "Cannot Find Acoount" });
        }
        else {
            res.json(AccountsActive);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

