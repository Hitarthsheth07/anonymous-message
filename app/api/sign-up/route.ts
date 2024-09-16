// import { sendVerificationEmail } from "@/lib/helpers/sendVerifiationEmail";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import dbconnect from "@/lib/dbconnect";

export async function POST(request: Request) {
  await dbconnect();
  const { username, email, password } = await request.json();
  const existingUserVerifiedByUsername = await UserModel.findOne({
    username,
    isVerified: true,
  });

  if (existingUserVerifiedByUsername) {
    return Response.json(
      {
        success: false,
        message: "Username already taken",
      },
      { status: 404 }
    );
  }

  const existingUserByEmail = await UserModel.findOne({ email });
  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  if (existingUserByEmail) {
    if (existingUserByEmail.isVerified) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 404 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      verifyCode: verifyCode,
      verifyCodeExpiry: expiryDate,
      isAccepting: false,
      isVerified: false,
      messages: [],
    });

    await newUser.save();
  }

  // const emailResponse = await sendVerificationEmail(
  //   email,
  //   username,
  //   verifyCode
  // );

  // if (!emailResponse.success) {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: emailResponse.message,
  //     },
  //     { status: 500 }
  //   );
  // } else {
  //   return Response.json(
  //     {
  //       success: true,
  //       message: "User registered successfully, please verify your email",
  //     },
  //     { status: 201 }
  //   );
  // }
}
