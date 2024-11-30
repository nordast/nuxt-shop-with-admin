import { deleteResourceFromCloudinary } from "~/server/api/utils/cloudinary";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const resourceName = getRouterParam(event, "resourceName");

    try {
      if (resourceName) await deleteResourceFromCloudinary(resourceName);
    } catch {
      throw createError({
        status: 404,
        message: "Image not deleted",
      });
    }
  } else {
    throw createError({
      status: 403,
      message: "You are not authorized to perform this action.",
    });
  }
});
