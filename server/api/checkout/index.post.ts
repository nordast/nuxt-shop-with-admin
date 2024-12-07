import db from "~/utils/db";
import { stripe } from "~/utils/stripe";
import type { Product } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const productIds = await readBody(event);

  if (!productIds || !productIds.length) {
    throw createError({
      status: 400,
      message: "Product IDs are required",
    });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const totalPrice = products.reduce((total: number, item: Product) => {
    return total + Number(item.price);
  }, 0);
  const tax = totalPrice * 50 * 0.15;
  const processing = 19.99;

  const lineItems = products.map((product: Product) => {
    return {
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(Number(product.price) * 100 * 50),
      },
    };
  });

  lineItems.push({
    quantity: 1,
    price_data: {
      currency: "usd",
      product_data: {
        name: "Order Processing Fee",
      },
      unit_amount: Math.round(processing * 100),
    },
  });

  lineItems.push({
    quantity: 1,
    price_data: {
      currency: "usd",
      product_data: {
        name: "Tax",
      },
      unit_amount: Math.round(tax * 100),
    },
  });

  // Stripe
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?cancelled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return session;
});
