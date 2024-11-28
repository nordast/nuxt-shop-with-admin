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
