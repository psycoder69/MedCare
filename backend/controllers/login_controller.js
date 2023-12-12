import bcrypt from "bcrypt";
import VerifiedDoctor from "../models/VerifiedDoctor.js";

const handleLoginPostRequest = async (req, res) => {
    try {
        const doc = await VerifiedDoctor.findOne({ email: req.body.email });

        if (doc === null) {
            return res.status(400).json({ message: "User not registered" });
        } else if (!bcrypt.compareSync(req.body.password, doc.password)) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).send(doc);
    } catch (error) {
        res.status(500).send(`${error.name}: ${error.message}`);
    }
};

export { handleLoginPostRequest };