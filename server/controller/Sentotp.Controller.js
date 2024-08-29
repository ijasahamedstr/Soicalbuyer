import nodemailer from 'nodemailer'; // Import nodemailer
import AccountRegister from "../models/AccountRegister.models.js";

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d7de0c14b2a4bf",
        pass: "753419f7c0a3ee"
    }
});

// Helper function to send email
const sendEmail = async (to, otp) => {
    const mailOptions = {
        from: "no-reply@example.com", // Change this to your email
        to,
        subject: "OTP Validation",
        text: `Your OTP is: ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
    }
};

// User send OTP function
export const userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please enter your email" });
    }

    try {
        const user = await AccountRegister.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "This user does not exist in our database" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);
        let existingOtp = await AccountRegister.findOne({ email });

        if (existingOtp) {
            existingOtp.otp = OTP;
            await existingOtp.save();
        } else {
            const newOtp = new AccountRegister({ email,user, otp: OTP });
            await newOtp.save();
        }

        await sendEmail(email, OTP);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", error: error.message });
    }
};
