import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/User";

// TODO: Can even use POST here
export async function POST(request: Request) {
  await dbconnect();

  try {
    const { username, code } = await request.json();

    // This is useful when getting data via query, not of use here...
    const decodedUsername = decodeURI(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) >= new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      user.save();
      return Response.json(
        {
          success: true,
          message: "Successfully verified",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Incorrect code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
