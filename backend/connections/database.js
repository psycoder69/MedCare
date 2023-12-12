import mongoose from "mongoose";

const connectDatabase = async (url) => {
    try {
        await mongoose.connect(url);

        console.log(`Database connected successfully!`);
    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }
};

export default connectDatabase;