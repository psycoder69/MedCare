import bcrypt from "bcrypt";
import UnverifiedDoctor from "../models/UnverifiedDoctor.js";
import VerifiedDoctor from "../models/VerifiedDoctor.js";

const handleSignupPostRequest = async (req, res) => {
    try {
        const doc = await UnverifiedDoctor.findOne({ email: req.body.email });

        if (doc === null || !bcrypt.compareSync(req.body.otp, doc.otp)) {
            return res.status(400).json({ message: "Incorrect OTP entered" });
        }

        await UnverifiedDoctor.findOneAndDelete({ email: req.body.email });

        const newDoc = await VerifiedDoctor.create({
            firstname: doc.firstname,
            lastname: doc.lastname,
            email: doc.email,
            password: doc.password
        });

        res.status(200).send(newDoc);
    } catch (error) {
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export { handleSignupPostRequest };