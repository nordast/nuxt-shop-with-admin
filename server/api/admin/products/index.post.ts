import { productSchema } from "~/utils/validations";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      details,
      features,
    } = await readValidatedBody(event, (body) => productSchema.parse(body));

    return db.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((img) => img)],
          },
        },
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        details,
        features,
        userId: session.user.id,
      },
    });
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
