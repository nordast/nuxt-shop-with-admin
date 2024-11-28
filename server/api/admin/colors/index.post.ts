import { colorSchema } from "~/utils/validations";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const session = await getUserSession(event);

  if (session.user && session.user.role === "ADMIN") {
    const { name, value } = await readValidatedBody(event, (body) =>
      colorSchema.parse(body),
    );

    return db.color.create({
      data: {
        name,
        value,
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
