import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, first_name, last_name, email_addresses, image_url } =
        evt.data;
      const username = `${first_name} + ' ' + ${last_name}`;
      try {
        await prisma.user.create({
          data: {
            email: email_addresses[0].email_address,
            username: username,
            clearkId: id || "",
            profile: image_url,
          },
        });
      } catch (error) {
        console.error("Error creating user in database:", error);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
