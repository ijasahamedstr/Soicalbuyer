import users from '../models/usersSchema.js';
import moment from 'moment';

// Example route Controller handler

// All Acccount Create

export const Image = async (req, res) => {
    const { filename } = req.file;
    const { fname } = req.body;

    if (!fname || !filename) {
        return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    }

    try {
        const date = moment().format('YYYY-MM-DD');

        const userdata = new users({
            fname,
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
export const ImageView = async (req, res) => {
    try {
        const getUser = await users.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
};



// All Acccount Delete

export const ImageDelete = async (req, res) => {
    try {
        const {id} = req.params;

        const dltUser = await users.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
};


