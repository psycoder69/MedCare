import bcrypt from "bcrypt";
import VerifiedDoctor from "../models/VerifiedDoctor.js";
import UnverifiedDoctor from "../models/UnverifiedDoctor.js";
import { sendOTPMail } from "../services/sendMail.js";
import { generateOTP } from "../services/otp.js";

const handleSendOTPPostRequest = async (req, res) => {
    try {
        const doc = await VerifiedDoctor.findOne({ email: req.body.email });

        if (doc) {
            return res.status(400).json({ message: "User already registered" });
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const otp = generateOTP();

        req.body.otp = bcrypt.hashSync(otp, 10);

        await UnverifiedDoctor.findOneAndReplace({ email: req.body.email }, req.body, { upsert: true });

        sendOTPMail(req.body.firstname, req.body.email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export { handleSendOTPPostRequest };