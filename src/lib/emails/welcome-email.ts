import { sendEmail } from "./send-email";

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  await sendEmail({
    to: user.email,
    subject: "Welcome to SaaSBox!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to SaaSBox!</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for signing up for SaaSBox! We're excited to have you on board.</p>
        <p>Best regards,
        <br>
        SaaSBox Team</p>
      </div>
    `,
    text: `Hello ${user.name},\n\nThank you for signing up for SaaSBox! We're excited to have you on board.\n\nBest regards,\nSaaSBox Team`,
  });
}
