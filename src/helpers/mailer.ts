import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: any) => {
    try {

        // Generate verification token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: "no-reply@yourapp.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `
                <p>Click the link below to ${
                    emailType === "VERIFY"
                        ? "verify your email"
                        : "reset your password"
                }:</p>
                <a href="${
                    process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">
                    Click Here
                </a>
            `,
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
