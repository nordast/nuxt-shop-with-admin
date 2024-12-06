import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().max(255).default("").optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1).max(255),
});

export const colorSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1).max(255).default("#000000"),
});

export const sizeSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1).max(255),
});

export const productSchema = z.object({
  name: z.string().min(1).max(255),
  details: z.string().min(1).max(1000),
  features: z.string().min(1).max(1000),
  images: z.object({ url: z.string().url() }).array().min(1),
  price: z.coerce.number().min(0.01),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
