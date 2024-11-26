import { authSchema } from "~/utils/validations";
import db from "~/utils/db";
import { sanitizeUser } from "~/server/api/utils/auth";

export default defineEventHandler(async (event) => {
  const { password, email } = await readValidatedBody(event, (body) =>
    authSchema.parse(body),
  );

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw createError({
      status: 400,
      message: "User not found",
    });
  }

  if (!existingUser.hashedPassword) {
    const connectedOAuthAccount = await db.oauthAccount.findFirst({
      where: {
        userId: existingUser.id,
      },
    });

    if (connectedOAuthAccount) {
      const oAuthProvider = connectedOAuthAccount.provierId;
      throw createError({
        status: 400,
        message: `Account is connected to ${oAuthProvider} provider. Please connect it to your account using ${oAuthProvider} provider.`,
      });
    }
  }

  if (existingUser.hashedPassword) {
    const isPasswordCorrect = await verifyPassword(
      existingUser.hashedPassword,
      password,
    );
    if (!isPasswordCorrect) {
      throw createError({
        status: 400,
        message: "Invalid credentials",
      });
    }
  }

  const transformedUser = sanitizeUser(existingUser);

  if (transformedUser) {
    await setUserSession(event, {
      user: transformedUser,
    });
  }

  return transformedUser;
});
