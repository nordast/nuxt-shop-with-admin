import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const categoryId = query.categoryId;
  const colorId = query.colorId;
  const sizeId = query.sizeId;
  const isFeatured = query.isFeatured;
  const isArchived = query.isArchived;

  const queryParams: any = {};

  if (categoryId) queryParams.categoryId = categoryId;
  if (colorId) queryParams.colorId = colorId;
  if (sizeId) queryParams.sizeId = sizeId;
  if (isFeatured) queryParams.isFeatured = !!isFeatured;
  if (isArchived) queryParams.isArchived = !!isArchived;

  return db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
    where: queryParams,
  });
});
