import Stripe from "stripe";

export const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET || "", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});
