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
    } = await readValidatedBody(event, (body) => productSchema.parse(body));

    try {
      await db.product.update({
        where: {
          id: event.context.params?.productId,
        },
        data: {
          name,
          images: {
            deleteMany: {},
          },
          price,
          categoryId,
          colorId,
          sizeId,
          isFeatured,
          isArchived,
        },
      });

      return await db.product.update({
        where: {
          id: event.context.params?.productId,
        },
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
        },
      });
    } catch {
      throw createError({
        status: 404,
        message: "Page not found",
      });
    }
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
