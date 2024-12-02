import type { Category, Color, Image, Product, Size } from "@prisma/client";

export type APIError = {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: Record<string, string>;
};

export type RouteParams = {
  categoryId: string;
  productId: string;
  colorId: string;
  sizeId: string;
};

export type Breadcrumb = {
  text: string;
  href?: string;
};

export type SafeProduct = Product & {
  category: Category;
  size: Size;
  color: Color;
  images: Image[];
};
