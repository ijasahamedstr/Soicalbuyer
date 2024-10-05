import Accountboost from "../models/Accountboost.models.js";
import moment from 'moment';  // Make sure you import moment if you're using it

export const Accountboostcreate = async (req, res) => {
    const { userid, paccount, pdays, pselectedPromotion, ptotalPrice } = req.body;

    // Check if all required fields are present
    // if (!userid || !pdays || !pselectedPromotion || !ptotalPrice) {
    //     return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    // }

    try {
        const date = moment().format('YYYY-MM-DD');

        // Create a new Accountboost instance with the received data
        const userdata = new Accountboost({
            userid,
            paccount,
            pdays,
            pselectedPromotion,
            ptotalPrice
        });

        // Save the data to the database
        const finaldata = await userdata.save();

        // Send a success response
        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error creating account boost:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};

export const Accountgamecreate = async (req, res) => {
    const { userid, gaccount, gdays, gtotalPrice } = req.body;

    // Check if all required fields are present
    // if (!userid || !pdays || !pselectedPromotion || !ptotalPrice) {
    //     return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    // }

    try {
        const date = moment().format('YYYY-MM-DD');

        // Create a new Accountboost instance with the received data
        const userdata = new Accountboost({
            userid,
            gaccount,
            gdays,
            gtotalPrice
        });

        // Save the data to the database
        const finaldata = await userdata.save();

        // Send a success response
        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error creating account boost:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};



export const Accountusercreate = async (req, res) => {
    const { userid, uaccount, udays, utotalPrice } = req.body;

    // Check if all required fields are present
    // if (!userid || !pdays || !pselectedPromotion || !ptotalPrice) {
    //     return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    // }

    try {
        const date = moment().format('YYYY-MM-DD');

        // Create a new Accountboost instance with the received data
        const userdata = new Accountboost({
            userid,
            uaccount,
            udays,
            utotalPrice
        });

        // Save the data to the database
        const finaldata = await userdata.save();

        // Send a success response
        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error creating account boost:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};


export const Accountservicecreate = async (req, res) => {
    const { userid, saccount, sdays, stotalPrice } = req.body;

    // Check if all required fields are present
    // if (!userid || !pdays || !pselectedPromotion || !ptotalPrice) {
    //     return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    // }

    try {
        const date = moment().format('YYYY-MM-DD');

        // Create a new Accountboost instance with the received data
        const userdata = new Accountboost({
            userid,
            saccount,
            sdays,
            stotalPrice
        });

        // Save the data to the database
        const finaldata = await userdata.save();

        // Send a success response
        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error creating account boost:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};


// All Acccount View 
export const AcoountboostView = async (req, res) => {
    try {

        const Acoountboost = await Accountboost.find();

        res.json(Acoountboost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

