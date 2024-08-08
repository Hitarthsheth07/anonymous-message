import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse.ts";

export async function sendVerificationemail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        // TODO: connect to domain
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `Hello ${username}`,
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: false, message: "Verification Email send successfully" };
  } catch (emailError) {
    console.log("Error send Email");
    return { success: false, message: "Failed to send Verification Email" };
  }
}
