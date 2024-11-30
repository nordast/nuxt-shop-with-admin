import db from "~/utils/db";
import { getResourceName } from "~/utils";
import { deleteResourceFromCloudinary } from "~/server/api/utils/cloudinary";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    try {
      const product = await db.product.findUnique({
        where: {
          id: event.context.params?.productId,
        },
        include: {
          images: true,
        },
      });

      try {
        // Delete  Cloudinary Images
        for (const image of product.images) {
          const name = getResourceName(image.url);
          if (name) await deleteResourceFromCloudinary(name);
        }
      } catch {
        throw createError({
          status: 404,
          message: "Images not deleted",
        });
      }
    } catch {
      throw createError({
        status: 404,
        message: "Page not found",
      });
    }

    try {
      return db.product.delete({
        where: {
          id: event.context.params?.productId,
        },
        include: {
          images: true,
        },
      });
    } catch {
      throw createError({
        status: 404,
        message: "Product not deleted",
      });
    }
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
