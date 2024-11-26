import { authSchema } from "~/utils/validations";
import db from "~/utils/db";
import { sanitizeUser } from "~/server/api/utils/auth";

export default defineEventHandler(async (event) => {
  const { name, password, email } = await readValidatedBody(event, (body) =>
    authSchema.parse(body),
  );

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw createError({
      status: 400,
      message: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.user.create({
    data: { email, hashedPassword, name },
  });

  const transformedUser = sanitizeUser(user);

  if (transformedUser) {
    await setUserSession(event, {
      user: transformedUser,
    });
  }

  return transformedUser;
});
