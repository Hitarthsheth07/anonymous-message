import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";

export async function POST(req: Request) {
  await dbconnect();
  const { username, content } = await req.json();
  console.log(`username: ${username}`)

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(<Message>newMessage);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message successfully sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error sending messages", error);
    return Response.json(
      {
        success: false,
        message: "Error sending messages",
      },
      { status: 500 }
    );
  }
}
