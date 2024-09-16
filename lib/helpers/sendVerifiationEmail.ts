import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        // TODO: connect to domain
      from: "hitartsheth0@gmail.com",
      to: ['delivered@resend.dev'],
      subject: `Hello ${username}`,
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification Email send successfully" };
  } catch (emailError) {
    console.log("Error send Email");
    return { success: false, message: "Failed to send Verification Email" };
  }
}
