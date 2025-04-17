import { prisma } from "@/lib/prisma";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { userId } = await auth();
    console.log("User created:", userId);
    const user = await currentUser();
    if (userId) {
      const username =
        `${user?.firstName} + '' + ${user?.lastName}`.toLowerCase();
      await prisma.user.create({
        data: {
          clearkId: userId || "",
          email: user?.emailAddresses[0]?.emailAddress || "",
          username: username,
        },
      });
    }

    // and here as well

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
