import type { Stripe } from "stripe";
import { stripe } from "~/utils/stripe";
// import type { OrderItem } from "@prisma/client";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "Stripe-Signature") as string;

  const body = (await readRawBody(event)) || "";

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NUXT_STRIPE_WEBHOOK_SECRET || "",
    );
  } catch {
    throw createError({
      status: 400,
      message: "Invalid webhook signature",
    });
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  const address = session.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents
    .filter((item) => item !== null)
    .join(", ");

  if (stripeEvent.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone,
      },
      include: {
        orderItems: true,
      },
    });

    // const productIds = order.orderItems.map(
    //   (item: OrderItem) => item.productId,
    // );
    //
    // await db.product.updateMany({
    //   where: {
    //     id: {
    //       in: [...productIds],
    //     },
    //   },
    //   data: {
    //     isArchived: true,
    //   },
    // });
  }

  return 200;
});
