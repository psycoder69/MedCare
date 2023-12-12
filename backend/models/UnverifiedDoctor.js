import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    email: { type: String, index: true, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    otp: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 60 * 15 }
}, { versionKey: false, timestamps: true });

const UnverifiedDoctor = mongoose.connection.useDb("Doctors").model("unverifieds", schema, "unverified");

export default UnverifiedDoctor;