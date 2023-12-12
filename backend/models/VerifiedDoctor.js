import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    email: { type: String, index: true, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true }
}, { versionKey: false, timestamps: true });

const VerifiedDoctor = mongoose.connection.useDb("Doctors").model("verifieds", schema, "verified");

export default VerifiedDoctor;