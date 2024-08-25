import Accountnotification from "../models/notification.models";
import moment from 'moment';

export const AccountActivecreate = async (req, res) => {
    const { userid } = req.file;
    const { notificationH } = req.body;
    const { notificationB } = req.body;

    if (!userid || !notificationH || !notificationB ) {
        return res.status(400).json({ status: 400, message: 'Please fill all the data' });
    }

    try {
        const date = moment().format('YYYY-MM-DD');

        const userdata = new Accountnotification({
            userid,
            notificationH,
            notificationB,
            date
        });

        const finaldata = await userdata.save();

        res.status(201).json({ status: 201, finaldata });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error });
    }
};

