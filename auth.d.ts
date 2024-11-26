declare module "#auth-utils" {
  interface User {
    name: string | null;
    id: string;
    email: string;
    role: "USER" | "ADMIN";
    avatarUrl: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  // interface UserSession {
  //   // Add your own fields
  // }
  //
  // interface SecureSessionData {
  //   // Add your own fields
  // }
}

export {};
