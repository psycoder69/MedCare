import nodemailer from "nodemailer";

const sendOTPMail = async (firstname, recipient, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "127.0.0.1",
            port: 6969,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.GMAIL_AUTH_USER,
                pass: process.env.GMAIL_AUTH_PASS
            }
        });

        await transporter.sendMail({
            from: `MedCare <${process.env.GMAIL_AUTH_USER}>`,
            to: recipient,
            subject: `${otp} is your MedCare verification code`,
            html: `
            <p> Greetings, ${firstname} </p>
            <h2> Confirm your email address </h2>
            <p>
            Thanks for starting the new MedCare account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.
            </p>
    
            <span> Your MedCare verification code is -: </span>
            <h1> ${otp} </h1>
            <p> Verification code expires in 15 minutes. </p>
            <p> Thanks, </p>
            <p> MedCare </p>
            `
        });
    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }
};

export { sendOTPMail };